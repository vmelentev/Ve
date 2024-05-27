import 'expo-dev-client';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

//The imports below this comment will be moved to a different .js file as the camera will appear on a different screen
import React, { useEffect , useRef, useState } from "react";
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from "react-native-vision-camera";
import { useTensorflowModel } from 'react-native-fast-tflite';
import { useResizePlugin } from 'vision-camera-resize-plugin';
import { useSharedValue } from 'react-native-worklets-core';

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const Cam = ({ route, navigation }) => {
  const { hasPermission, requestPermission } = useCameraPermission() //gets camera permissions
  const device = useCameraDevice('front'); //sets camera to front facing camera
  const camera = useRef(Camera);
  const [ recording, setRecording ] = useState(true); //boolean value to determine toggle the recording function

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const plugin = useTensorflowModel(require('../models/4.tflite')) //loads tflite machine learning model
  const model = plugin.state === "loaded" ? plugin.model : undefined

  const { resize } = useResizePlugin() //activates the plugin for resizing frames

  //these values count the number of frames in which the user demonstrates 'correct running technique'------------------------------------------------
  const headPosCount = useSharedValue(0); //frames where user had good head position
  const shoulderPosCount = useSharedValue(0); 
  const backPosCount = useSharedValue(0);  
  //---------------------------------------------------------------------------------------------------------------------------------------------------
  const steps = useSharedValue(0); //number of steps
  const count = useSharedValue(0); //number of frames
  //---------------------------------------------------------------------------------------------------------------------------------------------------

  //frame processor is ran for every frame the camera 'sees'
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    if (model == null) return

    //resizing the frame so it can be used by tflite model
    const newFrame = resize(frame, {
      scale: {
        width: 192,
        height: 192,
      },
      pixelFormat: 'rgb',
      dataType: 'uint8',
    })

    const outputs = model.runSync([newFrame]) //runs model on frame
    outputs = outputs[0] 

    //counts the number of times head position is optimal
    if (outputs[0] > outputs[3]) {
      headPosCount.value = headPosCount.value + 1;
    }

    if (outputs[4] > outputs[19]) {
      shoulderPosCount.value = shoulderPosCount.value + 1;
    }

    if (outputs[19] >= outputs[28]) {
      backPosCount.value = backPosCount.value + 1;
    }

    //counts steps
    if (outputs[40] === outputs[43]) {
      steps.value = steps.value + 1;
    }

    count.value = count.value + 1; // counts frames processed
  }, [model])

  const {strikeScore, cadenceScore, headScore, shoulderScore, onGoBack} = route.params

  //these variables store the score of each aspect of running technique----------------------------------------------------
  var strike = strikeScore
  var cadence = cadenceScore
  var head = headScore
  var shoulder = shoulderScore;
  //----------------------------------------------------------------------------------------------------------------------

  //'record' function collects outputs from tflite model when toggled on and processes them when toggled off
  const record = () => {
    if (!camera.current) {
      console.log('camera not ready')
    }

    setRecording(!recording);
    console.log(recording)
  
    //goes back to main screen with updated values
    const goBackWithUpdate = () => {
      if (onGoBack) {
        onGoBack(strike, cadence, head, shoulder);
      }
      navigation.goBack();
    };

    //when recording is toggled on, values that track aspects of running technique are reset
    if (recording === true) {
      headPosCount.value = 0;
      shoulderPosCount.value = 0;
      backPosCount.value = 0;
      steps.value = 0
      count.value = 0;
    }
    else{ //when recording toggled off, values are analysed to determine new scores before going back to main screen
      if ((headPosCount.value/count.value *100) < 75) {
        head = 0;
      }
      else {
        head = 1;
      }

      if ((shoulderPosCount.value/count.value * 100) < 75) {
        shoulder = 0;
      }
      else {
        shoulder = 1;
      }

      const seconds = count.value / 60; //calculating seconds the recoding was on by diving frames/fps
      const cad = steps.count / (seconds / 60); //calculating cadence by diving steps recorded per minute

      if (cad > 150) {
        cadence = 1;
      }
      else {
        cadence = 0;
      }

      if ((backPosCount.value/count.value *100) <75) {
        if (shoulder === 1 && cadence === 1 && head === 1){
          strike = 1;
        }
        else {
          strike = 0;
        }
      }
      else {
        strike = 0;
      }

      goBackWithUpdate(); //calls function which goes back to main screen with updated scores
    }
  }

  if (device == null) return <NoCameraDeviceError/>
  return (
    <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        video={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={60}
      />

      <TouchableOpacity onPress={record} style={{backgroundColor: recording? 'white' : 'red', width: recording? 75 : 60, height: recording? 75 : 60, bottom: -810, borderRadius: recording? 100 : 15}}/> 

      <TouchableOpacity style={{width: 30, height:30, borderRadius: 100, marginBottom: 825, marginRight: 350, backgroundColor: 'white'}} onPress={() => navigation.goBack()}>
        <Image style={{marginLeft:3.5 ,marginTop: 4.5, width:20, height:20}} source={require('../assets/backArrow.png')}/>
      </TouchableOpacity>
    </View>
  )
}

export default Cam;



# About Vectorun
This application was created as a part of my final year university project. It is a fitness mobile applcation which looks at a user's running technique and gives them tips on how to improve their form to prevent running related injuries and increase their efficiency. It does so by using the camera and applying a Tesorflow Lite model to each frame which detects different parts of the human body. 

# Dependencies
This project uses react-native-vision-camera for the camera screen and react-native-worklets-core to run Worklets, which are required to use Frame Processor. Frame Processor functions run for every frame the camera “sees”. 

In this case we use a Frame Processor to run a TensorFlow Lite model on every frame. To load and run a tflite model we use a library called react-native-fast-tflite. We also use vision-camera-resize-plugin to resize each frame and covert it to a correct format so that it can be processed by the model. 

So far, all the libraries mentioned were developed by @mrousavy. 

We also use React Navigation to move between screens. 

Please check package-lock.json for the full list of dependencies.

# Launching the app
This application was developed on a Windows machine using the Expo framework for iOS.  Some of the dependencies used in this project are incompatible with Expo Go, therefore, to launch the app you must use a development build powered by EAS.

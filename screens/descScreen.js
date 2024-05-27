import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import data from '../assets/messages.json';

const Desc = ({route, navigation}) => {
    const { id, score } = route.params //gets score of particular aspect of running technique from main screen

    console.log(score)
    console.log(id)

    var attribute = data[id].name; //gets name of aspect of running technique from .json file
    var description = data[id].description; //gets description of aspect from .json file
    var assessment = ""; //initialises variable which states if running technique is optimal or not

    //loads message to be stored in 'assessment' variable
    if (score === 0) {
        assessment=data[id].textBad; 
    } else {
        assessment=data[id].textGood;
    }

    //displays message
    return (
        <View style={{ flex: 1, alignItems:'center', paddingTop:60}}>
            <TouchableOpacity style={{paddingRight: 360}} onPress={() => navigation.goBack()}>
                <Image style={{width:20, height:20}} source={require('../assets/backArrow.png')}/>
            </TouchableOpacity>
            <Text>{attribute}</Text>
            <Text style={{marginTop: 30, paddingLeft:25, paddingRight:25}}>{description}</Text>
            <Text style={{marginTop: 30, paddingLeft:25, paddingRight:25}}>{assessment}</Text>
        </View>
    )
}

export default Desc;
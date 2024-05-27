import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Main = ({ navigation }) => {

    //these hooks determine how good a user's running technique is - 0 means poor, 1 means optimal
    const [strikeScore, setStrikeScore] = useState(0);
    const [cadenceScore, setCadenceScore] = useState(0);
    const [headScore, setHeadScore] = useState(0);
    const [shoulderScore, setShoulderScore] = useState(0);

    //This updates the score once the machine learning model is ran in camScreen
    const handleUpdate = (strike, cadence, head, shoulder) => {
        setStrikeScore(strike);
        setCadenceScore(cadence);
        setHeadScore(head);
        setShoulderScore(shoulder);
    }

    return (
        <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Cam', {strikeScore, cadenceScore, headScore, shoulderScore, onGoBack: handleUpdate})}>
                <Text>Open Camera</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 15, height:3, width: '70%', backgroundColor: 'grey', borderRadius: 10}}/>

            <View style={{flexDirection: 'row'}}> 
                <TouchableOpacity style={{marginTop: 15, marginRight: 50}} onPress={() => navigation.navigate('Desc', {id: 0, score: strikeScore})}>
                    <Text style={{ color: strikeScore === 1? 'green' : 'red'}}>Foot Strike Pattern</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 15}} onPress={() => navigation.navigate('Desc', {id: 3, score: cadenceScore})}>
                    <Text style={{ color: cadenceScore === 1? 'green' : 'red'}}>Cadence</Text>
                </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row'}}> 
                <TouchableOpacity style={{marginTop: 15, marginRight: 50}} onPress={() => navigation.navigate('Desc', {id: 4, score: headScore})}>
                    <Text style={{ color: headScore === 1? 'green' : 'red'}}>Head Position</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 15}} onPress={() => navigation.navigate('Desc', {id: 5, score: shoulderScore})}>
                    <Text style={{ color: shoulderScore === 1? 'green' : 'red'}}>Shoulder Position</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Main;
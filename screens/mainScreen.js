import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

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
        <View style={styles.container}>

            <Image source={require('../assets/background.jpg')} style={styles.background}/>

            <TouchableOpacity 
                onPress={() => navigation.navigate('Cam', {strikeScore, cadenceScore, headScore, shoulderScore, onGoBack: handleUpdate})}
                style={styles.camButton}
            >
                <Image source={require('../assets/camera.png')} style={styles.camIcon}/>
                <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Open Camera</Text>
            </TouchableOpacity>

            <View style={styles.separator}/>

            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column', marginRight: 40}}>
                    <TouchableOpacity style={{marginTop: 15}} onPress={() => navigation.navigate('Desc', {id: 0, score: strikeScore})}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'left', color: strikeScore === 1? 'lime' : 'orange' }}>Foot Strike Pattern</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop: 15}} onPress={() => navigation.navigate('Desc', {id: 4, score: headScore})}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'left', color: headScore === 1? 'lime' : 'orange' }}>Head Position</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={{marginTop: 15}} onPress={() => navigation.navigate('Desc', {id: 3, score: cadenceScore})}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'right', color: cadenceScore === 1? 'lime' : 'orange' }}>Cadence</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{marginTop: 15}} onPress={() => navigation.navigate('Desc', {id: 5, score: shoulderScore})}>
                        <Text style={{ fontWeight: 'bold', textAlign: 'right', color: shoulderScore === 1? 'lime' : 'orange' }}>Shoulder Position</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems:'center', 
        justifyContent:'center'
    },
    background: {
        position: 'absolute', 
        width: '100%', 
        height: '100%'
    },
    camButton: {
        backgroundColor: 'orange', 
        width: 250, 
        height: 90, 
        borderRadius: 7
    },
    camIcon: {
        alignSelf: 'center', 
        marginBottom: 5, 
        marginTop: 13, 
        width: 40, 
        height: 40
    },
    separator: {
        marginTop: 15, 
        height:3, 
        width: '70%', 
        backgroundColor: 'midnightblue', 
        borderRadius: 10
    }
})

export default Main;
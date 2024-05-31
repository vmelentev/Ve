import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
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
        <View style={styles.container}>

            <Image source={require('../assets/background.jpg')} style={styles.backgroundImage}/>

            <TouchableOpacity style={{paddingRight: 360}} onPress={() => navigation.goBack()}>
                <Image style={{width:20, height:20}} source={require('../assets/backArrow.png')}/>
            </TouchableOpacity>

            <Text style={styles.titleText}>{attribute}</Text>
            <View style={styles.separator}/>
            <Text style={styles.text}>{description}</Text>
            <Text style={styles.text}>{assessment}</Text>
        </View>
    )
}

styles = StyleSheet.create ({
    container: {
        flex: 1, 
        alignItems:'center', 
        paddingTop:60
    },
    backgroundImage: {
        position: 'absolute', 
        width: '100%', 
        height: '100%'
    }, 
    titleText: {
        marginTop: 30, 
        paddingLeft:25, 
        paddingRight:25,
        fontWeight: 'bold',
        fontSize: 42
    },
    text: {
        marginTop: 25, 
        paddingLeft:25, 
        paddingRight:25,
        fontWeight: 'bold',
        alignSelf: 'left'
    },
    separator: {
        marginTop: 20, 
        height:3, 
        width: '90%', 
        backgroundColor: 'midnightblue', 
        borderRadius: 10
    }
})

export default Desc;
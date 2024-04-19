import 'react-native-gesture-handler';
import React from 'react';
import TextInputContainer from './TextInput.js';
import {Image, View, TextInput, StyleSheet, TouchableOpacity,Text } from 'react-native';


const RoutePanel = () => {
  return (
    <View style={styles.container}> 
      <View style ={styles.leftPanel}>
        <View style = {styles.routeIcons}>
          <Image source={require('../img/walk.png')}  style={styles.icon} />
          <Image source={require('../img/bus.png')}  style={styles.icon}/>
          <Image source={require('../img/bus.png')}  style={styles.icon}/>
        </View>
        <View style={styles.routeInfo}>
          <Text style={styles.routeText}>8:28pm - 10:29pm | Cost: 45Rs</Text>
          <Text style={styles.routeText}>Chittetukara Rajagiri  -  Kakkanad civil station </Text>
        </View>
      </View>
      <View style ={styles.rightPanel}>
        <Text style={styles.routeTime}> 2h 1 min</Text>
        <View style={styles.startButtoncontainer}> 
          <TouchableOpacity onPress={() => {}} style={styles.startButton}>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFC75B',
    borderRadius: 25,
    height:'9%',
    width: '94%',
    marginTop:10,
    marginBottom:10,
  },
  startButtoncontainer:{
    position:'relative',
  },
  startButton:{
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 10,
    marginTop:'8%',
  },
  startButtonText:{},
  leftPanel:{
    flexDirection: 'column',
    alignItems: 'center',
  },
  routeIcons:{
    flexDirection:'row',
    paddingLeft:'0%',
    paddingTop:'12%',
    marginBottom:'0%',
  },
  rightPanel:{
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '7%',
    marginRight: '3%',
  },
  routeTime:{
    fontSize:22,
  },
  routeText: {
    fontSize: 10, // Adjust the font size as needed
    marginTop:'5%', // Adjust the top margin to move the text lower
    marginLeft:'5%'
  },
  icon: {
    height:22,
    width:22,
    paddingRight:75,
    resizeMode: 'contain',
  },
});

export default RoutePanel;

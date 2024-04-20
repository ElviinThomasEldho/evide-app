import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const RoutePanel = ({ startButtonColor, startButtonTextColor }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.65 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: '6%', marginTop: '5%', marginBottom: '5%' }}>
          <Image source={require('../img/walk.png')} style={styles.icon} />
          <Image source={require('../img/bus.png')} style={styles.icon} />
          <Image source={require('../img/bus.png')} style={styles.icon} />
        </View>
        <View>
          <Text style={styles.routeText}>8:28pm - 10:29pm | Cost: 45Rs</Text>
          <Text style={styles.routeText}>Chittetukara Rajagiri  -  Kakkanad civil station </Text>
        </View>
      </View>
      <View style={{ flex: 0.35, justifyContent: 'center', alignItems: 'center',borderLeftColor:'#dddddd',borderLeftWidth:1.2}}>
        <Text style={styles.routeTime}> 2h 1 min</Text>
        <View style={styles.startButtonContainer}>
          <TouchableOpacity onPress={() => {}} style={[styles.startButton, { backgroundColor: startButtonColor }]}>
            <Text style={[styles.startButtonText, { color: startButtonTextColor }]}>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 110,
    width: '90%',
    marginLeft: '5%',
    marginTop: 15,
    borderWidth: 1.2,
    borderColor: 'black',
    borderRadius: 25,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  startButtonContainer: {},
  startButton: {
    paddingVertical: '5%',
    paddingHorizontal: '17%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {},
  routeIcons: {
    flexDirection: 'row',
    paddingLeft: '0%',
    paddingTop: '12%',
    marginBottom: '0%',
  },
  routeTime: {
    fontSize: 22,
  },
  routeText: {
    fontSize: 10,
    marginTop: '2%',
    marginLeft: '5%',
  },
  icon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
});

export default RoutePanel;

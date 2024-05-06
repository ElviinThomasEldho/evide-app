import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity , Dimensions} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import TextInputContainer from '../components/TextInput.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];

const RouteDetailsScreen = ({ navigation }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const data =[
    {
      label:'Your Location',
      status:'Walk 17 minutes', 
      dateTime: '8:28pm'
    },
    {
      label:'Chittethukara Rajagiri',
      status:'Irumbpanam Puthiya Road\nThripunithira Bus stand\nRide 10 stops',
      dateTime: 'Sat, 4rd Nov 11:50pm'
    },
    {
      label:'PipeLine Junction',
      status:'Walk 2 min (80m), then wait for\n upto 6 mins',
      dateTime: '8:55pm'
    },
    {
      label:'PipeLine Junction',
      status:'North Paravur Bus stand\nScheduled 8:28pm',
      dateTime: 'Ride 7 stops (10min)'
    },
    {
      label:'KMK Junction',
      status:'your order has been placed',
      dateTime: 'Ride 7 stops (10min)'
    },
];

  return (
    <View style={styles.container}>
       <TextInputContainer navigation={navigation}/>
       <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style = {styles.indicatorContainer}>
          <StepIndicator
            customStyles={customStyles}
            currentPosition ={currentPosition}
            labels={labels}
            direction='vertical'
            renderLabel={({position,stepStatus,label,crntPosition}) => {
              return(
                <View style = {styles.labelContainer}>
                  <Text style = {styles.labelText}>{data[position].label}</Text>
                  <Text style = {styles.status}>{data[position].status}</Text>
                  <Text style = {styles.status}>{data[position].dateTime}</Text>
                </View>
              )
            }}
          />

        </View>
      </ScrollView>
      <TouchableOpacity style={styles.goButtonContainer} >
        <View style={styles.goButton}>
          <Text style={styles.goButtonText}>Gfffffffffo</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    width: windowWidth,
    minHeight: windowHeight, // Ensure the content fills the entire viewport height
    alignItems: 'start',
  },
  indicatorContainer:{
    paddingLeft: '8%',
  
  },
  labelContainer:{
    flexDirection:'column',
    alignItems:'flex-start',
    marginTop:30,

  },
  labelText:{
    textAlign:'left',
  },
});

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}

export default RouteDetailsScreen;

import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, Image,TouchableOpacity} from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Category from './Explore/Category.js'
import RoutePanel from './RoutePanel.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const BottomSheet2 = ({navigation}) => {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ['25%', '50%', '78%'];
  bottomSheetModalRef.current?.present();
  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  const handleContentPanning = useCallback((event, gestureState, fromIndex, toIndex) => {
    // Prevent the modal from going below 25%
    if (toIndex < 0) {
      return false;
    }
    return true;
  }, []);

  return (
        <View style={styles.container}>
          <View style={styles.modalButtonContainer}>
            <Button title='Explore' onPress={handlePresentModal} />
          </View>
          <View style = {styles.BottomSheetContainer}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={2}
            snapPoints={snapPoints}
            enableContentPanning={handleContentPanning} // Apply the custom content panning handler
          >
            <View style={{ height:'100%', marginTop: '1%' ,position:'relative'}}>
          
              <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                style = {{}}
                contentContainerStyle={{justifyContent:'flex-start'}}
              >
                <View style={styles.routeTextContainer}>
                    <Text style={styles.routeText}>Reccomnded Route</Text>
                </View>
                <RoutePanel startButtonColor="#FFC75B" startButtonTextColor="black" />
                <View style={styles.routeTextContainer}>
                    <Text style={styles.routeText}>More Routes</Text>
                </View>
                <RoutePanel startButtonColor="#0074CB" startButtonTextColor="white" />
                <RoutePanel startButtonColor="#0074CB" startButtonTextColor="white" />
                <RoutePanel startButtonColor="#0074CB" startButtonTextColor="white" />
                <RoutePanel startButtonColor="#0074CB" startButtonTextColor="white" />
                <RoutePanel startButtonColor="#0074CB" startButtonTextColor="white" />
                <RoutePanel startButtonColor="#0074CB" startButtonTextColor="white" />
              </ScrollView>
              <TouchableOpacity style={styles.selectContainer} >
                <View style={styles.selectButton}>
                   <Text style={styles.selectText}>Select Route</Text>
                </View>
              </TouchableOpacity>
            </View>
    
          </BottomSheetModal>
          </View>
        </View>

  );
}

export default BottomSheet2;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonContainer: {
    top:windowHeight * 0.6, // Adjust the margin bottom to position the button lower
    backgroundColor:'white',
    borderRadius:30,
    borderColor:'black',
    borderWidth:1,
    paddingHorizontal:20,

  },
  exploreContainer: {
    flex:1,
    paddingTop:20,
    paddingHorizontal:35,
  },
  textLabel: {
    marginLeft: 20,
  },
  routeTextContainer:{
    marginLeft:'6%',
    marginTop:'2%',
  },
  routeText:{
    fontWeight:'600',
    fontSize:13,
  },
  filterText:{
    fontSize:15,
    fontWeight:'600',
    marginLeft:'10%',
    marginTop:'3%',
  },
  BottomSheetContainer:{

  },
  selectContainer:{
    position: 'absolute',
    bottom: windowHeight * 0.06, // Adjust the button position as needed
    alignItems: 'center',
    alignSelf:'center',
    elevation: 2, // Increase elevation for shadow effect
    shadowColor: 'black', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.7, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
  },
  selectButton:{
    backgroundColor: '#15C679',
    borderRadius: 20, // Adjust border radius as needed
    paddingHorizontal: '25%',
    paddingVertical: '5%',
  },
  selectText:{
    fontWeight:'600',
    color:'white',
  }
});

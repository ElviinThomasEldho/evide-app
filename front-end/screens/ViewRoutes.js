import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import TextInputContainer from '../components/TextInput.js';
import RoutePanel from '../components/RoutePanel.js';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ViewRoutes = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TextInputContainer navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <Text style={styles.sectionText}>Recommended Routes</Text>
        <RoutePanel />
        <Text style={styles.sectionText}>More Routes</Text>
        <RoutePanel />
        <RoutePanel />
        <RoutePanel />
        <RoutePanel />
        <RoutePanel />
        <RoutePanel />
        <RoutePanel />
        <RoutePanel />
        <RoutePanel />
        <RoutePanel />
      </ScrollView>
    </View>
  );
};

export default ViewRoutes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    width: windowWidth,
    minHeight: windowHeight, // Ensure the content fills the entire viewport height
    paddingLeft:'5%',
  },
  scrollView: {
    width: '100%',
    flex: 1,
  },
  sectionText: {
    paddingTop:'3%',
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 3, // Adjust spacing as needed
  },
});

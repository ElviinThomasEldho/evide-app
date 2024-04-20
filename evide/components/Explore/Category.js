import { View, Text, StyleSheet, Button, Dimensions, Image} from 'react-native';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const Category = ({name, imageUri}) =>{
    return(
        <View style={{height:130, width:130,marginLeft:20,marginTop:15, borderWidth:0.5,borderColor:'#dddddd',borderRadius:10}}>
            <View style ={{flex:2}}>
                <Image source ={imageUri} style={{flex:1,resizeMode:'cover',height:null,width:null}}/>
            </View>
            <View style ={{flex:1,paddingLeft:'5%',paddingTop:'5%'}}>
                    <Text>{name}</Text>
            </View>
        </View>
    );


};

export default Category;
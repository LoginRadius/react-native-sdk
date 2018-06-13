import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button,
    TextInput,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { blue } from 'ansi-colors';
import { StackNavigator } from 'react-navigation';
import LoginRadiusSDK from '../LoginRadiusSDK';


const ProfileScreen = props => {
   const profile = props.navigation.getParam('profile', 'no-profile');
   var obj = JSON.parse(profile);
   if(obj.hasOwnProperty('Profile')){
       obj =  obj.Profile
   }

      return (
 
        <ScrollView style={{padding:5}}>
        <Text style={{fontSize:25,color:"#000"}}>Welcome {obj.FirstName}</Text>
        <Text style={{fontSize:20}}>FirstName: {obj.FirstName}</Text>
        <Text style={{fontSize:20}}>LastName: {obj.LastName}</Text>
        <Text style={{fontSize:20}}>Email: {obj.Email[0].Value}</Text>
        <Text style={{fontSize:20}}>BirthDate: {obj.BirthDate}</Text>
        <Text style={{fontSize:20}}>Gender: {obj.Gender}</Text>
        <Text style={{fontSize:20}}>Uid : {obj.Uid}</Text>
        <Button 
                    onPress={() => {
                      props.navigation.goBack();
                      }}
                    title="Logout"
             />
        </ScrollView>
      );
    }
    
   

  
  
  
 
  ProfileScreen.navigationOptions = {
    title: "Profile",
    headerLeft: null,headerStyle: {backgroundColor: "#337ab7",height:40}, headerTintColor: "#fff",  flex:1 ,headerTitleStyle: { fontFamily: "Montserrat-Regular", fontSize:20,fontWeight: "normal", justifyContent: "center", alignSelf: "center", textAlign:"center",  width: "65%"  }
  };
  
  export default ProfileScreen;
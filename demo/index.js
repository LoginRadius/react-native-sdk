import { AppRegistry  } from 'react-native';

//import demo from './index.android';
import React, { Component } from 'react';

import ProfileScreen from './src/ProfileScreen';
import RegisterScreen from './src/RegisterScreen';
import ForgotPasswordScreen from './src/ForgotPasswordScreen';
import { StackNavigator } from 'react-navigation';
import App from "./src/App";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TextInput,
    WebView
  } from 'react-native';

const reactNavigationSample = props => {
  return <App navigation={props.navigation} />;
};

reactNavigationSample.navigationOptions = {
    title: "LoginRadius", headerStyle: {backgroundColor: "#337ab7",height:40}, headerTintColor: "#fff",  flex:1 ,headerTitleStyle: { fontFamily: "Montserrat-Regular", fontSize:20,fontWeight: "normal", justifyContent: "center", alignSelf: "center", textAlign:"center",  width: "65%"  }
 
};

const SimpleApp = StackNavigator({
  Home: { screen: reactNavigationSample },
  RegisterScreen: { screen: RegisterScreen, title: "Register" },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen, title: "ForgotPasswordScreen" },
  ProfileScreen: { screen: ProfileScreen, title: "ProfileScreen" }
});



//AppRegistry.registerComponent(App , () => App );

AppRegistry.registerComponent('demo', () => SimpleApp);

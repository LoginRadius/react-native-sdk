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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    }
   
  })

const RegisterScreen = () => {
    state = {
        firstname:'',
        lastname:'',
        email: '',
        password: '',
        cpassword: ''
    };
    function giriraj(){
        alert("dfdfd");
          };

    return (
        <ScrollView style={{padding: 20}}>
        <TextInput placeholder='First Name' 
         onChangeText={(firstname) => this.state.firstname = firstname} />
        <TextInput placeholder='Last Name'
           onChangeText={(lastname) => this.state.lastname = lastname} />
        <TextInput placeholder='Email'
           onChangeText={(email) => this.state.email = email} />
        <TextInput placeholder='Password'
        secureTextEntry={true}
        onChangeText={(password) => this.state.password = password}
         />
        <TextInput placeholder='Confirm Password'
         secureTextEntry={true}
         onChangeText={(cpassword) => this.state.cpassword = cpassword} />
        <View style={{margin:7}} />
    
        <Button
                    onPress={() => {
                        if (this.state.email.trim() === "") {
                          alert("email and password is Requred");
                        } else if (this.state.password.trim() === ""){
                          alert("email and password is Requred");
                        }else if(this.state.password.trim() != this.state.cpassword.trim()){
                            alert("password and confirm password not match");
                        }else{
                            
                            let payload = {
                                "FirstName": "Test",
                                "LastName": "Account",
                                "Email": [
                                  {
                                    "Type": "Primary",
                                    "Value": this.state.email
                                  }
                                ],
                                "Password": this.state.password
                              }
                              
                              
                              LoginRadiusSDK.userRegistrationByEmail("", payload, function (handle) {
                                // process returned object
                              
                                var data =JSON.parse(handle);
                                if(data.ErrorCode){
                                  alert(data.Description);
                                }else{
                                  alert("You have been successfully registered please go back and verify your email")
                                }
                              });
                        }
                      }}
                    title="Register"
             />
        </ScrollView>
    );
   
  };
  
  
 
  RegisterScreen.navigationOptions = {
    title: "Registration",
	 headerTitleStyle: {color:'white'},
    headerStyle: {backgroundColor:'#337ab7'},
    headerTintColor: 'white'
  };
  
  export default RegisterScreen;
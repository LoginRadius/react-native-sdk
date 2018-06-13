import React, { Component } from "react";
import { StyleSheet, Text, Button, View,YellowBox ,Platform, ScrollView,TextInput} from "react-native";
import { StackNavigator } from "react-navigation";
import { blue } from 'ansi-colors';
import LoginRadiusSDK from '../LoginRadiusSDK';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  LoginManager,
  AccessToken
} = FBSDK;

import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated in plain JavaScript React classes.'
]);

const instructions = Platform.select({
  ios: {

  },
  android: {top: 54,
  }
});


export default class App extends Component {

  componentDidMount() {
    this._setupGoogleSignin();
  }

    state = {
      email: '',
      password: ''
  };

  render = () => {
    const { navigation } = this.props;

      return (
          <View style={{ flex:1}}>
          
          <ScrollView style={styles.buttonContainer}>
    <View style={styles.borderStyle}>
    <LoginButton style={{ width: 225, height: 33 }}
      //  publishPermissions={["public_profile"]}
        logInWithReadPermissions = {["public_profile"]}
        onLoginFinished={
          (error, result) => {
            if (error) {
              alert("login has error: " + result.error);
            } else if (result.isCancelled) {
              alert("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  LoginRadiusSDK.facebookNativeLogin(data.accessToken.toString(), function (handle) {
                    var token =JSON.parse(handle);
                    LoginRadiusSDK.readAllProfilesByToken(token.access_token, function (res) {
                     
                      navigation.navigate("ProfileScreen",{
                        profile: res
                      })
                   
                    });
                });
                 
                }
              )
            }
          }
        }
        onLogoutFinished={() => alert("logout.")}/>
         </View>
         <View style={styles.borderStyle}>
      <GoogleSigninButton  style={{ width: 230, height: 37 }} color={GoogleSigninButton.Color.Light} size={GoogleSigninButton.Size.Icon} onPress={() => {_signIn(); }} />
      </View>
      <View style={{marginTop:10,justifyContent: 'center',alignItems: 'center',}}>
                   <Text style={{color:blue}} onPress={this.girir}>
                   ________________or________________             
                  
                  </Text>
                  </View>
              <TextInput placeholder='email'
               onChangeText={(email) => this.state.email = email}
               />
              <TextInput placeholder='Password' 
              secureTextEntry={true}
             onChangeText={(password) => this.state.password = password}
              />
             
              <View style={{margin:7}} />
              <Button
                      onPress={() => {
                        if (this.state.email.trim() === "") {
                          alert("email and password is Requred");
                        } else if (this.state.password.trim() === ""){
                          alert("email and password is Requred");
                        }else{
                         
                          let payload = {
                            "email": this.state.email,
                            "password": this.state.password
                          }
                          LoginRadiusSDK.loginByEmail("","", payload, function (handle) {
                            // process returned object
                             var data =JSON.parse(handle);
                            if(data.ErrorCode){
                             // this.toggleImage
                            
                              alert(data.Description);
                            }else{
                              navigation.navigate("ProfileScreen",{
                                profile:handle
                
                              })
                            }
                          });
                        }
                      }}
                      title="Submit"
                  />
                   <View style={{marginTop:10,flexDirection: 'row',justifyContent: 'space-between'}}>
                   <Text style={{fontWeight: 'bold',textDecorationLine: 'underline'}} onPress={() =>navigation.navigate("RegisterScreen")}>
                   Register                         
                  
                  </Text>
                  <Text style={{fontWeight: 'bold',textDecorationLine: 'underline'}} onPress={() => navigation.navigate("ForgotPasswordScreen")}>
                   Forgot Password?
                  </Text>
               </View>
              </ScrollView>
              </View>
          )

      function  _signIn() {
            GoogleSignin.signIn()
              .then((user) => {
                LoginRadiusSDK.GoogleJWT(user.idToken, function (handle) {
                  var token =JSON.parse(handle);
                  LoginRadiusSDK.readAllProfilesByToken(token.access_token, function (res) {
                   
                    navigation.navigate("ProfileScreen",{
                      profile: res
                    })
                 
                  });
                });
               
              })
              .catch((err) => {
                alert(err);
                console.log('WRONG SIGNIN', err);
              })
              .done();
          }
        
        }

          async _setupGoogleSignin() {
            try {
              await GoogleSignin.hasPlayServices({ autoResolve: true });
              await GoogleSignin.configure({
                webClientId: '<Put your google WebClientId>',
                offlineAccess: false
              });
        
              const user = await GoogleSignin.currentUserAsync();
              console.log(user);
              this.setState({ user });
            }
            catch (err) {
              alert(err.message)
              console.log("Play services error", err.code, err.message);
            }
          }
        
         
          _signOut() {
            GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
              this.setState({ user: null });
            })
              .done();
          }

          
        }
      



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 33, 
    backgroundColor: '#337ab7',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },buttonContainer: {
    marginRight :15,
    marginLeft :15
   
    
  },borderStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:15
   
  }
});








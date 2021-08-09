import React, { useState } from 'react'
import { TouchableOpacity,SafeAreaView, StyleSheet, View,StatusBar ,ScrollView} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'

import Button from '../components/Button'
import TextInput from '../components/TextInput'


import { passwordValidator } from '../helpers/passwordValidator'
import { confirmPasswordValidator } from '../helpers/confirmPasswordValidator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function ChangePassword({ navigation }) {
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
  const [changePasswordButtonValue, setChangePasswordButtonValue] = useState('Save')
  const [passwordChangeError, setLoginAuthError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  
  
  //$2y$10$nadoL4adU/OcHe6aKRXLqejnUak2lQcvRANdg0xazZXXX0mRy7QHq

  const onLoginPressed = async () => {

    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = confirmPasswordValidator(confirmPassword.value,password.value);
    if (passwordError || confirmPasswordError) {
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError })
      setPassword({ ...password, error: passwordError })
      return
    }

     const jsonValue = await AsyncStorage.getItem('@userSessionData');

     let userSesDetails=JSON.parse(jsonValue);
     //alert(userSesDetails.id);

     
     const params = JSON.stringify({
      "user_id":userSesDetails.id,
      "password": password.value
      });
      setChangePasswordButtonValue('Processing...');



      axios.post("https://viewongoingprojects.com/jsd-inv/Webeservices/changePassword", params,{

        "headers": {
        "content-type": "application/json",
        },
        
        })
        .then(function(response) {
         // alert("ok..");
         
          if(response.data.success==1)
          {
              passwordCallBack(response.data.data);
              setChangePasswordButtonValue('Save');
              setLoginAuthError('');
              setPassword({ value: '', error: '' });
              setConfirmPassword({ value: '', error: '' });
              setPasswordSuccess(response.data.message);
          }
          else
          {
              setChangePasswordButtonValue('Save');
              setLoginAuthError(response.data.errors);
              //alert("login failed");
          }
        }).catch(function(error) {
        console.log(error);
        });


  }

  const passwordCallBack = async (resp) =>
	{
   
  }

  return (
    <ScrollView style={styles.container}>
    <Background>

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TextInput
        label="Confirm Password"
        returnKeyType="done"
        value={confirmPassword.value}
        onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
        error={!!confirmPassword.error}
        errorText={confirmPassword.error}
        secureTextEntry
      />
      
      <Button mode="contained" onPress={onLoginPressed}>
        {changePasswordButtonValue}
      </Button>
      <Text style={styles.forgot}>{passwordChangeError}</Text>
      <Text style={styles.forgot}>{passwordSuccess}</Text>
    </Background>
    </ScrollView>
    
    
  )
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	marginTop: StatusBar.currentHeight || 0,
  }
  
})


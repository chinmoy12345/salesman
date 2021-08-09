import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import { StyleSheet,StatusBar} from 'react-native'
import { Text} from 'react-native-paper'
import axios from 'axios';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [sendingInstruction, setSendingInstruction] = useState("Send Instructions");
  const [resetPasswordError,setResetPasswordError] = useState("");

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }

    
    const params = JSON.stringify({
      "email": email.value
      });
      setSendingInstruction('Processing...');

      axios.post("https://viewongoingprojects.com/jsd-inv/Webeservices/resetPassword", params,{

        "headers": {
        "content-type": "application/json",
        },
        
        })
        .then(function(response) {
         // alert("ok..");
          if(response.data.success==1)
          {
              setSendingInstruction('Send Instructions');
              setResetPasswordError(response.data.msg);
              setEmail({ value: '', error: '' });
          }
          else
          {
            setSendingInstruction('Send Instructions');
            setResetPasswordError(response.data.errors);
            setEmail({ value: '', error: '' });
              //alert("login failed");
          }
        }).catch(function(error) {
        console.log(error);
        });
        //navigation.navigate('LoginScreen')
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."
      />

      
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
       {sendingInstruction}
      </Button>
      <Text style={styles.forgot}>{resetPasswordError}</Text>
    </Background>
  )
}


const styles = StyleSheet.create({
  container: {
	flex: 1,
	marginTop: StatusBar.currentHeight || 0,
  }
  
})

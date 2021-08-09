import React, { useState,useEffect } from 'react'
import { TouchableOpacity,SafeAreaView, StyleSheet, View,StatusBar ,ScrollView,ActivityIndicator} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  
  const [password, setPassword] = useState({ value: '', error: '' })
  const [userSesData, setUserSesData] = useState({})
  const [loginButtonValue, setLoginButtonValue] = useState('Login')
  const [loginAuthError, setLoginAuthError] = useState('')
  const [pageActivityLoading, setPageActivityLoading] = useState(true)
  useEffect(() => {
    async function fetchMyAPI() {

      let isloggedIn = await AsyncStorage.getItem('@isloggedIn')
     // alert(isloggedIn);
      if(isloggedIn)
      {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      }
      else
      {
        setPageActivityLoading(false);
      }
    }

    fetchMyAPI()
  }, [])


  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

     const params = JSON.stringify({
      "email": email.value,
      "password": password.value,
      });
      setLoginButtonValue('Login...');


      axios.post("https://viewongoingprojects.com/jsd-inv/Webeservices/login", params,{

        "headers": {
        "content-type": "application/json",
        },
        
        })
        .then(function(response) {
         // alert("ok..");
         
          if(response.data.success==1)
          {
            loginCallBack(response.data.data);
            setLoginButtonValue('Login Success');
            setLoginAuthError('');
          }
          else
          {
            setLoginButtonValue('Login');
            setLoginAuthError(response.data.errors);
            //alert("login failed");
          }
          //let userSessionData=await AsyncStorage.setItem('@userSessionData', JSON.stringify(response));
          
        }).catch(function(error) {
        console.log(error);
        });
  }

  const loginCallBack = async (resp) =>
	{
    //alert(JSON.stringify(resp));
    try {
      let userSessionData=await AsyncStorage.setItem('@userSessionData', JSON.stringify(resp));
      console.log(userSessionData);
      let islogedIn=await AsyncStorage.setItem('@isloggedIn', JSON.stringify(true));
      console.log(islogedIn);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      {pageActivityLoading ? (
					<View style={[styles.centerElement, {height: 300}]}>
						<ActivityIndicator size="large" color="green" />
					</View>
				) : (
    <Background>
      
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.forgot}>{loginAuthError}</Text>
      <Button mode="contained" onPress={onLoginPressed}>
        {loginButtonValue}
      </Button>
     
    </Background>
    )}
    </SafeAreaView>
    
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 0
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  }
})

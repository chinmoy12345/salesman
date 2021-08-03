import React, { useState } from 'react'
import { TouchableOpacity,SafeAreaView, StyleSheet, View,StatusBar ,ScrollView} from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { nameValidator } from '../helpers/nameValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function CustomerScreen({ navigation }) {

  const [customerName, setCustomerName] = useState({ value: '', error: '' })
  const [customerEmail, setCustomerEmail] = useState({ value: '', error: '' })
  const [customerPhone, setCustomerPhone] = useState({ value: '', error: '' })
  const [customerPincode, setCustomerPincode] = useState({ value: '', error: '' })
  const [customerAddress, setCustomerAddress] = useState({ value: '', error: '' })
  const [customerAddressLine2, setCustomerAddressLine2] = useState({ value: '', error: '' })
  const [customerState, setCustomerState] = useState({ value: '', error: '' })
  const [customerCiy, setCustomerCiy] = useState({ value: '', error: '' })
  const [customerCountry, setCustomerCountry] = useState({ value: '', error: '' })
  const [checkoutSuccess, setCheckoutSuccess] = useState({ bill_no: '', msg: '' })
  const [placeOrderButtomValue, setPlaceOrderButtomValue] = useState('PLACE ORDER')

  
  
  const onCheckoutPressed = async () => {
    
    
    const nameError = nameValidator(customerName.value)
    const emailError = nameValidator(customerEmail.value)
    const phoneError = nameValidator(customerPhone.value)
    const pincodeError = nameValidator(customerPincode.value)
    const addressError = nameValidator(customerAddress.value)
    const stateError = nameValidator(customerState.value)
    const cityError = nameValidator(customerCiy.value)
    const countryError = nameValidator(customerCountry.value)

    if ( nameError || emailError || phoneError || pincodeError || addressError || stateError || cityError  || countryError) {
     // setEmail({ ...email, error: emailError })
     
      setCustomerName({ ...customerName, error: nameError })
      setCustomerEmail({ ...customerEmail, error: emailError })
      setCustomerPhone({ ...customerPhone, error: phoneError })
      setCustomerPincode({ ...customerPincode, error: pincodeError })
      setCustomerAddress({ ...customerAddress, error: addressError })
      setCustomerState({ ...customerState, error: stateError })
      setCustomerCiy({ ...cityError, error: cityError })
      setCustomerCountry({ ...customerCountry, error: countryError })


      return
    }

    const jsonValue = await AsyncStorage.getItem('@cartSessionData')
   // alert(jsonValue);
    const params = JSON.stringify({
      "user_id":1,
      "customer_name": customerName.value,
      "customer_email": customerEmail.value,
      "customer_phone": customerPhone.value,
      "customer_pincode": customerPincode.value,
      "customer_address": customerAddress.value,
      "customer_address_line_2": customerAddressLine2.value,
      "customer_state": customerState.value,
      "customer_ciy": customerCiy.value,
      "customer_country": customerCountry.value,
      "cartItems":JSON.parse(jsonValue)
     
      });
      setPlaceOrderButtomValue('PLACE ORDER...');
        axios.post("https://viewongoingprojects.com/jsd-inv/Webeservices/checkout", params,{

        "headers": {
        "content-type": "application/json",
        },
        
        })
        .then(function(response) {
         // alert("ok..");
         
          //alert(JSON.stringify(response.data));
          if(response.data.success==1)
          {
            checkoutCallBack(response.data);
          }
          else
          {
            alert(response.data.errors);
          }
          //let userSessionData=await AsyncStorage.setItem('@userSessionData', JSON.stringify(response));
          
        }).catch(function(error) {
            console.log(error);
        });


        const checkoutCallBack = async (resp) =>
        {
          try
          {
            setCheckoutSuccess({ bill_no: resp.bill_no, msg: resp.msg });
            let cartItemSes=await AsyncStorage.setItem('@checkoutSuccessSesData', JSON.stringify(resp));
            console.log(cartItemSes);
           // navigation.navigate('Success');

            navigation.reset({
              index: 0,
              routes: [{ name: 'Success' }],
            })
          } catch(err){
            console.log(err);
          }
        }
  }

  return (
    <ScrollView style={styles.container}>
		<Background>
      <Header>Customer</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={customerName.value}
        onChangeText={(text) => setCustomerName({ value: text, error: '' })}
        error={!!customerName.error}
        errorText={customerName.error}
        autoCapitalize="none"
      />

<TextInput
        label="Email"
        returnKeyType="next"
        value={customerEmail.value}
        onChangeText={(text) =>setCustomerEmail({ value: text, error: '' })}
        error={!!customerEmail.error}
        errorText={customerEmail.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

<TextInput
        label="Mobile"
        returnKeyType="next"
        value={customerPhone.value}
        onChangeText={(text) =>setCustomerPhone({ value: text, error: '' })}
        error={!!customerPhone.error}
        errorText={customerPhone.error}
       
      />
      <TextInput
        label="Pincode"
        returnKeyType="next"
        value={customerPincode.value}
        onChangeText={(text) => setCustomerPincode({ value: text, error: '' })}
        error={!!customerPincode.error}
        errorText={customerPincode.error}
        
      />


	  
<TextInput
        label="Address line 1"
        returnKeyType="next"
        value={customerAddress.value}
        onChangeText={(text) => setCustomerAddress({ value: text, error: '' })}
        error={!!customerAddress.error}
        errorText={customerAddress.error}
      
      />

<TextInput
        label="Address line 2 (optional)"
        returnKeyType="next"
        value={customerAddressLine2.value}
        onChangeText={(text) => setCustomerAddressLine2({ value: text, error: '' })}
        error={!!customerAddressLine2.error}
        errorText={customerAddressLine2.error}
      
      />

<TextInput
        label="State"
        returnKeyType="next"
        value={customerState.value}
        onChangeText={(text) => setCustomerState({ value: text, error: '' })}
        error={!!customerState.error}
        errorText={customerState.error}
        
      />

<TextInput
        label="City"
        returnKeyType="next"
        value={customerCiy.value}
        onChangeText={(text) => setCustomerCiy({ value: text, error: '' })}
        error={!!customerCiy.error}
        errorText={customerCiy.error}
      
      />

<TextInput
        label="Country"
        returnKeyType="next"
        value={customerCountry.value}
        onChangeText={(text) => setCustomerCountry({ value: text, error: '' })}
        error={!!customerCountry.error}
        errorText={customerCountry.error}
      
      />

      <Button mode="contained" onPress={onCheckoutPressed}>
        {placeOrderButtomValue}
      </Button>
	  </Background>
    </ScrollView> 
  )
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	marginTop: StatusBar.currentHeight || 0,
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

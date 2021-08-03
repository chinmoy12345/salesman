// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import React, { useState,useEffect } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const OrderSuccess = ({ navigation }) => {
  const [checkoutSuccess, setCheckoutSuccess] = useState({ bill_no: '', msg: '' })


  useEffect(() => {
    async function fetchMyAPI() {
      const jsonValue = await AsyncStorage.getItem('@checkoutSuccessSesData')
		 // alert(jsonValue);
      setCheckoutSuccess(JSON.parse(jsonValue));
     // let response = await fetch('api/data')
     // response = await response.json()
      //dataSet(response)
    }
    fetchMyAPI()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            {checkoutSuccess.msg}
          </Text>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Order No: {checkoutSuccess.bill_no}
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
            }>
            <Text>Go to Catalog</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
export default OrderSuccess;

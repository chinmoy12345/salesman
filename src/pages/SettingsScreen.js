// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/

import * as React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SettingsScreen = ({ route, navigation }) => {

  const logout = async () => {
    AsyncStorage.clear();
   // navigation.navigate('LoginScreen');
   
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    })
  }
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
            My Account
          </Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ChangePassword')}>
            <Text>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() =>logout()}>
            <Text>Logout</Text>
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
export default SettingsScreen;
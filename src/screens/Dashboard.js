// React Native Bottom Navigation
// https://aboutreact.com/react-native-bottom-navigation/
//https://aboutreact.com/refresh-previous-screen-react-navigation/

import 'react-native-gesture-handler';

import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import DetailsScreen from '../pages/DetailsScreen';
import ProfileScreen from '../pages/ProfileScreen';
import SettingsScreen from '../pages/SettingsScreen';
import HomeScreen from '../pages/HomeScreen';
import Products from '../pages/Products';
import CartScreen from '../pages/CartScreen';
import CustomerScreen from '../pages/CustomerScreen';
import OrderSuccess from '../pages/OrderSuccess';
import MyOrder from '../pages/MyOrder';
import ChangePassword from '../pages/ChangePassword';
import MyOrderDetails from '../pages/MyOrderDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Catalog' }}
      />
      <Stack.Screen
        name="Success"
        component={OrderSuccess}
        options={{ title: 'Success' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Cart' }}
      />
       <Stack.Screen
        name="Customer"
        component={CustomerScreen}
        options={{ title: 'Customer' }}
      />
    </Stack.Navigator>
  );
}


function MyOrderStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="MyOrder"
        component={MyOrder}
        options={{ title: 'My Order' }}
      />

      <Stack.Screen
        name="MyOrderDetails"
        component={MyOrderDetails}
        options={{ title: 'My Order Details' }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: { backgroundColor: '#42f44b' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Setting Page' }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: 'Details Page' }}
      />
       <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: 'Change Password' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile Page' }}
      />
    </Stack.Navigator>
  );
}

function Dashboard() {
  return (
  
      <Tab.Navigator
        initialRouteName="Feed"
        tabBarOptions={{
          activeTintColor: '#42f44b',
        }}>
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Catalog',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="storefront" color={color} size={size} />
            ),
          }}
        />

<Tab.Screen
          name="MyOrderStack"
          component={MyOrderStack}
          options={{
            tabBarLabel: 'My Order',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="sale"
                color={color}
                size={size}
              />
            ),
          }}
        />
		
        <Tab.Screen
          name="SettingsStack"
          component={SettingsStack}
          options={{
            tabBarLabel: 'My Account',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
        
      </Tab.Navigator>
  
  );
}

export default Dashboard;

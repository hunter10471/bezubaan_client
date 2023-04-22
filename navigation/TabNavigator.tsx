import { StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MessagesScreen from '../screens/MessagesScreen';

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerShown:false, tabBarShowLabel:false,tabBarActiveTintColor:'#40B37C'}}>
        <Tab.Screen options={{tabBarIcon:({color, size})=>(<MaterialIcons name='home-filled' color={color} size={30} />)}} name='HomeScreen' component={HomeScreen} />
        <Tab.Screen options={{tabBarIcon:({color, size})=>(<MaterialIcons name='fact-check' color={color} size={30} />)}} name='AppointmentsScreen' component={AppointmentsScreen} />
        <Tab.Screen options={{tabBarIcon:({color, size})=>(<MaterialIcons name='message' color={color} size={30} />)}} name='MessagesScreen' component={MessagesScreen} />
        <Tab.Screen options={{tabBarIcon:({color, size})=>(<MaterialIcons name='account-circle' color={color} size={30} />)}} name='ProfileScreen' component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})
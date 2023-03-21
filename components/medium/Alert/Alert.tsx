import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IAlertProps {
    type: 'error' | 'success';
    text:string;
}

const Alert = ({type,text}:IAlertProps) => {
  return (
    <View className={`w-full ${type === 'error' && 'bg-red-300' }  ${type === 'success' && 'bg-green-300' } my-2 flex-1 flex-row items-center p-3 rounded-lg`}>
    {type === 'error' && <MaterialIcons name='error-outline' size={20} color='red' />}
    {type === 'success' && <MaterialIcons name='check-circle-outline' size={20} color='green' />}
     <Text className={` ml-2 ${type === 'error' && 'text-red-500' }  ${type === 'success' && 'text-green-500' }   font-medium `}>{text}</Text>
     </View>
  )
}

export default Alert

const styles = StyleSheet.create({})
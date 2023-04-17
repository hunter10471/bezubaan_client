import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

interface IQualificationProps {
    title:string;
}


const QualificationLine = ({title}:IQualificationProps) => {
       let [fontsLoaded] = useFonts({
        'poppins-bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
        'poppins-regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'poppins-medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
      })
    if(!fontsLoaded){
        return <AppLoading/>
      }
  return (
    <View className='flex-row items-center mb-2 '>
      <MaterialIcons size={25} color='green' name='check-circle' />
      <Text style={{fontFamily:'poppins-medium'}} className='ml-2 text-gray-700'>{title}</Text>
    </View>
  )
}

export default QualificationLine

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

interface INormalHeadingProps {
    text:string;
    takesHalf?:boolean;
}

const NormalHeading = ({text, takesHalf}:INormalHeadingProps) => {
    let [fontsLoaded] = useFonts({
        'poppins-bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
        'poppins-regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
      })
    if(!fontsLoaded){
        return <AppLoading/>
      }
  return (
      <Text style={{fontFamily:'poppins-bold'}} className={` text-primary text-2xl ${takesHalf && ' w-[50%]' }`}>{text}</Text>
  )
}

export default NormalHeading

const styles = StyleSheet.create({})
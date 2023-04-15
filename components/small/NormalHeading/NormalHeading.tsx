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
        'poppins-medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
      })
    if(!fontsLoaded){
        return <AppLoading/>
      }
  return (
      <Text style={{fontFamily:'poppins-medium'}} className={` text-heading text-xl ${takesHalf && ' w-[50%]' }`}>{text}</Text>
  )
}

export default NormalHeading


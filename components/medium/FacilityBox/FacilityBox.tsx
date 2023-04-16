import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

interface IFacilityBoxProps {
    icon:string;
    name:string;
    unavailable?:boolean;
}

const FacilityBox = ({icon,name,unavailable}:IFacilityBoxProps) => {
       let [fontsLoaded] = useFonts({
            'poppins-medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
            'poppins-regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
         })
          if(!fontsLoaded){
    return <AppLoading/>
            }
  return (
    <View className='w-[100px] items-center'>
    <View className={`p-3 rounded-xl mb-2 ${ unavailable ? 'bg-gray-300' : 'bg-primary'} items-center justify-center w-fit`}>
        <MaterialIcons color={'#fff'} size={35} name={icon} />
    </View>
      <Text style={{fontFamily:'poppins-medium'}} className={`text-center text-sm ${unavailable ? 'text-gray-500' : 'text-black'} `}>{name}</Text>
    </View>
  )
}

export default FacilityBox

const styles = StyleSheet.create({})
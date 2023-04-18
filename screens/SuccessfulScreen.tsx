import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Lottie from 'lottie-react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';


const SuccessfulScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    let [fontsLoaded] = useFonts({
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
  })
  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <SafeAreaView className='bg-white h-full'>
    <View className='h-full items-center justify-center'>
      <Lottie style={{width:200,height:200}} source={require('../assets/images/successful.json')} autoPlay loop duration={4000} />
      <Text style={{fontFamily:'poppins-bold'}} className='text-2xl text-center mt-[-20px] mb-16'>Appointment has been set successfully!</Text>
      <Pressable onPress={()=>navigation.navigate('AppointmentsScreen')} className=' bg-primary border-2 border-primary w-[80%] py-4 px-6 rounded-xl my-2'><Text className='text-center text-white font-bold text-base'>Check my appointments</Text></Pressable>
      <Pressable onPress={()=>navigation.navigate('HomeScreen')} className='border-2 border-primary py-4 px-6 w-[80%] rounded-xl my-2'><Text className='text-center text-primary font-bold text-base'>Back to home</Text></Pressable>
    </View>
    </SafeAreaView>
  )
}

export default SuccessfulScreen

const styles = StyleSheet.create({})
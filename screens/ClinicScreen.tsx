import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../assets/images'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import NormalHeading from '../components/small/NormalHeading/NormalHeading'
import { AirbnbRating } from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ClinicCard from '../components/medium/ClinicCard/ClinicCard'


const ClinicScreen = () => {
    const dimensions = useWindowDimensions();
    let [fontsLoaded] = useFonts({
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
  })
 
  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <SafeAreaView className='relative bg-white'>
        <Image style={{width:dimensions.width,height:dimensions.height/2, position:'absolute'}} source={images.vet1} />
        <View style={{marginTop:dimensions.height/3}} className='bg-white h-full flex-wrap p-4 rounded-xl justify-between flex flex-row relative'>
            <NormalHeading text='Rajput Hospital' takesHalf />
            <AirbnbRating size={20} defaultRating={0} isDisabled showRating={false} />
        <View className='w-full flex-row items-center font-normal mt-1'>
            <MaterialIcons name='location-on' color='#c6c6c6' size={25} />
            <Text className=' text-gray-500 font-semibold'>Karachi</Text>
        </View>
            <Text className='text-lg font-bold text-gray-700 mt-8 mb-6'>Available Doctors</Text>
        <View className='w-full items-center'>
            <ClinicCard name='Rafay' fees='200' image={images.doctor_image} major='Small Animal Medicine' time='9:00 AM - 5:00 PM' certifications={['Trained Physician']} />
            <ClinicCard name='Rafay' fees='200' image={images.doctor_image} major='Small Animal Medicine' time='9:00 AM - 5:00 PM' certifications={['Trained Physician']} />
        </View>
        </View>
    </SafeAreaView>
  )
}

export default ClinicScreen

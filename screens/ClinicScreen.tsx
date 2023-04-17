import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../assets/images'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import NormalHeading from '../components/small/NormalHeading/NormalHeading'
import { AirbnbRating } from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ClinicCard from '../components/medium/ClinicCard/ClinicCard'
import FacilityBox from '../components/small/FacilityBox/FacilityBox'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../interfaces/navigation.interface'
import MapView from 'react-native-maps'


const ClinicScreen = () => {
    const dimensions = useWindowDimensions();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    let [fontsLoaded] = useFonts({
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
  })
 const [mapRegion, setmapRegion] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <SafeAreaView className='h-full relative bg-white'>
         <TouchableOpacity  onPress={() => navigation.goBack()} style={styles.back}><Text> <MaterialIcons color={'#fff'} size={30} name='arrow-back' /> </Text></TouchableOpacity>
        <Image style={{width:dimensions.width,height:dimensions.height/2, position:'absolute'}} source={images.vet1} />
        <ScrollView>
        <View style={{marginTop:dimensions.height/3}} className='bg-white h-full flex-wrap p-4 rounded-xl justify-between flex flex-row relative'>
            <NormalHeading text='Rajput Hospital' takesHalf />
            <TouchableOpacity>
            <AirbnbRating size={20} defaultRating={0} isDisabled showRating={false} />
            <Text className='text-yellow-500 font-medium'>0 Ratings</Text>
            </TouchableOpacity>
        <View className='w-full flex-row items-center font-normal'>
            <MaterialIcons name='location-on' color='#c6c6c6' size={25} />
            <Text className=' text-gray-500 font-semibold'>Karachi</Text>
        </View>
            <Text className='text-lg font-bold text-gray-700 mt-8 mb-6'>Available Facilities</Text>
            <View className='w-full flex-row flex-wrap'>
              <FacilityBox icon='local-hospital' name='Operation Theater' />
              <FacilityBox icon='home-filled' name='Shelter Available' />
              <FacilityBox unavailable icon='toys' name='Pet Accessories' />
            </View>
        <View className='w-full items-center'>
            <Text className='text-lg font-bold text-gray-700 mt-8 mb-6 text-left w-full'>Available Doctors</Text>
            <ClinicCard physical chat name='Rafay' fees='200' image={images.doctor_image} major='Small Animal Medicine' time='9:00 AM - 5:00 PM'  />
            <ClinicCard physical name='Rafay' fees='200' image={images.doctor_image} major='Small Animal Medicine' time='9:00 AM - 5:00 PM' />
        </View>
        <Text className='text-lg font-bold text-gray-700 mt-8 mb-4'>Description</Text>
        <Text className='text-gray-500 text-base'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed fugit dolor tempore! At architecto, reiciendis, nemo temporibus delectus magnam in officia voluptas numquam illo enim asperiores quas excepturi vero dicta alias quo maxime harum tenetur blanditiis eaque. Maiores numquam dolores excepturi quasi consectetur dicta soluta aut quae, eos architecto cum.</Text>
        <Text className='text-lg font-bold text-gray-700 mt-8 mb-4'>Location</Text>
        <View style={{marginVertical:10}}>
          <MapView
            style={styles.map}
            region={mapRegion}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            
            />
        </View>
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default ClinicScreen

const styles = StyleSheet.create({
    back: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex:10
  },
   map: {
    width: Dimensions.get('screen').width - 50,
    height: 200,
    marginRight: 60,
  },
})
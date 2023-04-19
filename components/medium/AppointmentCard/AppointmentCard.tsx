import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import images from '../../../assets/images'
import { Image } from 'react-native'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../interfaces/navigation.interface'

const AppointmentCard = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    let [fontsLoaded] = useFonts({
    'poppins-bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    'poppins-medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
  })
  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('DetailsScreen')} style={styles.card}>
      <View className='items-center justify-between my-2 pb-3 border-b-2 border-gray-100 flex-row-reverse'>
        <TouchableOpacity >
        <Image style={styles.avatar} source={images.doctor_image} />
        </TouchableOpacity>
        <View className='ml-4'>
        <Text style={{fontFamily:'poppins-bold'}} className='text-base'>Dr.Syed Rafay</Text>
        <Text className='text-gray-400'>Small Animal Medicine</Text>
        </View>
      </View>
      <Text className='text-xs font-medium text-gray-400 my-1'>Appointment date</Text>
      <View className='flex-row items-center justify-between '>
        <View className='flex-row items-center'>
        <MaterialIcons size={20} color='gray' name='calendar' />    
        <Text className='mt-[1px] text-gray-600 ml-1 text-xs' style={{fontFamily:'poppins-medium'}} >Wed Jun 20</Text>
        </View>
        <View className='flex-row items-center'>
        <MaterialIcons size={20} color='gray' name='clock' />    
        <Text className='mt-[1px] text-gray-600 ml-1 text-xs' style={{fontFamily:'poppins-medium'}} >08:00 - 08:30</Text>
        </View>
        <View className='flex-row items-center'>
        <MaterialIcons size={10} color='lightgreen' name='circle' />    
        <Text className='mt-[1px] text-gray-600 ml-1 text-xs' style={{fontFamily:'poppins-medium'}} >Confirmed</Text>  
        </View>
      </View>
      <View className='flex-row justify-center mt-5'>
        <Pressable className='bg-gray-100 p-3 rounded-xl w-[50%] mr-1'><Text className='text-base font-medium text-gray-500 text-center'>Cancel</Text></Pressable>
        <Pressable className='bg-primary p-3 rounded-xl w-[50%] ml-1'><Text className='text-base font-medium text-white text-center'>Reschedule</Text></Pressable>
      </View>
    </TouchableOpacity>
  )
}

export default AppointmentCard

const styles = StyleSheet.create({
    card:{
        backgroundColor:'white',
        borderRadius:10,
        paddingHorizontal:15,
        paddingTop:10,
        paddingBottom:15,
        marginBottom:15,
        elevation: 5,
        shadowColor: '#52006A',
        position:'relative',
        borderLeftWidth:6,
        borderLeftColor:'#40B37C'
    },
        avatar: {
        width: 64,
        height: 64,
        borderRadius: 100,
      },
    menu:{
        position:'absolute',
        top:-20,
        right:0
    }
})
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
      <Text className='text-xs font-medium text-gray-400'>Appointment date</Text>
      <View className='flex-row items-center my-2 pb-3 border-b-2 border-gray-100'>
        <MaterialIcons size={20} name='clock-outline' />
        <Text style={{fontFamily:'poppins-medium'}} className='ml-2'>Wed Jun 20</Text>
        <Text style={{fontFamily:'poppins-medium'}} className=' ml-2'>* 08:00 - 08:30</Text>
        <MaterialIcons style={styles.menu} size={25} name='dots-vertical' color='gray' />
      </View>
      <View className='mt-2 flex-row items-center'>
        <TouchableOpacity >
        <Image style={styles.avatar} source={images.doctor_image} />
        </TouchableOpacity>
        <View className='ml-4'>
        <Text style={{fontFamily:'poppins-bold'}} className='text-base'>Dr.Syed Rafay</Text>
        <Text className='text-gray-400'>Small Animal Medicine</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default AppointmentCard

const styles = StyleSheet.create({
    card:{
        backgroundColor:'white',
        borderRadius:10,
        paddingHorizontal:20,
        paddingVertical:15,
        marginBottom:15,
        elevation: 5,
        shadowColor: '#52006A',
        position:'relative',
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
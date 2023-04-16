import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../interfaces/navigation.interface';
import { useNavigation } from '@react-navigation/native';

interface IClinicCardProps {
    name:string;
    major:string;
    fees:string;
    time:string;
    image:string;
    physical?:boolean;
    chat?:boolean;
}

const ClinicCard = ({name,major,fees,time,image,chat,physical}:IClinicCardProps) => {
    const {width} = useWindowDimensions();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View  style={{...styles.ClinicCard, width:width - 50}}>
        <View className='flex-row'>
        <Image className='w-[92px] h-[92px]  rounded-md' source={image as ImageSourcePropType} />
        <View className='ml-4'>
        <Text className='text-lg font-bold text-primary'>Dr.{name}</Text>
        <Text className='font-medium text-gray-500'>{major}</Text>
        <View className='mt-2 flex-row'>{chat ? <MaterialIcons name='chat' style={{marginRight:5,padding:6,backgroundColor:'green',borderRadius:50}} color={'#fff'} size={20} /> : null}
          {physical ? <MaterialIcons name='location-on' style={{marginRight:5,padding:6,backgroundColor:'green',borderRadius:50}} color={'#fff'} size={20} /> : null }
        </View>
        </View>
      </View>
      <View className='flex-row items-center justify-between mt-4'>
        <View className='flex flex-row items-center'><MaterialIcons name='access-time' size={25} /><Text className='font-medium text-gray-500'> {time} </Text></View>
        <View className='flex-row items-center'>
            <Text className='font-medium text-gray-500'>Clinic Fee: </Text>
            <Text className='text-lg font-medium'> ${fees}</Text>
        </View>
      </View>
        <Pressable onPress={()=>navigation.navigate('VetScreen')} className='bg-primary py-2 px-4 rounded-xl mt-2'><Text className='text-center text-white font-bold'>Make An Appointment</Text></Pressable>
    </View>
  )
}

export default ClinicCard

const styles = StyleSheet.create({
    ClinicCard:{
        backgroundColor:'white',
        borderRadius:20,
        paddingHorizontal:20,
        paddingVertical:15,
        marginBottom:15,
        elevation: 5,
        shadowColor: '#52006A',
    }
})
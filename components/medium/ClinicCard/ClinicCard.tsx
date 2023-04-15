import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface IClinicCardProps {
    name:string;
    major:string;
    fees:string;
    time:string;
    certifications?:string[];
    image:string;
}

const ClinicCard = ({name,major,fees,time,certifications,image}:IClinicCardProps) => {
    const {width} = useWindowDimensions();
  return (
    <TouchableOpacity  style={{...styles.ClinicCard, width:width - 50}}>
        <View className='flex-row'>
        <Image className='w-[80px] h-[80px]  rounded-md' source={image as ImageSourcePropType} />
        <View className='ml-4'>
        <Text className='text-lg font-bold text-primary'>Dr.{name}</Text>
        <Text className='font-medium text-gray-500'>{major}</Text>
        </View>
      </View>
      <View className='flex-row items-center justify-between mt-4'>
        <View className='flex flex-row items-center'><MaterialIcons name='access-time' size={25} /><Text className='font-medium text-gray-500'> {time} </Text></View>
        <View className='flex-row items-center'>
            <Text className='font-medium text-gray-500'>Clinic Fee: </Text>
            <Text className='text-lg font-medium'> ${fees}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
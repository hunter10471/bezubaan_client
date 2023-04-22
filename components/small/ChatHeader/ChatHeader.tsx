import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../interfaces/navigation.interface'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Image } from 'react-native'
import images from '../../../assets/images'

type Props = {}

const ChatHeader = (props: Props) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <View className='bg-white z-20 flex-row items-center p-3 border-b-2 border-gray-200 fixed'>
        <TouchableOpacity style={{marginRight:20,marginTop:10}}  onPress={() => navigation.goBack()}><Text> <MaterialIcons color={'#000'} size={30} name='arrow-back' /> </Text></TouchableOpacity>
         <View className='mt-2 flex-row items-center'>
        <TouchableOpacity style={{position:'relative'}} >
        <Text className='absolute z-10 bottom-[-2px] right-[-5px]'> <MaterialIcons color={'green'} size={15} name='circle' /> </Text>
        <Image style={styles.avatar} source={images.doctor_image} />
        </TouchableOpacity>
        <View className='ml-4'>
        <Text style={{fontFamily:'poppins-bold'}}>Dr.Syed Rafay</Text>
        <Text className='text-gray-500 text-xs'>Small Animal Medicine</Text>
        </View>
      </View>
   </View>
  )
}

export default ChatHeader

const styles = StyleSheet.create({
     avatar: {
        width: 48,
        height: 48,
        borderRadius: 100,
      },
})
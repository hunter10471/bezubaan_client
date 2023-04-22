import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '../../../assets/images'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../../interfaces/navigation.interface'

type Props = {}

const MessageItem = (props: Props) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Pressable onPress={()=>navigation.navigate('ChatScreen')} className='py-4 border-b-2 border-gray-50 flex-row items-center'>
      <Image source={images.doctor_image} className='rounded-full h-16 w-16 mr-6' />
      <View>
        <Text className='text-lg text-gray-500'>Dr.Rafay</Text>
        <Text className='text-base  text-gray-500'>Hi, How are you doing ? &#9679; 10:26 AM</Text>
      </View>
    </Pressable>
  )
}

export default MessageItem

const styles = StyleSheet.create({})
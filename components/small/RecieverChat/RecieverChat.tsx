import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface IRecieverChatProps {
    text:string;
}

const RecieverChat = ({text}:IRecieverChatProps) => {
  return (
    <View className='items-start'>
      <Text className='text-black bg-white px-6 py-3 rounded-full text-base'>{text}</Text>
      <Text className='text-xs text-gray-400 font-bold m-1'>08:00 AM</Text>
    </View>
  )
}

export default RecieverChat

const styles = StyleSheet.create({})
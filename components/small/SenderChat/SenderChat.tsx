import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface ISenderChatProps {
    text:string;
}

const SenderChat = ({text}:ISenderChatProps) => {
  return (
    <View className='items-end'>
      <Text className='text-white bg-primary px-6 py-3 rounded-full text-base'>{text}</Text>
      <Text className='text-xs text-gray-400 font-bold m-1'>08:00 AM</Text>
    </View>
  )
}

export default SenderChat

const styles = StyleSheet.create({})
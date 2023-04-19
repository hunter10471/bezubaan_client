import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const ChatTime = (props: Props) => {
  return (
    <View className='relative items-center m-10'>
      <Text className='font-medium text-gray-400'>08:00 AM</Text>
        <View className='w-[100px] border-b-[1px] border-gray-400 absolute top-[50%] left-0'></View>
        <View className='w-[100px] border-b-[1px] border-gray-400 absolute top-[50%] right-0'></View>
    </View>
  )
}

export default ChatTime

const styles = StyleSheet.create({})
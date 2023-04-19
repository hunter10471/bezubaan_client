import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const ChatInput = () => {
  return (
    <View className='bg-white fixed z-20 p-3 flex-row items-center justify-between'>
      <Pressable className='mr-3 rotate-[320deg]'><MaterialIcons size={30} name='attachment' color='gray' /></Pressable>
      <Pressable className='mr-3'><MaterialIcons size={30} name='insert-emoticon' color='gray' /></Pressable>
      <TextInput placeholder='Type message' className='px-2 text-base flex-1' />
      <Pressable className='p-2 rounded-full bg-gray-50 rotate-[-30deg]'><MaterialIcons size={25} name='send' color='#40B37C' /></Pressable>
    </View>
  )
}

export default ChatInput

const styles = StyleSheet.create({})
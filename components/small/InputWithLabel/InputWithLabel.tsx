import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

interface IInputWithLabelProps {
    label:string;
}

const InputWithLabel = ({label}:IInputWithLabelProps) => {
  return (
    <View className='w-[80%] m-2'>
    <Text className='text-lg text-gray-400 font-medium'>{label}</Text>
      <TextInput className=' pt-2 pb-3 border-b-2 border-gray-300 w-full text-xl font-bold focus:border-primary transition-all '  defaultValue='John' keyboardType='default' />
    </View>
  )
}

export default InputWithLabel

const styles = StyleSheet.create({})
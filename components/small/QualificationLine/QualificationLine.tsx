import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface IQualificationProps {
    title:string;
}


const QualificationLine = ({title}:IQualificationProps) => {
  return (
    <View className='flex-row items-center mb-2 '>
      <MaterialIcons size={30} color='green' name='check-circle' />
      <Text className='ml-2 text-base font-bold text-gray-700'>{title}</Text>
    </View>
  )
}

export default QualificationLine

const styles = StyleSheet.create({})
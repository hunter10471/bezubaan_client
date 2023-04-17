import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'

interface ITimePillProps {
    time:string;
}

const TimePill = ({time}:ITimePillProps) => {
  return (
    <Pressable className={`bg-gray-400 px-4 py-2 rounded-full my-2 mx-1`}>
      <Text className='text-white text-lg font-bold'>{time}</Text>
    </Pressable>
  )
}

export default TimePill

const styles = StyleSheet.create({})
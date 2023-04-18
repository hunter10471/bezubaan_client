import { Pressable, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'

interface ITimePillProps {
    time:string;
}

const TimePill = ({time}:ITimePillProps) => {
  const [selected, setSelected] = useState<boolean>(false)
  return (
    <Pressable onPress={()=>setSelected(!selected)} className={`border-2 border-primary ${selected ? 'bg-primary' : 'bg-white'} px-4 py-2 rounded-full my-2 mx-1`}>
      <Text className={`${ selected ? 'text-white' : 'text-primary'} text-lg font-bold`}>{time}</Text>
    </Pressable>
  )
}

export default TimePill

const styles = StyleSheet.create({})
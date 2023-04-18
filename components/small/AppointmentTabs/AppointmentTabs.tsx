import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'


const AppointmentTabs = () => {
    const [previous, setPrevious] = useState<boolean>(false);
  return (
    <View className='flex-row w-full justify-between my-6 border-primary border-2 rounded-xl'>
        <Pressable onPress={()=>setPrevious(false)} className={`rounded-l-lg p-3 w-[50%] text-center ${previous ? 'bg-white' : 'bg-primary'}`}>
            <Text className={`font-medium text-base text-center ${previous ? ' text-primary' : ' text-white'}`}>
            Upcoming
            </Text>
        </Pressable>
        <Pressable onPress={()=>setPrevious(true)} className={`rounded-r-lg p-3 w-[50%] text-center ${!previous ? 'bg-white' : 'bg-primary'}`}>
            <Text className={`font-medium text-base text-center ${!previous ? ' text-primary' : ' text-white'}`}>
            Previous
            </Text>
        </Pressable>
    </View>
  )
}

export default AppointmentTabs

const styles = StyleSheet.create({})
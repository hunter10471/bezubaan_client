import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NormalHeading from '../components/small/NormalHeading/NormalHeading'
import AppointmentTabs from '../components/small/AppointmentTabs/AppointmentTabs'

type Props = {}

const AppointmentsScreen = (props: Props) => {
  return (
    <SafeAreaView className='h-full bg-white'>
        <View className='p-6'>
          <NormalHeading text='My appointments' />
          <AppointmentTabs/>
        </View>
    </SafeAreaView>
  )
}

export default AppointmentsScreen

const styles = StyleSheet.create({})
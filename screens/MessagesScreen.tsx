import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NormalHeading from '../components/small/NormalHeading/NormalHeading'
import MessageItem from '../components/medium/MessageItem/MessageItem'

type Props = {}

const MessagesScreen = (props: Props) => {
  return (
    <SafeAreaView className='h-full bg-white'>
        <View className='p-6'>
            <NormalHeading text='My messages' />
            <MessageItem/>
            <MessageItem/>
            <MessageItem/>
        </View>
    </SafeAreaView>
  )
}

export default MessagesScreen

const styles = StyleSheet.create({})
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ChatHeader from '../components/small/ChatHeader/ChatHeader'
import SenderChat from '../components/small/SenderChat/SenderChat'
import RecieverChat from '../components/small/RecieverChat/RecieverChat'
import ChatTime from '../components/small/ChatTime/ChatTime'
import ChatInput from '../components/medium/ChatInput/ChatInput'

type Props = {}

const ChatScreen = (props: Props) => {
  return (
    <SafeAreaView className='h-full bg-white' >
        <View className='relative bg-gray-50 h-full'>
            <ChatHeader/>
            <ScrollView className='p-2'>
                <ChatTime/>
            <SenderChat text='Hi doc, what is up ? hmmmmm' />
            <RecieverChat text='Hi doc, what is up ? hmmmmm' />
            </ScrollView>
            <ChatInput/>
        </View>
    </SafeAreaView>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})
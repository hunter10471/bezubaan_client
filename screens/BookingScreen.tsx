import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import NormalHeading from '../components/small/NormalHeading/NormalHeading'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../interfaces/navigation.interface'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'


const BookingScreen = () => {
    const dimensions = useWindowDimensions();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [chat, setChat] = useState<boolean>(false)
    const [visit, setVisit] = useState<boolean>(false)

    const methodPress = (method:'chat'|'visit') => {
        if(method === 'chat'){
            setChat(!chat)
            setVisit(false)
        } else{
            setVisit(!visit)
            setChat(false)
        }
    }

  return (
    <SafeAreaView  className='h-full bg-white'>
      <TouchableOpacity  onPress={() => navigation.goBack()} style={styles.back}><Text> <MaterialIcons color={'#000'} size={30} name='arrow-back' /> </Text></TouchableOpacity>
      <View style={{marginTop:50}} className='p-6 relative'>
        <NormalHeading text='Choose Method of Consultation' />
        <View className='flex-row justify-evenly items-center my-10'>
            <Pressable onPress={()=>methodPress('chat')} className={`${chat ? 'bg-primary' : 'bg-white'} border-2 border-primary p-4 rounded-xl w-[120px] items-center`}>
                <MaterialIcons color={chat ? '#fff' :'#40B37C'} size={40} name='chat' />
                <Text className={`text-lg ${chat ? 'text-white' : 'text-primary'}`}>Via Chat</Text>
            </Pressable>
            <NormalHeading text='OR' />
            <Pressable onPress={()=>methodPress('visit')} className={`${visit ? 'bg-primary' : 'bg-white'} border-2 border-primary p-4 rounded-xl w-[120px] items-center`}>
                <MaterialIcons color={visit ? '#fff' : '#40B37C'} size={40} name='location-on' />
                <Text className={`text-lg ${visit ? 'text-white' : 'text-primary'}`}>Via Visit</Text>
            </Pressable>
        </View>
        <NormalHeading text='List symptoms or any special notes you&apos;d like the doctor to know' />
        <TextInput style={{ height:200, textAlignVertical: 'top',}} multiline numberOfLines={10}  className='p-4 my-6 text-base- border-2 rounded-xl border-primary' placeholder='List any relevant symptoms...' />
        <Pressable onPress={()=>navigation.navigate('SuccessfulScreen')} className='bg-primary py-4 w-full px-4 rounded-xl my-2'><Text className='text-center text-white font-bold'>Confirm Your Appointment</Text></Pressable>
      </View>
    </SafeAreaView>
  )
}

export default BookingScreen

const styles = StyleSheet.create({
       back: {
        position: 'absolute',
        top: 70,
        left: 20,
        zIndex:10
    },
})
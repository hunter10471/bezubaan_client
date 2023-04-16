import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../assets/images'
import NormalHeading from '../components/small/NormalHeading/NormalHeading'
import { AirbnbRating } from 'react-native-ratings'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../interfaces/navigation.interface'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import QualificationLine from '../components/small/QualificationLine/QualificationLine'
import { Calendar, DateData } from 'react-native-calendars';



const VetScreen = () => {
    const dimensions = useWindowDimensions();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [date, setDate] = useState<string>('');
  return (
    <SafeAreaView className='h-full bg-white'>
        <TouchableOpacity  onPress={() => navigation.goBack()} style={styles.back}><Text> <MaterialIcons color={'#fff'} size={30} name='arrow-back' /> </Text></TouchableOpacity>
        <Image style={{width:dimensions.width,height:dimensions.height/2, position:'absolute'}} source={images.doctor_image} />
        <ScrollView>
            <View style={{marginTop:dimensions.height/3}} className='bg-white h-full flex-wrap p-4 rounded-xl justify-between flex flex-row relative'>
                <View>
                <NormalHeading text='Dr.Rafay' />
                <Text className='text-gray-500'>Small Animal Medicine</Text>
                </View>
                 <TouchableOpacity>
                     <AirbnbRating size={20} defaultRating={0} isDisabled showRating={false} />
                    <Text className='text-yellow-500 font-medium'>0 Ratings</Text>
                 </TouchableOpacity>
                 <View className='w-full mt-4'>
                    <QualificationLine title='5+ Years of veterinary experience' />
                    <QualificationLine title='Certified Physician' />
                    <QualificationLine title='Available 24/7' />
                 </View>
                 <Text className='text-lg font-bold text-gray-700 mt-6 mb-2'>About</Text>
                 <Text className='text-base text-gray-600'>Meet Dr.Rafay, an experienced vet with a passion for equine medicine. With over 5 years of experience, Dr.Rafay specializes in treating animals of all sizes. He is known for his gentle approach and is excited to meet you and your furry friends!</Text>
                 <Text className='text-lg font-bold text-gray-700 mt-8 mb-6'>Choose an appointment slot</Text>
                <View className='items-center'>
                <Calendar
                    markedDates={{
                    [date]: {selected: true, disableTouchEvent: true,selectedColor:'#40B37C'}}}                 
                    onDayPress={(day)=>setDate(day.dateString)} style={{width:dimensions.width-50}} />
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default VetScreen

const styles = StyleSheet.create({
       back: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex:10
    },
})
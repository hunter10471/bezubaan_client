import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '../assets/images'
import NormalHeading from '../components/small/NormalHeading/NormalHeading'
import { AirbnbRating } from 'react-native-ratings'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../interfaces/navigation.interface'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import QualificationLine from '../components/small/QualificationLine/QualificationLine'
import { Calendar, DateData } from 'react-native-calendars'
import moment from 'moment'
import TimePill from '../components/small/TimePill/TimePill'



const VetScreen = () => {
    const dimensions = useWindowDimensions();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [date, setDate] = useState<string>('');
    const [swiped, setSwiped] = useState<boolean>(false);
    const [timeSlots, setTimeSlots] = useState<string[]>([]);

    const createTimeSlots = (fromTime:string,toTime:string) => {
        const startTime = moment(fromTime,'HH:mm')
        const endTime = moment(toTime,'HH:mm')
        if(endTime.isBefore(startTime)){
            endTime.add(1,'day')
        }
        const array = [];
        while(startTime <= endTime){
            array.push(moment(startTime).format('HH:mm'))
            startTime.add('30','minutes')

        }
        return array;
    }

    const onDayPress = (day:DateData) => {
        setDate(day.dateString)
        setSwiped(true)
    }

    useEffect(()=>{
       setTimeSlots(createTimeSlots('09:00','16:30'))
    },[])





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
                 <Text className='text-lg font-bold text-gray-700 my-2'>About</Text>
                 <Text className='text-base text-gray-600'>Meet Dr.Rafay, an experienced vet with a passion for equine medicine. With over 5 years of experience, Dr.Rafay specializes in treating animals of all sizes. He is known for his gentle approach and is excited to meet you and your furry friends!</Text>
                 <Text className='text-lg font-bold text-gray-700 mt-8 mb-6'>Choose an appointment slot</Text>
                <View style={{transform:[{translateX: swiped ? -Dimensions.get('screen').width + 30 : 0}]}} className='flex-row w-full'>
                <Calendar
                    markedDates={{
                    [date]: {selected: true, disableTouchEvent: true,selectedColor:'#40B37C'}}}                 
                    onDayPress={onDayPress} style={{width:dimensions.width-50, flexShrink:0, marginHorizontal:10}} />
                <View style={{width:Dimensions.get('screen').width - 30}} className='flex-row flex-wrap justify-center relative mt-10'>
                    <TouchableOpacity style={styles.back}  onPress={() => setSwiped(false)}><Text> <MaterialIcons color={'#000'} size={30} name='arrow-back' /> </Text></TouchableOpacity>
                    {
                        timeSlots.map((item,index)=>{
                            return <TimePill key={index} time={item} />
                        })
                    }
                </View>
                </View>
                <Pressable className='bg-gray-400 py-4 w-full px-4 rounded-xl mt-10 mb-2'><Text className='text-center text-white font-bold'>Book Your Appointment</Text></Pressable>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default VetScreen

const styles = StyleSheet.create({
       back: {
        position: 'absolute',
        top: -50,
        left: 20,
        zIndex:10
    },
})
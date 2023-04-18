import { Animated, Dimensions, Easing, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
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
import { Calendar, DateData } from 'react-native-calendars'
import TimePills from '../components/medium/TimePills/TimePills'



const VetScreen = () => {
    const dimensions = useWindowDimensions();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [date, setDate] = useState<string>('');
    const [animation, setAnimation] = useState(new Animated.Value(0));

    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: -dimensions.width + 30,
            duration:300,
            easing:Easing.exp,
            useNativeDriver:true
        }).start()
    }

    const backAnimation = () => {
        Animated.timing(animation, {
            toValue: 0,
            easing:Easing.exp,
            duration:300,
            useNativeDriver:true
        }).start()
    }

    const onDayPress = (day:DateData) => {
        startAnimation()
        setDate(day.dateString)
    }


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
                <Animated.View style={{transform:[{translateX: animation}]}} className='flex-row w-full'>
                <Calendar
                    markedDates={{
                    [date]: {selected: true, disableTouchEvent: true,selectedColor:'#40B37C'}}}                 
                    onDayPress={onDayPress} style={{width:dimensions.width-50, flexShrink:0, marginRight:15, marginLeft:10}} />
                <TimePills backAnimation={backAnimation} fromTime='09:00' toTime='16:30' />
                </Animated.View>
                <Pressable onPress={()=>navigation.navigate('BookingScreen')} className='bg-primary py-4 w-full px-4 rounded-xl mt-10 mb-2'><Text className='text-center text-white font-bold'>Book Your Appointment</Text></Pressable>
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
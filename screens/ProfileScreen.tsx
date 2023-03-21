import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import images from '../assets/images';
import FeatherIcons from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputWithLabel from '../components/small/InputWithLabel/InputWithLabel';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../interfaces/navigation.interface';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const ProfileScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const authState = useSelector(( state:RootState ) => state.user );
    const onBackPress = () => {
        navigation.navigate('HomeScreen',undefined)
    }
    console.log(authState)
  return (
    <SafeAreaView style={{flex:1}} className='bg-white h-full'>
        <View className='flex items-center justify-center  bg-primary py-12'>
            <View className='my-6 flex-1 relative w-full'>
                <TouchableOpacity onPress={onBackPress} style={styles.backArrow} >
                    <MaterialIcons onPress={onBackPress} name='arrow-back' size={30} color='#fff' />
                    
                </TouchableOpacity>
            <Text className=' text-white font-medium  text-xl text-center'>
                Edit Profile
            </Text>
            <TouchableOpacity style={styles.saveButton}>
            <Text className=' text-white font-bold  text-lg text-center'>
                SAVE
            </Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.avatarContainer} >
            <Image style={styles.avatar} source={images.default_avatar} />
            <View className='absolute right-[-10px] bottom-0 bg-white rounded-full p-2'>
                <FeatherIcons name='camera' size={20} color='#40B37C' />
            </View>
          </TouchableOpacity>
        </View>
        <View className='flex-1 items-center pt-10'>
            <InputWithLabel defaultValue={authState.username} label='Username' />
            <InputWithLabel defaultValue={authState.email} label='Email' />
            <InputWithLabel defaultValue={authState.phone} label='Phone' />
            <InputWithLabel defaultValue={authState.gender} label='Gender' />
            <InputWithLabel defaultValue={authState.dateOfBirth && authState.dateOfBirth.toDateString()} label='Date Of Birth' />
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
      },
    avatarContainer:{
        position:'relative'
    },
    backArrow:{
        position:'absolute',
        left:25,
        zIndex:10
    },
    saveButton:{
        position:'absolute',
        right:25
    }
})
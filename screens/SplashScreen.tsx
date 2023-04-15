import { View, Image, useWindowDimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../interfaces/navigation.interface';
import images from '../assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const storeUser = async () => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify('true'));
    } catch (error) {
      console.log(error);
  }
};

const getUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user")
      if(userData) return true;
      else return false;

    } catch (error) {
    console.log(error); 
    }
};

const getLoggedIn = async () => {
    try {
      const userData = await AsyncStorage.getItem("loggedIn")
      if(userData) return true;
      else return false;

    } catch (error) {
    console.log(error); 
    }
};

  useEffect(() => {
    const navigateUser = async() => {
      if(await getUser()){
        if(await getLoggedIn()){
            navigation.setOptions({
          headerShown: false,
        });
        setTimeout(() => {
          navigation.navigate('HomeScreen', undefined);
        }, 2000);
        }else{
          navigation.setOptions({
            headerShown: false,
          });
          setTimeout(() => {
            navigation.navigate('LoginScreen', undefined);
          }, 2000);
        }
      }else{
         await storeUser()
         navigation.setOptions({
          headerShown: false,
        });
        setTimeout(() => {
          navigation.navigate('OnBoardingScreen', undefined);
        }, 2000);
      }
    }
    navigateUser()
  }, []);

  return (
    <SafeAreaView className='bg-secondary h-full'>
      <View className='flex h-full justify-center items-center bg-secondary '>
        <Image source={images.white_logo} />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

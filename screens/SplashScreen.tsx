import { View, Image, useWindowDimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../interfaces/navigation.interface';
import images from '../assets/images';

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    setTimeout(() => {
      navigation.navigate('OnBoardingScreen', undefined);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className='bg-secondary h-full'>
      <View className='flex h-full justify-center items-center bg-secondary '>
        <Image source={images.splash} />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

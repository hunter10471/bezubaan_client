import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  useWindowDimensions,
  StyleSheet
} from 'react-native';
import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

interface IOnboardingItemProps {
  title: string;
  description: string;
  image: string;
}

const OnboardingItem = ({
  title,
  description,
  image,
}: IOnboardingItemProps) => {
  const dimensions = useWindowDimensions();
  let [fontsLoaded] = useFonts({
    'poppins-bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    'poppins-regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
  })
  if(!fontsLoaded){
    return <AppLoading/>
  }
    return (
    <View className='relative h-full'>
      <Image
        style={[
          {
            width: dimensions.width,
            height: '40%',
            resizeMode: 'center',
            marginVertical:60
          },
        ]}
        source={image as ImageSourcePropType}
      />

      <View className='absolute flex flex-col bottom-14 px-6 w-full h-[40%] bg-white  '>
        <Text style={styles.title}  className=' text-text  text-4xl text-center mb-10'>{title}</Text>
        <Text className='text-gray-600 text-center font-medium text-[16px] leading-[26px]'>{description}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  title:{
    fontFamily:'poppins-bold',
  }
})
export default OnboardingItem;

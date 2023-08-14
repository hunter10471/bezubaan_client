import React from 'react';
import { Image, Text, View } from 'react-native';
import images from '../../../assets/images';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const NotFound = () => {
    let [fontsLoaded] = useFonts({
        'poppins-bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
        'poppins-regular': require('../../../assets/fonts/Poppins-Regular.ttf'),
        'poppins-medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <View className="flex justify-center items-center opacity-70 gap-4 my-10">
            <Image
                source={images.not_found_list}
                className="w-[250px] h-[200px]"
            />
            <Text
                className="text-xl w-[80%] text-center text-neutral-500"
                style={{ fontFamily: 'poppins-bold' }}
            >
                Your query returned nothing...
            </Text>
        </View>
    );
};

export default NotFound;

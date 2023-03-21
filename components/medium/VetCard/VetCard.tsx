import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { IVet } from '../../../interfaces/Vet.interface';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

interface IVetCardProps {
  vet: IVet;
}

const VetCard = ({ vet }: IVetCardProps) => {
  let [fontsLoaded] = useFonts({
    'poppins-bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
    'poppins-medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
  })
  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <View
      style={styles.main}
      className='p-2 pb-4 m-1 shadow-xl bg-white rounded-[25px] '
    >
      <TouchableOpacity activeOpacity={0.8}>
        <Image
          className='w-[200px] h-[200px] rounded-[15px] '
          source={vet.image as ImageSourcePropType}
        />
        <Text style={{fontFamily:'poppins-medium'}} className='text-primary text-lg mt-1  ml-1'>
          {vet.name}
        </Text>
        <Text className='text-gray-400 text-sm font-semibold ml-1'>
          {vet.location}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VetCard;

const styles = StyleSheet.create({
  main: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

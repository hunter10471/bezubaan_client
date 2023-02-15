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

interface IVetCardProps {
  vet: IVet;
}

const VetCard = ({ vet }: IVetCardProps) => {
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
        <Text className='text-primary text-lg font-semibold ml-1'>
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

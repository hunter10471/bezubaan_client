import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import images from '../../../assets/images';

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

  return (
    <View className='relative h-full'>
      <Image
        style={[
          {
            width: dimensions.width,
            height: '60%',
            resizeMode: 'cover',
          },
        ]}
        source={image as ImageSourcePropType}
      />

      <View className='absolute flex flex-col gap-1 p-6 bottom-0 w-full h-[40%] bg-white  '>
        <Image
          source={images.blur}
          style={{
            height: '100%',
            position: 'absolute',
            bottom: '40%',
            transform: [{ rotate: '-180deg' }],
          }}
        />
        <Text className='text-primary font-bold text-3xl'>{title}</Text>
        <Text className='text-gray-700  '>{description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

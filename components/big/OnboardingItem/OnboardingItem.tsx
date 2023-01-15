import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

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
    <View className='relative'>
      <Image
        style={[
          {
            width: dimensions.width,
            height: dimensions.height,
          },
        ]}
        source={image as ImageSourcePropType}
      />
      <View className='absolute flex flex-col gap-1 p-6 bottom-0 w-full min-h-[280px] '>
        <Text className='text-primary font-bold text-3xl'>{title}</Text>
        <Text className='text-gray-700'>{description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;

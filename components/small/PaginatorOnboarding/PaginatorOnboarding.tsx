import {
  Animated,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { IOnboardingItem } from '../../../interfaces/OnboardingItem.interface';

interface IPaginatorProps {
  data: IOnboardingItem[];
  scrollX: Animated.Value;
  currentIndex: number;
}

const PaginatorOnboarding = ({
  data,
  scrollX,
  currentIndex,
}: IPaginatorProps) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container]}>
      {data.map((item, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[
              styles.dot,
              { width: dotWidth },
              {
                backgroundColor: index === currentIndex ? '#40b37c' : '#ccc',
              },
            ]}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
});

export default PaginatorOnboarding;

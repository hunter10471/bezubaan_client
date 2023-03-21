import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import slides from '../assets/data/slides';
import OnboardingItem from '../components/big/OnboardingItem/OnboardingItem';
import PaginatorOnboarding from '../components/small/PaginatorOnboarding/PaginatorOnboarding';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const OnboardingScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState<number>(0);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  let [fontsLoaded] = useFonts({
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
  })

  const onPress = () => {
    navigation.navigate('SignupScreen', undefined);
  };
  const handleScroll = (event: any) => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      }
    )(event);
  };
  const handleOnViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setIndex(viewableItems[0].index);
    }
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;
  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <SafeAreaView className='bg-white h-full'>
      <View className='h-full'>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <OnboardingItem
              image={item.image}
              title={item.title}
              description={item.description}
            />
          )}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          keyExtractor={(item) => item.title}
          scrollEventThrottle={32}
          onScroll={handleScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />
        {index === 2 ? (
          <Pressable
            onPress={onPress}
            className={`bg-primary w-[80%] py-4 text-center rounded-[10px] absolute bottom-16 left-[10%] `}
          >
            <Text style={styles.button} className='text-white  text-center '>
              {' '}
              Get Started
            </Text>
          </Pressable>
        ) : (
          <PaginatorOnboarding
            scrollX={scrollX}
            data={slides}
            currentIndex={index}
            />
        )}
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  button: {
    fontFamily:'poppins-bold'
  },
});

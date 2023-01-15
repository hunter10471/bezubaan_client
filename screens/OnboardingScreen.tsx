import { FlatList, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';
import { SafeAreaView } from 'react-native-safe-area-context';
import slides from '../assets/data/slides';
import OnboardingItem from '../components/big/OnboardingItem/OnboardingItem';

const OnboardingScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView>
      <View>
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
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

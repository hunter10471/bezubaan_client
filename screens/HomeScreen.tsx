import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../assets/images';
import MaterialIcons from 'react-native-vector-icons/FontAwesome5';
import vets from '../assets/data/vets';
import VetCard from '../components/medium/VetCard/VetCard';
import MapView from 'react-native-maps';
import badges from '../assets/data/badges';
import HomeCategoryBadge from '../components/small/HomeCategoryBadge/HomeCategoryBadge';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import NormalHeading from '../components/small/NormalHeading/NormalHeading';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import UpcomingAppointment from '../components/small/UpcomingAppointment/UpcomingAppointment';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const authState = useSelector((state:RootState) => state.user)
  const onProfileTap = () => {
    navigation.navigate('ProfileScreen', undefined)
  }

  let [fontsLoaded] = useFonts({
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
  })
  if(!fontsLoaded){
    return <AppLoading/>
  }
  return (
    <SafeAreaView style={{ flex: 1 }} className='bg-white'>
      <ScrollView>

      <View className='flex mx-6 my-4 '>
        <View className='flex flex-row justify-between items-center'>
          <NormalHeading text={authState.username ? `Hey there, ${authState.username}` : 'What are you looking for ?'} takesHalf />
          <TouchableOpacity onPress={onProfileTap} >
            <Image style={styles.avatar} source={images.default_avatar} />
          </TouchableOpacity>
        </View>
        <View className='flex flex-row items-center gap-4 my-4 bg-gray-100  px-4 py-2 rounded-xl'>
          <MaterialIcons name='search' size={15} color={'#666'} />
          <TextInput className='text-base' placeholder='Search' keyboardType='default' />
        </View>
         <FlatList
          style={{marginBottom:20}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={badges}
          renderItem={({ item }) => <HomeCategoryBadge tag={item} /> }
        />
        <NormalHeading text='Upcoming Appointments' />
        <UpcomingAppointment/>
        <NormalHeading text='Popular Vet Clinics' />
        <FlatList
          style={{marginVertical:20}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={vets}
          renderItem={({ item }) => <VetCard vet={item} />}
        />
        <NormalHeading text='Popular Vets' />
                <FlatList
          style={{marginVertical:20}}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={vets}
          renderItem={({ item }) => <VetCard vet={item} />}
        />
      </View>
      {/* <View
        className='w-[80%] left-[10%] px-8 py-4 rounded-[25px] flex flex-row justify-between'
        style={styles.navbar}
      >
        <TouchableOpacity>
          <MaterialIcons2 name='home' size={20} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons3 name='document-outline' size={20} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons4 name='users' size={20} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons3 name='menu' size={20} color={'#fff'} />
        </TouchableOpacity>
      </View> */}
        </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 100,
  },
  map: {
    width: Dimensions.get('screen').width - 50,
    height: 200,
    marginRight: 60,
  },
  navbar: {
    position: 'absolute',
    zIndex: 2,
    backgroundColor: '#40B37C',
    bottom: 30,
  },
});

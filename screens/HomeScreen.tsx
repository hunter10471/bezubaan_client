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
import MaterialIcons2 from 'react-native-vector-icons/Octicons';
import MaterialIcons3 from 'react-native-vector-icons/Ionicons';
import MaterialIcons4 from 'react-native-vector-icons/Feather';
import vets from '../assets/data/vets';
import VetCard from '../components/medium/VetCard/VetCard';
import MapView from 'react-native-maps';
import badges from '../assets/data/badges';
import HomeCategoryBadge from '../components/small/HomeCategoryBadge/HomeCategoryBadge';

const HomeScreen = () => {
  const [mapRegion, setmapRegion] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  return (
    <SafeAreaView style={{ flex: 1 }} className='bg-white h-full '>
      <View className='flex mx-6 my-4 '>
        <View className='flex flex-row justify-between'>
          <Text className='text-primary text-2xl font-bold w-[50%]'>
            What are you looking for ?
          </Text>
          <TouchableOpacity>
            <Image style={styles.avatar} source={images.default_avatar} />
          </TouchableOpacity>
        </View>
        <View className='flex flex-row items-center gap-4 my-6 bg-gray-100  px-4 py-2 rounded-[10px]'>
          <MaterialIcons name='search' size={15} color={'#666'} />
          <TextInput placeholder='Search for vets' keyboardType='default' />
        </View>
        <FlatList
          data={badges}
          horizontal
          renderItem={({ item }) => <HomeCategoryBadge tag={item} />}
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-around',
            marginBottom: 20,
          }}
        />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={vets}
          renderItem={({ item }) => <VetCard vet={item} />}
        />
        <Text className='text-xl my-4 font-bold text-primary'>
          Find Nearby Vets
        </Text>
        <View>
          <MapView
            style={styles.map}
            region={mapRegion}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      </View>
      <View
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
      </View>
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
    ...StyleSheet.absoluteFillObject,
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

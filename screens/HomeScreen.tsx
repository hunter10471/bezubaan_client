import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    ScrollView,
    Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../assets/images';
import MaterialIcons from 'react-native-vector-icons/FontAwesome5';
import VetCard from '../components/medium/VetCard/VetCard';
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
import { IVet } from '../interfaces/Vet.interface';
import { getAllVets } from '../api/vet.api';
import { Text } from 'react-native';
import * as Location from 'expo-location';
import { updateUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { updateLocation } from '../redux/slices/userSlice';

const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const authState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [fetchedVets, setFetchedVets] = useState<IVet[]>([]);
    const onProfileTap = () => {
        navigation.navigate('ProfileScreen', undefined);
    };

    useEffect(() => {
        const getPermissions = async () => {
            if (!authState.lat || !authState.long) {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status === 'granted' && authState._id) {
                    let currentLocation =
                        await Location.getCurrentPositionAsync();
                    const { latitude, longitude } = currentLocation.coords;
                    await updateUser(
                        {
                            location: {
                                type: 'Point',
                                coordinates: [longitude, latitude],
                            },
                        },
                        authState._id
                    );
                    dispatch(
                        updateLocation({ lat: latitude, long: longitude })
                    );
                }
            }
        };
        getPermissions();
    }),
        [];

    useEffect(() => {
        const fetchVets = async () => {
            const data = await getAllVets();
            if (data) setFetchedVets(data);
        };
        fetchVets();
    }, []);

    let [fontsLoaded] = useFonts({
        'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-white">
            <ScrollView>
                <View className="flex mx-6 my-4 ">
                    <View className="flex flex-row justify-between items-center">
                        <NormalHeading
                            text={
                                authState.username
                                    ? `Hey there, ${authState.username}`
                                    : 'What are you looking for ?'
                            }
                            takesHalf
                        />
                        <TouchableOpacity onPress={onProfileTap}>
                            {authState.avatar ? (
                                <Image
                                    style={styles.avatar}
                                    source={{
                                        uri: authState.avatar,
                                    }}
                                />
                            ) : (
                                <Image
                                    style={styles.avatar}
                                    source={images.default_avatar}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.search}
                        className="flex flex-row justify-center items-center gap-4 my-4 bg-neutral-100  px-4 py-2 rounded-full"
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('VetListScreen')}
                        >
                            <Text className="text-sm font-bold">
                                Search a Clinic, Vet or Specialty
                            </Text>
                        </TouchableOpacity>
                        <MaterialIcons
                            name="search"
                            size={25}
                            color={'#010101'}
                        />
                    </View>
                    <FlatList
                        style={{ marginBottom: 20 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={badges}
                        renderItem={({ item }) => (
                            <HomeCategoryBadge tag={item} />
                        )}
                    />
                    <NormalHeading text="Upcoming Appointments" />
                    <UpcomingAppointment />
                    <NormalHeading text="Popular Vets" />
                    <FlatList
                        style={{ marginVertical: 20 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={fetchedVets}
                        renderItem={({ item }) => <VetCard vet={item} />}
                    />
                </View>
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
    search: {
        elevation: 2,
        shadowColor: '#52006A',
    },
});

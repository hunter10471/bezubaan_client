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
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../assets/images';
import MaterialIcons from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons2 from 'react-native-vector-icons/MaterialIcons';
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
import MapView, { Marker } from 'react-native-maps';
import { IAppointment } from '../interfaces/Appointment.interface';
import { getUserAppointments } from '../api/appointment.api';

const HomeScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const authState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [fetchedVets, setFetchedVets] = useState<IVet[]>([]);
    const [upcomingAppointment, SetUpcomingAppointment] =
        useState<IAppointment>();
    const onProfileTap = () => {
        if (authState._id) {
            navigation.navigate('ProfileScreen', undefined);
        }
        navigation.navigate('LoginScreen', undefined);
    };

    const getPermissions = async () => {
        if (!authState.lat || !authState.long) {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted' && authState._id) {
                let currentLocation = await Location.getCurrentPositionAsync();
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
                dispatch(updateLocation({ lat: latitude, long: longitude }));
            }
        }
    };

    useEffect(() => {
        getPermissions();
    }),
        [];

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllVets();
            if (data) setFetchedVets(data);
            if (authState._id) {
                const appointments = await getUserAppointments(
                    authState._id,
                    true
                );
                if (appointments) SetUpcomingAppointment(appointments[0]);
            }
        };
        fetchData();
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
                        <Pressable
                            className="p-2 border-2 border-heading bg-primary rounded-full"
                            onPress={() =>
                                authState._id
                                    ? navigation.navigate('AddPetScreen')
                                    : navigation.navigate('LoginScreen')
                            }
                            style={{ elevation: 10, shadowColor: '#000' }}
                        >
                            <MaterialIcons2
                                size={40}
                                color="#fff"
                                name="pets"
                            />
                        </Pressable>
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
                    {upcomingAppointment && (
                        <>
                            <NormalHeading text="Upcoming Appointments" />
                            <UpcomingAppointment
                                appointment={upcomingAppointment}
                            />
                        </>
                    )}
                    <NormalHeading text="Explore Our Vets" />
                    <FlatList
                        style={{ marginVertical: 20 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={fetchedVets}
                        renderItem={({ item }) => <VetCard vet={item} />}
                    />
                    <NormalHeading text="Find Vets In Your City" />
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: authState.location?.coordinates[0]
                                ? authState.location?.coordinates[0]
                                : 24.8607,
                            longitude: authState.location?.coordinates[1]
                                ? authState.location?.coordinates[1]
                                : 67.0011,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        {fetchedVets.map((vet) => (
                            <Marker
                                pinColor="#000"
                                coordinate={{
                                    latitude: vet.location.coordinates[0],
                                    longitude: vet.location.coordinates[1],
                                }}
                                title={vet.clinicName}
                                description={vet.address}
                            />
                        ))}
                    </MapView>
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
        width: Dimensions.get('screen').width - 40,
        height: 400,
        marginRight: 60,
        marginTop: 10,
        borderRadius: 10,
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

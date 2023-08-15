import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../assets/images';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import NormalHeading from '../components/small/NormalHeading/NormalHeading';
import { AirbnbRating } from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ClinicCard from '../components/medium/ClinicCard/ClinicCard';
import FacilityBox from '../components/small/FacilityBox/FacilityBox';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';
import MapView, { Callout, Marker } from 'react-native-maps';
import { IVet } from '../interfaces/Vet.interface';

const ClinicScreen = ({ route }: { route: any }) => {
    const dimensions = useWindowDimensions();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const vet: IVet = route.params.vet;
    let [fontsLoaded] = useFonts({
        'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <SafeAreaView className="h-full relative bg-white">
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.back}
            >
                <Text>
                    {' '}
                    <MaterialIcons
                        color={'#fff'}
                        size={30}
                        name="arrow-back"
                    />{' '}
                </Text>
            </TouchableOpacity>
            {vet.avatar ? (
                <Image
                    style={{
                        width: dimensions.width,
                        height: dimensions.height / 2,
                        position: 'absolute',
                    }}
                    source={{ uri: vet.avatar }}
                />
            ) : (
                <Image
                    style={{
                        width: dimensions.width,
                        height: dimensions.height / 2,
                        position: 'absolute',
                    }}
                    source={images.vet1}
                />
            )}
            <ScrollView>
                <View
                    style={{ marginTop: dimensions.height / 3 }}
                    className="bg-white h-full flex-wrap p-4 rounded-xl justify-between flex flex-row relative"
                >
                    <NormalHeading
                        text={vet.clinicName || vet.username}
                        takesHalf
                    />
                    <TouchableOpacity>
                        <AirbnbRating
                            size={20}
                            defaultRating={0}
                            isDisabled
                            showRating={false}
                        />
                        <Text className="text-yellow-500 font-medium">
                            0 Ratings
                        </Text>
                    </TouchableOpacity>
                    <View className="w-full flex-row items-center font-normal">
                        <MaterialIcons
                            name="location-on"
                            color="#c6c6c6"
                            size={25}
                        />
                        <Text className=" text-gray-500 font-semibold">
                            {vet.address}
                        </Text>
                    </View>
                    <Text className="text-lg font-bold text-gray-700 mt-8 mb-6">
                        Available Facilities
                    </Text>
                    <View className="w-full flex-row flex-wrap">
                        <FacilityBox
                            icon="local-hospital"
                            name="Operation Theater"
                        />
                        <FacilityBox
                            icon="home-filled"
                            name="Shelter Available"
                        />
                        <FacilityBox
                            unavailable
                            icon="toys"
                            name="Pet Accessories"
                        />
                    </View>
                    <View className="w-full items-center">
                        <Text className="text-lg font-bold text-gray-700 mt-8 mb-6 text-left w-full">
                            Pet Care Specialist
                        </Text>
                        <ClinicCard
                            physical
                            chat
                            name={vet.username}
                            fees="200"
                            image={vet.avatar}
                            major={vet.fieldOfStudy}
                            time="9:00 AM - 5:00 PM"
                            vet={vet}
                        />
                    </View>
                    <Text className="text-lg font-bold text-gray-700 mt-8 mb-1">
                        Description
                    </Text>
                    <Text className="text-gray-500 text-base">
                        {vet.description}
                    </Text>
                    <Text className="text-lg font-bold text-gray-700 mt-8 mb-1">
                        Map View
                    </Text>
                    <View style={{ marginVertical: 10 }}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: vet.location.coordinates[0],
                                longitude: vet.location.coordinates[1],
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker
                                pinColor="#000"
                                coordinate={{
                                    latitude: vet.location.coordinates[0],
                                    longitude: vet.location.coordinates[1],
                                }}
                                title={vet.clinicName}
                                description={vet.address}
                            />
                        </MapView>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ClinicScreen;

const styles = StyleSheet.create({
    back: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
    },
    map: {
        width: Dimensions.get('screen').width - 30,
        height: 400,
        marginRight: 60,
    },
});

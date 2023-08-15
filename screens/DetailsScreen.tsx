import {
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NormalHeading from '../components/small/NormalHeading/NormalHeading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import images from '../assets/images';
import { IVet } from '../interfaces/Vet.interface';
import { IAppointment } from '../interfaces/Appointment.interface';

const DetailsScreen = ({ route }: { route: any }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    let [fontsLoaded] = useFonts({
        'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    const {
        vet,
        appointment,
        formattedTimeRange,
        formattedDate,
    }: {
        vet: IVet;
        appointment: IAppointment;
        formattedTimeRange: string;
        formattedDate: string;
    } = route.params;

    const navigateRoom = () => {
        if (appointment.type === 'virtual') {
            navigation.navigate('ChatScreen');
        }
    };

    return (
        <SafeAreaView className="h-full bg-white relative">
            <ScrollView>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.back}
                >
                    <Text>
                        {' '}
                        <MaterialIcons
                            color={'#000'}
                            size={30}
                            name="arrow-back"
                        />{' '}
                    </Text>
                </TouchableOpacity>
                <View className="mt-10 p-6">
                    <NormalHeading text="Appointment Details" />
                    <View
                        style={styles.toast}
                        className="my-5 flex-row px-3 py-3 rounded-sm border-l-[6px] border-primary bg-white"
                    >
                        <MaterialIcons name="info" size={20} color="#40B37C" />
                        <Text className="ml-2 w-[90%]">
                            Tap{' '}
                            <Text className="font-bold">
                                {appointment.type === 'virtual'
                                    ? 'Enter Chat Room'
                                    : 'Notify Doctor'}
                            </Text>{' '}
                            on time to let the doctor know you&apos;re here.
                        </Text>
                    </View>
                    <View className="mb-5 w-full p-4 bg-gray-100 rounded-xl">
                        <View className="flex-row pb-3 border-b-[1px] border-gray-300">
                            <MaterialIcons
                                style={styles.calendar}
                                name="calendar-today"
                                size={25}
                            />
                            <View className="mt-1 ml-4">
                                <Text style={{ fontFamily: 'poppins-bold' }}>
                                    Date & Time
                                </Text>
                                <Text className="text-gray-500 font-medium">
                                    {formattedDate}
                                </Text>
                                <Text className="text-gray-500 font-medium">
                                    {formattedTimeRange}
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row border-gray-300 mt-3">
                            <MaterialIcons
                                style={{
                                    ...styles.calendar,
                                    backgroundColor: '#127357',
                                }}
                                color="#fff"
                                name={
                                    appointment.type === 'virtual'
                                        ? 'chat'
                                        : 'location-on'
                                }
                                size={25}
                            />
                            <View className="mt-1 ml-4">
                                <Text style={{ fontFamily: 'poppins-bold' }}>
                                    Appointment Type
                                </Text>
                                <Text className="text-gray-500 font-medium">
                                    {appointment.type === 'virtual'
                                        ? 'Chat'
                                        : 'Physical'}
                                </Text>
                                <Pressable
                                    onPress={navigateRoom}
                                    className="px-6 py-2 bg-primary rounded-md mt-4"
                                >
                                    <Text className="text-white text-base font-bold">
                                        {appointment.type === 'virtual'
                                            ? 'Enter Chat Room'
                                            : 'Notify Doctor'}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <NormalHeading text="Doctor Info" />
                    <View className="my-4 mb-6 flex-row items-center">
                        <View>
                            {vet.avatar ? (
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: vet.avatar }}
                                />
                            ) : (
                                <Image
                                    style={styles.avatar}
                                    source={images.doctor_image}
                                />
                            )}
                        </View>
                        <View className="ml-4">
                            <Text
                                style={{ fontFamily: 'poppins-bold' }}
                                className="text-base"
                            >
                                {vet.username}
                            </Text>
                            <Text className="text-gray-400">
                                {vet.fieldOfStudy}
                            </Text>
                        </View>
                    </View>
                    <NormalHeading text="Payment Info" />
                    <View
                        style={styles.toast}
                        className="bg-white rounded-xl p-4 mt-4"
                    >
                        <View className="flex-row justify-between my-2">
                            <Text
                                style={{ fontFamily: 'poppins-regular' }}
                                className="text-base"
                            >
                                Total Price
                            </Text>
                            <Text
                                style={{ fontFamily: 'poppins-regular' }}
                                className="text-base"
                            >
                                Rs.{vet.fee}
                            </Text>
                        </View>
                        <View className="flex-row justify-between my-2">
                            <Text
                                style={{ fontFamily: 'poppins-regular' }}
                                className="text-base"
                            >
                                Processing Fees
                            </Text>
                            <Text
                                style={{ fontFamily: 'poppins-regular' }}
                                className="text-base"
                            >
                                Rs.75
                            </Text>
                        </View>
                        <View className="flex-row justify-between my-2">
                            <Text
                                style={{ fontFamily: 'poppins-bold' }}
                                className="text-base"
                            >
                                Payment Total
                            </Text>
                            <Text
                                style={{ fontFamily: 'poppins-bold' }}
                                className="text-base"
                            >
                                Rs.{vet.fee + 75}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    back: {
        position: 'absolute',
        top: 25,
        left: 20,
        zIndex: 10,
    },
    toast: {
        width: Dimensions.get('screen').width - 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    calendar: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 100,
        width: 45,
        height: 45,
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 100,
    },
});

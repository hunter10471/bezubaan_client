import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Lottie from 'lottie-react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';
import { IAppointment } from '../interfaces/Appointment.interface';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';
import { Image } from 'react-native';
import images from '../assets/images';

const SuccessfulScreen = ({ route }: { route: any }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    let [fontsLoaded] = useFonts({
        'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    });
    const { appointment }: { appointment: IAppointment } = route.params;
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <SafeAreaView className="bg-white h-full">
            <View className="h-full items-center justify-center">
                <Lottie
                    style={{ width: 200, height: 200 }}
                    source={require('../assets/images/successful.json')}
                    autoPlay
                    duration={4000}
                    loop={false}
                />
                <Text
                    style={{ fontFamily: 'poppins-bold' }}
                    className="text-2xl text-center mt-[-20px]"
                >
                    Appointment has been set successfully!
                </Text>
                <View className="border-2 border-orange-500 rounded-xl p-3 mt-10 mb-5 w-[92%]">
                    <Text className="font-bold mb-2">
                        Please submit your fee of amount{' '}
                        <Text className="text-xl font-bold">
                            {' '}
                            {appointment.amount}{' '}
                        </Text>{' '}
                        in the following methods to confirm your appointment :
                    </Text>
                    <View className="flex-row gap-1 items-center my-1">
                        <FontAwesomeIcons
                            size={20}
                            color={'#000'}
                            name="landmark"
                        />
                        <Text className="text-base">
                            <Text className="font-bold"> Bank Account</Text> :{' '}
                            <Text className="font-light">PKBB123090675734</Text>
                        </Text>
                    </View>
                    <View className="flex-row gap-1 items-center my-1">
                        <Image
                            source={images.easypaisa}
                            className="w-[20px] h-[30px]"
                        />
                        <Text className="text-base">
                            <Text className="font-bold"> EasyPaisa : </Text>
                            <Text className="font-light">03335207939</Text>
                        </Text>
                    </View>
                    <View className="flex-row gap-2 mt-2">
                        <FontAwesomeIcons
                            size={15}
                            color={'#000'}
                            name="exclamation"
                        />
                        <Text className="text-neutral-500 font-medium text-xs w-[90%]">
                            Unpaid appointments will be cancelled and will not
                            be entertained in any way.
                        </Text>
                    </View>
                </View>
                <Pressable
                    onPress={() => navigation.navigate('AppointmentsScreen')}
                    className=" bg-primary border-2 border-primary w-[80%] py-4 px-6 rounded-xl my-2"
                >
                    <Text className="text-center text-white font-bold text-base">
                        Check my appointments
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('HomeScreen')}
                    className="border-2 border-primary py-4 px-6 w-[80%] rounded-xl my-2"
                >
                    <Text className="text-center text-primary font-bold text-base">
                        Back to home
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default SuccessfulScreen;

const styles = StyleSheet.create({});

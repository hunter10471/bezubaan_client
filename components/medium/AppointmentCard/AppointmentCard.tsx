import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import images from '../../../assets/images';
import { Image } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../interfaces/navigation.interface';
import { IAppointment } from '../../../interfaces/Appointment.interface';
import { IVet } from '../../../interfaces/Vet.interface';
import { getVetById } from '../../../api/vet.api';
import moment from 'moment';
import { updateAppointment } from '../../../api/appointment.api';
import { Status } from '../../../common/enum';

interface IAppointmentCardProps {
    appointment: IAppointment;
    upcoming?: boolean;
    fetchAppointments?: () => void;
}

const AppointmentCard: React.FC<IAppointmentCardProps> = ({
    appointment,
    upcoming,
    fetchAppointments,
}) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [vet, setVet] = useState<IVet>();
    const formattedDate = moment(appointment.appointmentDate).format(
        'ddd MMM DD YYYY'
    );
    const firstTime = moment(appointment.appointmentDate).format('hh:mm A');
    const secondTime = moment(appointment.appointmentDate)
        .add(30, 'minutes')
        .format('hh:mm A');

    const formattedTimeRange = `${firstTime} - ${secondTime}`;
    const specificTime = moment(appointment.appointmentDate).set({
        hour: 10,
        minute: 30,
    });

    function isCurrentTimeFiveMinutesBefore() {
        const currentTime = moment();
        const fiveMinutesBefore = specificTime.clone().subtract(5, 'minutes');

        return (
            currentTime.isBefore(specificTime) &&
            currentTime.isAfter(fiveMinutesBefore)
        );
    }

    //The useEffect below has to be replaced with a proper mongoDB relational query to prevent running this effect on all cards.
    useEffect(() => {
        const fetchVet = async () => {
            const response = await getVetById(appointment.vetId);
            if (response) setVet(response);
        };
        fetchVet();
    }, []);
    let [fontsLoaded] = useFonts({
        'poppins-bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
        'poppins-medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    const onCancel = async () => {
        try {
            const response = await updateAppointment(appointment._id, {
                status: Status.CANCELLED,
            });
            if (response && fetchAppointments) fetchAppointments();
        } catch (error) {
            console.log(error);
        }
    };

    const createAlert = () => {
        Alert.alert(
            'Cancel Appointment',
            'Are you sure you want to cancel your appointment ? \nAppointments cancelled within 6 HOURS of the appointment are not eligible for any refunds.',
            [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    onPress: onCancel,
                },
            ],
            { cancelable: true }
        );
    };

    if (!vet) return null;
    return (
        <View style={styles.card}>
            {isCurrentTimeFiveMinutesBefore() && (
                <Text className="bg-primary text-white font-bold text-xs text-center py-1 rounded-xl my-1">
                    UPCOMING APPOINTMENT
                </Text>
            )}
            <View className="items-center justify-between my-2 pb-3 border-b-2 border-gray-100 flex-row-reverse">
                <TouchableOpacity>
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
                </TouchableOpacity>
                <View className="ml-4">
                    <Text
                        style={{ fontFamily: 'poppins-bold' }}
                        className="text-base"
                    >
                        {vet.username}
                    </Text>
                    <Text className="text-gray-400">{vet.fieldOfStudy}</Text>
                </View>
            </View>
            <Text className="text-xs font-medium text-gray-400 my-1">
                Appointment date
            </Text>
            <View className="flex-row items-center justify-between ">
                <View className="flex-row items-center">
                    <MaterialIcons size={20} color="gray" name="calendar" />
                    <Text
                        className="mt-[1px] text-gray-600 ml-1 text-xs"
                        style={{ fontFamily: 'poppins-medium' }}
                    >
                        {formattedDate}
                    </Text>
                </View>
                <View className="flex-row items-center ml-2">
                    <MaterialIcons size={20} color="gray" name="clock" />
                    <Text
                        className="mt-[1px] text-gray-600 ml-1 text-xs"
                        style={{ fontFamily: 'poppins-medium' }}
                    >
                        {formattedTimeRange}
                    </Text>
                </View>
            </View>
            <View className="flex-row items-center ">
                <MaterialIcons
                    size={20}
                    color={
                        appointment.status === 'done' ||
                        appointment.status === 'pending'
                            ? 'lightgreen'
                            : 'red'
                    }
                    name="circle"
                />
                <Text
                    className="mt-2 font-medium text-gray-600 ml-1"
                    style={{ fontFamily: 'poppins-medium' }}
                >
                    {appointment.status === 'pending' &&
                    appointment.paymentStatus === 'paid'
                        ? 'Confirmed'
                        : appointment.status}
                </Text>
            </View>
            {upcoming && (
                <View className="flex-row justify-center mt-1">
                    <Pressable
                        onPress={createAlert}
                        className="bg-gray-100 p-3 rounded-xl w-[50%] mr-1"
                    >
                        <Text className="text-base font-medium text-gray-500 text-center">
                            Cancel
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            navigation.navigate('DetailsScreen', {
                                appointment,
                                vet,
                                formattedDate,
                                formattedTimeRange,
                            })
                        }
                        className={`${
                            isCurrentTimeFiveMinutesBefore()
                                ? 'bg-primary'
                                : 'bg-primary/50'
                        } p-3 rounded-xl w-[50%] ml-1`}
                    >
                        <Text className="text-base font-medium text-white text-center">
                            Check In
                        </Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

export default AppointmentCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        marginBottom: 15,
        elevation: 5,
        shadowColor: '#52006A',
        position: 'relative',
        borderLeftWidth: 6,
        borderLeftColor: '#40B37C',
    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 100,
    },
    menu: {
        position: 'absolute',
        top: -20,
        right: 0,
    },
});

import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '../../../assets/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IAppointment } from '../../../interfaces/Appointment.interface';
import { IVet } from '../../../interfaces/Vet.interface';
import { getVetById } from '../../../api/vet.api';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../interfaces/navigation.interface';

interface IUpcomingAppointmentProps {
    appointment: IAppointment;
}

const UpcomingAppointment: React.FC<IUpcomingAppointmentProps> = ({
    appointment,
}) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const [vet, setVet] = useState<IVet>();
    const appointmentDate = moment(appointment.appointmentDate);
    const now = moment();
    const formattedDate = appointmentDate.isSame(now, 'day')
        ? 'Today'
        : appointmentDate.format('MMM DD, YYYY');
    const formattedTime = `${appointmentDate.format(
        'hh:mm A'
    )} - ${appointmentDate.add(30, 'minutes').format('hh:mm A')}`;
    const fetchVet = async () => {
        try {
            const response = await getVetById(appointment.vetId);
            if (response) setVet(response);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchVet();
    }, []);
    return (
        <Pressable
            onPress={() => navigation.navigate('AppointmentsScreen')}
            className="bg-green-800 rounded-xl flex-row p-4 my-4 justify-between items-center"
        >
            <View className="items-center">
                {vet?.avatar ? (
                    <Image style={styles.avatar} source={{ uri: vet.avatar }} />
                ) : (
                    <Image style={styles.avatar} source={images.doctor_image} />
                )}
                <View className="my-2">
                    <Text
                        style={{ fontFamily: 'poppins-bold' }}
                        className="text-base text-white text-center"
                    >
                        {vet?.clinicName || vet?.username}
                    </Text>
                    <Text className="text-white text-center text-light">
                        {vet?.fieldOfStudy}
                    </Text>
                </View>
            </View>
            <View className="p-3 bg-green-600 rounded-lg w-[50%]">
                <MaterialIcons size={30} color="#fff" name="location-on" />
                <Text className="text-white font-medium mt-1 text-base">
                    {vet?.clinicName}
                    {vet?.address}
                </Text>
                <Text className="text-white font-medium mt-1 text-xs">
                    {formattedDate}, {formattedTime}
                </Text>
            </View>
        </Pressable>
    );
};

export default UpcomingAppointment;

const styles = StyleSheet.create({
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 100,
        marginRight: 20,
    },
});

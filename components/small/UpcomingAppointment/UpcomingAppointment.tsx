import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import images from '../../../assets/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { IAppointment } from '../../../interfaces/Appointment.interface';
import { IVet } from '../../../interfaces/Vet.interface';
import { getVetById } from '../../../api/vet.api';

interface IUpcomingAppointmentProps {
    appointment: IAppointment;
}

const UpcomingAppointment: React.FC<IUpcomingAppointmentProps> = ({
    appointment,
}) => {
    const [vet, setVet] = useState<IVet>();
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
        <View className="bg-green-800 rounded-xl flex-row p-4 my-4 justify-between">
            <View>
                <TouchableOpacity>
                    {vet?.avatar ? (
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
                <View className="my-2">
                    <Text
                        style={{ fontFamily: 'poppins-bold' }}
                        className="text-base text-white"
                    >
                        {vet?.clinicName || vet?.username}
                    </Text>
                    <Text className="text-white">{vet?.fieldOfStudy}</Text>
                </View>
            </View>
            <View className="m-3 p-3 bg-green-600 rounded-lg">
                <MaterialIcons size={30} color="#fff" name="location-on" />
                <Text className="text-white font-medium mt-1 text-base">
                    {vet?.clinicName}
                    {vet?.address}
                </Text>
                <Text className="text-white font-medium mt-1 text-xs">
                    Today, 01:00 PM
                </Text>
            </View>
        </View>
    );
};

export default UpcomingAppointment;

const styles = StyleSheet.create({
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 100,
    },
});

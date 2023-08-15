import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import NormalHeading from '../components/small/NormalHeading/NormalHeading';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaymentStatus, Status, Type } from '../common/enum';
import { createAppointment } from '../api/appointment.api';
import { IVet } from '../interfaces/Vet.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const BookingScreen = ({ route }: { route: any }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const authState = useSelector((state: RootState) => state.user);
    const [type, setType] = useState<Type>();
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [review, setReview] = useState<string>('');

    const {
        vet,
        appointmentDate,
        petId,
    }: { vet: IVet; appointmentDate: string; petId: string } = route.params;

    const date = new Date(appointmentDate);

    const methodPress = (method: 'chat' | 'visit') => {
        if (method === 'chat') {
            setType(Type.VIRTUAL);
        } else {
            setType(Type.PHYSICAL);
        }
    };

    const onSubmit = async () => {
        try {
            if (authState._id && type) {
                setLoading(true);
                const response = await createAppointment({
                    type,
                    amount: vet.fee,
                    appointmentDate: date,
                    paymentStatus: PaymentStatus.UNPAID,
                    petId,
                    rating: 5,
                    review,
                    status: Status.PENDING,
                    userId: authState._id,
                    vetId: vet._id,
                });
                if (response)
                    navigation.navigate('SuccessfulScreen', {
                        appointment: response,
                    });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!type) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [type]);

    return (
        <SafeAreaView className="h-full bg-white">
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
            <View style={{ marginTop: 50 }} className="p-6 relative">
                <NormalHeading text="Choose Method of Consultation" />
                <View className="flex-row justify-evenly items-center my-10">
                    <Pressable
                        onPress={() => methodPress('chat')}
                        className={`${
                            type === Type.VIRTUAL ? 'bg-primary' : 'bg-white'
                        } border-2 border-primary p-4 rounded-xl w-[120px] items-center`}
                    >
                        <MaterialIcons
                            color={type === Type.VIRTUAL ? '#fff' : '#40B37C'}
                            size={40}
                            name="chat"
                        />
                        <Text
                            className={`text-lg ${
                                type === Type.VIRTUAL
                                    ? 'text-white'
                                    : 'text-primary'
                            }`}
                        >
                            Via Chat
                        </Text>
                    </Pressable>
                    <NormalHeading text="OR" />
                    <Pressable
                        onPress={() => methodPress('visit')}
                        className={`${
                            type === Type.PHYSICAL ? 'bg-primary' : 'bg-white'
                        } border-2 border-primary p-4 rounded-xl w-[120px] items-center`}
                    >
                        <MaterialIcons
                            color={type === Type.PHYSICAL ? '#fff' : '#40B37C'}
                            size={40}
                            name="location-on"
                        />
                        <Text
                            className={`text-lg ${
                                type === Type.PHYSICAL
                                    ? 'text-white'
                                    : 'text-primary'
                            }`}
                        >
                            Via Visit
                        </Text>
                    </Pressable>
                </View>
                <NormalHeading text="List symptoms or any special notes you'd like the doctor to know" />
                <TextInput
                    onChangeText={(text) => setReview(text)}
                    style={{ height: 200, textAlignVertical: 'top' }}
                    multiline
                    numberOfLines={10}
                    className="p-4 my-6 text-base- border-2 rounded-xl border-primary"
                    placeholder="List any relevant symptoms..."
                />
                <Pressable
                    onPress={onSubmit}
                    className={`${
                        disabled ? 'bg-neutral-300' : 'bg-primary'
                    }  py-4 w-full px-4 rounded-xl my-2`}
                >
                    <Text className="text-center text-white font-bold">
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            'Confirm Your Appointment'
                        )}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default BookingScreen;

const styles = StyleSheet.create({
    back: {
        position: 'absolute',
        top: 70,
        left: 20,
        zIndex: 10,
    },
});

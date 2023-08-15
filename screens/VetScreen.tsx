import {
    Animated,
    Easing,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../assets/images';
import NormalHeading from '../components/small/NormalHeading/NormalHeading';
import { AirbnbRating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import QualificationLine from '../components/small/QualificationLine/QualificationLine';
import { Calendar, DateData } from 'react-native-calendars';
import TimePills from '../components/medium/TimePills/TimePills';
import { IVet } from '../interfaces/Vet.interface';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import PetItem from '../components/medium/PetItem/PetItem';
import { getUserPets } from '../api/pet.api';
import { getUserAppointments } from '../api/appointment.api';
import { updateAppointments, updatePets } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { IPet } from '../interfaces/Pet.interface';

const VetScreen = ({ route }: { route: any }) => {
    const vet: IVet = route.params.vet;
    const authState = useSelector((state: RootState) => state.user);
    const dimensions = useWindowDimensions();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [pet, setPet] = useState<IPet>();
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [appointmentDate, setAppointmentDate] = useState<string>('');
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (date !== '' && time !== '' && pet) {
            const combinedDate = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
            const jsDate = combinedDate.toDate();
            setAppointmentDate(jsDate.toString());
            setDisabled(false);
        } else {
            setDisabled(true);
            setAppointmentDate('');
        }
    }, [date, time]);

    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: -dimensions.width + 30,
            duration: 300,
            easing: Easing.exp,
            useNativeDriver: true,
        }).start();
    };

    const backAnimation = () => {
        Animated.timing(animation, {
            toValue: 0,
            easing: Easing.exp,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const onDayPress = (day: DateData) => {
        startAnimation();
        setDate(day.dateString);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (authState._id) {
                if (authState.pets) {
                    const pets = await getUserPets(authState._id);
                    if (pets) dispatch(updatePets(pets));
                }
                if (authState.appointments) {
                    const appointments = await getUserAppointments(
                        authState._id
                    );
                    if (appointments)
                        dispatch(updateAppointments(appointments));
                }
            }
        };
        fetchData();
    }, []);

    return (
        <SafeAreaView className="h-full bg-white">
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
                    source={images.doctor_image}
                />
            )}
            <ScrollView>
                <View
                    style={{ marginTop: dimensions.height / 3 }}
                    className="bg-white h-full flex-wrap p-4 rounded-xl justify-between flex flex-row relative"
                >
                    <View>
                        <NormalHeading text={vet.username} />
                        <Text className="text-gray-500">
                            {vet.fieldOfStudy}
                        </Text>
                    </View>
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
                    <View className="w-full mt-4">
                        <QualificationLine
                            title={`${vet.yearsOfExperience}+ Years of veterinary experience`}
                        />
                        <QualificationLine
                            title={`${vet.fieldOfStudy} Specialist`}
                        />
                        <QualificationLine title="Available 24/7" />
                    </View>
                    {vet.description && (
                        <>
                            <Text className="text-lg font-bold text-gray-700 my-2">
                                About
                            </Text>
                            <Text className="text-base text-gray-600">
                                Meet {vet.username}, an experienced vet with a
                                passion for equine medicine.{'\n'}With over{' '}
                                {vet.yearsOfExperience} years of experience,{' '}
                                {vet.username} specializes in treating{' '}
                                {vet.specializations.join(',')}.{'\n'}
                                {vet.description}
                            </Text>
                        </>
                    )}
                    <View>
                        <Text className="text-lg font-bold text-gray-700 my-4">
                            Who's getting checked ?
                        </Text>
                        <FlatList
                            className="flex-1"
                            data={authState.pets}
                            horizontal
                            renderItem={({ item }) => (
                                <PetItem
                                    setPet={setPet}
                                    petId={pet?._id}
                                    pet={item}
                                />
                            )}
                        />
                    </View>
                    <Text className="text-lg font-bold text-gray-700 my-8">
                        Choose an appointment slot
                    </Text>
                    <Animated.View
                        style={{ transform: [{ translateX: animation }] }}
                        className="flex-row w-full"
                    >
                        <Calendar
                            markedDates={{
                                [date]: {
                                    selected: true,
                                    disableTouchEvent: true,
                                    selectedColor: '#40B37C',
                                },
                            }}
                            onDayPress={onDayPress}
                            style={{
                                width: dimensions.width - 50,
                                flexShrink: 0,
                                marginRight: 15,
                                marginLeft: 5,
                            }}
                        />
                        <TimePills
                            backAnimation={backAnimation}
                            fromTime="09:00"
                            toTime="16:30"
                            setTime={setTime}
                            time={time}
                        />
                    </Animated.View>

                    <Pressable
                        disabled={appointmentDate === null}
                        onPress={() => {
                            if (appointmentDate && pet?._id)
                                navigation.navigate('BookingScreen', {
                                    vet,
                                    appointmentDate,
                                    petId: pet._id,
                                });
                        }}
                        className={`${
                            disabled ? 'bg-neutral-300' : 'bg-primary'
                        } py-4 w-full px-4 rounded-xl mt-10 mb-2`}
                    >
                        <Text className="text-center text-white font-bold">
                            Book Your Appointment
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default VetScreen;

const styles = StyleSheet.create({
    back: {
        position: 'absolute',
        top: -50,
        left: 20,
        zIndex: 10,
    },
});

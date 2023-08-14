import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../assets/images';
import MaterialIcons from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons2 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';
import { RegisterUser } from '../interfaces/User.interface';
import { createUser } from '../api/user.api';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Alert from '../components/medium/Alert/Alert';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import InputWithLabel from '../components/small/InputWithLabel/InputWithLabel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated } from 'react-native';
import { Easing } from 'react-native';
import { Gender } from '../common/enum';

const VetSignupScreen = () => {
    const dimensions = useWindowDimensions();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch();
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] =
        useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<string>('');
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [form, setForm] = useState<RegisterUser>({
        username: '',
        avatar: '',
        email: '',
        gender: Gender.OTHER,
        password: '',
    });

    const startAnimation = () => {
        Animated.timing(animation, {
            toValue: -dimensions.width + 20,
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

    const handleSubmitForm = async () => {
        setLoading(true);
        if (confirmPassword !== form.password) {
            setConfirmPasswordError(true);
        } else {
            try {
                const user = await createUser(form);
                if (user) {
                    dispatch(login(user));
                    setError(false);
                    setSuccess(true);
                    await AsyncStorage.setItem('loggedIn', 'true');
                    navigation.navigate('HomeScreen', undefined);
                } else
                    throw new Error('There was an error signing up the user.');
            } catch (error) {
                console.log(error);
                setError(true);
                setSuccess(false);
            }
        }
        setLoading(false);
    };
    const onPressLoginNavigate = () => {
        navigation.navigate('LoginScreen', undefined);
    };
    const onPressOwnerNavigate = () => {
        navigation.navigate('SignupScreen', undefined);
    };
    let [fontsLoaded] = useFonts({
        'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
        'poppins-regular': require('../assets/fonts/Poppins-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <SafeAreaView className="bg-white flex-1">
            <Image
                style={[
                    {
                        width: dimensions.width,
                        height: '30%',
                        resizeMode: 'contain',
                    },
                ]}
                source={images.doctors}
            />
            <ScrollView>
                <View className="m-4 mt-2 items-center">
                    <Text
                        style={{ fontFamily: 'poppins-bold' }}
                        className="text-3xl mx-2 my-1 text-heading"
                    >
                        Sign Up
                    </Text>
                    <Text className="text-xs mx-2 mb-2 text-gray-500">
                        Enter your details below to create your bezubaan vet
                        account.
                    </Text>
                    <Animated.View
                        style={{ transform: [{ translateX: animation }] }}
                        className="flex-row w-full"
                    >
                        <View className="mx-4 items-center">
                            <InputWithLabel
                                onChangeText={(text) =>
                                    setForm({ ...form, username: text })
                                }
                                icon={
                                    <MaterialIcons
                                        name="user-alt"
                                        size={17}
                                        color={'#40B37C'}
                                    />
                                }
                                label="Full Name"
                            />
                            <InputWithLabel
                                onChangeText={(text) =>
                                    setForm({ ...form, email: text })
                                }
                                icon={
                                    <MaterialIcons2
                                        name="email"
                                        size={20}
                                        color={'#40B37C'}
                                    />
                                }
                                label="Email"
                            />
                            <InputWithLabel
                                onChangeText={(text) =>
                                    setForm({ ...form, password: text })
                                }
                                icon={
                                    <MaterialIcons
                                        name="lock"
                                        size={17}
                                        color={'#40B37C'}
                                    />
                                }
                                label="Password"
                            />
                            <InputWithLabel
                                onChangeText={(text) =>
                                    setConfirmPassword(text)
                                }
                                icon={
                                    <MaterialIcons
                                        name="lock"
                                        size={17}
                                        color={'#40B37C'}
                                    />
                                }
                                label="Confirm Password"
                            />
                            <TouchableOpacity
                                onPress={startAnimation}
                                style={{
                                    ...styles.button,
                                    padding: 20,
                                    borderRadius: 100,
                                }}
                            >
                                <Text
                                    style={{ fontFamily: 'poppins-bold' }}
                                    className="text-center text-white"
                                >
                                    <MaterialIcons
                                        size={20}
                                        name="arrow-right"
                                    />
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="mx-2 items-center">
                            <InputWithLabel
                                onChangeText={(text) =>
                                    setForm({ ...form, username: text })
                                }
                                icon={
                                    <MaterialIcons
                                        name="address-card"
                                        size={20}
                                        color={'#40B37C'}
                                    />
                                }
                                label="License Number"
                            />
                            <InputWithLabel
                                onChangeText={(text) =>
                                    setForm({ ...form, username: text })
                                }
                                icon={
                                    <MaterialIcons
                                        name="check-circle"
                                        size={20}
                                        color={'#40B37C'}
                                    />
                                }
                                label="Area of Specialization"
                            />
                            <Text className="text-sm font-bold text-gray-500 m-2 italic">
                                Only Fill below if you are a clinic/hospital*
                            </Text>
                            <InputWithLabel
                                onChangeText={(text) =>
                                    setForm({ ...form, username: text })
                                }
                                icon={
                                    <MaterialIcons
                                        name="hospital"
                                        size={20}
                                        color={'#40B37C'}
                                    />
                                }
                                label="Clinic/Hospital name"
                            />
                            <InputWithLabel
                                multiline={true}
                                lines={3}
                                onChangeText={(text) =>
                                    setForm({ ...form, username: text })
                                }
                                icon={
                                    <MaterialIcons
                                        name="map-marker-alt"
                                        size={20}
                                        color={'#40B37C'}
                                    />
                                }
                                label="Address"
                            />
                            <TouchableOpacity
                                onPress={startAnimation}
                                style={{
                                    ...styles.button,
                                    width: dimensions.width - 80,
                                }}
                            >
                                <Text
                                    style={{ fontFamily: 'poppins-bold' }}
                                    className="text-center text-white"
                                >
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                    {error && (
                        <Alert
                            text="There was an error signing you up."
                            type="error"
                        />
                    )}
                    <TouchableOpacity onPress={onPressLoginNavigate}>
                        <Text className="text-center text-gray-400 font-bold my-4">
                            Already have an account?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressOwnerNavigate}>
                        <Text className="text-center text-heading font-bold">
                            Create an account as a pet owner
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.back}
            >
                <MaterialIcons2 size={25} name="arrow-back" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default VetSignupScreen;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#40B37C',
        textAlign: 'center',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 10,
    },
    back: {
        position: 'absolute',
        top: 60,
        left: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonModal: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonOutlined: {
        borderColor: '#40B37C',
        borderWidth: 2,
        textAlign: 'center',
        paddingVertical: 15,
        marginTop: 10,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

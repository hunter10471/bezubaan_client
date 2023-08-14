import {
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useWindowDimensions,
    ActivityIndicator,
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
import { Gender } from '../common/enum';

const SignupScreen = () => {
    const dimensions = useWindowDimensions();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const dispatch = useDispatch();
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmPasswordError, setConfirmPasswordError] =
        useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [form, setForm] = useState<RegisterUser>({
        username: '',
        avatar: '',
        email: '',
        gender: Gender.OTHER,
        password: '',
    });
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
    const onPressVetNavigate = () => {
        navigation.navigate('VetSignupScreen', undefined);
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
                        resizeMode: 'cover',
                    },
                ]}
                source={images.welcome}
            />
            <ScrollView>
                <View className="m-4 mt-0 items-center">
                    <Text
                        style={{ fontFamily: 'poppins-bold' }}
                        className="text-3xl mx-2 my-1 text-heading"
                    >
                        Sign Up
                    </Text>
                    <Text className="text-xs mx-2 mb-2 text-gray-500">
                        Enter your details below to create your bezubaan
                        account.
                    </Text>
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
                        label="Username"
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
                        onChangeText={(text) => setConfirmPassword(text)}
                        icon={
                            <MaterialIcons
                                name="lock"
                                size={17}
                                color={'#40B37C'}
                            />
                        }
                        label="Confirm Password"
                    />
                    {error && (
                        <Alert
                            text="There was an error signing you up."
                            type="error"
                        />
                    )}
                    <TouchableOpacity
                        onPress={handleSubmitForm}
                        style={{
                            ...styles.button,
                            width: dimensions.width - 80,
                        }}
                    >
                        <Text
                            style={{ fontFamily: 'poppins-bold' }}
                            className="text-center text-white"
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                'Create Account'
                            )}
                        </Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{...styles.buttonOutlined,  width:dimensions.width - 80 }} >
          <Image source={images.google} />
          <Text style={{fontFamily:'poppins-bold'}} className='ml-4 text-center text-primary'>{loading ? <ActivityIndicator color='#fff' /> : 'Sign Up With Google' }</Text>
        </TouchableOpacity> */}
                    <TouchableOpacity onPress={onPressLoginNavigate}>
                        <Text className="text-center text-gray-400 font-bold my-4">
                            Already have an account?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressVetNavigate}>
                        <Text className="text-center text-heading font-bold">
                            Create an account as a vet
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

export default SignupScreen;

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

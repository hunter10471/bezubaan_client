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
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../assets/images';
import MaterialIcons from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons2 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';
import { Gender, IUser } from '../interfaces/User.interface';
import { createUser } from '../api/user.api';
import SocialLoginButton from '../components/small/SocialLoginButton/SocialLoginButton';

const SignupScreen = () => {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [form, setForm] = useState<IUser>({
    username: '',
    avatar: '',
    email: '',
    gender: Gender.OTHER,
    password: '',
  });
  const handleSubmitForm = async () => {
    if (confirmPassword !== form.password) {
      setConfirmPasswordError(true);
    } else {
      try {
        await createUser(form);
        setError(false);
        setSuccess(true);
        setTimeout(() => {
          navigation.navigate('HomeScreen', undefined);
        }, 5000);
      } catch (error) {
        console.log(error);
        setError(true);
        setSuccess(false);
      }
    }
  };
  const onPressLoginNavigate = () => {
    navigation.navigate('LoginScreen', undefined);
  };
  return (
    <SafeAreaView className='bg-white h-full'>
      <Image
        style={[
          {
            width: dimensions.width,
            height: '30%',
            resizeMode: 'cover',
          },
        ]}
        source={images.signup}
      />
      <View className='m-4 mt-2'>
        <Text className='text-3xl font-bold mx-2 mb-1 text-primary'>
          Sign Up
        </Text>
        <Text className='text-xs mx-2 mb-2 text-gray-500'>
          Enter your details below to create your bezuban account.
        </Text>
        <View className='flex flex-row items-center gap-4 my-2 bg-gray-100 mx-2 px-2 py-1 rounded-[10px]'>
          <MaterialIcons name='user-alt' size={15} color={'#666'} />
          <TextInput
            className='w-full'
            placeholder='Username'
            keyboardType='default'
            onChangeText={(text) => setForm({ ...form, username: text })}
          />
        </View>
        <View className='flex flex-row items-center gap-4 my-2 bg-gray-100 mx-2 px-2 py-1 rounded-[10px]'>
          <MaterialIcons2 name='email' size={17} color={'#666'} />
          <TextInput
            placeholder='Email'
            keyboardType='default'
            onChangeText={(text) => setForm({ ...form, email: text })}
            className='w-full'
          />
        </View>

        <View className='flex flex-row items-center gap-4 my-2 bg-gray-100 mx-2 px-2 py-1 rounded-[10px]'>
          <MaterialIcons name='lock' size={15} color={'#666'} />
          <TextInput
            className='w-full'
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
        </View>
        <View className='flex flex-row items-center gap-4 my-2 bg-gray-100 mx-2 px-2 py-1 rounded-[10px]'>
          <MaterialIcons name='lock' size={15} color={'#666'} />
          <TextInput
            className='w-full'
            placeholder='Confirm password'
            secureTextEntry={true}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <TouchableOpacity onPress={handleSubmitForm} style={styles.button}>
          <Text className='text-center text-white font-bold'>
            Create Account
          </Text>
        </TouchableOpacity>
        <Text className='text-center text-gray-400 font-bold mb-5'>
            OR
          </Text>
        <View className='flex flex-row justify-center mb-5'>
          <SocialLoginButton color='#4267B2' type='facebook' />
          <SocialLoginButton color='#d62d20' type='google' />
          <SocialLoginButton color='#00acee' type='twitter' />
        </View>
      
        <TouchableOpacity onPress={onPressLoginNavigate}>
          <Text className='text-center text-gray-400 font-bold'>
            Already have an account?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <MaterialIcons2 size={25} name='arrow-back' />
      </TouchableOpacity>
      <Modal
        animationType='slide'
        transparent={true}
        visible={success}
        onRequestClose={() => {
          setSuccess(success);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Your account has been created successfully. You will be redirected
              to home.
            </Text>
            <Pressable onPress={() => setSuccess(!success)}>
              <Text className='bg-primary px-4 py-2 text-white rounded-[10px]'>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#40B37C',
    textAlign: 'center',
    paddingVertical: 15,
    marginVertical: 20,
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
});

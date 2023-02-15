import {
  Image,
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
import { loginUser } from '../api/user.api';

const LoginScreen = () => {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [form, setForm] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  });
  const handleLogin = async () => {
    try {
      await loginUser(form);
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
  };
  const onPressSignupNavigate = () => {
    navigation.navigate('SignupScreen', undefined);
  };
  return (
    <SafeAreaView className='bg-white h-full'>
      <Image
        style={[
          {
            width: dimensions.width,
            height: '35%',
            resizeMode: 'cover',
          },
        ]}
        source={images.login}
      />
      <View className='m-4 mt-4'>
        <Text className='text-3xl font-bold mx-2 mb-1 text-primary'>Login</Text>
        <Text className='text-xs mx-2 mb-2 text-gray-500'>
          Enter your details below to login to your bezuban account.
        </Text>
        <View className='flex flex-row items-center gap-4 my-2 bg-gray-100 mx-2 px-2 py-1 rounded-[10px]'>
          <MaterialIcons name='user-alt' size={15} color={'#666'} />
          <TextInput
            className='w-full'
            placeholder='Username'
            keyboardType='default'
          />
        </View>

        <View className='flex flex-row items-center gap-4 my-2 bg-gray-100 mx-2 px-2 py-1 rounded-[10px]'>
          <MaterialIcons name='lock' size={15} color={'#666'} />
          <TextInput
            placeholder='Password'
            secureTextEntry={true}
            className='w-full'
          />
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text className='text-center text-white font-bold'>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSignupNavigate}>
          <Text className='text-center text-gray-400 font-bold'>
            Don't have an account?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <MaterialIcons2 size={25} name='arrow-back' />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
});

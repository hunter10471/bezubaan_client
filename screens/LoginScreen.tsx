import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../assets/images';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';
import { loginUser } from '../api/user.api';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import Alert from '../components/medium/Alert/Alert';
import InputWithLabel from '../components/small/InputWithLabel/InputWithLabel';




const LoginScreen = () => {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  let [fontsLoaded] = useFonts({
    'poppins-bold': require('../assets/fonts/Poppins-Bold.ttf'),
  })
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]); 
  const [form, setForm] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  });

  const handleLogin = async () => {
    setLoading(true)
    try {
      const user = await loginUser(form);
      if(user){
        dispatch(login(user))
        setError(false);
        setSuccess(true);
        navigation.navigate('HomeScreen', undefined);
      }else throw new Error('There was an error logging in the user.')
    } catch (error) {
      console.log(error);
      setError(true);
      setSuccess(false);
    }
    setLoading(false)
  };

  const onPressSignupNavigate = () => {
    navigation.navigate('SignupScreen', undefined);
  };



  if(!fontsLoaded){
    return <AppLoading/>
  }
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
        source={images.playful_cat}
      />
      <View className='m-4 mt-0 items-center'>
        <Text style={{fontFamily:'poppins-bold'}} className='text-3xl mx-2 mb-1 text-heading'>Login</Text>
        <Text className='text-xs mx-2 mb-2 text-gray-500'>
          Enter your details below to login to your bezubaan account.
        </Text>
        <InputWithLabel icon={<FontAwesome name='user-alt' size={17} color={'#40B37C'} />} label='Username' onChangeText={(text) => setForm({...form, username:text})} />
        <InputWithLabel icon={<FontAwesome name='lock' size={17} color={'#40B37C'} />} label='Password' onChangeText={(text) => setForm({...form, password:text})} />
        {error && <Alert text='There was an error logging you in.' type='error' /> }
        <TouchableOpacity onPress={handleLogin} style={{...styles.button, width:dimensions.width - 80}}>
          <Text style={{fontFamily:'poppins-bold'}} className='text-center text-white'>{loading ? <ActivityIndicator color='#fff' /> : 'Submit' }</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.buttonOutlined,  width:dimensions.width - 80 }} >
          <Image source={images.google} />
          <Text style={{fontFamily:'poppins-bold'}} className='ml-4 text-center text-primary'>{loading ? <ActivityIndicator color='#fff' /> : 'Sign In With Google' }</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSignupNavigate}>
          <Text className='text-center text-gray-400 font-bold mt-10'>
            Don't have an account?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <MaterialIcons size={25} name='arrow-back' />
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
    marginTop: 10,
    borderRadius: 10,
  },
  buttonOutlined: {
    borderColor: '#40B37C',
    borderWidth:2,
    textAlign: 'center',
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 10,
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center'
  },
  back: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
});

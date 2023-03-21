import {
  Image,
  StyleSheet,
  Text,
  TextInput,
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
import SocialLoginButton from '../components/small/SocialLoginButton/SocialLoginButton';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import Alert from '../components/medium/Alert/Alert';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  } from '@react-native-google-signin/google-signin';


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

  // const signInWithGoogle = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const {accessToken, idToken} = await GoogleSignin.signIn();
  //     setloggedIn(true);
  //   } catch (error) {
  //     console.log(error)
  //     setError(true)
  //   }
  // };

  // const signOutWithGoogle = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     setloggedIn(false);
  //     setUserInfo([]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     scopes: ['email'],
  //     webClientId:
  //       '418977770929-g9ou7r9eva1u78a3anassxxxxxxx.apps.googleusercontent.com',
  //     offlineAccess: true,
  //   });
  // }, []);

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
      <View className='m-4 mt-4'>
        <Text style={{fontFamily:'poppins-bold'}} className='text-3xl mx-2 my-1 text-primary'>Login</Text>
        <Text className='text-xs mx-2 mb-2 text-gray-500'>
          Enter your details below to login to your bezubaan account.
        </Text>
        <View className='flex flex-row items-center gap-4 my-2 bg-gray-100 mx-2 px-2 py-1 rounded-[10px]'>
          <FontAwesome name='user-alt' size={15} color={'#666'} />
          <TextInput
            className='w-full'
            placeholder='Username'
            keyboardType='default'
            onChangeText={(text) => setForm({...form, username:text}) }
          />
        </View>

        <View className='flex flex-row items-center gap-4 my-2 bg-gray-100 mx-2 px-2 py-1 rounded-[10px]'>
          <FontAwesome name='lock' size={15} color={'#666'} />
          <TextInput
            placeholder='Password'
            secureTextEntry={true}
            className='w-full'
            onChangeText={(text) => setForm({...form, password:text}) }
          />
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={{fontFamily:'poppins-bold'}} className='text-center text-white'>{loading ? <ActivityIndicator color='#fff' /> : 'Submit' }</Text>
        </TouchableOpacity>
        {error && <Alert text='There was an error logging you in.' type='error' /> }
        <Text className='text-center text-gray-400 font-bold mb-5'>
            OR
          </Text>
        <View className='flex flex-row justify-center mb-5'>
          <SocialLoginButton color='#4267B2' type='facebook' />
          <SocialLoginButton color='#d62d20' type='google' />
          <SocialLoginButton color='#00acee' type='twitter' />
        </View>
        <TouchableOpacity onPress={onPressSignupNavigate}>
          <Text className='text-center text-gray-400 font-bold'>
            Don't have an account?
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <MaterialIcons size={25} name='arrow-back' />
      </TouchableOpacity>
      {/* <Modal
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
      </Modal> */}
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

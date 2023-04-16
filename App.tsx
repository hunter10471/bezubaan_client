import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ClinicScreen from './screens/ClinicScreen';
import VetScreen from './screens/VetScreen';


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='SplashScreen'
          screenOptions={{
            headerShown: false,
          }}
          >
          <Stack.Screen name='SplashScreen' component={SplashScreen} />
          <Stack.Screen name='OnBoardingScreen' component={OnboardingScreen} />
          <Stack.Screen name='SignupScreen' component={SignupScreen} />
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
          <Stack.Screen name='HomeScreen' component={HomeScreen} />
          <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
          <Stack.Screen name='ClinicScreen' component={ClinicScreen} />
          <Stack.Screen name='VetScreen' component={VetScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
          </Provider>
  );
}

import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
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
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}

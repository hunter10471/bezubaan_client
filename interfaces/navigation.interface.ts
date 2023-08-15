import { IVet } from './Vet.interface';

export type RootStackParamList = {
    HomeScreen: { id: number } | undefined;
    SplashScreen: { id: number } | undefined;
    OnBoardingScreen: { id: number } | undefined;
    SignupScreen: { id: number } | undefined;
    LoginScreen: { id: number } | undefined;
    ProfileScreen: { id: number } | undefined;
    ClinicScreen: { vet: IVet } | undefined;
    VetScreen: { vet: IVet } | undefined;
    BookingScreen: { vet: IVet; appointmentDate: string } | undefined;
    SuccessfulScreen: { id: number } | undefined;
    AppointmentsScreen: { id: number } | undefined;
    DetailsScreen: { id: number } | undefined;
    ChatScreen: { id: number } | undefined;
    MessagesScreen: { id: number } | undefined;
    VetSignupScreen: { id: number } | undefined;
    VetListScreen: { id: number } | undefined;
};

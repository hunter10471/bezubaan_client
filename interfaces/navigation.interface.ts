import { IAppointment } from './Appointment.interface';
import { IPet } from './Pet.interface';
import { IVet } from './Vet.interface';

export type RootStackParamList = {
    HomeScreen: { id: number } | undefined;
    SplashScreen: { id: number } | undefined;
    OnBoardingScreen: { id: number } | undefined;
    SignupScreen: { id: number } | undefined;
    LoginScreen: { isVet?: boolean } | undefined;
    ProfileScreen: { id: number } | undefined;
    ClinicScreen: { vet: IVet } | undefined;
    VetScreen: { vet: IVet } | undefined;
    BookingScreen:
        | { vet: IVet; appointmentDate: string; petId: string }
        | undefined;
    SuccessfulScreen: { appointment: IAppointment } | undefined;
    AppointmentsScreen: { id: number } | undefined;
    DetailsScreen:
        | {
              appointment: IAppointment;
              vet: IVet;
              formattedTimeRange: string;
              formattedDate: string;
          }
        | undefined;
    ChatScreen: { id: number } | undefined;
    MessagesScreen: { id: number } | undefined;
    VetSignupScreen: { id: number } | undefined;
    VetListScreen: { tag: string } | undefined;
    AddPetScreen: { id: string } | undefined;
};

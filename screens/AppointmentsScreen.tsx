import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NormalHeading from '../components/small/NormalHeading/NormalHeading';
import AppointmentTabs from '../components/small/AppointmentTabs/AppointmentTabs';
import AppointmentCard from '../components/medium/AppointmentCard/AppointmentCard';
import { IAppointment } from '../interfaces/Appointment.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getUserAppointments } from '../api/appointment.api';

const AppointmentsScreen = () => {
    const [upcomingAppointments, setUpcomingAppointments] = useState<
        IAppointment[]
    >([]);
    const [previousAppointments, setPreviousAppointments] = useState<
        IAppointment[]
    >([]);
    const [tab, setTab] = useState<'upcoming' | 'previous'>('upcoming');
    const [loading, setLoading] = useState(false);
    const authState = useSelector((state: RootState) => state.user);

    const fetchAppointments = async () => {
        setLoading(true);
        if (authState._id) {
            const response = await getUserAppointments(authState._id);
            if (response) {
                const previousAppointments = response.filter(
                    (item) =>
                        item.status === 'done' || item.status === 'cancelled'
                );
                setPreviousAppointments(previousAppointments);
                const nextAppointments = response.filter(
                    (item) =>
                        item.status === 'pending' &&
                        item.paymentStatus === 'paid'
                );
                setUpcomingAppointments(nextAppointments);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <SafeAreaView className="h-full bg-white">
            <View className="p-6">
                <NormalHeading text="My appointments" />
                <AppointmentTabs tab={tab} setTab={setTab} />
                <View>
                    {loading ? (
                        <ActivityIndicator
                            size={40}
                            className="mt-[50%]"
                            color="#40B37C"
                        />
                    ) : tab === 'upcoming' ? (
                        <FlatList
                            data={upcomingAppointments}
                            renderItem={({ item }) => (
                                <AppointmentCard
                                    fetchAppointments={fetchAppointments}
                                    upcoming
                                    appointment={item}
                                />
                            )}
                        />
                    ) : (
                        <FlatList
                            data={previousAppointments}
                            renderItem={({ item }) => (
                                <AppointmentCard appointment={item} />
                            )}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({});

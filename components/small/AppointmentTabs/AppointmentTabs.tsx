import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { SetStateAction, useState } from 'react';

interface IAppointmentTabsProps {
    tab: 'upcoming' | 'previous';
    setTab: SetStateAction<any>;
}

const AppointmentTabs: React.FC<IAppointmentTabsProps> = ({ tab, setTab }) => {
    return (
        <View className="flex-row w-full justify-between my-6 border-primary border-2 rounded-xl">
            <Pressable
                onPress={() => setTab('upcoming')}
                className={`rounded-l-lg p-3 w-[50%] text-center ${
                    tab === 'previous' ? 'bg-white' : 'bg-primary'
                }`}
            >
                <Text
                    className={`font-medium text-base text-center ${
                        tab === 'previous' ? ' text-primary' : ' text-white'
                    }`}
                >
                    Upcoming
                </Text>
            </Pressable>
            <Pressable
                onPress={() => setTab('previous')}
                className={`rounded-r-lg p-3 w-[50%] text-center ${
                    tab !== 'previous' ? 'bg-white' : 'bg-primary'
                }`}
            >
                <Text
                    className={`font-medium text-base text-center ${
                        tab !== 'previous' ? ' text-primary' : ' text-white'
                    }`}
                >
                    Previous
                </Text>
            </Pressable>
        </View>
    );
};

export default AppointmentTabs;

const styles = StyleSheet.create({});

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import images from '../../../assets/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const UpcomingAppointment = () => {
    return (
        <View className="bg-green-800 rounded-xl flex-row p-4 my-4 justify-between">
            <View>
                <TouchableOpacity>
                    <Image style={styles.avatar} source={images.doctor_image} />
                </TouchableOpacity>
                <View className="my-2">
                    <Text
                        style={{ fontFamily: 'poppins-bold' }}
                        className="text-base text-white"
                    >
                        Dr.Syed Rafay
                    </Text>
                    <Text className="text-white">Small Animal Medicine</Text>
                </View>
            </View>
            <View className="m-3 p-3 bg-green-600 rounded-lg">
                <MaterialIcons size={30} color="#fff" name="location-on" />
                <Text className="text-white font-medium mt-1 text-base">
                    Rajput Hospital
                </Text>
                <Text className="text-white font-medium mt-1 text-xs">
                    Today, 01:00 PM
                </Text>
            </View>
        </View>
    );
};

export default UpcomingAppointment;

const styles = StyleSheet.create({
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 100,
    },
});

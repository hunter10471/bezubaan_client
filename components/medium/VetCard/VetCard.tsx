import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageSourcePropType,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { IVet } from '../../../interfaces/Vet.interface';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../interfaces/navigation.interface';
import { useNavigation } from '@react-navigation/native';

interface IVetCardProps {
    vet: IVet;
}

const VetCard = ({ vet }: IVetCardProps) => {
    let [fontsLoaded] = useFonts({
        'poppins-bold': require('../../../assets/fonts/Poppins-Bold.ttf'),
        'poppins-medium': require('../../../assets/fonts/Poppins-Medium.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const onClinicTap = () => {
        navigation.navigate('ClinicScreen', undefined);
    };
    return (
        <View
            style={styles.main}
            className="pb-4 m-1 shadow-xl bg-white rounded-md "
        >
            <TouchableOpacity onPress={onClinicTap} activeOpacity={0.8}>
                <Image
                    className="w-[150px] h-[120px] rounded-t-md"
                    source={{ uri: vet.avatar }}
                />
                <Text
                    style={{ fontFamily: 'poppins-medium' }}
                    className="text-heading mt-2 px-2 "
                >
                    {vet.username}
                </Text>
                <Text className="text-gray-400 text-xs font-semibold px-2 ">
                    {vet.clinicName}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default VetCard;

const styles = StyleSheet.create({
    main: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
});

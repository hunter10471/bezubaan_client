import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import React from 'react';
import { IVet } from '../../../interfaces/Vet.interface';
import images from '../../../assets/images';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../interfaces/navigation.interface';

interface VetListItemProps {
    vet: IVet;
}

const VetListItem: React.FC<VetListItemProps> = ({ vet }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <Pressable
            onPress={() => navigation.navigate('ClinicScreen', { vet })}
            className="py-2 px-2 w-full rounded-lg bg-neutral-100 my-1 flex flex-row items-center"
        >
            <Image
                className="w-[64px] h-[64px] rounded-full"
                source={{ uri: vet.avatar || images.default_avatar }}
            />
            <View className="mx-4">
                <Text className="font-bold">
                    {vet.clinicName || vet.username}
                </Text>
                <Text className="text-xs">{vet.fieldOfStudy}</Text>
                <View className="flex flex-row w-[80%] mt-2 h-fit">
                    <Text>
                        <MaterialIcons
                            name="location-on"
                            size={18}
                            color={'#40B37C'}
                        />
                    </Text>
                    <Text className="font-light text-xs">{vet.address}</Text>
                </View>
                {vet?.specializations?.length > 0 && (
                    <View className="p-2 rounded-xl bg-orange-100 m-1">
                        <Text className="text-xs text-center text-orange-600 font-bold w-[160px]">
                            {vet.specializations[0]}
                        </Text>
                    </View>
                )}
            </View>
        </Pressable>
    );
};

export default VetListItem;

const styles = StyleSheet.create({});

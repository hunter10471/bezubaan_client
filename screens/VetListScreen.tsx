import React, { useEffect, useRef, useState } from 'react';
import { RootStackParamList } from '../interfaces/navigation.interface';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
    ActivityIndicator,
    FlatList,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotFound from '../components/small/NotFound/NotFound';
import VetListItem from '../components/small/VetListItem/VetListItem';
import useFetchVets from '../hooks/useFetchVets';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import NormalHeading from '../components/small/NormalHeading/NormalHeading';

const VetListScreen = ({ route }: { route: any }) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const authState = useSelector((state: RootState) => state.user);
    const { tag } = route.params;
    const [focus, setFocus] = useState(false);
    const { vets, closeVets, setQuery, loading } = useFetchVets();
    const onBackPress = () => {
        navigation.navigate('HomeScreen', undefined);
    };

    useEffect(() => {
        if (tag) {
            setQuery(tag);
        }
    }, [tag]);

    return (
        <SafeAreaView style={{ flex: 1 }} className="bg-white">
            <ScrollView>
                <View className="flex mx-6 my-4 ">
                    <TouchableOpacity
                        onPress={onBackPress}
                        style={styles.backArrow}
                    >
                        <MaterialIcons
                            onPress={onBackPress}
                            name="arrow-back"
                            size={25}
                        />
                    </TouchableOpacity>
                    <View
                        className={`flex flex-row items-center gap-4 my-4 bg-gray-100  px-4 py-2 rounded-xl mt-12 border-2 ${
                            focus ? 'border-primary' : 'border-gray-100'
                        }`}
                    >
                        <FontAwesomeIcons
                            name="search"
                            size={15}
                            color={'#666'}
                        />
                        <TextInput
                            defaultValue={tag || ''}
                            className={`text-sm`}
                            placeholder="Search a Clinic, Vet or Specialty"
                            keyboardType="default"
                            onChangeText={(text) => {
                                setQuery(text);
                            }}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                        />
                    </View>
                    {authState.lat &&
                        authState.long &&
                        closeVets?.length > 0 && (
                            <View className="m-2">
                                <NormalHeading
                                    text="Vets Near You"
                                    gray
                                    small
                                />
                                <FlatList
                                    className="W-full"
                                    data={closeVets}
                                    renderItem={({ item }) => (
                                        <VetListItem
                                            key={item.avatar}
                                            vet={item}
                                        />
                                    )}
                                />
                            </View>
                        )}
                    {vets.length === 0 && closeVets.length === 0 && !loading ? (
                        <NotFound />
                    ) : loading ? (
                        <ActivityIndicator
                            className="mt-[50%]"
                            size={35}
                            color="#40B37C"
                        />
                    ) : (
                        <View className="m-2">
                            <NormalHeading
                                text={
                                    tag
                                        ? 'Available Vet Clinics'
                                        : 'Popular Vet Clinics'
                                }
                                gray
                                small
                            />
                            <FlatList
                                data={vets}
                                renderItem={({ item }) => (
                                    <VetListItem key={item.avatar} vet={item} />
                                )}
                            />
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default VetListScreen;

const styles = StyleSheet.create({
    backArrow: {
        position: 'absolute',
        left: 5,
        zIndex: 10,
        top: 10,
    },
});

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
} from 'react-native';
import useFetchVets from '../hooks/useFetchVets';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotFound from '../components/small/NotFound/NotFound';
import VetListItem from '../components/small/VetListItem/VetListItem';

const VetListScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [focus, setFocus] = useState(false);
    const show = useRef(false);
    const { vets, query, setQuery, loading } = useFetchVets();
    const onBackPress = () => {
        navigation.navigate('HomeScreen', undefined);
    };

    useEffect(() => {
        if (!show.current) {
            show.current = true;
        }
    }, [loading]);

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
                            className={`text-sm`}
                            placeholder="Search a Clinic, Vet or Specialty"
                            keyboardType="default"
                            onChange={(text: any) => {
                                setQuery(text);
                            }}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                        />
                    </View>
                    {vets.length === 0 && !show && !loading ? (
                        <NotFound />
                    ) : loading ? (
                        <ActivityIndicator
                            className="mt-[50%]"
                            size={35}
                            color="#40B37C"
                        />
                    ) : (
                        <FlatList
                            data={vets}
                            renderItem={({ item }) => (
                                <VetListItem vet={item} />
                            )}
                        />
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

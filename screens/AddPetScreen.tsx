import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputWithLabel from '../components/small/InputWithLabel/InputWithLabel';
import { Image } from 'react-native';
import images from '../assets/images';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../interfaces/navigation.interface';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { createPet } from '../api/pet.api';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AddPetScreen = () => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const authState = useSelector((state: RootState) => state.user);

    const [hasGalleryPermission, setHasGalleryPermission] =
        useState<boolean>(false);
    const [image, setImage] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        image: '',
        name: '',
        age: 0,
        gender: '',
        species: '',
        animalType: '',
        breed: '',
        ownerId: authState._id,
    });

    useEffect(() => {
        (async () => {
            const status =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(status.status === 'granted');
            console.log(status);
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets) {
            setImage(result.assets[0].uri);
            const apiEndpoint =
                'http://bezubaan-nest-env.eba-4xmi8md6.ap-south-1.elasticbeanstalk.com/api/uploads';
            if (result.assets) {
                const response = await FileSystem.uploadAsync(
                    apiEndpoint,
                    result.assets[0].uri,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                        fieldName: 'file',
                        mimeType: 'image/png',
                    }
                );
                setImage(response as any);
                console.log(response);
                setForm({ ...form, image: response.body });
            }
        }
    };

    const onSubmit = async () => {
        try {
            setLoading(true);
            const response = await createPet(form);
            if (response) setSuccess(true);
            setFailure(false);
        } catch (error) {
            console.log(error);
            setSuccess(false);
            setFailure(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.back}
            >
                <Text>
                    {' '}
                    <MaterialIcons
                        color={'#000'}
                        size={30}
                        name="arrow-back"
                    />{' '}
                </Text>
            </TouchableOpacity>
            <ScrollView>
                <View className="p-6 items-center justify-center mt-5">
                    <View className="relative">
                        {image !== '' ? (
                            <Image
                                className="object-cover object-right-top"
                                style={styles.avatar}
                                source={{ uri: image }}
                            />
                        ) : (
                            <Image
                                className="object-cover object-right-top"
                                style={styles.avatar}
                                source={images.cat_avatar}
                            />
                        )}
                        <Pressable
                            onPress={pickImage}
                            className="absolute bottom-0 right-0 p-2 bg-primary rounded-full"
                        >
                            <MaterialIcons
                                name="add"
                                size={20}
                                color={'#fff'}
                            />
                        </Pressable>
                    </View>
                    <View className="my-5 mb-2 bg-heading px-4 py-2 rounded-xl">
                        <View className="flex-row items-center justify-center gap-2 mb-1">
                            <FontAwesomeIcons
                                size={25}
                                name="robot"
                                color={'#fff'}
                            />
                            <Text className="text-xl text-white font-bold">
                                Breed Detection Feature
                            </Text>
                        </View>
                        <Text className="font-light  text-white bg-primary p-2 rounded-xl text-center">
                            Instantly distinguish your furry friends! Our
                            advanced technology identifies cats and dogs, and
                            with a simple photo, reveals their unique breeds.
                            Experience pet identification like never before!
                        </Text>
                    </View>
                    {success && (
                        <Text className="bg-green-300 text-green-700 px-4 py-2 rounded-xl">
                            Your pet has been created successfully.
                        </Text>
                    )}
                    {failure && (
                        <Text className="bg-red-300 text-red-700 px-4 py-2 rounded-xl">
                            There was an error in creating your pet.
                        </Text>
                    )}
                    <View>
                        <InputWithLabel
                            onChangeText={(text) =>
                                setForm({ ...form, name: text })
                            }
                            label="Name"
                        />
                        <InputWithLabel
                            onChangeText={(text) =>
                                setForm({ ...form, age: parseInt(text) })
                            }
                            label="Age"
                        />
                    </View>
                    <View>
                        <InputWithLabel
                            onChangeText={(text) =>
                                setForm({ ...form, breed: text })
                            }
                            label="Breed"
                        />
                        <InputWithLabel
                            onChangeText={(text) =>
                                setForm({ ...form, gender: text })
                            }
                            label="Gender"
                        />
                    </View>
                    <View>
                        <InputWithLabel
                            onChangeText={(text) =>
                                setForm({ ...form, animalType: text })
                            }
                            label="Animal Type"
                        />
                    </View>
                    <Pressable
                        onPress={onSubmit}
                        className={'bg-primary rounded-lg my-5'}
                    >
                        <Text className="text-white text-lg px-4 py-2 ">
                            {loading ? (
                                <ActivityIndicator color="#fff" size={25} />
                            ) : (
                                'Save Pet'
                            )}
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AddPetScreen;

const styles = StyleSheet.create({
    avatar: {
        width: 128,
        height: 128,
        borderRadius: 100,
    },
    back: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
    },
});

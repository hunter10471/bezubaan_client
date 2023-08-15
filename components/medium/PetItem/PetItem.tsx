import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { SetStateAction, useEffect, useState } from 'react';
import { IPet } from '../../../interfaces/Pet.interface';

interface IPetItemProps {
    pet: IPet;
    setPet: SetStateAction<any>;
    petId?: string;
}

const PetItem: React.FC<IPetItemProps> = ({ pet, setPet, petId }) => {
    const [selected, setSelected] = useState(false);
    useEffect(() => {
        if (petId !== pet._id) {
            setSelected(false);
        }
    }, [petId]);
    const onPress = () => {
        if (petId === pet._id) {
            setSelected(false);
            setPet();
        } else {
            setSelected(true);
            setPet(pet);
        }
    };
    return (
        <Pressable onPress={onPress}>
            <View
                className={` mx-2 rounded-2xl border-[4px] ${
                    selected ? ' border-primary ' : 'border-transparent'
                }`}
            >
                <Image
                    source={{ uri: pet.image }}
                    className={` rounded-xl ${
                        selected ? 'border-primary  ' : 'opacity-50'
                    } w-[100px] h-[100px]  `}
                />
            </View>
            <Text
                className={`text-center mt-2  text-base ${
                    selected
                        ? 'text-black font-bold'
                        : 'text-neutral-400 font-medium'
                }`}
            >
                {pet.name}
            </Text>
        </Pressable>
    );
};

export default PetItem;

const styles = StyleSheet.create({});

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../interfaces/navigation.interface';
import { StackNavigationProp } from '@react-navigation/stack';

interface IHomeCategoryBadgeProps {
    tag: string;
}

const HomeCategoryBadge = ({ tag }: IHomeCategoryBadgeProps) => {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('VetListScreen', { tag })}
        >
            <Text className="mr-2 px-4 py-3 rounded-[25px] bg-primary/20 text-heading font-medium ">
                {tag}
            </Text>
        </TouchableOpacity>
    );
};

export default HomeCategoryBadge;

const styles = StyleSheet.create({});

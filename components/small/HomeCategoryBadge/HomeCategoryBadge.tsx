import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface IHomeCategoryBadgeProps {
    tag: string;
}

const HomeCategoryBadge = ({ tag }: IHomeCategoryBadgeProps) => {
    return (
        <TouchableOpacity>
            <Text className="mr-2 px-4 py-3 rounded-[25px] bg-primary/20 text-heading font-medium ">
                {tag}
            </Text>
        </TouchableOpacity>
    );
};

export default HomeCategoryBadge;

const styles = StyleSheet.create({});

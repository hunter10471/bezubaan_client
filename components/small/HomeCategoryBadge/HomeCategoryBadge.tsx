import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface IHomeCategoryBadgeProps {
  tag: string;
}

const HomeCategoryBadge = ({ tag }: IHomeCategoryBadgeProps) => {
  return (
    <TouchableOpacity>
      <Text className='mx-4 px-4 py-2 rounded-[25px] bg-gray-200 text-gray-500'>
        {tag}
      </Text>
    </TouchableOpacity>
  );
};

export default HomeCategoryBadge;

const styles = StyleSheet.create({});

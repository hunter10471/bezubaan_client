import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

interface IHomeCategoryBadgeProps {
  tag: string;
}

const HomeCategoryBadge = ({ tag }: IHomeCategoryBadgeProps) => {
  return (
    <TouchableOpacity>
      <Text className='mx-2 px-4 py-2 rounded-[25px] border-2 border-secondary text-center text-secondary'>
        {tag}
      </Text>
    </TouchableOpacity>
  );
};

export default HomeCategoryBadge;

const styles = StyleSheet.create({});

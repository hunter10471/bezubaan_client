import { Pressable, StyleSheet, Text } from 'react-native';
import React, { SetStateAction, useEffect, useState } from 'react';

interface ITimePillProps {
    time: string;
    setTime: SetStateAction<any>;
    item: string;
}

const TimePill = ({ time, setTime, item }: ITimePillProps) => {
    const [selected, setSelected] = useState<boolean>(false);
    const selectTime = () => {
        if (time === item) {
            setSelected(false);
            setTime('');
        } else {
            setSelected(true);
            setTime(item);
        }
    };
    useEffect(() => {
        if (time !== item) {
            setSelected(false);
        }
    }, [time]);
    return (
        <Pressable
            onPress={selectTime}
            className={`border-2 border-primary ${
                selected ? 'bg-primary' : 'bg-white'
            } px-4 py-2 rounded-full my-2 mx-1`}
        >
            <Text
                className={`${
                    selected ? 'text-white' : 'text-primary'
                } text-lg font-bold`}
            >
                {item}
            </Text>
        </Pressable>
    );
};

export default TimePill;

const styles = StyleSheet.create({});

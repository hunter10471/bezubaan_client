import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { SetStateAction, useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimePill from '../../small/TimePill/TimePill';
import moment from 'moment';

interface ITimePillsProps {
    fromTime: string;
    toTime: string;
    backAnimation: () => void;
    setTime: SetStateAction<any>;
    time: string;
    bookedTimes: string[];
}

const TimePills = ({
    fromTime,
    toTime,
    backAnimation,
    setTime,
    time,
    bookedTimes,
}: ITimePillsProps) => {
    const [timeSlots, setTimeSlots] = useState<string[]>([]);
    const createTimeSlots = (fromTime: string, toTime: string) => {
        const startTime = moment(fromTime, 'HH:mm');
        const endTime = moment(toTime, 'HH:mm');
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        const array = [];
        while (startTime <= endTime) {
            array.push(moment(startTime).format('HH:mm'));
            startTime.add('30', 'minutes');
        }
        return array;
    };

    useEffect(() => {
        setTimeSlots(createTimeSlots(fromTime, toTime));
    }, []);

    return (
        <View
            style={{ width: Dimensions.get('screen').width - 40 }}
            className="flex-row flex-wrap justify-center relative mt-10"
        >
            <TouchableOpacity style={styles.back} onPress={backAnimation}>
                <Text>
                    {' '}
                    <MaterialIcons
                        color={'#1b1b1b'}
                        size={30}
                        name="arrow-back"
                    />{' '}
                </Text>
            </TouchableOpacity>
            {timeSlots.map((item, index) => {
                return (
                    <TimePill
                        setTime={setTime}
                        key={index}
                        time={time}
                        item={item}
                        disabled={bookedTimes.includes(item)}
                    />
                );
            })}
        </View>
    );
};

export default TimePills;

const styles = StyleSheet.create({
    back: {
        position: 'absolute',
        top: -50,
        left: 20,
        zIndex: 10,
    },
});

import {
    StyleSheet,
    Text,
    View,
    TextInput,
    useWindowDimensions,
} from 'react-native';
import React from 'react';

interface IInputWithLabelProps {
    label: string;
    defaultValue?: string;
    icon?: JSX.Element;
    onChangeText?: (text: any) => void;
    onFocus?: () => void;
    multiline?: boolean;
    lines?: number;
}

const InputWithLabel = ({
    label,
    defaultValue,
    icon,
    onChangeText,
    onFocus,
    multiline,
    lines,
}: IInputWithLabelProps) => {
    const dimensions = useWindowDimensions();
    return (
        <View style={{ width: dimensions.width - 80 }} className="m-3 relative">
            <View
                className={`absolute ${
                    label === 'Address' ? 'top-[8%]' : 'bottom-[35%]'
                }  left-1`}
            >
                {icon}
            </View>
            <TextInput
                autoCapitalize="none"
                multiline={multiline}
                numberOfLines={lines}
                style={{
                    paddingLeft: icon && 40,
                    textAlignVertical: label === 'Address' ? 'top' : 'auto',
                }}
                onChangeText={onChangeText}
                onFocus={onFocus}
                className=" pt-2 pb-3 border-b-2 border-gray-300 w-full focus:border-primary transition-all "
                placeholder={label}
                secureTextEntry={label === ('Password' || 'Confirm Password')}
                defaultValue={defaultValue}
                keyboardType={'default'}
            />
        </View>
    );
};

export default InputWithLabel;

const styles = StyleSheet.create({});

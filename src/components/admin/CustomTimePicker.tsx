// component used to get time values
import { TimePickerModal } from 'react-native-paper-dates';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { 
    TouchableOpacity,
    Text,
    View, 
    StyleSheet,
    TextStyle,
    StyleProp
} from 'react-native';
import { useEffect, useState } from "react";
import React from 'react';

import { generateTimeFromNumbers } from '../../utils/DateTimeBasedUtilityFunctions';
import { generalStyles } from '../../assets/general/generalStyles';

// interface for the selected time using the time picker
export interface PickedTime {
    minutes: number,
    hours: number
}
interface CustomTimePickerProps {
    title: string,
    style: StyleProp<TextStyle>,
    callback: (value: PickedTime|null) => void,
    oldValue:PickedTime| null
}
const CustomTimePicker:React.FC<CustomTimePickerProps> = ({style, title, callback, oldValue}) =>{
    const [visible, setVisible] = useState(false)
    const [hour, setHour] = useState<number| null>(null);
    const [minute, setMinute] = useState<number| null>(null);

    useEffect(() =>{
        if(oldValue !== null){
            setHour(oldValue.hours);
            setMinute(oldValue.minutes);
        }
    }, [oldValue]);
    // callbacks here
    // removes the time picker from view
    const handleDismiss = () => {
        setVisible(false);
    }
    // user picks value
    const handleConfirm = ({hours, minutes}: PickedTime) =>{
        setVisible(false);
        setHour(hours);
        setMinute(minutes);
        callback({minutes: minutes, hours: hours});
        
    }
    const handlePress = () => {
        setVisible(true);
    }
    // show the value to display
    // if values are null, place a string
    // else display selected time
    const generateValueToDisplay = () =>{
        if(hour !== null && minute !== null){
            return generateTimeFromNumbers(hour, minute)
        } else{
            return "NaN:NaN"
        }
    }
    return (
        <>
        <View style = {[style? style:styles.fullWidth]} >
            <Text style = {[generalStyles.TextInputTitle]}>
                {title}
            </Text>
            <View style = {[generalStyles.outerTextInputBox, styles.fullWidth, visible?generalStyles.onFocusOuterTextInputBox:{}]}>
                <TouchableOpacity 
                    onPress={handlePress}
                    style = {[generalStyles.innerTextInputBox, 
                        styles.buttonContainer, 
                        visible? generalStyles.onFocusInnnerTextInputBox: generalStyles.normalInnerTextInputBox,
                    ]}
                >
                    <AntDesign style ={[styles.iconStyle]} size={14} name="clockcircleo"/>
                    <Text>{generateValueToDisplay()}</Text>
                </TouchableOpacity>
            </View>
        </View>
        <TimePickerModal
            visible = {visible}
            onDismiss={handleDismiss}
            onConfirm={handleConfirm}
        />
        </>
    )
}

export default CustomTimePicker

const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    iconStyle:{
        marginHorizontal: 10
    },
    fullWidth: {
        width: '100%'
    },
})
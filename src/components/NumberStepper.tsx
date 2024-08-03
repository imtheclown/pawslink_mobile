// component that displays a number
// has a minus button that decreases the value of the displayed number with 1
// has a plus button that increase the value of the displayed number with 1

import { 
    View,
    Text, 
    StyleSheet,
    ViewStyle,
    TextInput,
} from "react-native";
import FlexibleButton from "./admin/FlexibleButton";
import { useCallback, useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { generalStyles } from "../assets/general/generalStyles";
import { Border, Color, FontFamily, FontSize } from "../assets/general/GlobalStyles";
import React from "react";
interface NumberStepperProps {
    title: string,
    callback: (newValue:string) => void,
    width? : ViewStyle,
    oldValue: string,
}
const NumberStepper:React.FC<NumberStepperProps> = React.memo(({title, callback, width, oldValue}) =>{
    const [value, setValue] = useState(oldValue);
    const minus = () =>{
        const newValue = (parseInt(value) - 1).toString();
        setValue(newValue);
        callback(newValue);
    }
    const add = () =>{
        const newValue = (parseInt(value) +1).toString();
        setValue(newValue);
        callback(newValue);
    }
    return (
        <View style = {[styles.coverContainer, width? width: {}]}>
            <Text style ={[generalStyles.TextInputTitle]}>{title}</Text>
            <View style = {[styles.mainContainer, generalStyles.containerWithShadow]}>
                <FlexibleButton
                    icon = {<AntDesign name="minus" size={12}/>}
                    callback={minus}
                    buttonStyle={{...styles.buttonContainerStyle, ...styles.minusButton}}
                />
                <TextInput
                    style = {[styles.textContainer, styles.textStyle]}
                    value= {value}
                    keyboardType= "number-pad"
                />
                <FlexibleButton
                    icon = {<AntDesign name="plus" size={12} color={Color.colorWhite}/>}
                    callback={add}
                    buttonStyle={{...styles.buttonContainerStyle, ...styles.addButton}}
                />
            </View>
        </View>
    )
});

export default NumberStepper
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        width: 'auto',
        height: 'auto',
        borderRadius: Border.br_9xs,
    },
    textContainer:{
        textAlign: 'center',
        width: 32,
        height: 32,
        padding:0,
    },
    textStyle :{
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_lg,
        lineHeight: 26,
    },
    buttonContainerStyle: {
        width: 32,
        aspectRatio: 1,
        borderRadius: Border.br_9xs
    },
    minusButton:{
        backgroundColor: Color.colorLightGray,
    },
    addButton:{
        backgroundColor: Color.colorPaleovioletred,
    },
    coverContainer:{
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingBottom: 10,
    },
})
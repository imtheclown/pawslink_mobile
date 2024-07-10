// text input that has customizable title, width and callback function
import { 
    TextInput, 
    Text, 
    View,
    StyleSheet,
} from "react-native";

import React from "react";

import { 
    FontSize,
    Color,
    FontFamily,
    Border
 } from "../../assets/general/GlobalStyles";

interface FlexibleTextInputProps {
    title:string,
    size: number,
    callback: () => void
}
import { useState } from "react";
const FlexibleTextInput: React.FC<FlexibleTextInputProps> = ({title, size, callback}) =>{
    // lacks callback functions, add functions
    // controls the state of the component
    const [isFocused, setIsFocused] = useState(false);

    const setFocusedOn = () =>{
        setIsFocused(true);
    }

    const setFocusedOff = () =>{
        setIsFocused(false);
    }
    return (
        <View>
            <Text style = {[styles.textTitle, ]}>
                {
                    title
                }
            </Text >
            <View style = {[styles.outerContainer, isFocused?styles.onFocusOuterContainer: {}]}>
                <TextInput
                onFocus={() => setFocusedOn()}
                onBlur={() => setFocusedOff()}
                style = {[styles.textInputBox, isFocused?styles.onFocusTextInputBox: styles.normalTextInputBox, {width: size}]}
                />
            </View>
        </View>
    )
}

export default FlexibleTextInput

const styles = StyleSheet.create({
    textTitle:{
        textAlign: "left",
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        color: Color.colorDarkslategray,
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        textTransform: 'capitalize',
        left: 6,
    },
    outerContainer:{
        padding: 5,
        alignSelf: "flex-start"
    },
    textInputBox: {
        borderRadius: Border.br_9xs,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: Color.colorWhite,
        height: 55,
        color: Color.colorDarkslategray
    },
    onFocusTextInputBox:{
        borderColor: Color.colorPaleovioletred,
    },
    normalTextInputBox:{
        borderColor: Color.colorSilver
    },
    onFocusOuterContainer:{
        backgroundColor: Color.colorPalevioletred_200,
        borderRadius: Border.br_5xs,
    },
})

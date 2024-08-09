// text input that has customizable title, width and callback function
import { 
    TextInput, 
    Text, 
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    TextStyle,
    StyleProp,
    KeyboardTypeOptions,
    Platform,
    Animated
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useState, useCallback } from 'react';
import { generalStyles } from "../assets/general/generalStyles";
import { FontFamily, FontSize } from "../assets/general/GlobalStyles";

// interface for the flexible text input component
// title refers to the title of the text input
// number of lines to set the initial number of lines in the text input
// style for the text input
// keyboard type to determine the keyboard to be shown
// required determines if the text input returns a valuable data
interface FlexibleTextInputProps {
    title:string,
    numberOfLines? : number,
    style? : StyleProp<TextStyle>
    keyBoardType? : KeyboardTypeOptions,
    required?: boolean,
    oldValue: string | null,
    disabled? : boolean,
    callback: (newName:(string|null)) => void,
    validator?: (value:string) => boolean,
    customErrMsg?: string,
}
const FlexibleTextInput: React.FC<FlexibleTextInputProps> = React.memo(({title, style, numberOfLines, keyBoardType, callback, required, oldValue, disabled, validator, customErrMsg}) =>{
    const [isFocused, setIsFocused] = useState(true);
    const [inError, setInError] = useState(false);
    // own state to keep the value
    const [value, setValue] = useState("");
    useEffect(() =>{
        // needs to reload as transition from screens throug react native navigations does not reload the page
        setIsFocused(false);
        if(oldValue !== null){
            setValue(oldValue)
        }
    }, [oldValue]);

    // animated value
    // callback called when there is a change in value in the text input
    const handleTextChange = (newValue: string) =>{
        // update the state of the text input
        setValue(newValue);
    }
    // for ux
    const setFocusedOn = () =>{
        // sets the state isfocus to true
        if(!isFocused){
            setIsFocused(true);
        }
        setInError(false);
    }
    // callback when cursor is not in focus
    const setFocusedOff = () =>{
        // return the value to the
        setIsFocused(false);
        // return the current value to the parent
        // make sure the updated value to return to the parent component when cursor is not at the text input
        // make sure that if the value is empty return null
        if(checkValue()){
            callback(value);
        }else{
            if(value !== null){
                setInError(true);
            }
            callback(null)
        }
    }
    // check if valid on onblur
    // if upon onblur, the value is empty and the component is required, make it an error
    const checkValue = ():boolean =>{
        if(required){
            if(validator){
                if(!validator(value)){
                    return false
                }
            }
            // return false on empty inpu
            if(value.length === 0){
                return false
            }
        }
        // return true if it is not required
        return true;
    }
    return (
        <KeyboardAvoidingView
             style = {[style? style:{width: '100%'}]}
        >
            <View style ={[styles.textContainer]}>
                <Text style = {[generalStyles.TextInputTitle, ]}>
                    {
                        title
                    }
                </Text >
                {inError && <Text style ={[styles.errorText]}>ⓘ*{customErrMsg? customErrMsg: `required`}</Text>}
            </View>
            <View style = {
                [generalStyles.outerTextInputBox, 
                styles.fullWidthTextInput,
                isFocused?generalStyles.onFocusOuterTextInputBox: {}]}
            >
                <TextInput
                    multiline = {numberOfLines? true: false}
                    value={value}
                    numberOfLines={numberOfLines}
                    onFocus={() => setFocusedOn()}
                    onBlur={() => setFocusedOff()}
                    style = {[generalStyles.innerTextInputBox, 
                        styles.fullWidthTextInput,
                        isFocused?generalStyles.onFocusInnnerTextInputBox: inError? styles.errorBorder: generalStyles.normalInnerTextInputBox, 
                        numberOfLines? styles.multilineStart: styles.singleLineStart]}
                    keyboardType={keyBoardType? keyBoardType: 'default'}
                    onChangeText={handleTextChange}
                    editable = {disabled? !disabled: true}
                /> 
            </View>
        </KeyboardAvoidingView>
    )
});

export default FlexibleTextInput

const styles = StyleSheet.create({
    fullWidthTextInput : {
        width: '100%',
    },
    multilineStart:{
        textAlignVertical: 'top',
    },
    singleLineStart:{
        textAlignVertical: 'center',
    },
    errorText:{
        marginLeft: 10,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_xs,
        color: '#FF000F',
        lineHeight: 21,
    },
    textContainer:{
        flexDirection: 'row',
        width: '100%',
    },
    errorBorder:{
        borderColor:'#FF000F'
    }
})

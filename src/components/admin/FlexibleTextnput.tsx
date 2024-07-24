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
import { generalStyles } from "../../assets/general/generalStyles";
import {debounce} from 'lodash'

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
    callback: (newName:(string|null)) => void
}
const FlexibleTextInput: React.FC<FlexibleTextInputProps> = React.memo(({title, style, numberOfLines, keyBoardType, callback, required, oldValue}) =>{
    const [isFocused, setIsFocused] = useState(true);
    const [inError, setInError] = useState(false);
    // own state to keep the value
    const [value, setValue] = useState("");
    useEffect(() =>{
        setIsFocused(false);
        if(oldValue !== null){
            setValue(oldValue)
        }
        console.log(oldValue);
    }, [oldValue]);

    // animated value
    // callback called when there is a change in value in the text input
    const handleTextChange = (newValue: string) =>{
        // update the state of the text input
        setValue(newValue)
        // return the current value 300 ms after typing
        debounceCallback(newValue)
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
            setInError(true);
            callback(null)
        }
    }
    // check if valid on onblur
    // if upon onblur, the value is empty and the component is required, make it an error
    const checkValue = ():boolean =>{
        if(required){
            // return false on empty input
            if(value.length !> 0){
                return false
            }
        }
        // return true if it is not required
        return true;
    }
    const debounceCallback = useCallback(debounce(callback, 300), [callback]);

    return (
        <KeyboardAvoidingView
             style = {[style? style:{width: '100%'}]}
             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
            <Text style = {[generalStyles.TextInputTitle, ]}>
                    {
                        title
                    }
                </Text >
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
                            isFocused?generalStyles.onFocusInnnerTextInputBox: generalStyles.normalInnerTextInputBox, 
                            numberOfLines? styles.multilineStart: styles.singleLineStart]}
                        keyboardType={keyBoardType? keyBoardType: 'default'}
                        onChangeText={handleTextChange}
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
    }
})

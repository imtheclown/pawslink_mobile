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
} from "react-native";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState, useCallback } from 'react';
import { generalStyles } from "../../assets/general/generalStyles";
import {debounce} from 'lodash'

interface FlexibleTextInputProps {
    title:string,
    numberOfLines? : number,
    style? : StyleProp<TextStyle>
    keyBoardType? : KeyboardTypeOptions,
    callback: (newName:string) => void
}
const FlexibleTextInput: React.FC<FlexibleTextInputProps> =({title, style, numberOfLines, keyBoardType, callback}) =>{
    const [isFocused, setIsFocused] = useState(false)
    // own state to keep the value
    const [value, setValue] = useState("");
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
    }
    // callback when cursor is not in focus
    const setFocusedOff = () =>{
        // return the value to the
        setIsFocused(false);
        // return the current value to the parent
        // make sure the updated value to return to the parent component when cursor is not at the text input
        callback(value)
    }
    const debounceCallback = useCallback(debounce(callback, 300), [callback])
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
};

export default React.memo(FlexibleTextInput)

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

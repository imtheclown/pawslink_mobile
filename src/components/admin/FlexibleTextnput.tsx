// text input that has customizable title, width and callback function
import { 
    TextInput, 
    Text, 
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
} from "react-native";

import React from "react";


interface FlexibleTextInputProps {
    title:string,
    size?: number,
    numberOfLines? : number,
    callback: () => void
}
import { useState } from "react";
import { generalStyles } from "../../assets/general/generalStyles";
const FlexibleTextInput: React.FC<FlexibleTextInputProps> = ({title, size, numberOfLines, callback}) =>{
    // lacks callback functions, add functions
    // controls the state of the component
    const [isFocused, setIsFocused] = useState(false);

    const setFocusedOn = () =>{
        if(!isFocused){
            setIsFocused(true);
        }else{
            Keyboard.dismiss();
        }
    }

    const setFocusedOff = () =>{
        setIsFocused(false);
    }
    return (
        <KeyboardAvoidingView style = {[size? {}:{width: '100%'}]}>
            <Text style = {[generalStyles.TextInputTitle, ]}>
                    {
                        title
                    }
                </Text >
                <View style = {[!size?styles.fullWidthTextInput : {},generalStyles.outerTextInputBox, 
                        isFocused?generalStyles.onFocusOuterTextInputBox: {}]}>
                    <TextInput
                    multiline = {numberOfLines? true: false}
                    numberOfLines={numberOfLines}
                    onFocus={() => setFocusedOn()}
                    onBlur={() => setFocusedOff()}
                    style = {[generalStyles.innerTextInputBox, 
                        isFocused?generalStyles.onFocusInnnerTextInputBox: generalStyles.normalInnerTextInputBox, 
                        size?{width: size}:styles.fullWidthTextInput, numberOfLines? styles.multilineStart: styles.singleLineStart]}
                    />
                </View>
        </KeyboardAvoidingView>
    )
}

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

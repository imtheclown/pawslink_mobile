// text input that has customizable title, width and callback function
import { 
    TextInput, 
    Text, 
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Keyboard,
    TextStyle,
    StyleProp
} from "react-native";

import React from "react";

interface FlexibleTextInputProps {
    title:string,
    numberOfLines? : number,
    style? : StyleProp<TextStyle>
    callback: () => void
}
import { useState } from "react";
import { generalStyles } from "../../assets/general/generalStyles";
const FlexibleTextInput: React.FC<FlexibleTextInputProps> =({title, style, numberOfLines, callback}) =>{
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
        <KeyboardAvoidingView style = {[style? style:{width: '100%'}]}>
            <Text style = {[generalStyles.TextInputTitle, ]}>
                    {
                        title
                    }
                </Text >
                <View style = {[generalStyles.outerTextInputBox, 
                        styles.fullWidthTextInput,
                        isFocused?generalStyles.onFocusOuterTextInputBox: {}]}>
                    <TextInput
                    multiline = {numberOfLines? true: false}
                    numberOfLines={numberOfLines}
                    onFocus={() => setFocusedOn()}
                    onBlur={() => setFocusedOff()}
                    style = {[generalStyles.innerTextInputBox, 
                        styles.fullWidthTextInput,
                        isFocused?generalStyles.onFocusInnnerTextInputBox: generalStyles.normalInnerTextInputBox, 
                        numberOfLines? styles.multilineStart: styles.singleLineStart]}
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

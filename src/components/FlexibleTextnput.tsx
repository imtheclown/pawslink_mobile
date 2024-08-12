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
    Animated,
    ViewStyle
} from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { useState, useCallback } from 'react';
import { generalStyles } from "../assets/general/generalStyles";
import { FontFamily, FontSize, Color } from "../assets/general/GlobalStyles";
import Entypo from 'react-native-vector-icons/Entypo'
import { TouchableOpacity } from "react-native-gesture-handler";
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
    outerContainerStyle?: ViewStyle,
    innerContainerStyle?: ViewStyle,
    isSensitive?: boolean,
    // icons
}
const FlexibleTextInput: React.FC<FlexibleTextInputProps> = React.memo(({title, style, numberOfLines, keyBoardType, callback, required, oldValue, 
    disabled, validator, customErrMsg, isSensitive,
    outerContainerStyle, innerContainerStyle
}) =>{
    const [isFocused, setIsFocused] = useState(true);
    const [inError, setInError] = useState(false);
    const [hidden, setHidden] = useState(true);
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
    // generates the style for the inner text input
    const generateInnerStyles = useMemo(():ViewStyle=>{
        // default styling for the textinput
        var style:ViewStyle = generalStyles.innerTextInputBox;
        // if there is custom styling, prioritize it by means of value overriding
        if(innerContainerStyle){
            style = {...style, ...innerContainerStyle}
        }
        // if number of lines is greater than 1 then apply necessary styling for multiple line text inputs
        if(numberOfLines){
            style = {...style, ...styles.multilineStart}
        // for single line text input
        }else{
            style = {...style, ...styles.singleLineStart}
        }
        // if in error state, apply error border
        if(inError){
            return {...style, ...styles.errorBorder}
        }
        // if focused apply inner text input border for focused state
        if(isFocused){
            return {...style, ...generalStyles.onFocusInnnerTextInputBox,}
        }
        // default styling
        return {...generalStyles.normalInnerTextInputBox, ...style}
    }, [isFocused, inError]);

    // generate styles for the cover of the textinput
    const generateOuterStyle = useMemo(():ViewStyle =>{
        // the default styling
        var style: ViewStyle = generalStyles.outerTextInputBox;
        // if custom style is given, prioritize them by value overriding
        if(outerContainerStyle){
            style = {...style, ...outerContainerStyle}
        }
        // style to use when the text input is in focus
        if(isFocused){
            return {...style, ...generalStyles.onFocusOuterTextInputBox}
        }
        // default style
        return style
    }, [isFocused]);

    const handleHide = useCallback(() =>{
        setHidden(!hidden);
    },[hidden]);

    const generateToggleHideIcon = useMemo(():React.ReactNode =>{
        if(!isSensitive){
            return <></>
        }
        var name = "eye"
        if(!hidden){
            name = "eye-with-line"
        }
        return <TouchableOpacity onPress={handleHide}><Entypo name={name} size={20} color={Color.colorDarkslategray}/></TouchableOpacity>
    }, [hidden, isSensitive]);
    return (
        <KeyboardAvoidingView
            style = {[style? style:{width: '100%'}]}
        >
            <View style ={[styles.textContainer]}>
                <Text style = {[generalStyles.TextInputTitle,]}>
                    {
                        title
                    }
                </Text >
                {inError && <Text style ={[styles.errorText]}>ⓘ*{customErrMsg? customErrMsg: `required`}</Text>}
            </View>
            <View style = {generateOuterStyle}
            >
                <View style = {[generateInnerStyles, styles.textInputContainer]}>
                    <TextInput
                        style ={[generalStyles.flexContainer]}
                        multiline = {numberOfLines? true: false}
                        value={value}
                        numberOfLines={numberOfLines}
                        onFocus={() => setFocusedOn()}
                        onBlur={() => setFocusedOff()}
                        keyboardType={keyBoardType? keyBoardType: 'default'}
                        onChangeText={handleTextChange}
                        editable = {disabled? !disabled: true}
                        secureTextEntry = {isSensitive && hidden}
                    />
                    {generateToggleHideIcon}
                </View> 
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
    },
    textInputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
    }
})

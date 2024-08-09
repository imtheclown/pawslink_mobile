// text input for the authentication
// suppors custom icons and passwords

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, KeyboardAvoidingView, Pressable } from "react-native";
import { useState, useCallback, useMemo, useRef } from "react";
import React from "react";
import { Border, Color, FontFamily, FontSize } from "../../assets/general/GlobalStyles";
import { debounce } from "lodash";
import Entypo from 'react-native-vector-icons/Entypo'
interface AuthTextInputProps {
    // the name where the text input refers
    title: string,
    // icon to be displayed at the left part of the text input
    icon?: React.ReactNode,
    // if false, the input values cannot be hidden
    // if true, a hide button will be shown, allows user to hide or show values
    isSensitive: boolean,
    // optional custom error message
    // default: 'required'
    customErrorMsg? : string,
    // optional validator function for the text input
    validator? :(value:string) => boolean,
    // if true, shows error when input fails the validator or when the user exits textinput without leaving a value
    required: boolean,
    // function from the parent component
    // used to pass value from the text input to the parent
    callback: (newValue:string|null) => void,
}

// maximum movement of the placeholder of the text input in the y axis
const yMax = -40;
// maximum movement of the placeholder of the text input in the x axis
const xMax = -30;

// main function
const AuthTextInput:React.FC<AuthTextInputProps> = React.memo(({title, icon, isSensitive, customErrorMsg, validator, required, callback}) =>{
    // reference for the text input
    // used to force focus to the text input
    const inputRef = useRef<TextInput>(null);
    // works only when isSensitive is true
    // state for the hide or show value
    const [isHidden, setIshidden] = useState(true);
    // keeps track of the value of the textinput
    const [value, setValue] = useState<string|null>(null);
    // true when the text input has erroneous input
    const [isError, setIsError] = useState(false); 

    // turns isHidden to true or false
    const handleHideToggle = () =>{
        setIshidden(!isHidden);
    }
    // animated value for the transition in the y axis
    const transY = useRef(new Animated.Value(0))
    // interpolated value for the transition in the x axis
    const transX = transY.current.interpolate({
        inputRange: [yMax, 0],
        outputRange: [xMax, 0],
        extrapolate: 'clamp',
    })
    // forces the textinput to be focused
    // triggers the onfocus effect of textinput
    // carret will be on the textinput
    const forceFocus = () =>{
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    // generates the hide/show button dependent on the isHidden state
    const renderHideButton = useMemo(() =>{
        var iconName = "eye-with-line"
        if(isHidden){
            iconName = "eye"
        }
        return (
            <TouchableOpacity onPress={handleHideToggle} style ={[styles.iconContainerStyle]}>
                <Entypo name={iconName} size={24} color={Color.colorGray}/>
            </TouchableOpacity>
        )
    },[isHidden]);

    // debounce callback
    // returns only values to the parent component when the user stops typing for 300ms
    const debouncedCallback = useCallback(debounce((newValue:string|null) => {callback(newValue)}, 300), [callback]);
    // callback when user types in the text input
    const handleValueChange = useCallback((newValue: string) =>{
        var currentValue: string|null = newValue;
        // if length of value is zero, make the value null
        if(newValue.length === 0){
            currentValue = null
        }
        // set values in the parent and the local components
        setValue(currentValue);
        debouncedCallback(currentValue);
    },[]);

    // checks if the input is valid or not based on the validator
    // custom validator checks if input is required and if  it has value
    const isInputValid = useCallback((newValue:string|null) =>{
        // if not required, allow all
        if(!required){
            return true;
        }
        // else if null return false
        if(newValue === null){
            return false;
        };
        // validator checks and returns value
        if(validator){
            return validator(newValue);
        }
        // uncaught instances are true
        return true
    }, [required, callback]);

    // callback when text input loses focus
    // catches post-user input data processing and checking
    const handleOnBlur = useCallback(() =>{
        const isValid = isInputValid(value);
        if(!isValid){
            // update the error state
            setIsError(true);
            // return null to parent
            // remember we have a copy of the local value
            debouncedCallback(null);
        }
        // start going back to original position of the placeholder when there is no input present in the text input
        if(value === null || value.length === 0){
            Animated.timing(transY.current, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }, [value]);

    // callback when text input is focused
    const handleOnFocus =useCallback(() =>{
        // animate the text placeholder
        Animated.timing(transY.current, {
            toValue: yMax,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
        // remove the error state
        setIsError(false);
    }, []);
    // memoized error message
    // returns custom error message if exists and if not returns the default
    const generateErrorMessage = useMemo(()=>{
        if(customErrorMsg){
            return `ⓘ*${customErrorMsg}`
        }else{
            return "ⓘ*required"
        }
    }, [customErrorMsg]);

    return (
        <KeyboardAvoidingView>
            <View style ={[styles.mainContainer]}>
                {/* enables the component to be pressed, not limiting to textinput */}
                <Pressable onPress={forceFocus} style ={[styles.textInputBox, isError? styles.errorBorder: styles.normalBorder]}>
                    {icon && icon}
                    <TextInput
                        value={value === null? "":value}
                        ref={inputRef}
                        onFocus={handleOnFocus}
                        onBlur={handleOnBlur}
                        style ={[styles.textInput]}
                        onChangeText={handleValueChange}
                        secureTextEntry = {isSensitive && isHidden}
                    />
                    {
                        // render only if isSensitive is true and there is an input
                        (isSensitive && value!== null) && renderHideButton
                    }
                    {/* animated text placeholder */}
                    <Animated.Text
                        style ={[styles.titleTextContainer, {
                            transform: [{translateY: transY.current },
                                {translateX: transX}
                            ]
                        }]}
                    >
                        {title}
                    </Animated.Text>
                </Pressable>
                {
                    // render only if required and isError flag is on
                    isError && required && <Text style ={[styles.errorText]}>{generateErrorMessage}</Text>
                }
            </View>
        </KeyboardAvoidingView>
    )
});

export default AuthTextInput;

const styles = StyleSheet.create({
    mainContainer:{
        width: '100%',
        height: 'auto',
        paddingBottom: 20,
        alignItems:'flex-start',
    },
    textInputBox: {
        width: '100%',
        height: 'auto',
        backgroundColor: Color.colorLavender,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: Border.br_14xl,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput:{
        fontFamily: FontFamily.interRegular,
        fontSize:FontSize.size_base,
        flex: 1,
    },
    iconContainerStyle:{
        padding: 2
    },
    errorBorder:{
        borderColor: Color.errorRed
    },
    normalBorder:{
        borderColor: Color.colorLavender
    },
    errorText:{
        color: Color.errorRed,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_sm,
        fontWeight: 400,
        paddingHorizontal: 15,
        lineHeight: 21,
    },
    titleTextContainer:{
        position: 'absolute',
        left: 45,
        color: Color.colorDarkslategray,
        fontSize: FontSize.size_base,
    }
})

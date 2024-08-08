// text input for the authentication

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing, KeyboardAvoidingView, Pressable } from "react-native";
import { useState, useCallback, useMemo, useRef } from "react";
import React from "react";
import { Border, Color, FontFamily, FontSize } from "../../assets/general/GlobalStyles";
import { debounce } from "lodash";
import Entypo from 'react-native-vector-icons/Entypo'
interface AuthTextInputProps {
    title: string,
    icon?: React.ReactNode,
    isSensitive: boolean,
    customErrorMsg? : string,
    validator? :(value:string) => boolean,
    required: boolean,
    callback: (newValue:string|null) => void,
}

const yMax = -40;
const xMax = -30;
const AuthTextInput:React.FC<AuthTextInputProps> = React.memo(({title, icon, isSensitive, customErrorMsg, validator, required, callback}) =>{
    const inputRef = useRef<TextInput>(null);
    const [isHidden, setIshidden] = useState(true);
    const [value, setValue] = useState<string|null>(null);
    const [isError, setIsError] = useState(false); 
    const handleHideToggle = () =>{
        setIshidden(!isHidden);
    }

    const transY = useRef(new Animated.Value(0))

    const transX = transY.current.interpolate({
        inputRange: [yMax, 0],
        outputRange: [xMax, 0],
        extrapolate: 'clamp',
    })
    
    const forceFocus = () =>{
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }
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

    const debouncedCallback = useCallback(debounce((newValue:string|null) => {callback(newValue)}, 300), [callback]);

    const handleValueChange = useCallback((newValue: string) =>{
        var currentValue: string|null = newValue;
        if(newValue.length === 0){
            currentValue = null
        }
        setValue(currentValue);
        debouncedCallback(currentValue);
    },[]);

    const isInputValid = () =>{
        if(!required){
            return true;
        }
        if(value === null){
            return false;
        };
        if(validator){
            return validator(value);
        }
        return true
    }

    const handleOnBlur = () =>{
        const isValid = isInputValid();
        if(!isValid){
            setIsError(true);
        }
        if(value === null || value.length === 0){
            Animated.timing(transY.current, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }

    const handleOnFocus =() =>{
        Animated.timing(transY.current, {
            toValue: yMax,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
        setIsError(false);
    } 
    const generateErrorMessage = useMemo(()=>{
        if(customErrorMsg){
            return customErrorMsg
        }else{
            return "ⓘ*required"
        }
    }, [customErrorMsg]);
    return (
        <KeyboardAvoidingView>
            <View style ={[styles.mainContainer]}>
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
                        (isSensitive && value!== null) && renderHideButton
                    }
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
        color: Color.colorRoyalPlum,
        fontSize: FontSize.size_base,
    }
})

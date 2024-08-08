// text input for the authentication

import { View, Text, TextInput, TouchableOpacity, StyleSheet, } from "react-native";
import { useState, useCallback, useMemo } from "react";
import React from "react";
import { Border, Color, FontFamily, FontSize } from "../../assets/general/GlobalStyles";
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
const AuthTextInput:React.FC<AuthTextInputProps> = React.memo(({title, icon, isSensitive, customErrorMsg, validator, required, callback}) =>{
    const [isHidden, setIshidden] = useState(true);
    const [value, setValue] = useState<string|null>(null);
    const [isError, setIsError] = useState(true); 
    const handleHideToggle = () =>{
        setIshidden(!isHidden);
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

    const handleValueChange = useCallback((newValue: string) =>{
        if(newValue.length === 0){
            setValue(null);
        }else{
            setValue(newValue)
        }
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
        if(isValid){
            // return the value to the parent via callback
            callback(value);
        }else{
            setIsError(true);
        }
    }

    const handleOnFocus =() =>{
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
        <View style ={[styles.mainContainer]}>
            <View style ={[styles.textInputBox, isError? styles.errorBorder: styles.normalBorder]}>
                {icon && icon}
                <TextInput
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    style ={[styles.textInput]}
                    placeholder={title}
                    onChangeText={handleValueChange}
                    secureTextEntry = {isSensitive && isHidden}
                />
                {
                    (isSensitive && value!== null) && renderHideButton
                }
            </View>
            {
                isError && required && <Text style ={[styles.errorText]}>{generateErrorMessage}</Text>
            }
        </View>
    )
});

export default AuthTextInput;

const styles = StyleSheet.create({
    mainContainer:{
        width: '100%',
        height: 'auto',
        paddingBottom: 10,
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
    }
})

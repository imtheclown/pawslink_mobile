// custom chekcbox

import { 
    View, 
    Text,
    StyleSheet,
    ViewStyle,
} from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Border, Color, FontSize, FontFamily } from "../assets/general/GlobalStyles";
import { generalStyles } from "../assets/general/generalStyles";
import { useState, useEffect } from "react";
interface CustomCheckBoxInterface {
    title: string,
    containerStyle: ViewStyle,
    oldValue: boolean,
    callback: (newValue: boolean) => void,
}
const CustomCheckBox:React.FC<CustomCheckBoxInterface> = React.memo(({title, containerStyle, callback, oldValue}) =>{
    const [isChecked, setIsChecked] = useState(oldValue);
    useEffect(() =>{
        if(oldValue!== isChecked){
            setIsChecked(oldValue)
        }
    }, [oldValue]);
    const handlePress = () =>{
        callback(!isChecked);
        setIsChecked(!isChecked);
    }
    return (
        <View style = {[styles.mainContainer, containerStyle? containerStyle: {}]}>
            <BouncyCheckbox
                isChecked = {isChecked} 
                onPress={handlePress}
                disableText
                iconStyle ={[styles.outerIcon]}
                innerIconStyle ={[styles.innerIcon]}
                fillColor={Color.colorPaleovioletred}
            />
            <Text style ={[generalStyles.TextInputTitle]}>{title}</Text>
        </View>
    )
});

export default CustomCheckBox;

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 77,
        justifyContent: 'center',
    },
    innerIcon:{
        borderRadius: Border.br_9xs,
        borderColor: Color.colorPaleovioletred,
    },
    outerIcon:{
        borderRadius: Border.br_9xs,
    },
})
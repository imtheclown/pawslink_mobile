// flexible button
import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TextStyle,
    ViewStyle

} from "react-native";
import { generalStyles } from "../../assets/general/generalStyles";
import {
    Border,
    FontFamily,
    FontSize,

} from "../../assets/general/GlobalStyles";
interface FlexibleButtonProps {
    title: string,
    fontStyle: TextStyle,
    buttonStyle: ViewStyle,
    callback: () => void,
}

const FlexibleButton : React.FC<FlexibleButtonProps> = ({title, callback,fontStyle, buttonStyle}) => {
    const handleClick = () =>{
        callback();
    }
    return (
        <TouchableOpacity 
            style = {[styles.buttonStyle, 
            generalStyles.centerContainer, 
            generalStyles.containerWithShadow,
            buttonStyle,
            ]}
            onPress={handleClick}
        >
            <Text style = {[styles.buttonTextStyle, fontStyle]}> {title} </Text>
        </TouchableOpacity>
    )
}

export default FlexibleButton;

const styles = StyleSheet.create({
    buttonStyle:{
        borderRadius: Border.br_9xs,
        marginTop: 10,
        borderWidth: 1,
        marginHorizontal: 5,
    },
    buttonTextStyle: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_xl,
        textTransform: 'capitalize',
    }
})
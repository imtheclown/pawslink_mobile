// flexible button
import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { generalStyles } from "../../assets/general/generalStyles";
import {
    Border,
    FontFamily,
    FontSize
} from "../../assets/general/GlobalStyles";
interface FlexibleButtonProps {
    title: string,
    backgroundColor: string,
    fontColor: string,
    callback: () => void,
}

const FlexibleButton : React.FC<FlexibleButtonProps> = ({title, callback, backgroundColor, fontColor}) => {
    const handleClick = () =>{
        callback();
    }
    return (
        <TouchableOpacity style = {[styles.buttonStyle, generalStyles.centerContainer, generalStyles.containerWithShadow,{backgroundColor: backgroundColor}]}
            onPress={handleClick}
        >
            <Text style = {[styles.buttonTextStyle, {color: fontColor}]}> {title} </Text>
        </TouchableOpacity>
    )
}

export default FlexibleButton;

const styles = StyleSheet.create({
    buttonStyle:{
        width: '100%',
        minHeight: 65,
        height: 'auto',
        borderRadius: Border.br_9xs,
        marginTop: 10,
    },
    buttonTextStyle: {
        fontFamily: FontFamily.interRegular,
        lineHeight: 30,
        fontSize: FontSize.size_xl,
        textTransform: 'capitalize',
    }
})
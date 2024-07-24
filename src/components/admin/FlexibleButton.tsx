// flexible button

// customizable button that allows icons
// must provide button styling for visualization
// in default, the icon is located at the left of the text
// can be customized by having flexDirection = 'row-reverse' in the buttonStyle object
import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TextStyle,
    ViewStyle

} from "react-native";
import {
    FontFamily,
    FontSize,

} from "../../assets/general/GlobalStyles";
interface FlexibleButtonProps {
    title: string,
    fontStyle: TextStyle,
    buttonStyle: ViewStyle,
    icon? :React.ReactNode,
    callback: () => void,
}

const FlexibleButton : React.FC<FlexibleButtonProps> = ({title, callback,fontStyle, buttonStyle, icon}) => {
    const handleClick = () =>{
        callback();
    }
    return (
        <TouchableOpacity 
            style = {[
            buttonStyle,
            styles.buttonStyle, 
            ]}
            onPress={handleClick}
        >
            {icon}
            <Text style = {[styles.buttonTextStyle, fontStyle]}> {title} </Text>
        </TouchableOpacity>
    )
}

export default React.memo(FlexibleButton);

const styles = StyleSheet.create({
    buttonStyle:{
        marginTop: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextStyle: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_xl,
        textTransform: 'capitalize',
    }
})
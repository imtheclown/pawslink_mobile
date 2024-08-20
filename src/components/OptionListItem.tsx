// component for settings options list item

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Color, FontSize } from "../assets/general/GlobalStyles";
import { generalStyles } from "../assets/general/generalStyles";
interface OptionListItemProps {
    title:string,
    icon: React.ReactNode,
    callback: () => void,

}

const OptionListItem: React.FC<OptionListItemProps> = ({title, icon, callback}) => {

    const handleCallback = () => {
        callback()
    }
    return (
        <TouchableOpacity onPress={handleCallback} style = {[styles.mainContainer]}>
            {icon}
            <Text style ={[styles.textStyle, generalStyles.lightInter]}>{title}</Text>
            <MaterialIcons name="arrow-forward-ios" size={16} color={Color.colorDarkslategray}/>
        </TouchableOpacity>
    )
}

export default OptionListItem;

const styles = StyleSheet.create({
    mainContainer:{
        width: '100%',
        flexDirection: 'row',
        height: 'auto',
        alignItems: 'center',
        padding: 10,
    },
    textStyle:{
        flex: 1,
        lineHeight: 28,
        fontSize: FontSize.size_base,
        color: Color.colorGray,
        paddingLeft: 10,
    }
})
// component shown when list is empty

import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import React from "react";

import { Color, FontFamily, FontSize } from '../assets/general/GlobalStyles';
import { generalStyles } from "../assets/general/generalStyles";

interface ComponentInterface {
    listName: string
}
const EmptyListNotifier: React.FC<ComponentInterface> = ({listName}) =>{
    return (
        <View style = {[styles.mainContainer, generalStyles.centerContainer]}>
            <Text style ={[styles.textStyle]}>
                {`no ${listName} found `}
            </Text>
        </View>
    )
}

export default EmptyListNotifier

const styles = StyleSheet.create({
    mainContainer:{
        width: '100%',
        height: 'auto'
    },
    textStyle:{
        lineHeight: 22,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_sm,
        color: Color.colorGray,
        textTransform: 'capitalize',
        fontStyle:'italic',
    }
})

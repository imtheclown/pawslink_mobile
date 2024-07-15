// this is to store styles that can be used multiple times

import { StyleSheet } from "react-native";
import { 
    Border, 
    Color,
    FontSize,
    FontFamily
} from "./GlobalStyles";

export const generalStyles = StyleSheet.create({
    // occupy the available space
    flexContainer:{
        flex:1
    },
    // centers child component
    centerContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    // row flex and aligns the contents in center and justify at center
    rowContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    // row flex and and align contents in center and justify at start
    rowStartContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    // row flex and seperate each children in between
    rowInBetweenContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    // add shadows to the container
    // for both ios and android
    containerWithShadow:{
        elevation: 2,
        shadowRadius: 2,
        shadowColor: "rgba(23, 26, 31, 1)",
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 3,
        },
    },
    // designs for the text inputs in the admin page
    // includes styles for the text input boxes, titles and etc
    TextInputTitle:{
        textAlign: "left",
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        color: Color.colorDarkslategray,
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        textTransform: 'capitalize',
        left: 6,
    },
    outerTextInputBox:{
        padding: 5,
        alignSelf: "flex-start"
    },
    innerTextInputBox: {
        borderRadius: Border.br_9xs,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: Color.colorWhite,
        minHeight: 55,
        height: 'auto',
        color: Color.colorDarkslategray,
        lineHeight: 55,
    },
    onFocusInnnerTextInputBox:{
        borderColor: Color.colorPaleovioletred,
    },
    normalInnerTextInputBox:{
        borderColor: Color.colorSilver
    },
    onFocusOuterTextInputBox:{
        backgroundColor: Color.colorPalevioletred_200,
        borderRadius: Border.br_5xs,
    },


})
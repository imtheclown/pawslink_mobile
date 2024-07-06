// this is to store styles that can be used multiple times

import { StyleSheet } from "react-native";
import { 
    Border, 
    Color 
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
})
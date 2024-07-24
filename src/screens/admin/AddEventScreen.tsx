// screen used to create events
import { 
    SafeAreaView, 
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import React from "react";
import { useState } from "react";
import { generalStyles } from "../../assets/general/generalStyles";
import { Color, FontFamily, FontSize, Border } from "../../assets/general/GlobalStyles";
import ResponsiveImage from "../../components/ResponsiveImage";
import FlexibleTextnput from "../../components/admin/FlexibleTextnput";
import CustomDatePicker from "../../components/admin/CustomDatePicker";
import CustomTimePicker from "../../components/admin/CustomTimePicker";
import FlexibleButton from "../../components/admin/FlexibleButton";
import { AddEventProps } from "../../navigation/admin/AdminNavigationStack";

// handle navigation here
const AddEventScreen = React.memo(({route, navigation}:AddEventProps) =>{
    
    const handleCallback = () =>{
        console.log("callback")
    }
    const handleTextInput = ()=>{
        console.log("something here")
    }
    const handleCancelButtonPress = () =>{
        navigation.goBack()
    }
    return (
        <SafeAreaView style= {[generalStyles.flexContainer, styles.mainContainer]}>
            <View style = {[styles.imageContainerStyle]}>
                <ResponsiveImage
                    source={require("../../assets/images/no_image.png")}    
                />
                <TouchableOpacity style = {[styles.buttonContainer, generalStyles.centerContainer]}>
                    <AntDesign name="upload" color={Color.colorWhite} size={16}/>
                    <Text style ={[styles.buttonTextStyle]}>choose a photo</Text>
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle ={[styles.contentContainer]}>
                <View style = {[styles.formsContainer]}>
                    <FlexibleTextnput
                        title="event name"
                        callback={handleTextInput}
                    />
                    <CustomDatePicker
                        title="event date"
                        style = {[styles.eventDate]}
                        callBack={handleCallback}
                    />
                    <CustomTimePicker 
                        title="time"
                        style ={styles.eventTime}
                    />
                    <FlexibleTextnput
                        title="location"
                        callback={handleTextInput}
                    />
                    <FlexibleTextnput
                        title="event description"
                        callback={handleTextInput}
                        numberOfLines={3}
                    />
                </View>
                {/* button containers */}
                <View style ={[styles.bottomButtonContainer]}>
                    <FlexibleButton
                        title="cancel"
                        callback={handleCancelButtonPress}
                        buttonStyle={styles.cancelButton}
                        fontStyle={styles.cancelButtonText}
                    />
                    <FlexibleButton
                        title="save"
                        callback={handleCallback}
                        buttonStyle={styles.saveButton}
                        fontStyle={styles.saveButtonText}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
});

export default AddEventScreen;

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        backgroundColor: Color.colorWhite
    },
    imageContainerStyle:{
        width: 160
    },
    buttonContainer:{
        width: 160,
        backgroundColor: Color.colorPaleovioletred,
        borderRadius: Border.br_9xs,
        flexDirection: "row",
        minHeight: 36,
        marginVertical: 10
    },
    buttonIcon:{
        marginLeft: 10, 
        marginRight: 5
    },
    buttonTextStyle:{
        color: Color.colorWhite,
        textAlign: "left",
        fontFamily: FontFamily.interRegular,
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        textTransform: 'capitalize',
        marginLeft: 5,
    },
    contentContainer:{
        alignItems: 'center',
        width: '90%'
    },
    formsContainer:{
        width: '100%',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
    // input widths
    eventDate:{
        width: '49%'
    },
    eventTime:{
        width: '49%'
    },
    // bottom buttons
    cancelButton:{
        width: 150,
        height: 40,
        backgroundColor: Color.colorWhite,
        borderColor: Color.colorPaleovioletred,
    },
    cancelButtonText:{
        fontSize: 14,
        lineHeight: 22,
        color: Color.colorPaleovioletred
    },
    saveButton:{
        width: 150,
        height: 40,
        backgroundColor: Color.colorPaleovioletred,
        borderColor: Color.colorPaleovioletred,
    },
    saveButtonText:{
        fontSize: 14,
        lineHeight: 22,
        color: Color.colorWhite
    },
    bottomButtonContainer:{
        width: '100%',
        flexDirection: "row",
        justifyContent: 'flex-end'
    },

})
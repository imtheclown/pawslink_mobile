// screen that displays the detailed data of the animal

import {
    SafeAreaView, 
    View,
    StyleSheet,
    ScrollView,
    Text
} from "react-native"
import { 
    Border,
    Color,
    FontFamily,
    FontSize
} from "../assets/general/GlobalStyles";
import React from "react";
import ResponsiveImage from "../components/ResponsiveImage"
import { generalStyles } from "../assets/general/generalStyles"
import IonIcon from "react-native-vector-icons/Ionicons"
import { AnimalSex, AnimalStatus } from "../backend/realm/schemas/Animal";
import { useState, useEffect } from "react";

// props for the status box
interface StatusBoxProps {
    value: string
}
// function that processes database data to view data
import { replaceUnderScoreWithSpace } from "../utils/TextBasedUtilityFunctions";

// box that covers the status
// differenct color (background and font) for each of the animal status
const StatusBox: React.FC<StatusBoxProps> = ({value}) =>{
    // can be optimized by creating a function and directly initialize the variables instead of using states
    // default is blue background with dark blue font color
    const [fontColor, setFontColor] = useState("#0F4C81");
    const [bgColor, setBgColor] = useState("#A1C6EA")
    // determines the color of the status box
    const getBoxColor = () => {
        if(value === AnimalStatus.ON_CAMPUS){
            setFontColor("#117B34");
            setBgColor("#EEFDF3");
        }
        else if(value === AnimalStatus.TRANSIENT){
            setFontColor("#E0949D");
            setBgColor("#FFE5E7");
        }else if (value === AnimalStatus.ADOPTED){
            setFontColor("#774A7F");
            setBgColor("#F9F5F9");
        }else if (value === AnimalStatus.OWNED){
            setFontColor("#8D6E08");
            setBgColor("#FEF9EB");
        }
    }
    useEffect (() =>{
        getBoxColor();
    }, []);
    return (
        <View style ={[styles.statusBoxContainer, {backgroundColor: bgColor}]}>
            <Text style = {[styles.statusBoxText, {color: fontColor}]}>
                {replaceUnderScoreWithSpace(value)}
            </Text>
        </View>
    )
}

// props for the information box
// title is the string that describes what the underlying data represents
// value is data for that representation
interface InfoBoxProps {
    title: string,
    value: string | Array<string>
}
// a box that displays a title and the data for that specific object the title represents
const InfoBox:React.FC<InfoBoxProps> = ({title, value}) => {
    // determines what content to generate
    // makes the component robust
    // if value is string, returns a text
    // otherwise return a list of statusbox component
    // for now the statusbox is only supported for non-text values
    const generateContent = () =>{
        if(typeof value === 'string'){
            return <Text style = {[styles.infoBoxValueText]}>
                {value}
            </Text>
        }
        if(Array.isArray(value)){
            return (
                <View style ={[generalStyles.rowStartContainer, styles.infoBoxList]}>
                    {
                        value.map((item, index) =>{
                            return <StatusBox key={index} value={item}/>
                        })
                    }
                </View>
            )
        }
    }
    return (
        <View style = {[styles.infoBoxContainer]}>
            <Text style ={[styles.infoBoxTitleText]}>{title}</Text>
            {generateContent()}
        </View>
    )
}
interface animalInterface {
    sex: AnimalSex
}
// view animal screen
// in progress
// should display all the data for the specified animal
// pass animal object or sort of
const ViewAnimalScreen: React.FC<animalInterface> = () =>{
    // temporary
    const sex = AnimalSex.MALE;
    // determines what sex icon to display
    const getSexIcon = () =>{
        return (
            <IonIcon
            name= {sex === AnimalSex.MALE? "male":"female"}
            size={18}
            color={sex === AnimalSex.MALE? 'blue':Color.colorPaleovioletred}
            style = {[{marginLeft : 10}]}
        />
        )
    }
    return (
        <SafeAreaView style = {[generalStyles.flexContainer, generalStyles.centerContainer, styles.mainContainer]}>
            <ScrollView style = {[styles.scrollContainer]}>
                <ResponsiveImage
                    source={require("../assets/images/no_image.png")}
                />
                {/* name and sex */}
                <View style = {[generalStyles.rowStartContainer,styles.nameAndSexContainer]}>
                    <Text style = {[styles.nameTextStyle]}>{`Name`}</Text>
                    {getSexIcon()}
                </View>
                <Text style = {[styles.usualLocationTextStyle]}>
                    {`Usual location`}
                </Text>
                <View style={[styles.infoBoxWrapper, generalStyles.rowStartContainer]}>
                    <InfoBox
                        title={"age"}
                        value={"NA"}
                    />
                    <InfoBox
                        title={"status"}
                        value={[AnimalStatus.ON_CAMPUS, AnimalStatus.OWNED, AnimalStatus.ADOPTED, AnimalStatus.RAINBOW_BRIDGE, AnimalStatus.TRANSIENT]}
                    />
                    <InfoBox
                        title={"vaccinated last"}
                        value={"NA"}
                    />
                    <InfoBox
                        title={"dewormed last"}
                        value={"NA"}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
    },
    scrollContainer:{
        width: '90%',
        height: '100%'
    },
    imageStyle : {
        width: '100%',
    },
    nameTextStyle:{
        fontSize: 24,
        lineHeight: 36,
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
        textAlign: "left",
        fontWeight: "700",
    },
    nameAndSexContainer:{
        marginTop: 10
    },
    usualLocationTextStyle:{
        lineHeight: 24,
        color: Color.colorSilver,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_sm,
        textAlign: "left",
    },
    // infobox wrapper
    infoBoxWrapper:{
        width: '100%',
        height: 'auto',
        flexWrap: 'wrap'
    },
    // info box
    infoBoxContainer : {
        width: '50%',
        marginVertical: 5
    },
    infoBoxTitleText:{
        fontSize: FontSize.size_xs,
        color: Color.colorSilver,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
        textAlign: "left",
        textTransform: 'uppercase',
    },
    infoBoxValueText:{
        color: Color.colorDimgray,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
        fontSize: FontSize.size_sm,
        textAlign: "left",
        textTransform: 'uppercase'
    },
    infoBoxList:{
        flexWrap: 'wrap',
        width: '100%'
    },
    // status box
    statusBoxContainer:{
        marginRight: 10,
        marginTop: 5,
        width: 'auto',
        height: 'auto',
        paddingHorizontal: 5,
        borderRadius: Border.br_4xs,
        alignSelf: 'flex-start'
    },
    statusBoxText:{
        alignSelf: 'flex-start',
        fontFamily: FontFamily.interRegular,
        fontSize: 11,
        fontWeight: 400,
        lineHeight: 16,
        textTransform: 'uppercase'
    }
})

export default ViewAnimalScreen
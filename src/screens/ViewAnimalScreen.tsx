// screen that displays the detailed data of the animal

import {
    SafeAreaView, 
    View,
    StyleSheet,
    ScrollView,
    Text,
    ViewStyle,
    TextStyle
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
import { AnimalSex} from "../backend/realm/schemas/Animal";
import { useState, useEffect } from "react";
import { AnimalStatus } from "../models";

// function that processes database data to view data
import { replaceUnderScoreWithSpace } from "../utils/TextBasedUtilityFunctions";
// general purpose button
import RoundButton from "../components/RoundButton";

interface ParagraphProps {
    title: string,
    content: string
}
// maybe add margin vertical in the view
const Paragraph:React.FC<ParagraphProps> = ({title, content}) =>{
    return (
        <View style = {[{marginVertical: 10}]}>
            <Text style = {[styles.infoBoxTitleText]}>{title}</Text>
            <Text style ={[styles.infoBoxValueText]}>{content}</Text>
        </View>
    )
}
// props for the status box
interface StatusBoxProps {
    value: string
}

// box that covers the status
// differenct color (background and font) for each of the animal status
export const StatusBox: React.FC<StatusBoxProps> = React.memo(({value}) =>{

    const generateBoxStyle = (): {font: TextStyle, background: ViewStyle} => {
        const generatedStyles =  {
            font : {color: "#0F4C81" },
            background: {backgroundColor: '"#A1C6EA"'}
        }
        if(value === AnimalStatus.ON_CAMPUS){
            generatedStyles.font.color = "#117B34";
            generatedStyles.background.backgroundColor = "#EEFDF3";
        }
        else if(value === AnimalStatus.TRANSIENT){
            generatedStyles.font.color = "#E0949D";
            generatedStyles.background.backgroundColor = "#FFE5E7";
        }else if (value === AnimalStatus.ADOPTED){
            generatedStyles.font.color = "#774A7F";
            generatedStyles.background.backgroundColor = "#F9F5F9";
        }else if (value === AnimalStatus.OWNED){
            generatedStyles.font.color = "#8D6E08";
            generatedStyles.background.backgroundColor = "#FEF9EB";
        }
        return generatedStyles
    }
    const generatedStyles = generateBoxStyle();
    return (
        <View style ={[styles.statusBoxContainer, generatedStyles.background]}>
            <Text style = {[styles.statusBoxText, generatedStyles.font]}>
                {replaceUnderScoreWithSpace(value)}
            </Text>
        </View>
    )
})

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

// trial data

const myTitle = "TRAITS AND PERSONALITY"
const data = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "
// trial data

interface animalInterface {
    sex: AnimalSex
}
// view animal screen
// in progress
// should display all the data for the specified animal
// pass animal object or sort of
const ViewAnimalScreen = () =>{
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
                <View style={[styles.infoBoxWrapper]}>
                    <InfoBox
                        title={"age"}
                        value={"NA"}
                    />
                    <InfoBox
                        title={"status"}
                        value={[AnimalStatus.ON_CAMPUS, AnimalStatus.ADOPTED]}
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
                <Paragraph title= {myTitle} content={data}/>
                <Paragraph title= {myTitle} content={data}/>
                <RoundButton 
                backgroundColor="#f6d25e"
                callBack={() =>{
                    console.log("pressed")
                }}
                title="adopt me"
                />
            </ScrollView>
        </SafeAreaView>
    )
}
export default ViewAnimalScreen
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
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems:'flex-start'
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
        textTransform: 'uppercase'
    },
    infoBoxValueText:{
        color: Color.colorDimgray,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
        fontSize: FontSize.size_sm,
        textAlign: "left",
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
        alignSelf: 'flex-start',
        elevation: 2
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


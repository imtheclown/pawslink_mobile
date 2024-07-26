// box that shows preview of the adoption request
// includes the name of the adopter and of the animal

import { View, Text, StyleSheet} from "react-native";
import React from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Avatar } from "@rneui/base";
import { Color, Border, FontFamily, FontSize } from "../../assets/general/GlobalStyles";
import FlexibleButton from "./FlexibleButton";
import { generalStyles } from "../../assets/general/generalStyles";
interface AdoptionRequestBoxProps {
    adopterInfo: {name:string, imgUrl: string| null}
    animalName: string,
    adoptionRequestID?: string,
}
const AdoptionRequestBox: React.FC<AdoptionRequestBoxProps> = React.memo(({adopterInfo, animalName, adoptionRequestID}) =>{

    const gotoViewAdoptRequest = () =>{
        console.log("pressed")
    }
    return (
        <View style ={[styles.mainContainer, generalStyles.containerWithShadow]}>
            <View style = {[styles.contentContainer]}>
                <View style = {[styles.iconContainerStyle]}>
                    <Avatar
                        size={46}
                        rounded
                        source={adopterInfo.imgUrl!== null?{uri:adopterInfo.imgUrl}: require("../../assets/images/no_image.png")}
                    />
                </View>
                <View style ={[styles.textContainerStyle]}>
                    <Text style = {[styles.textStyle]}>
                        <Text style={[styles.boldText]}>
                            {adopterInfo.name}
                        </Text>
                        <Text>
                            {` wants to adopt `}
                        </Text>
                        <Text style = {[styles.boldText]}>
                            {`${animalName}.`}
                        </Text>
                    </Text>
                </View>
                <FlexibleButton
                    icon = {<FontAwesome name="eye" color={Color.colorPaleovioletred} size={16}/>}
                    buttonStyle={styles.buttonStyle}
                    callback={gotoViewAdoptRequest}
                />
            </View>
        </View>
    )
})

export default AdoptionRequestBox

const styles = StyleSheet.create({
    mainContainer:{
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        backgroundColor: Color.colorWhite,
        borderRadius: Border.br_9xs,
    },
    contentContainer:{
        width: '95%',
        flexDirection: 'row',
    },
    textContainerStyle:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',    
        marginVertical: 10,
    },
    textStyle:{
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_sm,
        lineHeight: 20,
        fontWeight: 400,

    },
    boldText:{
        fontWeight: 700,
        fontFamily:FontFamily.interBold,
    },
    iconContainerStyle:{
        width: 'auto',
        height: 'auto',
        margin: 10
    },
    buttonStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: 46,
        aspectRatio: 1,
        borderColor: 'transparent',
        margin: 10
    }
})
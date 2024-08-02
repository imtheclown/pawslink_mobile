// ui component used to display data of created events

import { 
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity
 } from "react-native";
import { generalStyles } from "../../assets/general/generalStyles";
import { FontFamily, Color, FontSize, Border } from "../../assets/general/GlobalStyles";
import AntDesign from 'react-native-vector-icons/AntDesign'
import React from "react";
import FlexibleButton from "./FlexibleButton";

// navigation imports
import { useNavigation } from "@react-navigation/native";
import type { StackNavProps } from "../../navigation/AppNavigation";

// aws
import { LazyEvent} from "../../models";
interface EventBoxInterface {
    eventObject: LazyEvent
}

const EventBox:React.FC<EventBoxInterface> = React.memo(({eventObject}) =>{
    const navigation = useNavigation<StackNavProps>();
    const handleCallback = () =>{
        console.log("handled")
    }

    const gotoEdit = () =>{
        navigation.navigate("add_event", {eventObject})
    }
    return (
        <View style ={[styles.mainContainer, generalStyles.containerWithShadow]}>
            {/* side image */}
            <View style = {[styles.contentContainer]}>
                <View style ={[styles.imageContainer, generalStyles.flexContainer]}>
                    <Image
                        style = {[styles.imageStyle]}
                        resizeMode="cover"
                        source={require("../../assets/images/no_image.png")}
                    />
                </View>
                {/* the other half component */}
                {/* details */}
                <View style ={[styles.rightContainer]}>
                    {/* title */}
                    <Text style = {[styles.titleText]}>
                        {eventObject.name}
                    </Text>
                    {/* details */}
                    <Text>
                    {new Date(eventObject.eventDate).toDateString()} | {eventObject.eventTime} | {eventObject.location}
                    </Text>
                    {/* button container */}
                    <View style ={[styles.buttonContainer]}>
                        {/* edit button button */}
                        <FlexibleButton
                            title="edit"
                            buttonStyle={{...styles.buttonStyle, ...styles.editButton}}
                            fontStyle={{...styles.buttonTextStyle, ...styles.editButtonText}}
                            icon = {<AntDesign name="edit" color={Color.colorWhite} size={11}/>}
                            callback={gotoEdit}
                        />
                        {/* delete button */}
                        <FlexibleButton
                            title="delete"
                            buttonStyle={{...styles.buttonStyle, ...styles.deleteButton}}
                            fontStyle={{...styles.buttonTextStyle, ...styles.deleteButtonText}}
                            icon = {<AntDesign name="minus" color={Color.colorPaleovioletred} size={11}/>}
                            callback={handleCallback}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
});

export default EventBox

const styles = StyleSheet.create({
    mainContainer:{
        width: '98%',
        backgroundColor: Color.colorWhite,
        height: 'auto',
        borderRadius: Border.br_9xs,
        alignItems: 'center',
        margin: 5
    },
    contentContainer:{
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
    },
    imageContainer:{
        flexDirection: 'row',
        margin: 10
    },
    imageStyle:{
        flex: 1,
        aspectRatio: 1,
    },
    rightContainer:{
        flex: 3,
        marginVertical: 10,
        marginRight: 10,
    },
    titleText:{
        fontFamily: FontFamily.epilogueBold,
        fontWeight: 700,
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        color: Color.colorDarkslateblue,
        textTransform: 'capitalize',
    },
    detailsText:{
        fontFamily: FontFamily.interRegular,
        fontWeight: 400,
        fontSize: 12,
        lineHeight: 20,
        color: Color.colorGray,
    },
    // buttons
    buttonContainer:{
        flexDirection: 'row'
    },
    buttonStyle :{
        flexDirection: 'row',
        width: 60,
        height: 26,
        borderRadius: Border.br_9xs,
        marginRight: 5,
    },
    buttonTextStyle:{
        fontFamily: FontFamily.interRegular,
        lineHeight: 18,
        fontSize: 11,
        fontWeight: 400,
        textTransform: 'capitalize',
    },
    editButton:{
        backgroundColor: Color.colorPaleovioletred,
        borderColor: Color.colorPaleovioletred,
    },
    editButtonText:{
        color: Color.colorWhite,
    },
    deleteButton:{
        backgroundColor: Color.colorPalevioletred_200,
        borderColor: Color.colorPalevioletred_200,
    },
    deleteButtonText:{
        color: Color.colorPaleovioletred
    },
})
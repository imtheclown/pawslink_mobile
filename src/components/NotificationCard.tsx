import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { NotificationType } from '../screens/NotificationScreen';
import React from "react";
import CommunityMaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color, Border, FontSize } from "../assets/general/GlobalStyles";
import { generalStyles } from "../assets/general/generalStyles";

// utils
import { capitalizeSentence } from "../utils/TextBasedUtilityFunctions";

interface NotificationCardInterface {
    type: NotificationType,
    animalName?: string,
    // add link to the sent approval form
}

const NotificationCard: React.FC<NotificationCardInterface> = ({ type, animalName }) => {
    const generateIcon = () => (
        <CommunityMaterialIcons
            style={styles.iconStyle}
            name={type === NotificationType.ADOPTION_APPROVED ? "paw" : "message-alert-outline"}
            color={Color.colorDarkslateblue}
            size={24}
        />
    );

    const generateString = () => {
        if (type === NotificationType.ADOPTION_APPROVED) {
            return (
                <View style={{ flexShrink: 1 }}>
                    <Text  style ={[styles.normalLetter]}>
                        {`Congratulations! Your application to adopt`}
                        <Text style ={[generalStyles.boldInter,styles.pinkLetter ]}>{` ${capitalizeSentence(animalName? animalName: "")} `}</Text>
                        <Text style ={[generalStyles.boldInter, styles.blackLetter]}>{`has been approved.`}</Text>
                        <Text>{` Click on this notification to fill up the `}</Text>
                        <Text style ={[generalStyles.boldInter,styles.pinkLetter ]}>{`approval form.`}</Text>
                    </Text>
                </View>
            );
        }
        return (
            <View style={[{ flexShrink: 1 }]}>
                <Text style ={[styles.normalLetter]}>
                    {`It's time for your `}
                    <Text style ={[styles.darkSlateblueLetter, generalStyles.boldInter,]}>{`monthly update!`}</Text>
                    <Text>{` Click on this notification to log your pet's status and progress.`}</Text>
                </Text>
            </View>
        );
    };

    return (
        <TouchableOpacity style={[styles.mainContainer, generalStyles.containerWithShadow]}>
            {generateIcon()}
            {generateString()}
        </TouchableOpacity>
    );
}

export default NotificationCard;

const styles = StyleSheet.create({
    mainContainer: {
        width: '95%',
        backgroundColor: Color.colorWhite,
        padding: 10,
        margin: 5,
        borderRadius: Border.br_7xs,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconStyle: {
        alignSelf: 'flex-start',
        marginRight: 10,
    },
    normalLetter:{
        color: Color.colorDarkslategray,
    },
    pinkLetter: {
        color: Color.colorPaleovioletred,
    },
    blackLetter:{
        color: Color.colorBlack,
    },
    darkSlateblueLetter:{
        color: Color.colorDarkslateblue,
    }
});

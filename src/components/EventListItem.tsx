// card for event list item
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ResponsiveImage from "./ResponsiveImage";

import { Color, Border, FontSize, FontFamily } from "../assets/general/GlobalStyles";
import { generalStyles } from "../assets/general/generalStyles";
import { LazyEvent } from "../models";
import React from "react";
import { useState, useEffect, useMemo, } from "react";
import { convertTimeToString } from "../utils/DateTimeBasedUtilityFunctions";
interface EventListItemProps {
    eventObject: LazyEvent,
}
const EventListItem:React.FC<EventListItemProps> = ({eventObject}) => {
    const generateDateString = useMemo(() =>{
        return new Date(eventObject.eventDate).toDateString();
    }, [eventObject]);

    const generateTimeString = useMemo(() =>{
        return convertTimeToString(eventObject.eventTime)
    }, [eventObject])
    return (
        <TouchableOpacity style ={[generalStyles.containerWithShadow ,styles.mainContainer]}>
            <ResponsiveImage
                source={require("../assets/images/no_image.png")}
            />
            <Text style ={[styles.titleText, generalStyles.boldEpilogue,]}>{eventObject.name}</Text>
            <Text style ={[styles.contentText, generalStyles.lightInter]}>
                <Text>
                    {generateDateString}
                </Text>
                {" | "}
                <Text>
                    {generateTimeString}
                </Text>
                {" | "}
                <Text>
                    {eventObject.location}
                </Text>
            </Text>
            <Text style ={[styles.contentText]}>
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `}
            </Text>
        </TouchableOpacity>
    )
}

export default EventListItem;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
        padding: 10,
        borderRadius: Border.br_9xs,
        margin: 5
    },
    titleText:{
        fontSize: FontSize.size_lg,
        color: Color.colorDarkPink,
        lineHeight: 32,    },
    contentText:{
        fontSize: 12,
        lineHeight: 19,
        color: Color.colorDarkslategray,
    }
});
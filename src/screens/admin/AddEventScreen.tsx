// screen used to create events
import { 
    SafeAreaView, 
    ScrollView,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { generalStyles } from "../../assets/general/generalStyles";
import { Color, FontFamily, FontSize, Border } from "../../assets/general/GlobalStyles";
import ResponsiveImage from "../../components/ResponsiveImage";
import FlexibleTextnput from "../../components/admin/FlexibleTextnput";
import CustomDatePicker from "../../components/admin/CustomDatePicker";
import CustomTimePicker from "../../components/admin/CustomTimePicker";
import FlexibleButton from "../../components/admin/FlexibleButton";
import { AddEventProps } from "../../navigation/admin/AdminNavigationStack";
import { pickImageFromDir } from "../../utils/FileBasedUtilitilityFunctions";
import { generateTimeFromNumbers } from "../../utils/DateTimeBasedUtilityFunctions";
// time object followed by the time picker
import { PickedTime } from "../../components/admin/CustomTimePicker";
import { LazyEvent, Event } from "../../models";
import { DataStore } from "aws-amplify/datastore";

interface EventObject {
    imgURL?: string,
    location: string,
    name: string,
    eventDate: string,
    eventTime: string,
    description: string,
}

const AddEventScreen = React.memo(({route, navigation}:AddEventProps) =>{
    const params = route.params;
    // handle states
    const [imgUrl, setImgUrl] = useState<string|null>(null);
    const [name, setName] = useState<string|null>(null);
    const [location, setLocation] = useState<string|null>(null);
    const [description, setDescription] = useState<string|null>(null);
    const [date, setDate] = useState<Date|null>(null);
    const [time, setTime] = useState<PickedTime|null>(null);
    
    useEffect(() =>{
        if(params.eventObject){
            const eventObject = params.eventObject;
            // set the non-null values
            setName(eventObject.name);
            setLocation(eventObject.location);
            setDescription(eventObject.description);
            setDate(eventObject.eventDate === null? null: new Date(eventObject.eventDate));
            setTime(generatePickedTimeObject(eventObject.eventTime));
            if(eventObject.imgURL){
                setImgUrl(eventObject.imgURL);
            }
        }
    }, []);

    const generatePickedTimeObject = (timeString: string):PickedTime|null =>{
        const seperatedValues = timeString.split(":");
        if(seperatedValues.length < 3){
            return null
        }
        try {
            const hours = parseInt(seperatedValues[0]);
            const minutes = parseInt(seperatedValues[1]);
            return {
                hours,
                minutes
            }
        }catch(err){
            console.log(err);
            return null
        }
    }
    const handleCallback = () =>{
        console.log("callback")
    }
    const handleSave = async () =>{
        const eventObject: EventObject|null = generateEventObject();
        if(eventObject !== null){
            try{
                await DataStore.save(new Event(eventObject))
                .then(()=>{
                    console.log("success");
                })
                .catch(err =>{
                    console.log(err);
                })
            }
            catch(err){
                console.log(err)
            }
        }
    }

    const generateEventObject = ():EventObject|null =>{
        if(!name || !location || !date || !time|| !description ){
            return null;
        }
        const eventObject:EventObject = {
            name: name,
            location: location,
            eventDate: date.toISOString().split('T')[0],
            eventTime: generateTimeFromNumbers(time.hours, time.minutes),
            description: description
        }

        if(imgUrl !== null){
            eventObject.imgURL = imgUrl;
        }
        return eventObject
    }
    // handle callbacks here
    // changes the name state
    const handleNameChange = useCallback((newValue:(string|null)) =>{
        setName(newValue);
    }, []);
    // handles changes in the location state
    const handleLocationChange = useCallback((newValue:(string|null)) =>{
        setLocation(newValue);
    }, []);
    // handles the change in the event description
    const handleDescriptionChange = useCallback((newValue: (string| null)) =>{
        setDescription(newValue);
    }, []);
    // handle sthe change in date state
    const handleDateChange = useCallback((newValue: Date|null) =>{
        setDate(newValue);
    }, []);
    // handles the change in the time state
    const handleTimeChange = useCallback((newValue: PickedTime|null) =>{
        setTime(newValue);
    }, []);
    // handles the picking of images from the file manager
    const handlePickImage = useCallback(() =>{
        pickImageFromDir()
        .then(res =>{
            if(res[0].uri){
                setImgUrl(res[0].uri)
            }
            throw new Error("cannot find the selected image's directory");
        }).catch(err =>{
            console.log(err)
        })
    }, []);
    // dismisses the keyboard when user clicks outside of the text input
    // removes focus from each of the text input present in the screen
    const handleExitTextInput =() =>{
        Keyboard.dismiss();
    }
    const handleCancelButtonPress = () =>{
        navigation.goBack()
    }
    return (
        <TouchableWithoutFeedback onPress={handleExitTextInput}>
            <SafeAreaView style= {[generalStyles.flexContainer, styles.mainContainer]}>
                <View style = {[styles.imageContainerStyle]}>
                    <ResponsiveImage
                        source={require("../../assets/images/no_image.png")}    
                    />
                    <FlexibleButton
                        title={imgUrl === null? 'choose photo': 'change photo'}
                        icon = {<AntDesign name="upload" color={Color.colorWhite} size={16}/>}
                        buttonStyle={styles.buttonContainer}
                        fontStyle={styles.buttonTextStyle}
                        callback={handlePickImage}
                    />
                </View>
                <ScrollView contentContainerStyle ={[styles.contentContainer]}>
                    <View style = {[styles.formsContainer]}>
                        <FlexibleTextnput
                            title="event name"
                            callback={handleNameChange}
                            oldValue={name}
                        />
                        <CustomDatePicker
                            title="event date"
                            style = {[styles.eventDate]}
                            callBack={handleDateChange}
                            oldValue={date}
                        />
                        <CustomTimePicker 
                            title="time"
                            style ={styles.eventTime}
                            callback={handleTimeChange}
                            oldValue={time}
                        />
                        <FlexibleTextnput
                            title="location"
                            oldValue={location}
                            callback={handleLocationChange}
                        />
                        <FlexibleTextnput
                            title="event description"
                            numberOfLines={3}
                            oldValue={description}
                            callback={handleDescriptionChange}
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
                            callback={handleSave}
                            buttonStyle={styles.saveButton}
                            fontStyle={styles.saveButtonText}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
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
        marginVertical: 10,
        borderColor: Color.colorPaleovioletred,
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
        marginRight: 10,
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
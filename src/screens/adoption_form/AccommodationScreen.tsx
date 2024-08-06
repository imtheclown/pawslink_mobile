// accommodation screen of the adoption form

import { 
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import React from "react";
import { useState, useCallback } from "react";
import { Color, FontFamily, Border } from "../../assets/general/GlobalStyles";
import { generalStyles } from "../../assets/general/generalStyles";
import FlexibleTextInput from "../../components/FlexibleTextnput";
import CustomRadioButton from "../../components/CustomRadioButton";
import FlexibleButton from "../../components/admin/FlexibleButton";
// navigation

// aws
import { LazyPetAccommodation } from "../../models";
import { AccommodationScreenProps } from "../../navigation/AppNavigation";
import { ca } from "react-native-paper-dates";
const AccommodationScreen = ({route, navigation}:AccommodationScreenProps) =>{
    const [adoptionDestination, setAdoptionDestination] = useState<string|null>(null);
    const [indoorOutdoor, setIndoorOutdoor] = useState<string|null>(null);
    const [cagedLeashed, setCagedLeashed] = useState<string|null>(null);

    const handleAdoptionDestinationChange = useCallback((newValue: string|null) =>{
        setAdoptionDestination(newValue);
    }, []);

    const handleIndoorOutdoorChange = (newValue: string|null) =>{
        setIndoorOutdoor(newValue)
    }

    const handleCagedLeashedChange = (newValue: string |null) =>{
        setCagedLeashed(newValue);
    }

    const generateAccommodationObject = ():LazyPetAccommodation|null => {
        if(!adoptionDestination || !indoorOutdoor || ! cagedLeashed){
            return null
        }
        const accommodationObject: LazyPetAccommodation = {
            adoptionDestination: adoptionDestination,
            indoorOutdoor: indoorOutdoor,
            cagedLeashed: cagedLeashed
        }
        return accommodationObject;
    }
    const handleNext = () =>{
        const accoObject = generateAccommodationObject();
        if(accoObject !== null){
            navigation.navigate("adoption_form_4", {
                petAccommodationObject: accoObject
            })
        }
        navigation.navigate("adoption_form_4", {});
    }

    const gotoPreviousPage = () =>{
        navigation.goBack();
    }
    return(
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <Text style = {[styles.headerTextStyle]}>{`accommodations`}</Text>
            <ScrollView contentContainerStyle ={[styles.scrollViewContainer]}>
                <View style ={[styles.contentContainer]}>
                    <FlexibleTextInput
                        title="where do you plan to keep the adopted dog/cat?"
                        oldValue={adoptionDestination}
                        callback={handleAdoptionDestinationChange}
                        style ={styles.fullWidth}
                    />
                    <CustomRadioButton
                        title="Are you planning to keep them indoors only? Indoors with occasional outdoor time? or Strictly outdoor?"
                        data={["indoors only", "indoors with occasional outdoor time", "strictly outdoors"]}
                        oldValue={indoorOutdoor}
                        callback={handleIndoorOutdoorChange}
                    />
                    <CustomRadioButton
                        title="Will you keep them leashed or caged? or just when needed?"
                        data={["leashed", "caged", "leashed and caged", "only when needed"]}
                        oldValue={cagedLeashed}
                        callback={handleCagedLeashedChange}
                    />
                    <View style ={[styles.buttonContentContainer]}>
                        <FlexibleButton
                            title="next"
                            callback={handleNext}
                            buttonStyle={{...styles.buttonContainer, ...styles.nextButton}}
                            fontStyle={{...styles.buttonText, ...styles.nextButtonText}}
                        />
                        <FlexibleButton
                            title="return to previous page"
                            callback={gotoPreviousPage}
                            buttonStyle={{...styles.buttonContainer, ...styles.returnButton}}
                            fontStyle={{...styles.buttonText, ...styles.returnButtonText}}
                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default AccommodationScreen;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
        alignItems: 'center'
    },
    headerTextStyle:{
        color: Color.colorDarkslateblue,
        fontFamily: FontFamily.interBold,
        fontSize: 26,
        textTransform: 'capitalize',
        marginTop: 40,
        paddingBottom: 10,
    },
    fullWidth:{
        width: '100%'
    },
    contentContainer:{
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    scrollViewContainer:{
        alignItems: 'center',
        width: '95%'
    },
    // button
    buttonContainer:{
        width: '100%',
        height: 52,
        borderRadius: Border.br_7xl,
        marginTop: 10,
    },
    nextButton:{
        marginTop: 30,
        backgroundColor: Color.colorPaleovioletred,
        borderColor: Color.colorPaleovioletred,
    },
    buttonText:{
        fontFamily: FontFamily.interRegular,
    },
    nextButtonText: {
        color: Color.colorWhite,
    },
    returnButton:{
        backgroundColor: Color.colorWhite,
        borderColor:Color.colorPaleovioletred,
    },
    returnButtonText:{
        color: Color.colorPaleovioletred
    },
    buttonContentContainer:{
        width: '100%'
    }
})
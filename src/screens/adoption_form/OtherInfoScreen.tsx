// adoption form screen for other info

import { SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
 } from "react-native";

import { generalStyles } from "../../assets/general/generalStyles";
import { Color, FontFamily, Border } from "../../assets/general/GlobalStyles";
import FlexibleTextInput from "../../components/FlexibleTextnput";
import { useState, useCallback } from "react";
import CustomRadioButton from "../../components/CustomRadioButton";
import FlexibleButton from "../../components/admin/FlexibleButton";
import { LazyAdopterOtherInfo } from "../../models";

import { OtherInfoScreenProps } from "../../navigation/AppNavigation";
import { ca } from 'react-native-paper-dates';
const OtherInfoScreen = ({route, navigation}: OtherInfoScreenProps) =>{
    const [basicNecessities, setBasicNecessities] = useState<string|null>(null);
    const [enrichmentAct, setEnrichmentAct] = useState<string|null>(null);
    const [discoverySource, setDiscoverySource] = useState<string|null>(null);

    const handleBasicNecessitiesChange = useCallback((newValue:string| null) =>{
        setBasicNecessities(newValue);
    },[]);

    const handleEnrichmentActChange = useCallback((newValue: string|null) =>{
        setEnrichmentAct(newValue);
    }, []);

    const handleDiscoverySourceChange = useCallback((newValue:string|null) =>{
        setDiscoverySource(newValue);
    }, []);

    const gotoPreviousPage = useCallback(() =>{
        navigation.goBack()
    }, []);

    const generateOtherInfoObject = ():LazyAdopterOtherInfo|null =>{
        if(!basicNecessities || !enrichmentAct || !discoverySource){
            return null;
        }
        const otherInfoObject: LazyAdopterOtherInfo = {
            basicNecesities :basicNecessities.split("\n"),
            enrichmentAct: enrichmentAct,
            discoverySource: discoverySource

        }
        return otherInfoObject;
    }
    const gotoNext = useCallback(() =>{
        const otherInfoObject = generateOtherInfoObject();
        if(otherInfoObject !== null){
            navigation.navigate("adoption_form_5", {
                otherInfo: otherInfoObject,
            })
            console.log("true");
        }
        navigation.navigate("adoption_form_5", {});
    }, []);

    return (
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <Text style ={[styles.headerTextStyle]}>{`other questions`}</Text>
            <ScrollView contentContainerStyle ={[styles.scrollViewContainer]}>
                <View style ={[styles.contentContainer]}>
                    <FlexibleTextInput
                        title="Name ten (10) basic necessities for dogs/cats?"
                        oldValue={basicNecessities}
                        callback={handleBasicNecessitiesChange}
                        numberOfLines={5}
                        style={styles.fullWidth}
                    />
                    <FlexibleTextInput
                        title="Name one (1) enrichment activity for dog/cat?"
                        callback={ handleEnrichmentActChange}
                        oldValue={enrichmentAct}
                        style ={styles.fullWidth}
                    />
                    <CustomRadioButton
                        title="How did you hear about us?"
                        data={["social media", "friends/Acquaintances/Family", "classmates", "posters"]}
                        oldValue={discoverySource}
                        callback={handleDiscoverySourceChange}
                    />
                    <View style ={[styles.buttonContentContainer]}>
                        <FlexibleButton
                            title="next"
                            callback={gotoNext}
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

export default OtherInfoScreen
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
    fullWidth:{
        width: '100%'
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
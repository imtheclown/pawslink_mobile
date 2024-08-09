// screen for data privacy

import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
} from "react-native";
import { Color, FontFamily, FontSize, Border, } from "../../assets/general/GlobalStyles";
import { generalStyles } from "../../assets/general/generalStyles";
import CustomCheckBox from "../../components/CustomCheckBox";
import { useState, useCallback } from "react";
import FlexibleButton from "../../components/admin/FlexibleButton";
import { DataPrivacyScreenProps } from "../../navigation/AppNavigation";
const DataPrivacyScreen = ({route, navigation}:DataPrivacyScreenProps) =>{
    const [isChecked, setIsChecked] = useState<boolean|null>(null);
    const handleCheckBox = (newValue: boolean|null) =>{
        setIsChecked(newValue);
    }

    const gotoNext =useCallback(() =>{
        navigation.navigate("thank_you_screen", {contentText: `Thank you for your interest in adopting! you'll hear back from us soon.`});
    }, []);

    const gotoPreviousPage = useCallback(() =>{
        navigation.goBack();
    }, [])
    return (
        <SafeAreaView style ={[styles.mainContainer, generalStyles.flexContainer]}>
            <Text style ={[styles.headerTextStyle]}>{`data privacy`}</Text>
            <View style ={[styles.textContentContainer]}>
                <Text style ={[styles.contentText]}>
                    {
        `By signifying your consent here and by submitting this form, you are allowing  Project PAWradise  to use, access, and store the information provided for communication, and collaborations for future activities and initiatives.\n\nIn accordance with Republic Act 10173, also known as the "Data Privacy Act of 2012," the organization shall maintain the confidentiality of the information you submitted and used it for the purpose of developing a database of our adopters.`
                    }
                </Text>
            </View>
            <View style ={[styles.checkBoxContainer, generalStyles.containerWithShadow]}>
                <CustomCheckBox
                    title="I understand and agree to the privacy statement above."
                    oldValue = {false}
                    callback={handleCheckBox}
                    containerStyle={styles.customCheckBoxContainer}
                    fontStyle={styles.customCheckBoxText}
                />
            </View>
            <View style ={[styles.buttonContainer]}>
                <FlexibleButton
                    title="submit adoption request"
                    callback={gotoNext}
                    buttonStyle={{...styles.navButton, ...styles.nextButton}}
                    fontStyle={{...styles.buttonText, ...styles.nextButtonText}}
                />
                <FlexibleButton
                    title="return to previous page"
                    callback={gotoPreviousPage}
                    buttonStyle={{...styles.navButton, ...styles.returnButton}}
                    fontStyle={{...styles.buttonText, ...styles.returnButtonText}}
                />
            </View>
        </SafeAreaView>
    )
}

export default DataPrivacyScreen;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
        alignItems: 'center'
    },
    headerTextStyle:{
        color: Color.colorDarkslateblue,
        fontFamily: FontFamily.interBold,
        fontSize: 26,
        marginTop: 40,
        paddingBottom: 10,
        textTransform: 'capitalize',
    },
    textContentContainer:{
        width: '90%'
    },
    contentText:{
        fontFamily: FontFamily.interRegular,
        fontWeight: 400,
        fontSize: FontSize.size_base,
        lineHeight: 26,
        color: "#171A1F"
    },
    checkBoxContainer:{
        marginTop: 30,
        width: '90%',
        padding: 20,
        backgroundColor: Color.colorWhite,
        borderRadius: Border.br_9xs,
    },
    customCheckBoxContainer:{
        width: '100%',
        alignItems: 'flex-start',
    },
    customCheckBoxText:{
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_base,
        fontWeight: 400,
        lineHeight: 22,
        color: "#171A1F",
        marginLeft: 5,
    },
    navButton:{
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
    buttonContainer:{
        width: '95%',
    }
})

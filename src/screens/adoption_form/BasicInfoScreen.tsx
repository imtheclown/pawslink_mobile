// adoption form
// basic info
// asks about the basic information of the adoptor


import { 
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
    View
} from "react-native";
import { Dialog } from "@rneui/base";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Color, FontFamily, FontSize, Border } from "../../assets/general/GlobalStyles";
import { generalStyles } from "../../assets/general/generalStyles";
import FlexibleTextInput from "../../components/FlexibleTextnput";
import CustomCheckBox from "../../components/CustomCheckBox";
import FlexibleButton from "../../components/admin/FlexibleButton";
import { isValidEmail, isAllNumbers } from "../../utils/TextBasedUtilityFunctions";
// aws
import { LazyAdopterBasicPersonalInfo } from "../../models";

import type { BasicInfoScreenProps } from "../../navigation/AppNavigation";

const BasicInfoScreen = ({route, navigation}:BasicInfoScreenProps) =>{
    // route parameters
    const params = route.params;
    // states

    // create function/implementation where we check if there is a parameter adoptionRequestObject
    // if it exists update the states with the values
    // otherwise all values are null
    const [fname, setFname] = useState<string|null>(null);
    const [lname, setLname] = useState<string|null>(null);
    const [age, setAge] = useState<string|null>(null);
    const [isStudent, setIsStudent] = useState(false);
    const [contactNumber, setContactNumber] = useState<string|null>(null);
    const [emailAdd, setEmailAdd] = useState<string|null>(null);
    const [facebookLink, setFacebookLink] = useState<string|null>(null);
    const [completeAdd, setCompleteAdd] = useState<string|null>(null);
    const [currentAdd, setCurrentAdd] = useState<string|null>(null);

    // handle callbacks here
    // handles the changes in the first name state
    const handleFnameChange = useCallback((newValue: string|null) =>{
        setFname(newValue);
    }, []);
    // handles changes in the last name state
    const handleLNameChange = useCallback((newValue: string | null) =>{
        setLname(newValue);
    }, []);
    // handles the changes in the age state
    const handleAgeChange = useCallback((newValue: string | null) =>{
        setAge(newValue);
    }, []);

    const handleConNumChange = useCallback((newValue: string | null) =>{
        setContactNumber(newValue);
    }, []);

    const handleEmailAddChange = useCallback((newValue: string | null) =>{
        setEmailAdd(newValue);
    }, []);

    const handleFbLinkChange = useCallback((newValue: string | null) =>{
        setFacebookLink(newValue);
    }, []);

    const handleCmpltAddChange = useCallback((newValue: string | null) =>{
        setCompleteAdd(newValue);
    }, []);

    const handleCrntAddChange = useCallback((newValue: string | null) =>{
        setCurrentAdd(newValue);
    }, []);
    // handles the changes in the isStudent state
    const handleIsStudent = useCallback((newValue: boolean) =>{
        setIsStudent(newValue);
    }, []);
    // implemente navigation buttons here
    
    // generate the adopter's basic info adoption
    const generateBasicInfo = ():LazyAdopterBasicPersonalInfo|null => {
        // return null if any of the required inputs do not have a value
        if(! fname || !lname || !age|| !contactNumber|| !emailAdd|| !facebookLink|| !completeAdd||!currentAdd){
            return null
        }

        // return if required inputs are given
        // might check if parseInt works with age value
        const basicInfoObject: LazyAdopterBasicPersonalInfo = {
            fname: fname,
            lname: lname,
            age: parseInt(age),
            isStudent: isStudent,
            contactNum: contactNumber,
            emailAdd: emailAdd,
            facebookLink: facebookLink,
            cmpltHomeAdd: completeAdd,
            cmpltCurrentAdd: currentAdd

        }
        return basicInfoObject;
    }

    // validators
    // email validator
    const emailValidator = useCallback(isValidEmail, []);
    // phone number validator
    const phoneNumberValidator = useCallback(isAllNumbers, []);
    // poceeds to the next adoption form
    // pass the basic info object as navigation parameter
    const handleNext = () =>{
        const animalObject = generateBasicInfo()
        if(animalObject !== null){
            // go to the next screen

            // --todo
            // create an alternative where there is an adoptionRequestObject as route parameter
            navigation.navigate("adoption_form_2", {basicInfoObject: animalObject});
        }else{
            // create a function alert/ notifying the user that they have invalid/missing values
        }
        navigation.navigate("adoption_form_2", {});
    }
    const handleReturn = () =>{
        navigation.goBack()
    }
    return (
        <SafeAreaView style = {[generalStyles.flexContainer, styles.mainContainer]}>
            {/* place header here */}
            <Text style = {[styles.headerTextStyle]}>
                {`verify for adoption`}
            </Text>
            <ScrollView contentContainerStyle ={[styles.scrollViewStyle]}>
                <View style ={[styles.contentContainer]}>
                    <FlexibleTextInput
                        title="name"
                        callback={handleFnameChange}
                        oldValue={null}
                        style ={styles.nameTextInputStyle}
                        required ={true}
                    />
                    <FlexibleTextInput
                        title="last name"
                        callback={handleLNameChange}
                        oldValue={null}
                        style ={styles.nameTextInputStyle}
                        required ={true}
                    />
                    <FlexibleTextInput
                        title="age"
                        callback={handleAgeChange}
                        oldValue={null}
                        style ={styles.ageTextInputStyle}
                        keyBoardType="numeric"
                        required ={true}
                        validator={phoneNumberValidator}
                        customErrMsg="value must be a number"
                    />
                    <CustomCheckBox
                        title="student?"
                        containerStyle={styles.checkBoxStyle}
                        callback={handleIsStudent}
                        oldValue ={isStudent}
                    />
                    <FlexibleTextInput
                        title="contact number"
                        callback={handleConNumChange}
                        oldValue={null}
                        style ={styles.nameTextInputStyle}
                        keyBoardType="numeric"
                        required ={true}
                        validator={phoneNumberValidator}
                        customErrMsg="input must be all numbers"
                    />
                    <FlexibleTextInput
                        title="email address"
                        callback={handleEmailAddChange}
                        oldValue={null}
                        style ={styles.nameTextInputStyle}
                        keyBoardType="email-address"
                        customErrMsg="invalid email format"
                        validator={emailValidator}
                        required ={true}
                    />
                    <FlexibleTextInput
                        title="facebook link"
                        callback={handleFbLinkChange}
                        oldValue={null}
                        style ={styles.nameTextInputStyle}
                        required ={true}
                    />
                    <FlexibleTextInput
                        title="complete home address"
                        callback={handleCmpltAddChange}
                        oldValue={null}
                        style ={styles.nameTextInputStyle}
                        required ={true}
                        numberOfLines={2}
                    />
                    <FlexibleTextInput
                        title="complete current address"
                        callback={handleCrntAddChange}
                        oldValue={null}
                        style ={styles.nameTextInputStyle}
                        required ={true}
                        numberOfLines={2}
                    />
                    {/* button container */}
                    <View style ={[styles.buttonContainer]}>
                        <FlexibleButton
                            title="next"
                            fontStyle={{...styles.buttonText, ...styles.positiveButtonText}}
                            buttonStyle={{...styles.navButtons, ...styles.positiveButtonStyle}}
                            callback={handleNext}
                        />
                        <FlexibleButton
                            title="return to previous page"
                            fontStyle={{...styles.buttonText, ...styles.negativeButtonText}}
                            buttonStyle={{...styles.navButtons, ...styles.negativeButton}}
                            callback={handleReturn}
                        />
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default BasicInfoScreen;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
        alignItems: 'center',
    },
    scrollViewStyle:{
        alignItems: 'center',
        width: '95%'
    },
    contentContainer:{
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    headerTextStyle:{
        color: Color.colorDarkslateblue,
        fontFamily: FontFamily.interBold,
        fontSize: 26,
        textTransform: 'capitalize',
        marginTop: 40,
        paddingBottom: 10,
    },
    nameTextInputStyle :{
        width: '100%',
    },
    ageTextInputStyle:{
        width: '45%',
    },
    checkBoxStyle:{
        width: '45%',
        height: 77,
    },
    positiveButtonStyle:{
        marginTop: 30,
        backgroundColor: Color.colorPaleovioletred,
        borderColor: Color.colorPaleovioletred,
    },
    positiveButtonText:{
        color: Color.colorWhite,

    },
    negativeButton:{
        backgroundColor: Color.colorWhite,
        borderColor: Color.colorPaleovioletred,
    },
    buttonText:{
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_lg,
        fontWeight: 400
    },
    navButtons :{
        width: '100%',
        borderRadius: Border.br_7xl,
        height: 52,
        marginTop: 10,
    },
    negativeButtonText:{
        color: Color.colorPaleovioletred,
    },
    buttonContainer:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    }

})
// pet history screen for the adoption form
import { 
    SafeAreaView,
    Text, 
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import { generalStyles } from "../../assets/general/generalStyles";
import { Color, FontFamily, Border } from '../../assets/general/GlobalStyles';
import FlexibleTextInput from "../../components/FlexibleTextnput";
import NumberStepper from "../../components/NumberStepper";
import { useState, useCallback } from "react";
import { NeuterSpayStatus } from "../../models";
import CustomRadioButton from "../../components/CustomRadioButton";
import { getEnumValueFromString } from "../../utils/TypeBasedUtilityFunctions";
import FlexibleButton from "../../components/admin/FlexibleButton";
import { PetHistoryScreenProps } from "../../navigation/AppNavigation";

// aws
import { LazyAdopterPetHistory } from "../../models";

const PetHistoryScreen = ({route, navigation}:PetHistoryScreenProps) =>{
    // params
    const params = route.params;
    // check params here and edit states accordingly
    const [noOfPets, setNumPets] = useState<number|null>(null);
    const [yearsOfBeingPetOwner, setBeingOwner] = useState<string|null>(null);
    const [oldestPetAge, setOldestPetAge] = useState<number|null>(null);
    const [strlztnAwareness, setStrlztnAwareness] = useState<NeuterSpayStatus|null>(null);
    const [wantToSterilize, setWantToSterilize] = useState<boolean|null>(null);
    const [vetClinic, setVetClinic] = useState<string|null>(null);
    // handles changes in the number of pets state
    const handleNoOfPetsChange = useCallback((newValue: string) =>{
        // make sure that the newValue can be converted to number before passing as argument
        setNumPets(parseInt(newValue));
    }, []);
    // handles changes in the number of pet state
    const handleYearsBeingPetOwnerChange = useCallback((newValue: string|null) =>{
        setBeingOwner(newValue);
    }, []);
    // handles the changes in the age of the oldest pet state
    const handleOldestPetAgeChange = useCallback((newValue:string) =>{
        // parameter should be a digit of type string that can be converted to number through parseInt
        setOldestPetAge(parseInt(newValue));
    }, []);
    // handles changes in the awareness of the owner about sterilization
    const handleAwarenessChange = useCallback((newValue:string|null) =>{
        // checks if returned values is not null,
        // otherwise do nothing --for now
        if(newValue !== null){
            // get the enum value from the neuterspaystatus enum given the newValue string
            const actualValue = getEnumValueFromString(NeuterSpayStatus, newValue);
            // check if newValue is a value of the neuterspaystatus enum
            // if value exists set the sterilization awareness state to the value
            if(actualValue){
                setStrlztnAwareness(actualValue);
            // set sterilization awareness to null as value is not present in the neuterspaystatus enum
            }else{
                setStrlztnAwareness(null);
            }
        }
    }, [])
    // handles changes on the want to sterilize the animal state
    const handleWantToSterilizeChange = useCallback((newValue:string|null) =>{
        // if returned value is non string then set the value of the state to null
        if(newValue === null){
            setWantToSterilize(null);
        // otherwise check if string value equivalent to YES or NO
        }else{
            // if string is yes then set the state to true
            if(newValue === 'YES'){
                setWantToSterilize(true);
            // otherwise set the state to false
            }else{
                setWantToSterilize(false);
            }
        }
    }, []);
    // handles changes in the vet clinic state
    const handleVetClinicChange  = useCallback((newValue: string|null) =>{
        setVetClinic(newValue);
    }, []);

    // generate a pet history object

    const generatePetHistory = ():LazyAdopterPetHistory|null =>{
        if(!noOfPets || !yearsOfBeingPetOwner || !oldestPetAge || !strlztnAwareness ||!wantToSterilize || !vetClinic){
            return null;
        }
        const petHistoryObject :LazyAdopterPetHistory ={
            noOfPets: noOfPets,
            yearsOfBeingPetOwner: yearsOfBeingPetOwner,
            oldestPetAge: oldestPetAge,
            strlztnAwareness: strlztnAwareness,
            strlztnWillingness: wantToSterilize,
            regVetClinic: vetClinic
        }
        return petHistoryObject;
    }
    const handleNext = useCallback(() =>{
        const petHistoryObject = generatePetHistory();
        if(petHistoryObject!== null){
            navigation.navigate("adoption_form_3", {petHistoryObject: petHistoryObject});
        }
        navigation.navigate("adoption_form_3", {});
        
    }, []);
    const handleReturn = useCallback(() =>{
        navigation.goBack();
    }, [])
    return (
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <Text style = {[styles.headerTextStyle]}>{`pet history`}</Text>
            <ScrollView contentContainerStyle ={[styles.scrollViewContainer]}>
                <View style ={[styles.contentContainer]}>
                    <NumberStepper
                        title="Do you have pets right now? If yes, how many?"
                        callback={handleNoOfPetsChange}
                        width={styles.fullWidthTextInput}
                        oldValue= {!noOfPets? "0": noOfPets.toString()}
                    />
                    <FlexibleTextInput
                        oldValue={!yearsOfBeingPetOwner? "" : yearsOfBeingPetOwner}
                        callback={handleYearsBeingPetOwnerChange}
                        title = {`How long have you been a pet owner?`}
                        style = {styles.fullWidthTextInput}
                    />
                    <NumberStepper
                        title="How old is your oldest living pet?"
                        callback={handleOldestPetAgeChange}
                        oldValue={!oldestPetAge? "0": oldestPetAge.toString()}
                    />
                    <CustomRadioButton
                        data={[NeuterSpayStatus.YES_FOR_BOTH, NeuterSpayStatus.YES_FOR_NEUTER_ONLY, NeuterSpayStatus.YES_FOR_SPAYING_ONLY, NeuterSpayStatus.NO_FOR_BOTH]}
                        title={`Are you aware of neutering and spaying?`}
                        callback={handleAwarenessChange}
                        oldValue={strlztnAwareness}
                    />
                    <CustomRadioButton
                        data={["YES", "NO"]}
                        title={`Are you willing to neuter/spay your adopted dog/cat from us?`}
                        callback={handleWantToSterilizeChange}
                        oldValue = {wantToSterilize === null? null: wantToSterilize? "YES": 'NO'}
                    />
                    <FlexibleTextInput
                        title={`Regular vet clinic`}
                        callback={handleVetClinicChange}
                        oldValue={vetClinic}
                        style ={styles.fullWidthTextInput}
                    />
                    <View style ={[styles.buttonCover]}>
                        <FlexibleButton
                            title="next"
                            buttonStyle={{...styles.buttonContainer, ...styles.nextButton}}
                            callback={handleNext}
                            fontStyle={{...styles.buttonText, ...styles.nextButtonText}}
                        />
                        <FlexibleButton
                            title="return to previous page"
                            buttonStyle={{...styles.buttonContainer, ...styles.returnButton}}
                            fontStyle={{...styles.buttonText, ...styles.returnButtonText}}
                            callback={handleReturn}
                        />
                    </View>
                </View>
            </ScrollView>   
        </SafeAreaView>
    )
}

export default PetHistoryScreen;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
        alignItems: 'center'
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
    headerTextStyle:{
        color: Color.colorDarkslateblue,
        fontFamily: FontFamily.interBold,
        fontSize: 26,
        textTransform: 'capitalize',
        marginTop: 40,
        paddingBottom: 10,
    },
    fullWidthTextInput : {
        width: '100%',
    },
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
    buttonCover:{
        width: '100%',
        marginTop: 30,
        marginBottom: 10,
    }
})
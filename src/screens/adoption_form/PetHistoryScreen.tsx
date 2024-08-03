// pet history screen for the adoption form
import { 
    SafeAreaView,
    Text, 
    ScrollView,
    StyleSheet,
} from "react-native";
import { generalStyles } from "../../assets/general/generalStyles";
import { Color, FontFamily } from "../../assets/general/GlobalStyles";
import FlexibleTextInput from "../../components/FlexibleTextnput";
import NumberStepper from "../../components/NumberStepper";
import { useState, useCallback } from "react";
const PetHistoryScreen = () =>{
    const [noOfPets, setNumPets] = useState<number|null>(null);
    const [yearsOfBeingPetOwner, setBeingOwner] = useState<string|null>(null);
    const [oldestPetAge, setOldestPetAge] = useState<number|null>(null);
    const handleCallback = (newValue: string|null) => {
        console.log(newValue)
    }
    // handles changes in the number of pets state
    const handleNoOfPetsChange = useCallback((newValue: string) =>{
        // make sure that the newValue can be converted to number before passing as argument
        setNumPets(parseInt(newValue));
    }, []);

    const handleYearsBeingPetOwnerChange = useCallback((newValue: string|null) =>{
        setBeingOwner(newValue);
    }, []);

    const handleOldestPetAgeChange = useCallback((newValue:string) =>{
        setOldestPetAge(parseInt(newValue));
    }, [])
    return (
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <Text style = {[styles.headerTextStyle]}>{`pet history`}</Text>
            <ScrollView contentContainerStyle ={[styles.contentContainer]}>
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
        width: '95%',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        width: '100%'
    }
})
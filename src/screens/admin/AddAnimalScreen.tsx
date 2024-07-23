// screen used to add and edit animals

import { 
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard, 
    ScrollView,
    TouchableOpacity
} from "react-native";
import { useCallback, useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';
// custom functions/comonents
import { pickImageFromDir } from "../../utils/FileBasedUtilitilityFunctions";
import { generalStyles } from "../../assets/general/generalStyles";
import { Border, Color, FontFamily, FontSize } from "../../assets/general/GlobalStyles";
import FlexibleTextInput from "../../components/admin/FlexibleTextnput";
import FlexibleDropDown from "../../components/admin/FlexibleDropDown";
import CustomDatePicker from "../../components/admin/CustomDatePicker";
import ResponsiveImage from "../../components/ResponsiveImage";
import FlexibleButton from "../../components/admin/FlexibleButton";

// aws imports
import { DataStore } from "aws-amplify/datastore";
import { Animal } from "../../models";
// aws imports
import { AddAnimalProps } from "../../navigation/admin/AdminNavigationStack";

import { AnimalSex } from "../../models";
import { AnimalStatus } from "../../models";
import { AnimalSpecies } from "../../models";

import { AnimalInterface } from "../../utils/ModelInterfaces";
import { getEnumValueFromString } from "../../utils/TypeBasedUtilityFunctions";
const AddAnimalScreen = ({route, navigation}:AddAnimalProps) => {
    const [imgUrl, setImageUrl] = useState<string|null>(null);
    const [name, setName] = useState<string|null>(null)
    const [age, setAge] = useState<string|null>(null)
    const [sex, setSex] = useState<string|null>(null)
    const [species, setSpecies] = useState<string|null>(null)
    const [status, setStatus] = useState<string|null>(null)
    const [neuterDate, setNeuterDate] = useState<Date|null>(null)
    const [vaccinationDate, setVaccinationDate] = useState<Date|null>(null)
    const [dewormingDate, setDewormingDate] = useState<Date|null>(null)
    const [traits, setTraits] = useState<string|null>(null)
    const [notes, setNotes] = useState<string|null>(null)

    // callback functions
    // wrap in useCallback to prevent rerendering of
    
    // updates the name state
    const handleNameChange = useCallback((newName:string) =>{
        setName(newName)
    }, []);
    // updates the age state
    const handleAgeChange = useCallback((newAge:string) =>{
        setAge(newAge);
    }, [])
    // updates the sex state
    const handleSexChange = useCallback((newSex: string) =>{
        setSex(newSex);
    }, [])
    // updates the species state
    const handleSpeciesChange = useCallback((newSpecies:string) =>{
        setSpecies(newSpecies);
    }, []);
    // updates the status state
    const handleStatusChange = useCallback((newStatus:string) =>{
        setStatus(newStatus);
    }, [])
    // updates the neuter date state
    const handleNeuterDateChange = useCallback((newNeuterDate:Date) =>{
        setNeuterDate(newNeuterDate);
    }, []);
    // updates the vaccination date state
    const handleVaccinationDateChange = useCallback((newVaccinationDate: Date) =>{
        setVaccinationDate(newVaccinationDate);
    }, []);
    // updates the deworming date state
    const handleDewormingDateChange = useCallback((newDewormingDate: Date) =>{
        setDewormingDate(newDewormingDate);
    }, []);
    // updates the trait state
    const handleTraitsChange = useCallback((newTraits: string) =>{
        setTraits(newTraits);
    }, []);
    // updates the notes state
    const handleNotesChange = useCallback((newNotes: string) =>{
        setNotes(newNotes);
    }, []);
    const handleKeyBoardDismiss = () => {
        // Keyboard.dismiss()
        console.log("dismissed")
    }
    const handlePickImagePress = () =>{
        pickImageFromDir()
        .then(res => {
            console.log(res);
            if(res[0].uri){
                setImageUrl(res[0].uri)
            }
        }).catch(err =>{
            console.log(err)
        })
    }
    // callback when the cancel button is pressed
    // navigates back to the previous screen
    const handleOnpressCancel = () =>{
        if(navigation.canGoBack()){
            navigation.goBack()
        }else{
            console.log("failed to go back")
        }
    }
    // callback when the save button is pressed
    // saves the information in the database
    const handleSave = async () =>{
        // preprocess data here 
        const animalObject = preprocessData()
        try{
            // may cause an error if there is an incorrect input
            // may use some sort of alert or catch here
            await DataStore.save(
                new Animal(animalObject)
            )
            console.log("succeed")
        }catch(err){
            console.log(err);
            console.log("failed to create animal instance")
        }
    }
    const preprocessData = () =>{
        // check if the values are not null
        // create an object that can be used to create an instance of animal
        const animalObject: Partial<AnimalInterface> = {}
        // check if items are null or not
        // brute force for now
        if(name !== null){
            animalObject.mainName = name;
        }
        if(age !== null){
            animalObject.age = parseInt(age);
        }
        if(sex !== null && getEnumValueFromString(AnimalSex, sex)){
            animalObject.sex = getEnumValueFromString(AnimalSex, sex);
        }
        if(species !== null && getEnumValueFromString(AnimalSpecies, species)){
            animalObject.species = getEnumValueFromString(AnimalSpecies, species);
        }
        if(status !== null && getEnumValueFromString(AnimalStatus, status)){
            animalObject.status = [getEnumValueFromString(AnimalStatus, status)];
        }
        if(neuterDate !== null){
            animalObject.sterilizationDate = neuterDate.toString();
        }
        if(traits !== null && traits.length > 0){
            // should be newline seperated string
            // split the string by newline to create list of strings
            animalObject.traitsAndPersonality = [traits];
        }
        if(notes !== null && notes.length > 0){
            // should be a newline seperated string
            // split the string by newline to create a list of strings
            animalObject.notes = [notes]
        }
        animalObject.location = "home"
        return animalObject;
    }
    return (
        <TouchableWithoutFeedback onPress={handleKeyBoardDismiss}>
            <SafeAreaView style = {[generalStyles.flexContainer, styles.mainContainer]}>
                <ScrollView contentContainerStyle = {[styles.contentContainer]}>
                    <View style = {[styles.imageContainer]}>
                        <ResponsiveImage
                            source={imgUrl === null? require("../../assets/images/no_image.png"): {uri: imgUrl}}
                        />
                    </View>
                    <TouchableOpacity style ={[styles.uploadPhotoButton, generalStyles.centerContainer]} onPress={handlePickImagePress}>
                        <AntDesign style ={[styles.buttonIcon]} name="upload" color={Color.colorWhite} size={16}/>
                        <Text style = {[styles.buttonTitleText]}>
                            {`upload photo`}
                        </Text>
                    </TouchableOpacity>
                    <View style ={[styles.formsContainer]}>
                        <FlexibleTextInput
                            title="name"
                            callback={handleNameChange}
                            style = {styles.nameTextInput}
                        />
                        <FlexibleTextInput
                            title="age"
                            callback={handleAgeChange}
                            keyBoardType={"numeric"}
                            style = {styles.ageTextInput}
                        />
                        <FlexibleDropDown
                            style ={styles.sexDropDown}
                            title="sex"
                            data={Object.values(AnimalSex)}
                            callBack={handleSexChange}

                        />
                        <FlexibleDropDown
                            style = {styles.speciesDropDown}
                            title="species"
                            data={Object.values(AnimalSpecies)}
                            callBack={handleSpeciesChange}

                        />
                        <FlexibleDropDown
                            style = {styles.statusDropDown}
                            title="status"
                            data={Object.values(AnimalStatus)}
                            callBack={handleStatusChange}

                        />
                        <CustomDatePicker
                            title="neuter/spay date"
                            style = {styles.strliztnDate}
                            callBack={handleNeuterDateChange}
                        />
                        <CustomDatePicker
                            title="vaccination date"
                            style ={styles.vaxDate}
                            callBack={handleVaccinationDateChange}
                        />
                        <CustomDatePicker
                            title="deworming date"
                            style ={styles.dewormingDate}
                            callBack={handleDewormingDateChange}
                        />
                        <FlexibleTextInput
                            title="traits and personality"
                            numberOfLines={3}
                            callback={handleTraitsChange}
                        />
                        <FlexibleTextInput
                            title="notes"
                            numberOfLines={3}
                            callback={handleNotesChange}
                        />
                    </View>
                    <View style = {[styles.bottomButtonContainer]}>
                        <FlexibleButton
                            title="cancel"
                            fontStyle={styles.cancelButtonText}
                            buttonStyle={styles.cancelButton}
                            callback={handleOnpressCancel}
                        />
                        <FlexibleButton
                            title="save"
                            fontStyle={styles.saveButtonText}
                            buttonStyle={styles.saveButton}
                            callback={
                                handleSave
                            }
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )

}

export default AddAnimalScreen;

const styles = StyleSheet.create({
    mainContainer:{
        alignItems: 'center',
        backgroundColor: Color.colorWhite
    },
    contentContainer:{
        alignItems: 'center',
        width: '90%',
    },
    formsContainer:{
        width: '100%',
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
    imageContainer:{
        width: 160
    },
    uploadPhotoButton:{
        width: 160,
        backgroundColor: Color.colorPaleovioletred,
        borderRadius: Border.br_9xs,
        flexDirection: "row",
        minHeight: 36,
        marginVertical: 10
    },
    buttonTitleText :{
        color: Color.colorWhite,
        textAlign: "left",
        fontFamily: FontFamily.interRegular,
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        textTransform: 'capitalize',
        marginLeft: 5,
    },
    buttonIcon: {
        marginLeft: 10, 
        marginRight: 5
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
        color: Color.colorPaleovioletred,
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
    // text input styles
    ageTextInput:{
        width: '20%'
    },
    nameTextInput:{
        width: '100%'
    },
    sexDropDown:{
        width: '30%'
    },
    speciesDropDown:{
        width: '49%'
    },
    statusDropDown:{
        width: '49%'
    },
    dewormingDate:{
        width: '49%',
    },
    vaxDate:{
        width: '49%',
    },
    strliztnDate:{
        width: '49%',
    }
})
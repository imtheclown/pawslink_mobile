// screen used to add and edit animals

import { 
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard, 
    ScrollView,
    TouchableOpacity,
    Animated
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';
// custom functions/comonents
import { pickImageFromDir } from "../../utils/FileBasedUtilitilityFunctions";
import { generalStyles } from "../../assets/general/generalStyles";
import { Border, Color, FontFamily, FontSize } from "../../assets/general/GlobalStyles";
import FlexibleTextInput from "../../components/FlexibleTextnput";
import FlexibleDropDown from "../../components/admin/FlexibleDropDown";
import CustomDatePicker from "../../components/admin/CustomDatePicker";
import ResponsiveImage from "../../components/ResponsiveImage";
import FlexibleButton from "../../components/admin/FlexibleButton";

// aws imports
import { DataStore } from "aws-amplify/datastore";
import { Animal } from "../../models";
// aws imports
import { AddAnimalProps } from "../../navigation/AppNavigation";

import { AnimalSex } from "../../models";
import { AnimalStatus } from "../../models";
import { AnimalSpecies } from "../../models";

import { AnimalInterface } from "../../utils/ModelInterfaces";
import { getEnumValueFromString } from "../../utils/TypeBasedUtilityFunctions";
const AddAnimalScreen = ({route, navigation}:AddAnimalProps) => {
    // add location and coat color
    const params = route.params;
    const [imgUrl, setImageUrl] = useState<string|null>(null);
    const [name, setName] = useState<string|null>(null);
    const [location, setLocation] = useState<string|null>(null);
    const [age, setAge] = useState<number|null>(null);
    const [sex, setSex] = useState<string|null>(null);
    const [species, setSpecies] = useState<string|null>(null);
    const [coatColor, setCoatColor] = useState<string|null>(null);
    const [status, setStatus] = useState<string|null>(null);
    const [neuterDate, setNeuterDate] = useState<Date|null>(null);
    const [vaccinationDate, setVaccinationDate] = useState<Date|null>(null);
    const [dewormingDate, setDewormingDate] = useState<Date|null>(null);
    const [traits, setTraits] = useState<string|null>(null);
    const [notes, setNotes] = useState<string|null>(null);

    useEffect(()=>{
        // if there is a passed animal object, then it is edit animal
        if(params && params.animalObject){
            prePopulateStates();
        }
    }, []);
    // callback functions
    // wrap in useCallback to prevent rerendering of
    
    // updates the name state
    const handleNameChange = useCallback((newName:(string| null)) =>{
        setName(newName)
    }, []);
    // updates the age state
    const handleAgeChange = useCallback((newAge:(string| null)) =>{
        if(newAge !== null && newAge.length > 0){
            setAge(parseInt(newAge));
        }
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
    const handleTraitsChange = useCallback((newTraits: (string | null)) =>{
        setTraits(newTraits);
    }, []);
    // updates the notes state
    const handleNotesChange = useCallback((newNotes: (string| null)) =>{
        setNotes(newNotes);
    }, []);
    // updates the location state
    const handleLocationChange = useCallback((newValue : (string|null)) =>{
        setLocation(newValue);
    }, []);
    // updates the coatColorState
    const handleCoatColorChange = useCallback((newValue: (string|null)) =>{
        // should be comma seperated values
        setCoatColor(newValue);
    }, [])
    // dismisses the keyboard when the user presses area outside of text input
    // triggers an onblur effect on text inputs
    // removes focus on each of the text input present within this screen
    const handleKeyBoardDismiss = () => {
        Keyboard.dismiss()
    }
    const handlePickImagePress = () =>{
        pickImageFromDir()
        .then(res => {
            if(res[0].uri){
                setImageUrl(res[0].uri)
            }
            throw new Error("cannot find the selected image's directory");
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
        const animalObject = createAnimalObject()
        if(animalObject !== null){
            try{
                // may cause an error if there is an incorrect input
                // may use some sort of alert or catch here
                await DataStore.save(
                    new Animal(animalObject)
                )
                // maybe display a loading animation and a success/failed message
                console.log("succeed")
            }catch(err){
                console.log(err);
                console.log("failed to create animal instance")
            }
        }

    }

    // creates an animal object that can be used as parameter for the database write
    // returns null if required keys are null
    const createAnimalObject = (): AnimalInterface | null => {
        if (!name || !sex || !status || !species) return null;
    
        const sexValue = getEnumValueFromString(AnimalSex, sex);
        const statusValue = getEnumValueFromString(AnimalStatus, status);
        const speciesValue = getEnumValueFromString(AnimalSpecies, species);
    
        if (!sexValue || !statusValue || !speciesValue) return null;
    
        const animalObject: AnimalInterface = {
            mainName: name,
            location: 'here',
            status: [statusValue],
            species: speciesValue,
            sex: sexValue,
            age: age ?? -1,
            coatColor: ['none for now'],
            notes: notes ? [notes] : undefined,
            traitsAndPersonality: traits ? [traits] : undefined
        };
    
        return animalObject;
    };

    const prePopulateStates = useCallback(() =>{
        const animalObject = params.animalObject;
        // set the states with non null keys
        if(animalObject){
            // if there is a parameter animal object, it is in edit mode
            // following keys/values are required to create an animal instance
            setName(animalObject.mainName);
            setSex(animalObject.sex);
            setStatus(animalObject.status[0]);
            setSpecies(animalObject.species);
            // non required here
            // check if the keys exists/not undefined
            if(animalObject.age){
                setAge(animalObject.age);
            }
            if(animalObject.notes){
                // checks if the notes value is not null
                // if not null, join the array for the input value
                setNotes(animalObject.notes === null? null: animalObject.notes.join("\n"));
            }
            // check if the key value pair exists
            if(animalObject.traitsAndPersonality){
                // check if the value is null or not
                // if value is not null, make the list value converted to a single string, where each element of array is seperated with a new line
                setTraits(animalObject.traitsAndPersonality === null? null: animalObject.traitsAndPersonality.join("\n"));
            }
            if(animalObject.localImgDir){
                setImageUrl(animalObject.localImgDir);
            }
            // set dates here
            // sterilization date
            if(animalObject.sterilizationDate){
                // check if the sterilization date is not null
                // if not null convert the aws date to date
                setNeuterDate(animalObject.sterilizationDate === null? null: new Date(animalObject.sterilizationDate));
            }
            // no vaccination date yet
        }
    }, [route.params])
    return (
        <TouchableWithoutFeedback onPress={handleKeyBoardDismiss}>
            <SafeAreaView style = {[generalStyles.flexContainer, styles.mainContainer]}>
                <ScrollView contentContainerStyle = {[styles.contentContainer]}>
                    <View style = {[styles.imageContainer]}>
                        <ResponsiveImage
                            source={imgUrl === null? require("../../assets/images/no_image.png"): {uri: imgUrl}}
                        />
                    </View>
                    {/* can be exchanged with flexible button */}
                    <FlexibleButton
                        icon = {<AntDesign style ={[styles.buttonIcon]} name="upload" color={Color.colorWhite} size={16}/>}
                        title= {imgUrl !== null? "change photo" : "select photo"}
                        buttonStyle={{...styles.uploadPhotoButton, ...generalStyles.centerContainer}}
                        fontStyle={styles.buttonTitleText}
                        callback={handlePickImagePress}
                    />
                    <View style ={[styles.formsContainer]}>
                        <FlexibleTextInput
                            title="name"
                            callback={handleNameChange}
                            style = {styles.nameTextInput}
                            oldValue={name}
                        />
                        <FlexibleTextInput
                            title="location"
                            callback={handleLocationChange}
                            style = {styles.locationTextInput}
                            oldValue={location}
                        />
                        <FlexibleTextInput
                            title="age"
                            callback={handleAgeChange}
                            keyBoardType={"numeric"}
                            style = {styles.ageTextInput}
                            oldValue={age === null? null: age.toString()}
                        />
                        <FlexibleDropDown
                            style ={styles.sexDropDown}
                            title="sex"
                            oldValue= {sex}
                            data={Object.values(AnimalSex)}
                            callBack={handleSexChange}

                        />
                        <FlexibleDropDown
                            style = {styles.speciesDropDown}
                            title="species"
                            oldValue={species}
                            data={Object.values(AnimalSpecies)}
                            callBack={handleSpeciesChange}

                        />
                        <FlexibleTextInput
                            title="coat color"
                            callback={handleCoatColorChange}
                            oldValue={coatColor}
                            style ={styles.coatColorTextInput}

                        />
                        <FlexibleDropDown
                            style = {styles.statusDropDown}
                            title="status"
                            oldValue={status}
                            data={Object.values(AnimalStatus)}
                            callBack={handleStatusChange}

                        />
                        <CustomDatePicker
                            title="neuter/spay date"
                            style = {styles.strliztnDate}
                            oldValue={neuterDate}
                            callBack={handleNeuterDateChange}
                        />
                        <CustomDatePicker
                            title="vaccination date"
                            style ={styles.vaxDate}
                            oldValue={new Date()}
                            callBack={handleVaccinationDateChange}
                        />
                        <CustomDatePicker
                            title="deworming date"
                            style ={styles.dewormingDate}
                            oldValue={new Date()}
                            callBack={handleDewormingDateChange}
                        />
                        <FlexibleTextInput
                            title="traits and personality"
                            numberOfLines={3}
                            callback={handleTraitsChange}
                            oldValue={traits}
                        />
                        <FlexibleTextInput
                            title="notes"
                            numberOfLines={3}
                            callback={handleNotesChange}
                            oldValue={notes}
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
        backgroundColor: Color.colorWhite,
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
        borderColor: Color.colorPaleovioletred,
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
        justifyContent: 'flex-end',
        paddingBottom: 30,
    },
    // text input styles
    ageTextInput:{
        width: '49%'
    },
    nameTextInput:{
        width: '49%'
    },
    sexDropDown:{
        width: '49%'
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
    },
    locationTextInput:{
        width: '49%',
    },
    coatColorTextInput:{
        width: '49%',
    }
})
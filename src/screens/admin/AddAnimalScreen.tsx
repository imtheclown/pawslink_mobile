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
    // add location and coat color
    const [imgUrl, setImageUrl] = useState<string|null>(null);
    const [name, setName] = useState<string|null>(null)
    const [age, setAge] = useState<number|null>(null)
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
    const handleNameChange = useCallback((newName:(string| null)) =>{
        setName(newName)
    }, []);
    // updates the age state
    const handleAgeChange = useCallback((newAge:(string| null)) =>{
        if(newAge !== null){
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
    const handleKeyBoardDismiss = () => {
        Keyboard.dismiss()
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
        const animalObject = createAnimalObject()
        if(animalObject !== null){
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

    }

    // creates an animal object that can be used as parameter for the database write
    // returns null if required keys are null
    const createAnimalObject= ():AnimalInterface|null =>{
        if(name !== null && sex !== null && status !== null && species !== null){
            // generate/get the key which corresponds to the key in enum given a string value
            const sexValue = getEnumValueFromString(AnimalSex, sex);
            const statusValue = getEnumValueFromString(AnimalStatus, status);
            const speciesValue = getEnumValueFromString(AnimalSpecies, species);
            // check if values are undefined 
            // if at least one is undefined, returl null
            if(sexValue && statusValue && speciesValue){
                // create an animal object based on the animal interface
                const animalObject: AnimalInterface ={
                    mainName: name,
                    location: 'here',
                    status: [statusValue],
                    species: speciesValue,
                    sex: sexValue,
                    age: age === null? -1: age,
                    coatColor: ['none for now']
                }
                // add additional keys here
                if(notes !== null){
                    // new line seperated string
                    // create a function that splits a string by new line
                    animalObject.notes = [notes]
                }
                if(traits !== null){
                    // new line seperated string
                    // create a function that splits a string by new line
                    animalObject.traitsAndPersonality = [traits]
                }
                // return the created animal object
                return animalObject;
            }
        }
        // return null
        return null
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
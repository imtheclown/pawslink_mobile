// screen used to add and edit animals

import { 
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard, 
    ScrollView
} from "react-native";
import { generalStyles } from "../../assets/general/generalStyles";
import { Border, Color, FontFamily, FontSize } from "../../assets/general/GlobalStyles";
import FlexibleTextInput from "../../components/admin/FlexibleTextnput";
import FlexibleDropDown from "../../components/admin/FlexibleDropDown";
import CustomDatePicker from "../../components/admin/CustomDatePicker";
import ResponsiveImage from "../../components/ResponsiveImage";
import { TouchableOpacity } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlexibleButton from "../../components/admin/FlexibleButton";

// temp data
// ---to do----
// fetch data from the local or online database
// will be able to recieve props/data from the previous screeen
//  allows edit , pass data to the component and set them as the default value
const tempData = ["male", "female"]
const AddAnimalScreen = () => {

    const getAnimalName = () =>{
        console.log("animal name");
    }

    const handleKeyBoardDismiss = () => {
        Keyboard.dismiss()
    }
    return (
        <TouchableWithoutFeedback onPress={handleKeyBoardDismiss}>
            <SafeAreaView style = {[generalStyles.flexContainer, styles.mainContainer]}>
                <ScrollView contentContainerStyle = {[styles.contentContainer]}>
                    <View style = {[styles.imageContainer]}>
                        <ResponsiveImage
                            source={require("../../assets/images/no_image.png")}
                        />
                    </View>
                    <TouchableOpacity style ={[styles.uploadPhotoButton, generalStyles.centerContainer]}>
                        <AntDesign style ={[styles.buttonIcon]} name="upload" color={Color.colorWhite} size={16}/>
                        <Text style = {[styles.buttonTitleText]}>
                            {`upload photo`}
                        </Text>
                    </TouchableOpacity>
                    <View style ={[styles.formsContainer]}>
                        <FlexibleTextInput
                            title="name"
                            size={175}
                            callback={getAnimalName}
                        />
                        <FlexibleTextInput
                            title="age"
                            size={70}
                            callback={getAnimalName}
                        />
                        <FlexibleDropDown
                            size={85}
                            title="sex"
                            data={tempData}
                            callBack={getAnimalName}

                        />
                        <FlexibleDropDown
                            size={175}
                            title="status"
                            data={tempData}
                            callBack={getAnimalName}

                        />
                        <CustomDatePicker
                            title="neuter/spay date"
                            size={175}
                        />
                        <CustomDatePicker
                            title="vaccination date"
                            size={175}
                        />
                        <CustomDatePicker
                            title="deworming date"
                            size={175}
                        />
                        <FlexibleTextInput
                            title="traits and personality"
                            numberOfLines={3}
                            callback={getAnimalName}
                        />
                        <FlexibleTextInput
                            title="notes"
                            numberOfLines={3}
                            callback={getAnimalName}
                        />
                    </View>
                    <View style = {[styles.bottomButtonContainer]}>
                        <FlexibleButton
                            title="cancel"
                            fontStyle={styles.cancelButtonText}
                            buttonStyle={styles.cancelButton}
                            callback={() =>{
                                console.log("cancel")
                            }}
                        />
                        <FlexibleButton
                            title="save"
                            fontStyle={styles.saveButtonText}
                            buttonStyle={styles.saveButton}
                            callback={() =>{
                                console.log("cancel")
                            }}
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
        width: '90%'
    },
    formsContainer:{
        width: '100%',
        flexDirection: "row",
        flexWrap: "wrap"
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
    }
})
// screen used to add and edit animals

import { 
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { generalStyles } from "../../assets/general/generalStyles";
import { Color } from "../../assets/general/GlobalStyles";
import FlexibleTextInput from "../../components/admin/FlexibleTextnput";
import FlexibleDropDown from "../../components/admin/FlexibleDropDown";

// temp data
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
                <View style = {[styles.contentContainer]}>
                    <View style ={[styles.formsContainer]}>
                        <FlexibleTextInput
                            title="name"
                            size={180}
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
                            size={180}
                            title="status"
                            data={tempData}
                            callBack={getAnimalName}

                        />
                    </View>
                </View>
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
        width: '90%'
    },
    formsContainer:{
        flexDirection: "row",
        flexWrap: "wrap"
    }
})
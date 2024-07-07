// screen for the events screen
import { 
    SafeAreaView, 
    StyleSheet,
    Text,
    View
} from "react-native";
import FlexibleButton from "../../components/admin/FlexibleButton";
import { generalStyles } from "../../assets/general/generalStyles";
import {
     Color,
     FontFamily
 } from "../../assets/general/GlobalStyles";
const AdminAdoptionScreen = () =>{
    const gotoAdoptionRequests = () =>{
        console.log("to adoption requests");
    };

    const gotoAdoptedAnimals = () =>{
        console.log("to adopted animals");
    };

    const gotoForms = () =>{
        console.log('to forms');
    }
    return (
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <View style ={[styles.textContainer, generalStyles.centerContainer]}>
                <Text style ={[styles.titleText]}>{`adoption`}</Text>
            </View>
            <View style={[styles.buttonContainer]}>
                <FlexibleButton
                    title="adoption requests"
                    callback={gotoAdoptionRequests}
                    backgroundColor={Color.colorPaleovioletred}
                    fontColor={Color.colorWhite}
                />
                <FlexibleButton
                    title="adopted animals"
                    callback={gotoAdoptedAnimals}
                    backgroundColor={Color.colorPaleovioletred}
                    fontColor={Color.colorWhite}
                />
                <FlexibleButton
                    title="see forms"
                    callback={gotoForms}
                    backgroundColor={Color.colorPaleovioletred}
                    fontColor={Color.colorWhite}
                />
            </View>
        </SafeAreaView>
    )
}

export default AdminAdoptionScreen;

const styles = StyleSheet.create({
    textContainer:{
        width: '100%',
        height: '30%'
    },
    titleText:{
        fontSize: 32,
        lineHeight: 48,
        fontWeight: "700",
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
        textTransform: 'capitalize',
    },
    mainContainer:{
        backgroundColor: Color.colorWhite,
        alignItems: 'center',
    },
    buttonContainer: {
        width: '70%',
        height: 'auto',
    },
})
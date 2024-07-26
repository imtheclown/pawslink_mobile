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
import { useCallback } from "react";

// navigation props
import { AdminAdoptionScreenProps } from "../../navigation/admin/AdminBottomNavigation";
const AdminAdoptionScreen = ({route, navigation} : AdminAdoptionScreenProps) =>{
    const gotoAdoptionRequests = useCallback(() =>{
        navigation.navigate("adoption_request_list")
    }, []);

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
                    buttonStyle={styles.pinkButton}
                    fontStyle={styles.whiteFont}
                />
                <FlexibleButton
                    title="adopted animals"
                    callback={gotoAdoptedAnimals}
                    buttonStyle={styles.pinkButton}
                    fontStyle={styles.whiteFont}
                />
                <FlexibleButton
                    title="see forms"
                    callback={gotoForms}
                    buttonStyle={styles.pinkButton}
                    fontStyle={styles.whiteFont}
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
    pinkButton: {
        marginTop: 10,
        backgroundColor: Color.colorPaleovioletred,
        borderColor: Color.colorPaleovioletred,
        height: 55
    },
    whiteButton:{
        marginTop: 10,
        backgroundColor: Color.colorWhite,
        borderColor: Color.colorPaleovioletred
    },
    whiteFont:{
        color: Color.colorWhite
    },
    pinkFont:{
        color: Color.colorPaleovioletred
    }
})
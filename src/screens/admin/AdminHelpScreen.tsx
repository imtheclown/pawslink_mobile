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
const AdminHelpScreen = () =>{
    const gotoEditPassword = () =>{
        console.log("edit password");
    };

    const gotoAdminLog = () =>{
        console.log("admin log");
    };

    const handleLogOut = () =>{
        console.log("log out");
    };
    return (
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <View style ={[styles.textContainer, generalStyles.centerContainer]}>
                <Text style ={[styles.titleText]}>{`admin help`}</Text>
            </View>
            <View style={[styles.buttonContainer]}>
                <FlexibleButton
                    title="edit password"
                    callback={gotoEditPassword}
                    buttonStyle={styles.pinkButton}
                    fontStyle={styles.whiteFont}
                />
                <FlexibleButton
                    title="admin log"
                    callback={gotoAdminLog}
                    buttonStyle={styles.pinkButton}
                    fontStyle={styles.whiteFont}
                />
                <FlexibleButton
                    title="log out"
                    callback={handleLogOut}
                    buttonStyle={styles.whiteButton}
                    fontStyle={styles.pinkFont}
                />
            </View>
        </SafeAreaView>
    )
}

export default AdminHelpScreen;

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
    // buttons
    pinkButton: {
        backgroundColor: Color.colorPaleovioletred,
        borderColor: Color.colorPaleovioletred,
        height: 55
    },
    whiteButton:{
        backgroundColor: Color.colorWhite,
        borderColor: Color.colorPaleovioletred,
        height: 55
    },
    whiteFont:{
        color: Color.colorWhite
    },
    pinkFont:{
        color: Color.colorPaleovioletred
    }
})
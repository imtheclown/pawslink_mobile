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
                    backgroundColor={Color.colorPaleovioletred}
                    fontColor={Color.colorWhite}
                />
                <FlexibleButton
                    title="admin log"
                    callback={gotoAdminLog}
                    backgroundColor={Color.colorPaleovioletred}
                    fontColor={Color.colorWhite}
                />
                <FlexibleButton
                    title="log out"
                    callback={handleLogOut}
                    backgroundColor={Color.colorWhite}
                    fontColor={Color.colorPaleovioletred}
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
})
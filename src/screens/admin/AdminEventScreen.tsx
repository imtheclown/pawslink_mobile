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
const AdminEventScreen = () =>{
    // navigates to the current list of active events
    const gotoEvents = () => {
         console.log("events");
    };
    // navigates to the screen where we can add events
    const gotoAddEvents = () => {
        console.log("add events");
    };
    return (
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <View style ={[styles.textContainer, generalStyles.centerContainer]}>
                <Text style ={[styles.titleText]}>{`events`}</Text>
            </View>
            <View style={[styles.buttonContainer]}>
                <FlexibleButton
                    title="view events"
                    callback={gotoEvents}
                    backgroundColor={Color.colorPaleovioletred}
                    fontColor={Color.colorWhite}
                />
                <FlexibleButton
                    title="+ add an event"
                    callback={gotoAddEvents}
                    backgroundColor={Color.colorWhite}
                    fontColor={Color.colorPaleovioletred}
                />
            </View>
        </SafeAreaView>
    )
}

export default AdminEventScreen;

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
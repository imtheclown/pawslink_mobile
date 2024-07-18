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
import { AdminEventScreenProps } from '../../navigation/admin/AdminBottomNavigation';
import AdminStackNavigator from '../../navigation/admin/AdminNavigationStack';
const AdminEventScreen = ({route, navigation}: AdminEventScreenProps) =>{
    // navigates to the current list of active events
    const gotoEvents = () => {
         console.log("events");
    };
    // navigates to the screen where we can add events
    const gotoAddEvents = () => {
        navigation.navigate("add_event");
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
                    buttonStyle={styles.pinkButton}
                    fontStyle={styles.whiteFont}
                />
                <FlexibleButton
                    title="+ add an event"
                    callback={gotoAddEvents}
                    buttonStyle={styles.whiteButton}
                    fontStyle={styles.pinkFont}
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
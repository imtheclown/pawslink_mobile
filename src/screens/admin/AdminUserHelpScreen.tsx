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
const AdminUserHelpScreen = () =>{
    // go to messages screens
    const gotoMessages = () =>{
        console.log('messages');
    };

    // go to the forum
    const gotoForum = () =>{
        console.log('forum');
    };

    const gotoUserList = () => {
        console.log("user list")
    }
    return (
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <View style ={[styles.textContainer, generalStyles.centerContainer]}>
                <Text style ={[styles.titleText]}>{`user help`}</Text>
            </View>
            <View style={[styles.buttonContainer]}>
                <FlexibleButton
                    title="messages"
                    callback={gotoMessages}
                    backgroundColor={Color.colorPaleovioletred}
                    fontColor={Color.colorWhite}
                />
                <FlexibleButton
                    title="forum"
                    callback={gotoForum}
                    backgroundColor={Color.colorPaleovioletred}
                    fontColor={Color.colorWhite}
                />
                <FlexibleButton
                    title="user list"
                    callback={gotoUserList}
                    backgroundColor={Color.colorPaleovioletred}
                    fontColor={Color.colorWhite}
                />
            </View>
        </SafeAreaView>
    )
}

export default AdminUserHelpScreen;

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
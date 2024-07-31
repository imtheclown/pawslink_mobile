// screen for the admin's animal database
import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View
 } from "react-native"
import { 
    Color,
    FontFamily
 } from "../../assets/general/GlobalStyles";
import { generalStyles } from "../../assets/general/generalStyles";
import FlexibleButton from "../../components/admin/FlexibleButton";

// navigation props
// annotates the parameters passed to the component
// try to use useNavigation hook 
import { AnimalDatabaseProps } from "../../navigation/admin/AdminBottomNavigation";
const AnimalDataScreen = ({route, navigation}:AnimalDatabaseProps) =>{;
    // function that navigates to list of cats
    const gotoCatsDatabase = () =>{
        navigation.navigate("animal_list",{type: 'cat'});
    };
    // function that navigates to list of dogs screen
    const gotoDogsDatabase = () =>{
        navigation.navigate("animal_list", {type: 'dog'})
    };
    // navigates to the screen where you can add animals
    const gotoAddAnimalScreen = () =>{
        navigation.navigate('add_animal', {});
    };

    return (
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <View style ={[styles.textContainer, generalStyles.centerContainer]}>
                <Text style = {[styles.titleText]}>{`animal database`}</Text>
            </View>
            <View style = {[styles.buttonContainer]}>
                <FlexibleButton
                    title="dogs"
                    callback={gotoDogsDatabase}
                    buttonStyle={styles.pinkButton}
                    fontStyle={styles.whiteFont}
                />
                <FlexibleButton
                    title="cats"
                    callback={gotoCatsDatabase}
                    buttonStyle={styles.pinkButton}
                    fontStyle={styles.whiteFont}
                />
                <FlexibleButton
                    title= '+ add animal'
                    callback={gotoAddAnimalScreen}
                    buttonStyle={styles.whiteButton}
                    fontStyle={styles.pinkFont}
                />
            </View>
        </SafeAreaView>
    )
}

export default AnimalDataScreen;
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
        alignItems: 'center',
    },
    buttonContainer: {
        width: '70%',
        height: 'auto',
    },
    titleText:{
        fontSize: 32,
        lineHeight: 48,
        fontWeight: "700",
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
        textTransform: 'capitalize',
    },
    textContainer:{
        width: '100%',
        height: '30%'
    },
    pinkButton: {
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: Color.colorPaleovioletred,
        borderColor: Color.colorPaleovioletred,
        height: 55
    },
    whiteButton:{
        marginTop: 10,
        justifyContent: 'center',
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
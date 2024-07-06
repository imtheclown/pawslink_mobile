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
const AnimalDataScreen = () =>{

    const gotoCatsDatabase = () =>{
        console.log("cats");
    };

    const gotoDogsDatabase = () =>{
        console.log("dogs");
    };
    
    const gotoAddAnimalScreen = () =>{
        console.log("add animal")
    };

    return (
        <SafeAreaView style ={[generalStyles.flexContainer, generalStyles.centerContainer, styles.mainContainer]}>
            <Text style = {[styles.titleText]}>{`animal database`}</Text>
            <View style = {[styles.buttonContainer, generalStyles.centerContainer]}>
                <FlexibleButton
                    fontColor={Color.colorWhite}
                    title="dogs"
                    backgroundColor={Color.colorPaleovioletred}
                    callback={gotoDogsDatabase}
                />
                <FlexibleButton
                    fontColor={Color.colorWhite}
                    title="cats"
                    backgroundColor={Color.colorPaleovioletred}
                    callback={gotoCatsDatabase}
                />
                <FlexibleButton
                    fontColor={Color.colorPaleovioletred}
                    title= '+ add animal'
                    backgroundColor="#FCF3F6"
                    callback={gotoAddAnimalScreen}
                />
            </View>
        </SafeAreaView>
    )
}

export default AnimalDataScreen;
const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite
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
        marginBottom: 30
    },
})
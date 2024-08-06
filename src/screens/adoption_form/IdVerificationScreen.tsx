// verification screen for the adoption form

import { 
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
} from "react-native";
import { Color, FontFamily, FontSize, Border } from '../../assets/general/GlobalStyles';
import { generalStyles } from "../../assets/general/generalStyles";
import FlexibleButton from "../../components/admin/FlexibleButton";
import { pickImageFromDir } from "../../utils/FileBasedUtilitilityFunctions";
import { useState, useCallback } from "react";
import ResponsiveImage from "../../components/ResponsiveImage";

// navigation
import { IdVerificationScreenProps } from "../../navigation/AppNavigation";
import { StatusBox } from '../ViewAnimalScreen';
import { ca } from 'react-native-paper-dates';
const IdVerificationScreen = ({route, navigation}: IdVerificationScreenProps) =>{
    const [imgUrl, setImgUrl] = useState<string|null>(null);
    const handlePickImage = useCallback(async() =>{
        await pickImageFromDir()
        .then(res =>{
            if(res[0].uri){
                setImgUrl(res[0].uri)
            }
        })
    }, []);
    const gotoNext = () =>{
        // go to the next page
    }

    const gotoPreviousPage = useCallback(() =>{
        navigation.goBack();
    }, []);
    return (
        <SafeAreaView style = {[generalStyles.flexContainer, styles.mainContainer]}>
            <Text style ={[styles.headerTextStyle]}>{`ID verification`}</Text>
            <Text style={[styles.subtitleStyle]}>{`Please attach a copy of your ID for us to verify your identity.`}</Text>
            <View style ={[generalStyles.containerWithShadow, styles.contentContainer]}>
                <Text style ={[styles.epilogueText, styles.idText]}>
                    {`ID Photo`}
                </Text>
                <TouchableOpacity
                    onPress={handlePickImage}
                    style ={[styles.imageContainer]}
                >
                    {/* show only when there is no attached file */}
                    {
                        !imgUrl && <Text style ={[styles.epilogueText, styles.attachhFileText]}>{`Attach File`}</Text>
                    }
                    {/* show picked image */}
                    {imgUrl && 
                        <View style = {{width: '100%'}}>
                            <ResponsiveImage
                                source={require("../../assets/images/no_image.png")}
                            />
                        </View>
                    }
                    <Text style ={[styles.supportedFileText]}>{`Supported format: PNG, JPG`}</Text>
                </TouchableOpacity>
                {/* show when there is picked image, aid in ux */}
                {
                    imgUrl &&                 
                    <View style ={[styles.buttonContainer]}>
                        <FlexibleButton
                            title={`change`}
                            callback={handlePickImage}
                            buttonStyle={{...styles.changeButton}}
                            fontStyle={{...styles.changeButtonText}}
                        />
                    </View>
                }
            </View>
            <View style ={{width: '95%'}}>
                <FlexibleButton
                    title="next"
                    callback={gotoNext}
                    buttonStyle={{...styles.navButton, ...styles.nextButton}}
                    fontStyle={{...styles.buttonText, ...styles.nextButtonText}}
                />
                <FlexibleButton
                    title="return to previous page"
                    callback={gotoPreviousPage}
                    buttonStyle={{...styles.navButton, ...styles.returnButton}}
                    fontStyle={{...styles.buttonText, ...styles.returnButtonText}}
                />
            </View>
        </SafeAreaView>
    )
}

export default IdVerificationScreen;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
        alignItems: 'center'
    },
    headerTextStyle:{
        color: Color.colorDarkslateblue,
        fontFamily: FontFamily.interBold,
        fontSize: 26,
        marginTop: 40,
        paddingBottom: 10,
    },
    subtitleStyle: {
        lineHeight: 26,
        fontFamily: FontFamily.interRegular,
        fontWeight: 400, 
        fontSize:FontSize.size_base,
        width: '95%',
        color: "#171A1F"
    },
    contentContainer:{
        width: '95%',
        padding: 20,
        margin: 5,
        backgroundColor: Color.colorWhite,
        borderRadius: Border.br_7xs,
    },
    epilogueText:{
        fontFamily:FontFamily.epilogueRegular,
        fontWeight: 400,
        color: "#171A1F"
    },
    idText:{
        lineHeight: 30,
        fontSize: FontSize.size_xl,
        marginBottom: 20
    },
    imageContainer:{
        width: '100%',
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: "#bdc1ca",
        borderRadius: Border.br_7xs,
        alignItems: 'center',
        padding: 10,
    },
    attachhFileText:{
        lineHeight: 30,
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.epilogueBold,
    },
    supportedFileText:{
        fontFamily: FontFamily.interRegular,
        fontWeight: 400,
        fontSize: FontSize.size_sm,
        lineHeight: 22,
        color: "#6F7787"
    },
    changeButton:{
        backgroundColor: Color.colorPaleovioletred,
        borderColor: Color.colorPaleovioletred,
        borderRadius: Border.br_4xs,
        width: 82,
        height: 36
    },
    changeButtonText:{
        fontFamily: FontFamily.interRegular,
        fontWeight: 400,
        fontSize: FontSize.size_sm,
        lineHeight: 22,
        color: Color.colorWhite,
    },
    buttonContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 10,
    },
    // buttons
    navButton:{
        width: '100%',
        height: 52,
        borderRadius: Border.br_7xl,
        marginTop: 10,
    },
    nextButton:{
        marginTop: 30,
        backgroundColor: Color.colorPaleovioletred,
        borderColor: Color.colorPaleovioletred,
    },
    buttonText:{
        fontFamily: FontFamily.interRegular,
    },
    nextButtonText: {
        color: Color.colorWhite,
    },
    returnButton:{
        backgroundColor: Color.colorWhite,
        borderColor:Color.colorPaleovioletred,
    },
    returnButtonText:{
        color: Color.colorPaleovioletred
    },
})
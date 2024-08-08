import { 
    SafeAreaView,
    Image,
    Text,
    StyleSheet,
} from "react-native";

import FlexibleButton from "../components/admin/FlexibleButton";
import { Color, FontFamily, FontSize, Border } from "../assets/general/GlobalStyles";
import { generalStyles } from '../assets/general/generalStyles';
import { useCallback } from "react";
import type { ThankYouScreenProps } from "../navigation/AppNavigation";
import { StackActions } from "@react-navigation/native";
const ThankYouScreen = ({route, navigation}: ThankYouScreenProps) =>{
    const params = route.params;
    const gotoHome = useCallback(() =>{
        navigation.popToTop();
    }, [])

    return (
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <Image
                source={require("../assets/logo/pawslink_bnw.png")}
                resizeMode="cover"
                style ={[styles.logoStyle]}
            />
            <Image
                source={require("../assets/images/dog_half_face.png")}
                resizeMode="cover"
                style ={[styles.contentImage, generalStyles.containerWithShadow]}
            />
            <Text style = {[styles.textContent]}>
                {params.contentText}
            </Text>
            <FlexibleButton
                title="back to home"
                callback={gotoHome}
                buttonStyle={{...styles.buttonStyle, ...generalStyles.containerWithShadow}}
                fontStyle={styles.fontStyle}
            />
        </SafeAreaView>
    )
}

export default ThankYouScreen;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorPaleovioletred,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoStyle :{
        width: 188,
        height: 188,
        aspectRatio: 1,
    },
    contentImage:{
        width: 288,
        borderRadius: 96,
        height: 198,
    },
    textContent:{
        marginTop: 15,
        fontWeight: 700,
        fontFamily: FontFamily.interBold,
        fontSize: FontSize.size_xl,
        lineHeight: 28,
        color: Color.colorWhite,
    },
    buttonStyle:{
        marginTop: 40,
        width: '100%',
        height: 52,
        borderRadius: Border.br_7xl,
        backgroundColor: Color.colorWhite,
        borderColor: Color.colorWhite,
    },
    fontStyle: {
        fontFamily: FontFamily.interRegular,
        fontWeight:400,
        fontSize: FontSize.size_lg,
        lineHeight: 28,
        color: Color.colorPaleovioletred,
    }
})
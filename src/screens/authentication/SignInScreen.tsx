// sign in screen

import { 
    SafeAreaView,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Color, FontFamily, FontSize, Border  } from "../../assets/general/GlobalStyles";
import { generalStyles } from "../../assets/general/generalStyles";

// icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import AuthTextInput from "./AuthTextInput";
import FlexibleButton from "../../components/admin/FlexibleButton";
import { useState, useCallback } from "react";
const SignInScreen = () =>{
    const [username, setUsername] =useState<string|null>(null);
    const [password, setPassword] = useState<string|null>(null);
    const [hasError, setHasError] = useState(true);

    const handleUsernameChange = useCallback((newValue: string|null) =>{
        setUsername(newValue);
    }, []);

    const handlePasswordChange = useCallback((newValue: string|null) =>{
        setPassword(newValue);
    }, []);

    const handleLogin = useCallback(() =>{
        console.log("pressed");
    }, [])
    return (
        <SafeAreaView style = {[generalStyles.flexContainer,styles.mainContainer, ]}>
            <Image
                source={require("../../assets/logo/pawslink_round_colored.png")}
                resizeMode="cover"
                style = {[styles.logoStyle]}
            />
            <Text style = {[styles.titleTextStyle]}>{`welcome back`}</Text>
            <AuthTextInput
                title="username"
                isSensitive ={false}
                icon = {<MaterialIcon name="person-outline" size={24} color={Color.colorGray}/>}
                required = {true}
                callback={handleUsernameChange}
            />
            <AuthTextInput
                title="password"
                isSensitive = {false}
                icon = {<MaterialIcon name="password" size={24} color={Color.colorGray}/>}
                required = {true}
                callback={handlePasswordChange}
            />
            <FlexibleButton
                title="login"
                callback={handleLogin}
                buttonStyle={{...styles.loginButton}}
                fontStyle={{...styles.logInButtonText}}
            />
            <TouchableOpacity>
                <Text style ={[styles.forgotPasswordText, generalStyles.lightInter]}>{`forgot password`}</Text>
            </TouchableOpacity>
            <View style ={[styles.errorAndNoAccContainer]}>
                {hasError && <Text style ={[generalStyles.lightInter, styles.errMsgStyle]}>{`ⓘ Wrong password! Please try again.`}</Text>}
                <TouchableOpacity>
                    <Text style ={[generalStyles.lightInter, styles.noAccountText]}>
                        {`dont have an account? sign up`}
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style = {[styles.bottomLogoText]}>{`in partnership with`}</Text>
            <View style ={[styles.logoContainer]}>
                <Image
                    source={require("../../assets/logo/up_round.png")}
                    resizeMode="cover"
                    style ={[styles.bottomLogoStyle]}
                />
                <Image
                    source={require("../../assets/logo/pahinungod.png")}
                    resizeMode="cover"
                    style ={[styles.bottomLogoStyle]}
                />
                <Image
                    source={require("../../assets/logo/pawradise_round.png")}
                    resizeMode="cover"
                    style ={[styles.bottomLogoStyle]}
                />
            </View>
        </SafeAreaView>
    )
}
export default SignInScreen;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: Color.colorWhite,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    logoStyle : {
        width: 136,
        height: 136,
    },
    titleTextStyle: {
        fontFamily: FontFamily.epilogueBold,
        fontSize: 42,
        lineHeight: 60,
        fontWeight: 700,
        color: Color.colorDarkslateblue,
        textTransform: 'capitalize'
    },
    loginButton:{
        width: '100%',
        borderRadius: Border.br_14xl,
        backgroundColor: Color.colorRoyalPlum,
        borderColor: Color.colorDarkslateblue,
        height: 61,
        marginBottom: 20,
    },
    logInButtonText:{
        fontFamily: FontFamily.interRegular,
        fontSize: FontSize.size_lg,
        color: Color.colorWhite,
        fontWeight: 700,
        lineHeight: 28.
    },
    forgotPasswordText: {
        color: Color.colorPlum,
        lineHeight: 24,
        fontSize: FontSize.size_base,
    },
    noAccountText:{
        textDecorationLine: 'underline',
        fontSize: FontSize.size_base,
        color: Color.colorGray,
        lineHeight: 24,
    },
    logoContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    bottomLogoStyle:{
        height: 75,
        width: 75
    },
    bottomLogoText:{
        fontStyle: 'italic',
        lineHeight: 24,
        fontSize: FontSize.size_xs,
        marginBottom: 20,
    },
    errorAndNoAccContainer:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    errMsgStyle:{
        fontSize: FontSize.size_base,
        color: Color.errorRed,
        lineHeight: 24
    }
})
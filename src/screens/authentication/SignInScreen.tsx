// sign in screen

import { 
    SafeAreaView,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { Color, FontFamily, FontSize, Border  } from "../../assets/general/GlobalStyles";
import { generalStyles } from "../../assets/general/generalStyles";

// icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import AuthTextInput from "./AuthTextInput";
import FlexibleButton from "../../components/admin/FlexibleButton";
import { SignInScreenProps } from "../../navigation/AppNavigation";
import { useState, useCallback } from "react";
const SignInScreen = ({route, navigation}: SignInScreenProps) =>{
    // state management
    const [username, setUsername] =useState<string|null>(null);
    const [password, setPassword] = useState<string|null>(null);
    const [hasError, setHasError] = useState(false);

    // callback for events that triggers changes in the username state
    const handleUsernameChange = useCallback((newValue: string|null) =>{
        setUsername(newValue);
    }, []);
    // callack for the events that triggers changes in the password state
    const handlePasswordChange = useCallback((newValue: string|null) =>{
        setPassword(newValue);
    }, []);
    // validation of user inputs before attempt to log in the user
    // re-renders per changes in the username and password
    const handleLogin = useCallback(() =>{
        // check if username and password fields are not empty
        if(username !== null && password !== null){
            // temporary
            // change to the log in logic
            console.log(username, password)
        // show error if there is a problem with user input
        }else{
            setHasError(true)
        }
    }, [username, password]);

    // forces text input in this component to lose focus by dismissing keyboard
    const forceOutFocus = useCallback(() =>{
        Keyboard.dismiss();
    }, [])

    // goes to the sign up page
    const gotoSignUp = useCallback(() =>{
        navigation.navigate("sign_up")
    }, [])
    return (
    <TouchableWithoutFeedback onPress={forceOutFocus}>
        <SafeAreaView style = {[generalStyles.flexContainer,styles.mainContainer, ]}>
            {/* logo */}
            <Image
                source={require("../../assets/logo/pawslink_round_colored.png")}
                resizeMode="cover"
                style = {[styles.logoStyle]}
            />
            {/* title text */}
            <Text style = {[styles.titleTextStyle]}>{`welcome back`}</Text>
            {/* username text input */}
            <AuthTextInput
                title="username"
                isSensitive ={false}
                icon = {<MaterialIcon name="person" size={24} color={Color.colorGray}/>}
                required = {true}
                callback={handleUsernameChange}
            />
            {/* password text input */}
            <AuthTextInput
                title="password"
                isSensitive = {true}
                icon = {<MaterialIcon name="password" size={24} color={Color.colorGray}/>}
                required = {true}
                callback={handlePasswordChange}
            />
            {/* logging in button */}
            <FlexibleButton
                title="login"
                callback={handleLogin}
                buttonStyle={{...styles.loginButton}}
                fontStyle={{...styles.logInButtonText}}
            />
            {/* forgot password link */}
            <TouchableOpacity>
                <Text style ={[styles.forgotPasswordText, generalStyles.lightInter]}>{`forgot password`}</Text>
            </TouchableOpacity>
            {/* container holding the error message and no account text */}
            <View style ={[styles.errorAndNoAccContainer]}>
                {/* show error message if hasError flag is on */}
                {hasError && <Text style ={[generalStyles.lightInter, styles.errMsgStyle]}>{`ⓘ Wrong password! Please try again.`}</Text>}
                {/* display sign up link all the time */}
                <TouchableOpacity onPress={gotoSignUp}>
                    <Text style ={[generalStyles.lightInter, styles.noAccountText]}>
                        {`dont have an account? sign up`}
                    </Text>
                </TouchableOpacity>
            </View>
            {/* logo container */}
            {/* contains logo of pawaradise, up and pahinungod */}
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
    </TouchableWithoutFeedback>
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
        textTransform: 'capitalize',
        marginBottom: 20,
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
    },

})
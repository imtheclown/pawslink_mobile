// sign up screen

import { SafeAreaView, TouchableWithoutFeedback, Image, Text, StyleSheet, View, Keyboard, TouchableOpacity } from "react-native";
import { generalStyles } from "../../assets/general/generalStyles";
import { Border, Color, FontSize } from "../../assets/general/GlobalStyles";
import AuthTextInput from "./AuthTextInput";
import { useState, useCallback } from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FlexibleButton from "../../components/admin/FlexibleButton";
import CustomCheckBox from "../../components/CustomCheckBox";
import { SignInScreenProps, SignUpScreenProps } from "../../navigation/AppNavigation";
const SignUpScreen = ({route, navigation}: SignInScreenProps) => {
    const [username, setUsername] = useState<string|null>(null);
    const [email, setEmail] = useState<string|null>(null);
    const [password, setPassword] = useState<string|null>(null);
    const [cnfrmPass, setCnfrmPass] = useState<string|null>(null);
    const [isAgree, setIsAgree] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>("something went wrong");
    const [hasErr, setHasErr] =useState(false);
    const handleUserNameChange = useCallback((newValue:string|null) =>{
        setUsername(newValue);
    }, []);

    const handleEmailChange = useCallback((newValue: string|null) =>{
        setEmail(newValue);
    }, []);

    const handlePasswordChange = useCallback((newValue:string|null) =>{
        console.log(newValue);
        setPassword(newValue);
    }, []);

    const handleCnfrmPassChange = useCallback((newValue: string|null) =>{
        setCnfrmPass(newValue);
    }, []);

    const checkIfPassSame = useCallback((value: string) =>{
        console.log(`password is: ${password}, value is: ${value}`)
        return value === password
    }, [password]);

    const forceKeyboardDismiss = useCallback(() =>{
        Keyboard.dismiss()
    }, []);

    const handleIsAgreeChange = useCallback((newValue: boolean) =>{
        setIsAgree(newValue);
    }, []);

    const gotoSignIn = () =>{
        navigation.navigate("sign_in");
    }
    const handleSignUp = () => {
        console.log("pressed");
    }
    return (
        <TouchableWithoutFeedback onPress={forceKeyboardDismiss}>
            <SafeAreaView style = {[styles.mainContainer, generalStyles.flexContainer]}>
                <Image
                    source={require("../../assets/logo/pawslink_colored.png")}
                    resizeMode="cover"
                    style = {[styles.mainLogo]}
                />
                <Text style ={[generalStyles.boldInter, styles.titleTextStyle]}>{`Create an Account`}</Text>
                <AuthTextInput
                    isSensitive = {false}
                    required = {true}
                    title="username"
                    callback={handleUserNameChange}
                    icon = {<MaterialIcons name="person-outline" size={24} color={Color.colorGray}/>}
                />
                <AuthTextInput
                    title="email"
                    isSensitive = {false}
                    required = {true}
                    callback={handleEmailChange}
                    icon = {<MaterialIcons name="mail-outline" size={24} color={Color.colorGray}/>}
                />
                <AuthTextInput
                    title="password"
                    isSensitive = {true}
                    required = {true}
                    callback={handlePasswordChange}
                    icon = {<MaterialIcons name="lock-outline" size={24} color={Color.colorGray}/>}
                />
                <AuthTextInput
                    title="confirm password"
                    isSensitive= {true}
                    required = {true}
                    callback={handleCnfrmPassChange}
                    icon = {<MaterialIcons name="lock-outline" size={24} color={Color.colorGray}/>}
                    validator={checkIfPassSame}
                    customErrorMsg="passwords does not match"

                />
                <View style ={[styles.checkBoxContainer]}>
                    <CustomCheckBox
                        title=" I accept the "
                        oldValue = {isAgree}
                        callback={handleIsAgreeChange}
                        containerStyle={styles.checkBox}
                        fontStyle={{...generalStyles.lightInter, ...styles.checkBoxText}}
                    />
                    <TouchableOpacity>
                        <Text style ={[generalStyles.lightInter, styles.checkBoxText, styles.highlighText]}>{`Terms and Conditions`}</Text>
                    </TouchableOpacity>
                </View>
                <FlexibleButton
                    title="sign up"
                    callback={handleSignUp}
                    buttonStyle={{...styles.signUpButton}}
                    fontStyle={{...generalStyles.boldEpilogue, ...styles.signUpButtonText}}
                />
                {/*  */}
                <View style = {[generalStyles.flexContainer, styles.bottomTextContainer]}>
                    {/* error message */}
                    {hasErr && <Text style ={[styles.errMsgStyle, generalStyles.lightInter]}>{errMsg}</Text>}
                    <View style ={[styles.haveAccTextContainer]}>
                        <Text style = {[styles.bottomText, generalStyles.lightInter]}>already have an account? </Text>
                        <TouchableOpacity onPress={gotoSignIn}>
                            <Text style ={[styles.bottomText, generalStyles.lightInter, styles.linkText]}>login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    mainContainer:{
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleTextStyle:{
        color: Color.colorDarkPink,
        lineHeight: 42,
        fontSize: 27,
        marginBottom: 20,
    },
    mainLogo: {
        height: 74, 
        width: 164
    },
    checkBoxContainer:{
        flexDirection: 'row',
    },
    checkBox:{
        width: 'auto'
    },
    checkBoxText:{
        fontSize: FontSize.size_xs,
        lineHeight: 24,
        color: Color.colorDarkslategray,
    },
    highlighText:{
        color: '#379AE6',
        textDecorationLine: 'underline'
    },
    signUpButton:{
        width: '100%',
        height: 61,
        backgroundColor: Color.colorRoyalPlum,
        borderColor: Color.colorRoyalPlum,
        borderRadius: Border.br_14xl,
        marginTop: 20,
    },
    signUpButtonText:{
        color: Color.colorWhite,
        lineHeight: 30,
        fontSize: FontSize.size_xl
    },
    bottomTextContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    haveAccTextContainer:{
        flexDirection: 'row',
    },
    errMsgStyle:{
        fontSize: FontSize.size_base,
        color: Color.errorRed,
        lineHeight: 24
    },
    bottomText:{
        lineHeight: 24, 
        fontSize: FontSize.size_base,
        color: Color.colorDarkslategray
    },
    linkText:{
        textDecorationLine: 'underline'
    }
})
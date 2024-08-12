// screen that allows user to edit their profile

import { SafeAreaView, TouchableWithoutFeedback, Text,
     StyleSheet,
     TouchableOpacity,
     View,
     ScrollView
} from "react-native";

import { Avatar } from "@rneui/base";

import { Color, FontFamily, FontSize, Border } from "../assets/general/GlobalStyles";
import { generalStyles } from '../assets/general/generalStyles';
import AntDesign from "react-native-vector-icons/AntDesign"

import { pickImageFromDir } from "../utils/FileBasedUtilitilityFunctions";
import FlexibleTextInput from "../components/FlexibleTextnput";
import FlexibleButton from "../components/admin/FlexibleButton";
import { useState, useCallback } from "react";
import { EditProfileScreenProps } from "../navigation/AppNavigation";
const EditProfileScreen = ({route, navigation}: EditProfileScreenProps) =>{
    const [username, setUsername] = useState<string|null>(null);
    const [phone, setPhone] = useState<string|null>(null);
    const [email, setEmail] = useState<string|null>(null);
    const [password, setPassword] = useState<string|null>(null);
    const handleUsernameChange = useCallback((newValue: string|null) =>{
        setUsername(newValue);
    }, []);
    const handlePhonechange = useCallback((newValue:string|null) =>{
        setPhone(newValue);
    }, []);

    const handleEmailChange = useCallback((newValue: string|null) =>{
        setEmail(newValue);
    }, []);

    const handlePasswordChange = useCallback((newValue:string|null) =>{
        setPassword(newValue);
    }, []);

    const handleSave = () =>{
        // 
    }
    const handleCancel = () =>{
        navigation.goBack();
    }
    const handlePickImg = useCallback(pickImageFromDir, []);
    return (
        <TouchableWithoutFeedback >
            <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
                <Text style ={[styles.titleText, generalStyles.boldEpilogue]}>Edit Profile</Text>
                <ScrollView contentContainerStyle = {[styles.scrollViewContainerStyle]} style ={[styles.scrollViewStyle]}>
                    <TouchableOpacity style ={[styles.avatarButton]} onPress={handlePickImg}>
                        <Avatar
                            source={require("../assets/images/no_image.png")}
                            size={127}
                            rounded    
                        >
                        </Avatar>
                        <View style ={[styles.accessoryIconContainer, generalStyles.centerContainer]}>
                            <AntDesign name="edit" size={12} color={Color.colorWhite}/>
                        </View>
                    </TouchableOpacity>
                    <FlexibleTextInput
                        title="username"
                        oldValue={username}
                        callback={handleUsernameChange}
                        innerContainerStyle={styles.textInputStyle}
                        outerContainerStyle={styles.textInputWrapper}
                        required = {true}
                    />
                    <FlexibleTextInput
                        title="phone"
                        oldValue={phone}
                        callback={handlePhonechange}
                        innerContainerStyle={styles.textInputStyle}
                        outerContainerStyle={styles.textInputWrapper}
                        required = {true}
                    />
                    <FlexibleTextInput
                        title="email"
                        oldValue={email}
                        callback={handleEmailChange}
                        innerContainerStyle={styles.textInputStyle}
                        outerContainerStyle={styles.textInputWrapper}
                        required = {true}
                    />
                    <FlexibleTextInput
                        title="password"
                        oldValue={password}
                        callback={handlePasswordChange}
                        innerContainerStyle={styles.textInputStyle}
                        outerContainerStyle={styles.textInputWrapper}
                        required = {true}
                        isSensitive = {true}
                    />
                    <FlexibleButton
                        title="save changes"
                        callback={handleSave}
                        buttonStyle={{...styles.buttonStyle, ...styles.saveButton, ...generalStyles.containerWithShadow}}
                        fontStyle={{...styles.fontStyle, ...styles.saveButtonText, ...generalStyles.lightInter}}
                    />
                    <FlexibleButton
                        title="cancel"
                        callback={handleCancel}
                        buttonStyle={{...styles.cancelButton, ...styles.buttonStyle, ...generalStyles.containerWithShadow}}
                        fontStyle={{...styles.fontStyle, ...generalStyles.lightInter, ...styles.cancelButtonText}}
                    />
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default EditProfileScreen
const styles = StyleSheet.create({
    mainContainer:{
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: Color.colorWhite,
        paddingTop: 40,
    },
    titleText:{
        fontSize: 24,
        color: Color.colorDarkslateblue,
        lineHeight: 32,
        alignSelf: 'flex-start',
    },
    avatarButton:{
        position: "relative",
        marginTop: 20,
    },
    accessoryIconContainer:{
        backgroundColor: Color.colorPaleovioletred,
        width: 32,
        height: 32,
        borderRadius: 16,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    textInputStyle:{
        borderRadius:Border.br_3xl,
        backgroundColor: Color.colorLightGray,
        borderColor: Color.colorLightGray,
        paddingHorizontal: 10,
        borderWidth: 1,
    },
    textInputWrapper:{
        borderRadius:Border.br_3xl,
    },
    scrollViewContainerStyle:{
        alignItems: 'center',
    },
    scrollViewStyle:{
        width: '100%'
    },
    buttonStyle: {
        width: '100%',
        borderRadius: Border.br_3xl,
        height: 44,
        margin: 5,
    },
    saveButton:{
        marginTop: 20,
        backgroundColor: Color.colorPaleovioletred,
        borderColor: Color.colorPaleovioletred,
    },
    fontStyle:{
        lineHeight: 26,
        fontSize: FontSize.size_base
    },
    saveButtonText:{
        color: Color.colorWhite,
    },
    cancelButton:{
        backgroundColor: Color.colorWhite,
        borderColor: Color.colorPaleovioletred,
        marginTop: 10,
    },
    cancelButtonText:{
        color: Color.colorPaleovioletred,
    }
})
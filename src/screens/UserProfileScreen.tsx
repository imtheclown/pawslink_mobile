// screen that displays options in the user profile

import { SafeAreaView, StyleSheet, View } from "react-native";
import { Avatar, Text } from "@rneui/base";
import { generalStyles } from '../assets/general/generalStyles';
import { Color, FontSize, Border } from "../assets/general/GlobalStyles";
import OptionListItem from "../components/OptionListItem";
import FlexibleButton from "../components/admin/FlexibleButton";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// navigation
import { UserProfileScreenProps } from "../navigation/BottomTabs";
const UserProfileScreen = ({route, navigation}: UserProfileScreenProps) => {
    const handleEditPress = () =>{
        navigation.navigate("edit_user_profile");
    }
    const handleContactUs = () => {

    }

    const handleDonatePress = () =>{

    }
    return (
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            {/* top container */}
            <View style ={[styles.profileContainer]}>
                <Avatar
                    source={require("../assets/images/no_image.png")}
                    size={108}
                    rounded
                />
                {/* texts */}
                <View style ={[styles.profileTextContainer]}>
                    <Text style ={[styles.usernameText, generalStyles.boldInter]}>annathecat</Text>
                    <Text style ={[styles.emailText, generalStyles.lightInter]}>anna@email.com</Text>
                </View>
            </View>
            <FlexibleButton
                title="edit profile"
                callback={handleEditPress}
                buttonStyle={{...styles.editButtonStyle, ...generalStyles.containerWithShadow}}
                fontStyle={{...generalStyles.lightInter, ...styles.editButtonText}}
            />
            <OptionListItem
                title="Notifications"
                icon = {<MaterialIcons name="notifications" size={20} color={Color.colorPaleovioletred}/>}
            />
            <OptionListItem
                title="Verify profile for adoption"
                icon = {<MaterialCommunityIcons name="shield-check" size={20} color={Color.colorPaleovioletred}/>}
            />
            <OptionListItem
                title="Terms of service"
                icon = {<MaterialCommunityIcons name="clipboard-check" size={20} color={Color.colorPaleovioletred}/>}
            />
            <OptionListItem
                title="About Us"
                icon = {<MaterialCommunityIcons name="paw" size={20} color={Color.colorPaleovioletred}/>}
            />
            <OptionListItem
                title="Log Out"
                icon = {<MaterialIcons name="arrow-forward" size={20} color={Color.colorPaleovioletred}/>}
            />
            <View style ={[generalStyles.flexContainer, styles.bottomButtonContainer]}>
                <FlexibleButton
                    title="Donate"
                    callback={handleContactUs}
                    buttonStyle={{...styles.editButtonStyle, ...generalStyles.containerWithShadow, ...styles.buttonWithIcon}}
                    fontStyle={{...generalStyles.lightInter, ...styles.editButtonText, ...styles.buttonWithIconText}}
                    icon = {<MaterialCommunityIcons name="hand-heart-outline" color={Color.colorWhite} size={20}/>}
                />
                <FlexibleButton
                    title="Contact Us"
                    callback={handleDonatePress}
                    buttonStyle={{...styles.editButtonStyle, ...generalStyles.containerWithShadow, ...styles.buttonWithIcon, ...styles.contactUsButton}}
                    fontStyle={{...generalStyles.lightInter, ...styles.editButtonText, ...styles.buttonWithIconText, ...styles.contactUsText}}
                    icon = {<MaterialCommunityIcons name="message-processing" color={Color.colorPaleovioletred} size={20}/>}
                />
            </View>
        </SafeAreaView>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30
    },
    profileContainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    usernameText:{
        fontSize: 25,
        color: Color.colorDarkslateblue,
        lineHeight: 28,
    },
    emailText:{
        fontSize: FontSize.size_base,
        color: Color.colorDarkslategray,
        lineHeight: 26,
    },
    profileTextContainer:{
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    editButtonStyle: {
        margin: 5,
        marginTop: 30,
        backgroundColor: Color.colorPaleovioletred,
        borderColor: Color.colorPaleovioletred,
        width: '100%',
        height: 44,
        borderRadius: Border.br_3xl,
    },
    editButtonText:{
        color: Color.colorWhite,
        lineHeight:26,
        fontSize: FontSize.size_base,
    },
    buttonWithIcon:{
        flexDirection: 'row'
    },
    buttonWithIconText:{
        marginLeft: 20
    },
    bottomButtonContainer:{
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%'
    },
    contactUsButton:{
        marginTop: 10,
        backgroundColor: Color.colorWhite,
    },
    contactUsText:{
        color: Color.colorPaleovioletred,
    }
})

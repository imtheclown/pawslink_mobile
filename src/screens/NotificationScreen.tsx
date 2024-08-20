// notification screen

import { SafeAreaView, 
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
 } from "react-native";

import Feather from 'react-native-vector-icons/Feather'
import { Color } from "../assets/general/GlobalStyles";
import { generalStyles } from "../assets/general/generalStyles";


import NotificationCard from "../components/NotificationCard";
export enum NotificationType {
    ALERT = 'alert',
    ADOPTION_APPROVED = 'adoption_approved',
}

export interface NotifContentInterface {
    content: string,

}

// navigation
import { NotificationScreenProps } from "../navigation/AppNavigation";

const NotificationScreen = ({route, navigation}:NotificationScreenProps) =>{

    const handleBack = () =>{
        navigation.goBack();
    }
    return (
        <SafeAreaView style = {[styles.mainContainer, generalStyles.flexContainer]}>
            <View style = {[styles.headerContainer]}>
                <TouchableOpacity onPress={handleBack}>
                    <Feather name="arrow-left-circle" size={34} color={Color.colorPaleovioletred} />
                </TouchableOpacity>
                <Text style ={[styles.headerText, generalStyles.boldEpilogue]}>
                    {`notifications`}
                </Text>
            </View>
            <ScrollView style ={{width: '100%'}} contentContainerStyle ={{alignItems: 'center'}}>
                <NotificationCard
                    type={NotificationType.ADOPTION_APPROVED}
                    animalName="spharks"
                />
                <NotificationCard
                    type={NotificationType.ALERT}
                    animalName="spharks"
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default NotificationScreen;

const styles = StyleSheet.create({
    mainContainer:{
        alignItems: 'center',
        backgroundColor: Color.colorWhite,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    headerText:{
        color:Color.colorPaleovioletred,
        lineHeight: 32,
        fontSize: 24, 
        paddingLeft: 40,
        textTransform: 'capitalize',
        paddingBottom: 20,
    },
    headerContainer:{
        width: '100%',
        flexDirection: 'row',
        alignSelf: 'flex-start',
    }
})

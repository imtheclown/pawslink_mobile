import { 
    View,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text
} from "react-native";
import React from "react";
import IonIcon from "react-native-vector-icons/Ionicons"

import { 
    Border,
    Color,
    FontFamily,
    FontSize
 } from '../assets/general/GlobalStyles';
import { generalStyles } from "../assets/general/generalStyles";

import { useNavigation } from "@react-navigation/native";

// navigation
import { StackNavProps } from "../navigation/AppNavigation";

interface animalProfileBoxProps{
    name: string,
    location: string,
    sex: string
    id: string
}

import { AnimalSex } from "../models";
const AnimalProfileBox:React.FC<animalProfileBoxProps> = React.memo(({name,location, sex, id}) =>{
    const navigation = useNavigation<StackNavProps>();
    const gotoAnimal = () =>{
        navigation.navigate("view_animal", {animalId: id})
    }
    return (
        <TouchableOpacity onPress={gotoAnimal} style = {[styles.mainContainer, generalStyles.containerWithShadow, generalStyles.centerContainer]}>
            <View style = {[styles.contentContainer]}>
                <Image
                    resizeMode="cover"
                    source={require("../assets/images/no_image.png")}
                    style ={[styles.previewImage]}
                />
                <View style = {[generalStyles.rowInBetweenContainer, styles.textContainerStyle]}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style ={[styles.nameTextStyle]}>
                        {name}
                    </Text>
                    <IonIcon
                        name= {sex === AnimalSex.MALE? "male":"female"}
                        size={18}
                        color={sex === AnimalSex.MALE? 'blue':Color.colorPaleovioletred}
                    />
                </View>
                <View style ={[generalStyles.rowStartContainer]}>
                    <IonIcon
                        name="location-outline"
                        size={18}
                        color={'black'}
                    />
                    <Text style ={[styles.locationTextStyle]}>{location}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
})

export default AnimalProfileBox

const styles = StyleSheet.create({
    mainContainer:{
        width: '45%',
        aspectRatio: 1,
        minHeight: 160,
        minWidth: 160,
        margin: 5,
        borderRadius: Border.br_4xs,
        backgroundColor: Color.colorWhite,
    },
    contentContainer:{
        width: '90%',
        height: '90%'
    },
    previewImage:{
        minWidth: 140,
        width: '100%',
        height: '70%',
        minHeight: 100
    },
    textContainerStyle:{
        width: '100%',
        overflow: 'hidden',
    },
    nameTextStyle:{
        fontSize: FontSize.size_xs,
        color: Color.colorGray,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
        width:'85%',
    },
    locationTextStyle :{
        fontSize: FontSize.size_3xs,
        color: Color.colorDarkslateblue,
        fontFamily: FontFamily.interRegular,
        lineHeight: 20,
    }
})
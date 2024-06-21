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
    Color,
    FontFamily,
    FontSize
 } from '../assets/general/GlobalStyles';
import { generalStyles } from "../assets/general/generalStyles";

interface animalProfileBoxProps{
    name: string,
    location: string,
    sex: string
}
const AnimalProfileBox:React.FC<animalProfileBoxProps> = ({name,location, sex}) =>{
    return (
        <TouchableOpacity style = {[styles.mainContainer, generalStyles.curvedContainerWithShadow, generalStyles.centerContainer]}>
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
                        name= {sex === 'M'? "male":"female"}
                        size={18}
                        color={sex === 'M'? 'blue':Color.colorPaleovioletred}
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
}

export default AnimalProfileBox

const styles = StyleSheet.create({
    mainContainer:{
        width: '45%',
        aspectRatio: 1,
        minHeight: 160,
        minWidth: 160,
        margin: 5,
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
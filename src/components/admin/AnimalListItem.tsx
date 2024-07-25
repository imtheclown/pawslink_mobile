// item for the list of animals
// provide callback when the list item is pressed
// navigates to add animal list/edit animal
// determine if the animal can be viewed

import { 
    TouchableOpacity,
    Text,
    StyleSheet,
    View
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"
import React from "react";
import { Color, FontFamily, FontSize } from "../../assets/general/GlobalStyles";
import { generalStyles } from "../../assets/general/generalStyles";
import { StatusBox } from "../../screens/ViewAnimalScreen";
import { Avatar } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

// aws
import { LazyAnimal, Animal } from "../../models";
import { DataStore } from "aws-amplify/datastore";

// temp data here
import { AnimalStatus } from "../../models";
import type { StackNavProps } from "../../navigation/admin/AdminNavigationStack";
import { useCallback } from "react";

interface AnimalListItemProps {
    imgSoure ? :string,
    index: number,
    name: string,
    status: AnimalStatus,
    id: string,
}
const AnimalListItem: React.FC<AnimalListItemProps> = React.memo(({imgSoure, index, name, status, id}) =>{
    const navigation = useNavigation<StackNavProps>();

    const gotoEditAnimalView = useCallback(async() =>{
        const animalObject = await DataStore.query(Animal, (c) => c.id.eq(id));
        if(animalObject.length){
            navigation.navigate('add_animal', {animalObject: animalObject[0]})
        }
    }, [])
    return (
        <View style = {[styles.mainContainer, index%2===0?styles.evenBackground: styles.oddBackground]}>
            <View style = {[styles.imageContainer]}>
                <Avatar source={imgSoure?{uri:imgSoure}:require("../../assets/images/no_image.png")} size={40}/>
            </View>
            <View style ={[styles.nameContainer]}>
                <Text style = {[styles.nameTextStyle]} numberOfLines={1}>
                    {name}
                </Text>
            </View>
            <View style ={[styles.statusContainer]}>
                <StatusBox value = {status}/>
            </View>
            <TouchableOpacity
                style = {[generalStyles.centerContainer, styles.editButtonContainer]}
                onPress={gotoEditAnimalView}
            >
                {/* provide icon here */}
                <AntDesign name="edit" color={Color.colorPaleovioletred} size={16}/>
            </TouchableOpacity>
        </View>
    )
});

export default AnimalListItem;

const styles = StyleSheet.create({
    // column sizes
    editButtonContainer:{
        width: 75,
        height:75,
    },
    imageContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: 75
    },
    statusContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex:2,
    },
    nameContainer:{
        flex:3
    },
    // column sizes
    mainContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    nameTextStyle:{
        fontFamily: FontFamily.interRegular,
        lineHeight: 22,
        fontWeight: 700,
        fontSize: FontSize.size_sm,
        textTransform: 'capitalize',
        marginHorizontal: 5
    },
    evenBackground:{
        backgroundColor: Color.colorWhite
    },
    oddBackground:{
        backgroundColor: "#FAFAFB"
    }
})
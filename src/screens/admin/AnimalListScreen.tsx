// screen that shows the list of animals specified based on their type
// provides a list of animals with preview detaisl
import { 
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    FlatList
} from "react-native"
import { memo, useEffect, useState } from "react";
import { FontFamily, Color, FontSize } from "../../assets/general/GlobalStyles";

import { AnimalListProps } from '../../navigation/admin/AdminNavigationStack';
import { generalStyles } from "../../assets/general/generalStyles";
import AnimalListItem from "../../components/admin/AnimalListItem";

// aws
import { AnimalStatus } from "../../models";
import { DataStore } from "aws-amplify/datastore";
import { Animal } from "../../models";
import { LazyAnimal } from "../../models";
import { getEnumValueFromString } from "../../utils/TypeBasedUtilityFunctions";
import { Flat } from "lodash";

interface CustomRendererInterface{
    item: LazyAnimal,
    index: number,
}
const AnimalListScreen = ({route, navigation}: AnimalListProps) =>{
    // navigation parameter, key "type"
    const [animalList, setAnimalList] = useState<LazyAnimal[]|null>(null)
    const type = route.params.type;

    const getAnimals = async () =>{
        const animals = await DataStore.query(Animal);
        setAnimalList(animals)
    }

    const itemRenderer = ({item, index} : CustomRendererInterface) =>{
        var status = getEnumValueFromString(AnimalStatus, item.status[0]);
        if(!status){
            status = AnimalStatus.ON_CAMPUS
        }
        return (
            <AnimalListItem
                name={item.mainName}
                index={index}
                status={status}
                id = {item.id}
            />
        )
    }
    useEffect(() =>{
        getAnimals();
    })
    return (
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <View style = {[styles.contentContainer]}>
                <Text style = {[styles.titleTextStyle]}>{type}</Text>
                <View style = {[styles.listTitleContainer, generalStyles.containerWithShadow]}>
                    <View style = {[styles.headerImages]}>
                        {/* empty here */}
                    </View>
                    <Text style = {[styles.listTitleText, styles.nameWidth]}>
                        name
                    </Text>
                    <Text style = {[styles.listTitleText, styles.statusWidth, {textAlign: 'center'}]}>
                        status
                    </Text>
                    <Text style = {[styles.listTitleText, styles.headerImages, {textAlign: 'center'}]}>
                        edit
                    </Text>
                </View>
            </View>
            {/* list of animals here */}
            {/* maybe use pagination */}
            {
                animalList !== null ?
                <FlatList
                    data={animalList}
                    renderItem={itemRenderer}
                />
                : <></>
            }
        </SafeAreaView>
    )
}

export default memo(AnimalListScreen);

const styles = StyleSheet.create({
    // table title width per cell
    nameWidth:{
        flex: 3
    },
    statusWidth:{
        flex: 2
    },
    headerImages:{
        width: 75
    },
    mainContainer:{
        backgroundColor:Color.colorWhite,
        alignItems: 'center',
        height: '100%',
    },
    contentContainer:{
        width: '95%'
    },
    titleTextStyle: {
        alignSelf: 'center',
        fontSize: 32,
        lineHeight: 48,
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
        textAlign: "left",
        fontWeight: "700",
        textTransform: 'capitalize',
    },
    listTitleContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: "#FAFAFB",
        minHeight: 50,
        alignItems: 'center',
        marginBottom: 10
    },
    listTitleText:{
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.epilogueRegular,
        textTransform: 'uppercase'
    },

})
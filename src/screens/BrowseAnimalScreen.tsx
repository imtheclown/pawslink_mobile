// screen for browsing animals
import React, { useEffect, useState } from "react";
import { 
    View,
    SafeAreaView,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    FlatList
} from "react-native";
// package imports
// icons
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
// custom styling
import { generalStyles } from "../assets/general/generalStyles";
// custom values used for styling
import { 
    Border, 
    Color, 
    FontFamily
} from "../assets/general/GlobalStyles";

import BrowseAnimalSearchBar from "../components/BrowseAnimalSearchBar";
import MultiFilterContainer from "../components/SortingDropDown";
import AnimalProfileBox from "../components/AnimalProfileBox";
import { filterObject } from "../components/SortingDropDown";

// aws
import { DataStore } from "aws-amplify/datastore";
import { Animal, LazyAnimal } from "../models";

// aws

// sample data
const sampleType = ['cat', 'dog']
const sampleLocation = ['CUB', 'CAS']
const sampleColor =['black', 'brown']
const sampleStatus = ['alive', 'adopted']

const location:filterObject = {
    title: 'location',
    item :sampleLocation
}

const status:filterObject ={
    title: 'status',
    item: sampleStatus
}

const type: filterObject ={
    title: 'type',
    item: sampleType
}

const color: filterObject ={
    title: "color",
    item: sampleColor
}

const indivData ={
    location: "CUB",
    name: "Jose",
    sex: "M"
}

const data = [indivData, indivData, indivData, indivData, indivData,indivData,indivData,indivData]
//sample data
// end component of the list of animals
const animalListEnd = () =>{
    return (
        <View style = {[styles.endTextContainer]}>
            <Text style={[{fontFamily:FontFamily.interRegular}]}>end of list</Text>
        </View>
    )
}

// renderer interface
interface AnimalBoxRendererInterface {
    item: LazyAnimal,
    index: number
}
// main screen for the browse animal screen
const BrowseAnimalContent = () =>{
    const [animalList, setAnimalList] = useState<LazyAnimal[]|null>(null);
    useEffect(() =>{
        try{
            DataStore.query(Animal)
            .then(res =>{
                setAnimalList(res);
            })
            .catch(err => {
                console.log(err);
            })
        }
        catch(err){
            console.log(err);
        }
    }, [])

    // searches animal and updates the list of animal objects
    const searchAnimal = (newSearchQuery: string) =>{
        // TODO
        // find animals given the newSearchQuery parameter
        // update the list containing the animal objects

        // temporary function
        console.log(newSearchQuery)
    }

    const filterAnimal = (filterList: Array<filterObject>) =>{
        console.log(filterList);
    }

    const itemRenderer = ({item, index}:AnimalBoxRendererInterface) =>{
        return(
            <AnimalProfileBox
                name={item.mainName}
                location={item.location}
                sex={item.sex}
                id={item.id}
            />
        )
    }
    return(
        <View style ={[styles.mainContainer]}>
        {/* this is the top container */}
            {/* search bar and the connect with admin button */}
            <View style = {[generalStyles.rowContainer]}>
                <BrowseAnimalSearchBar searchGivenString={searchAnimal}/>
                <TouchableOpacity style = {[styles.messageButtonStyle, generalStyles.centerContainer]}>
                    <MaterialIcon name="people" color={"white"} size={25}/>
                </TouchableOpacity>
            </View>
            <Text style ={[styles.browseAnimalTextStyle]}>{`Browse Animal`}</Text>
            {/* sorting dropdown */}
            <MultiFilterContainer filterList={[color,type,status,location]} callbackFunction={filterAnimal}/>
            <FlatList
                contentContainerStyle = {[styles.flatListContentContainer]}
                horizontal = {false}
                numColumns={2}
                data={animalList}
                renderItem={itemRenderer}
                ListFooterComponent={animalListEnd}
            />
        </View>
    )
}

// wrapper of the content
// performs query of animal list
// prevents reloading/requery when the child component reloads
const BrowseAnimal = () =>{
    return(
        <SafeAreaView style ={[generalStyles.flexContainer, generalStyles.centerContainer, styles.whiteBackground]}>
            <BrowseAnimalContent/>
        </SafeAreaView>
    )
}

export default BrowseAnimal

const styles = StyleSheet.create({
    whiteBackground:{
        backgroundColor: Color.colorWhite
    },
    // the container that holds the main content
    mainContainer:{
        width: '95%',
        height: '100%'
    },
    // connect to admin button
    messageButtonStyle:{
        backgroundColor: "#F6D25E",
        borderRadius: Border.br_5xs,
        height: 48,
        width: 48
    },
    browseAnimalTextStyle: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "700",
        fontFamily: FontFamily.epilogueBold,
        color: "#d2628a",
    },
    // flatlist
    flatListContentContainer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    endTextContainer:{
        padding: 10,
    },
})
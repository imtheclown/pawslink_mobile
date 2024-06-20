// screen for browsing animals
import React from "react";
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
    FontFamily
} from "../assets/general/GlobalStyles";

import BrowseAnimalSearchBar from "../components/BrowseAnimalSearchBar";
import MultiFilterContainer from "../components/SortingDropDown";
import AnimalProfileBox from "../components/AnimalProfileBox";
import { filterObject } from "../components/SortingDropDown";

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

const animalListEnd = () =>{
    return (
        <View style = {[styles.endTextContainer]}>
            <Text>end of list</Text>
        </View>
    )
}
// main screen for the browse animal screen
const BrowseAnimalContent = () =>{
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
    return(
        <View style ={[styles.mainContainer]}>
        {/* this is the top container */}
            <View>
                <Image
                resizeMode="cover"
                source={require("../assets/logo/pawslink_colored.png")}
                style ={[styles.logoSize]}
                />
            </View>
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
                data={data}
                renderItem={({item}) => <AnimalProfileBox name={item.name} location={item.location} sex={item.sex}/>}
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
        <SafeAreaView style ={[generalStyles.flexContainer, generalStyles.centerContainer]}>
            <BrowseAnimalContent/>
        </SafeAreaView>
    )
}

export default BrowseAnimal

const styles = StyleSheet.create({
    // top logo
    logoSize:{
        width: 129,
        height: 57,
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
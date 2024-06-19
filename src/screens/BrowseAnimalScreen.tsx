// screen for browsing animals
import React from "react";
import { 
    View,
    Text,
    SafeAreaView,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard
} from "react-native";
import  FontAwesome  from "react-native-vector-icons/FontAwesome";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { generalStyles } from "../assets/general/generalStyles";
import { 
    Color, 
    Border, 
    FontFamily 
} from "../assets/general/GlobalStyles";
import { useState } from "react";

interface searchBarProps {
    searchGivenString: (searchString:string) => void
}

const BrowseAnimalSearchBar: React.FC<searchBarProps> = ({searchGivenString}) =>{
    const [query, setQuery] = useState("");
    const [isFocused, setIsfocused] = useState(false);

    const toggleIsfocused = () =>{
        setIsfocused(!isFocused);
    }
    const updateSearchQuery = (newString: string) =>{
        setQuery(newString);
    }

    const handleOnEndEditing = () =>{
        searchGivenString(query);
    }
    const clearSearchQuery = () =>{
        setQuery("");
        Keyboard.dismiss();
    }
    return (
        <View style ={[styles.textInputContainer, generalStyles.rowContainer, generalStyles.curvedContainerWithShadow]}>
            {
                !query.length || !isFocused?
                <FontAwesome 
                    style={[{margin: 5}]} 
                    name="search" 
                    color={"black"} 
                    size={25}
                />
                :
                <></>
            }
            <TextInput
                value={query}
                onFocus={toggleIsfocused}
                onBlur={toggleIsfocused}
                style={[styles.textInputStyle]}
                placeholder="search animal name"
                onChangeText={updateSearchQuery}
                onEndEditing={handleOnEndEditing}
            />
            {isFocused && query.length?
                <TouchableOpacity 
                    onPress={clearSearchQuery}
                >
                    <AntDesign 
                    style={[{margin: 5}]} 
                    name="close" 
                    size={25} 
                    color={"gray"}/>
                </TouchableOpacity>
                : <></>
            }
        </View>
    )
}
const BrowseAnimalContent = () =>{
    const [searchQuery, setSearchQuery] = useState("");

    const updateSearchQuery = (newSearchQuery: string) =>{
        setSearchQuery(newSearchQuery);
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
            <View style = {[generalStyles.rowContainer]}>
                <BrowseAnimalSearchBar searchGivenString={updateSearchQuery}/>
                <TouchableOpacity style = {[styles.messageButtonStyle, generalStyles.centerContainer]}>
                    <MaterialIcon name="people" color={"white"} size={25}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const BrowseAnimal = () =>{
    return(
        <SafeAreaView style ={[generalStyles.flexContainer, generalStyles.centerContainer]}>
            <BrowseAnimalContent/>
        </SafeAreaView>
    )
}

export default BrowseAnimal

const styles = StyleSheet.create({
    logoSize:{
        width: 129,
        height: 57,
    },
    mainContainer:{
        width: '95%',
        height: '100%'
    },
    textInputStyle:{
        height: 45,
        width: 280,
    },
    textInputContainer:{
        width:'auto',
        height: 'auto',
        fontFamily: FontFamily.interRegular,
        minHeight: 45, 
        marginRight: 10 
    },
    messageButtonStyle:{
        backgroundColor: "#F6D25E",
        borderRadius: Border.br_5xs,
        height: 48,
        width: 48
    }
})
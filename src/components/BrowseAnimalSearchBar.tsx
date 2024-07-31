import { useState } from "react";
import { 
    TextInput, 
    Keyboard,
    View,
    TouchableOpacity,
    StyleSheet 
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import { generalStyles } from "../assets/general/generalStyles";
import { FontFamily, Color, Border
 } from "../assets/general/GlobalStyles";
// interface for the browse animal search bar
interface searchBarProps {
    searchGivenString: (searchString:string) => void
}
// search bar for the browse animal
// parameters: method to that accepts a string parameter
// triggers the method when user clicks/closes the keyboard
const BrowseAnimalSearchBar: React.FC<searchBarProps> = ({searchGivenString}) =>{
    // search query for the search functionality
    const [query, setQuery] = useState("");
    // isFocused state
    const [isFocused, setIsfocused] = useState(false);
    // toggles isFocused on and off
    const toggleIsfocused = () =>{
        setIsfocused(!isFocused);
    }
    // updates the query state based on the input in the textinput component
    const updateSearchQuery = (newString: string) =>{
        setQuery(newString);
    }
    // triggers when user presses the check button in the keyboard
    // maybe use debounce here
    const handleOnEndEditing = () =>{
        searchGivenString(query);
    }
    // resets thev value of the search query string
    const clearSearchQuery = () =>{
        setQuery("");
        Keyboard.dismiss();
    }
    return (
        <View style ={[styles.textInputContainer, generalStyles.rowContainer, generalStyles.containerWithShadow]}>
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

export default BrowseAnimalSearchBar
const styles = StyleSheet.create({
        // search box
        textInputStyle:{
            height: 45,
            width: 280,
        },
        textInputContainer:{
            width:'auto',
            height: 'auto',
            fontFamily: FontFamily.interRegular,
            minHeight: 45, 
            marginRight: 10,
            backgroundColor: Color.colorWhite,
            borderRadius: Border.br_4xs,
        },
})
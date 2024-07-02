// screen that displays the detailed data of the animal

import {
    SafeAreaView, 
    View,
    StyleSheet,
    ScrollView,
    Image
} from "react-native"
import ResponsiveImage from "../components/ResponsiveImage"
import { generalStyles } from "../assets/general/generalStyles"
const ViewAnimalScreen = () =>{
    return (
        <SafeAreaView style = {[generalStyles.flexContainer, generalStyles.centerContainer]}>
            <ScrollView style = {[styles.scrollContainer]}>
                <ResponsiveImage
                    source={require("../assets/images/no_image.png")}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollContainer:{
        width: '95%',
        height: '100%'
    },
    imageStyle : {
        width: '100%',
    }
})

export default ViewAnimalScreen
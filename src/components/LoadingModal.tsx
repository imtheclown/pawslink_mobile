// modal that displays activity indicator and name of process
import { 
    View,
    Modal,
    Text,
    ActivityIndicator,
    SafeAreaView,
    StyleSheet
 } from "react-native";
import React from "react";
import { generalStyles } from "../assets/general/generalStyles";
import { Color } from "../assets/general/GlobalStyles";

// inprogress
// style the modal for better visuals
interface LoadingModalProps{
    title: string,
    isLoading: boolean
}
const LoadingModalScreen:React.FC<LoadingModalProps> = ({title, isLoading}) =>{
    return(
        <Modal
        animationType="slide"
        transparent = {true}
        visible ={isLoading}
        >
            <View style = {[styles.mainContainer, generalStyles.centerContainer, generalStyles.curvedContainerWithShadow]}>
                <Text>
                    {title}
                </Text>
                <ActivityIndicator
                    animating = {isLoading}
                    size={'large'}
                    color={Color.colorPaleovioletred}
                />
            </View>
        </Modal>
    )
}

export default LoadingModalScreen

const styles = StyleSheet.create({
    mainContainer:{
        width:'70%',
        aspectRatio: 1
    }
})
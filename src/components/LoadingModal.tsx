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
import { Border, Color, FontFamily } from "../assets/general/GlobalStyles";

// inprogress
// style the modal for better visuals
interface LoadingModalProps{
    title: string,
    isLoading: boolean
}
const LoadingModalScreen:React.FC<LoadingModalProps> = ({title, isLoading}) =>{
    return(
        <Modal
        animationType="fade"
        transparent = {true}
        visible ={isLoading}
        >
        <SafeAreaView style ={[generalStyles.centerContainer,generalStyles.flexContainer, styles.modalBackground]}>
            <View style = {[generalStyles.centerContainer, generalStyles.containerWithShadow, styles.mainContainer, ]}>
                <Text style = {[styles.titleStyle]}>
                    {title}
                </Text>
                <ActivityIndicator
                    animating = {isLoading}
                    size={'large'}
                    color={Color.colorPaleovioletred}
                />
            </View>
        </SafeAreaView>
        </Modal>
    )
}

export default LoadingModalScreen

const styles = StyleSheet.create({
    mainContainer:{
        width:'70%',
        aspectRatio: 1,
        borderRadius: 25
    },
    modalBackground:{
        backgroundColor: "rgba(128, 128, 128, 0.5)",
    },
    titleStyle :{
        color: Color.colorGray,
        fontFamily: FontFamily.epilogueBold
    }
})
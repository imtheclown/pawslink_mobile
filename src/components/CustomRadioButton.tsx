// components that contains two or more checkboxes
// allows single or multiple selection
// accepts a list of array as input
// returns a list of selected choices

import { 
    View,
    StyleSheet,
    Text
} from "react-native";
import CustomCheckBox from "./CustomCheckBox";
import { NeuterSpayStatus } from "../models";
import React from "react";
import { useState, useEffect } from "react";
import { Border, Color } from "../assets/general/GlobalStyles";
import { generalStyles } from "../assets/general/generalStyles";
interface RenderItemProps{
    item: string,
    index: number
}
interface CustomRadioButtonProps {
    data: string[],
    title: string,
    callback: (value:string|null) => void,
    oldValue: string|null,
}

const CustomRadioButton:React.FC<CustomRadioButtonProps> = React.memo(({data, title, callback, oldValue}) =>{
    const [selected, setSelected] = useState<string|null>(!oldValue? oldValue: null);
    const handleSelectValue = (newValue:boolean, index:number) =>{
        // new value is selection of a new value
        if(newValue){
            setSelected(data[index]);
        // new value is false when user disselect a selection
        }else{
            if(!null && data[index] === selected){
                setSelected(null);
                console.log("removed")
            }
        }
        callback(selected);
    } 
    const itemRenderer = ({item, index}:RenderItemProps) =>{
        const handleChangeValue = (newValue:boolean) =>{
            handleSelectValue(newValue, index);
        }
        return (
            <CustomCheckBox 
                key={index}
                title= {item}
                oldValue = {item === selected}
                callback={handleChangeValue}
                containerStyle={styles.customizedContainer}
            />
        )
    }
    return (
        <>
        <Text style ={[generalStyles.TextInputTitle]}>{title}</Text>
        <View style = {[styles.mainContainer, generalStyles.containerWithShadow]}>
            {data.map((value, index) =>{
                return itemRenderer({item:value, index: index})
            })}
        </View>
        </>
    )
});

export default CustomRadioButton;

const styles = StyleSheet.create({
    mainContainer:{
        width: '98%',
        borderRadius: Border.br_9xs,
        height: 'auto',
        flexDirection: 'column',
        margin: 5, 
        backgroundColor: Color.colorWhite,
        padding: 10
    },
    customizedContainer:{
        width: '100%',
        height: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 10,
    }
})
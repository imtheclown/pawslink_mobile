// drop down used for the admin side of the application

import { 
    View,
    StyleSheet,
    Text,
    Keyboard,
    StyleProp,
    TextStyle
 } from "react-native";
 import { Dropdown } from "react-native-element-dropdown";
import React, { useCallback } from "react";
import { useMemo, useState } from "react";
import { Border, Color, FontSize, FontFamily } from '../../assets/general/GlobalStyles';
import { generalStyles } from "../../assets/general/generalStyles";
import { debounce } from "lodash";

// props structure for the component
interface FlexibleDropDownProps {
    title: string,
    data: Array<string>
    callBack : (newValue: string) => void,
    style?: StyleProp<TextStyle>

}
//structure of the data passed to the data props of the dropdown component
export interface DatalistStructure  {
    value: string,
    label: string
}

// a customized dropdown list
const FlexibleDropDown: React.FC<FlexibleDropDownProps> = ({title, data, callBack, style}) => {
    // values selected from the drop down list
    // improve this one
    const [selected, setSelected] = useState<string|null>(null);
    // keeps track of the focus state
    // used for the ux/ emphasis when in focus
    const [isFocused, setIsFocused] = useState(false);
    // generates the list of data 
    // pool of data for the dropdown list
    // each element of the array follows the dataliststructure interface
    const generateData = useCallback(() => {
        return data.map(item => ({ label: item, value: item }));
      }, [data]);

    const handleOnfocus = () =>{
        setIsFocused(true);
    }
    const handleOnBlur = () =>{
        setIsFocused(false);
        if(selected !== null){
            callBack(selected);
        }
    }

    const debounceChangeValue = useCallback(debounce(callBack, 500), [callBack]);

    const handleChangeValue = (newValue:DatalistStructure) =>{
        const value = newValue.value;
        setSelected(value);
        debounceChangeValue(value);
    }
    // memoizes the data produced by the generateData
    const processedData: Array<DatalistStructure> = useMemo(generateData, [data])
    return (
        <View style ={[style?style:styles.fullWidth]}>
            <Text style ={[generalStyles.TextInputTitle]}>{title}</Text>
            <View style = {[generalStyles.outerTextInputBox, styles.fullWidth, isFocused? generalStyles.onFocusOuterTextInputBox: {}]}>
                <Dropdown
                    onFocus={handleOnfocus}
                    onBlur={handleOnBlur}
                    onChange={handleChangeValue}
                    value={selected}
                    data={processedData}
                    labelField={"label"}
                    valueField={"value"}
                    placeholder=""
                    // styling
                    fontFamily= {FontFamily.interRegular}
                    selectedTextStyle ={{marginHorizontal: 5}}
                    selectedTextProps={{numberOfLines: 1}}
                    containerStyle = {[styles.listContainer]}
                    style = {[styles.fullWidth,generalStyles.innerTextInputBox, isFocused? generalStyles.onFocusInnnerTextInputBox: generalStyles.normalInnerTextInputBox]}
                    itemContainerStyle ={[styles.itemContainerStyle]}
                    iconStyle = {[isFocused?styles.rotatedIcon:styles.normalIcon, styles.iconStyle]}
                    iconColor={isFocused? Color.colorPaleovioletred: Color.colorSilver}
                    activeColor={Color.colorPalevioletred_200}
                />
            </View>
        </View>
    )
}

export default React.memo(FlexibleDropDown);

const styles = StyleSheet.create({
    iconStyle : {
        margin: 5
    },
    normalIcon:{
        transform:[
            {
                rotate: '0deg'
            }
        ]
    },
    rotatedIcon:{
        transform:[
            {
                rotate: '180deg'
            }
        ]
    },
    fullWidth:{
        width: '100%'
    },
    listContainer:{
        marginTop: 5,
        width: '45%',
        
    },
    itemContainerStyle:{
        width: 'auto',
        alignItems: 'flex-start'
    },
})
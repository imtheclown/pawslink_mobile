// drop down used for the admin side of the application

import { 
    View,
    StyleSheet,
    Text,
    Keyboard
 } from "react-native";
 import { Dropdown } from "react-native-element-dropdown";
import React from "react";
import { useMemo, useState } from "react";
import { Border, Color, FontSize, FontFamily } from '../../assets/general/GlobalStyles';
import { generalStyles } from "../../assets/general/generalStyles";

// props structure for the component
interface FlexibleDropDownProps {
    title: string,
    data: Array<string>
    callBack : () => void,
    size: number,

}
//structure of the data passed to the data props of the dropdown component
export interface DatalistStructure  {
    value: string,
    label: string
}

// a customized dropdown list
const FlexibleDropDown: React.FC<FlexibleDropDownProps> = ({title, data, callBack, size}) => {
    // values selected from the drop down list
    // improve this one
    const [selected, setSelected] = useState("");
    // keeps track of the focus state
    // used for the ux/ emphasis when in focus
    const [isFocused, setIsFocused] = useState(false);
    // generates the list of data 
    // pool of data for the dropdown list
    // each element of the array follows the dataliststructure interface
    const generateData = () =>{
        const processedData = data.map(item => {
            return {
                label: item,
                value: item
            }
        });
        return processedData;
    }

    const handleOnfocus = () =>{
        setIsFocused(true);
        Keyboard.dismiss();
    }
    // memoizes the data produced by the generateData
    const processedData: Array<DatalistStructure> = useMemo(generateData, [data])
    return (
        <View>
            <Text style ={[generalStyles.TextInputTitle]}>{title}</Text>
            <View style = {[generalStyles.outerTextInputBox, isFocused? generalStyles.onFocusOuterTextInputBox: {}]}>
                <Dropdown
                    onFocus={() => {
                        handleOnfocus()
                    }}
                    onBlur={() => {
                        setIsFocused(false)
                    }}
                    onChange={(item) => {
                        setSelected(item.value);
                    }}
                    value={selected}
                    data={processedData}
                    labelField={"label"}
                    valueField={"value"}
                    placeholder=""
                    // styling
                    fontFamily= {FontFamily.interRegular}
                    selectedTextStyle ={{marginHorizontal: 5}}
                    selectedTextProps={{numberOfLines: 1}}
                    containerStyle = {{marginTop: 5}}
                    style = {[{width: size}, generalStyles.innerTextInputBox, isFocused? generalStyles.onFocusInnnerTextInputBox: generalStyles.normalInnerTextInputBox]}
                    itemContainerStyle ={{width:300}}
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
})
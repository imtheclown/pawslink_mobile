// customized datepicker
import DateTimePicker from 'react-native-ui-datepicker';
import { DateType } from 'react-native-ui-datepicker';
import { 
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Keyboard,
    Modal,
    SafeAreaView,
    StyleProp,
    TextStyle,
 } from 'react-native';
 import { FontSize,
    Border, 
    FontFamily 
} from '../../assets/general/GlobalStyles';
import { Color } from '../../assets/general/GlobalStyles';
import { useState, useEffect } from 'react';
import AntDesign from "react-native-vector-icons/AntDesign"
import React from 'react';
import FlexibleButton from './FlexibleButton';
import { generalStyles } from '../../assets/general/generalStyles';

// type of the data passed to the onchange event
// event triggered when you selecte a new date
interface DataParams {
    date: DateType
}

// props for the custom date picker
interface CustomDatePickerProps {
    title: string,
    style?: StyleProp<TextStyle>,
    oldValue: Date|null,
    callBack: (newDate: Date) => void,
}
const CustomDatePicker:React.FC<CustomDatePickerProps> = React.memo(({title,style, callBack, oldValue}) => {
    // saves the selected date
    const [date, setDate] = useState<Date|null>(null);
    // keeps track of the focused state of the component
    // aids in the ux
    const [isFocused, setIsfocused] = useState(false);

    useEffect(() =>{
        setDate(oldValue)
    }, [oldValue]);
    // function called when a date is selected
    const handleDateChange = (dateParams: DataParams) =>{
        // checks if the date params is not null or undefined
        if(dateParams.date){
            const selectedDate = new Date(dateParams.date.toString());
            setDate(selectedDate);
            callBack(selectedDate);
            exitFocus()
        }
    }
    // callback when the button holding the value is pressed
    const handlePress = () => {
        // exits focus mode
        if(isFocused){
            exitFocus()
        // enters focus mode
        }else{
            enterFocus()
        }
    }
    // function that triggers an onblur event
    // other inputs should be blurred
    const enterFocus = () =>{
        Keyboard.dismiss()
        setIsfocused(true)
    }
    // exists focus mode
    const exitFocus = () => {
        setIsfocused(false);
    }
    return(
        <>
        {/* button component */}
        {/* ui component used to trigger the date picking */}
        <View style= {[style? style: styles.fullWidth]}>
            <Text style = {[styles.textTitle]}>
                {/* title here */}
                {title}
            </Text>
            <View style = {[ styles.fullWidth, styles.outerContainer, isFocused? styles.onFocusOuterContainer: {}]}>
                <TouchableOpacity onPress={handlePress} style = {[styles.fullWidth, styles.textInputBox, isFocused? styles.onFocusTextInputBox: styles.normalTextInputBox]}>
                    <AntDesign style={[styles.dateIconStyle]} name='calendar' size={14} color={isFocused? Color.colorPaleovioletred: Color.colorDarkslategray}/>
                    <Text>
                        {/* selected date */}
                        {date !== null? date.toDateString(): "NA/NA/NA"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        {/* the actual date picker */}
        <Modal
             visible = {isFocused}
             transparent = {true}
        >
            <SafeAreaView style ={[generalStyles.centerContainer, generalStyles.flexContainer, styles.modalBackground]}>
                <View style ={[generalStyles.containerWithShadow, styles.modalContentContainer]}>
                    <DateTimePicker
                        selectedItemColor={Color.colorPalevioletred_200}
                        selectedTextStyle={{color: Color.colorDarkslategray}}
                        timePicker = {false}
                        mode='single'
                        date={date !== null? date: new Date()}
                        onChange={handleDateChange}
                    />
                    {/* add confirm and close button here */}
                    {/* button that closes the datepicker when the user will not choose a date  */}
                    <FlexibleButton
                        buttonStyle={styles.cancelButton}
                        fontStyle={styles.cancelButtonText}
                        title='cancel'
                        callback={exitFocus}
                    />
                </View>
            </SafeAreaView>
        </Modal>
        </>
    )
})
export default CustomDatePicker;

const styles = StyleSheet.create({
    textTitle:{
        textAlign: "left",
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        color: Color.colorDarkslategray,
        fontFamily: FontFamily.interBold,
        fontWeight: "700",
        textTransform: 'capitalize',
        left: 6,
    },
    outerContainer:{
        padding: 5,
        alignSelf: "flex-start"
    },
    textInputBox: {
        borderRadius: Border.br_9xs,
        borderWidth: 1,
        borderStyle: "solid",
        backgroundColor: Color.colorWhite,
        height: 55,
        color: Color.colorDarkslategray,
        flexDirection: 'row',
        alignItems: 'center'    
    },
    onFocusTextInputBox:{
        borderColor: Color.colorPaleovioletred,
    },
    normalTextInputBox:{
        borderColor: Color.colorSilver
    },
    onFocusOuterContainer:{
        backgroundColor: Color.colorPalevioletred_200,
        borderRadius: Border.br_5xs,
    },
    dateIconStyle:{
        marginHorizontal: 10
    },
    modalContentContainer:{
        borderRadius: Border.br_4xs,
        width: '90%',
        backgroundColor: Color.colorWhite,
        alignItems: 'center'
    },
    modalBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    fullWidth:{
        width: '100%'
    },
    // button styles
    cancelButton:{
        width: 150,
        height: 40,
        backgroundColor: Color.colorWhite,
        borderColor: Color.colorPaleovioletred,
        marginBottom: 10
    },
    cancelButtonText:{
        fontSize: 14,
        lineHeight: 22,
        color: Color.colorPaleovioletred
    },
})
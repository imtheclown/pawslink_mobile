// adoption form
// basic info
// asks about the basic information of the adoptor


import { 
    SafeAreaView,
    ScrollView,
    Text,
    StyleSheet,
} from "react-native";

import { Color, FontFamily, FontSize } from "../../assets/general/GlobalStyles";
import { generalStyles } from "../../assets/general/generalStyles";
import FlexibleTextInput from "../../components/admin/FlexibleTextnput";

const BasicInfoScreen = () =>{

    const handleCallback = (newValue:string|null) =>{
        console.log(newValue);
    }
    return (
        <SafeAreaView style = {[generalStyles.flexContainer, styles.mainContainer]}>
            {/* place header here */}
            <Text style = {[styles.headerTextStyle]}>
                {`verify for adoption`}
            </Text>
            <ScrollView contentContainerStyle ={[styles.contentContainer]}>
                <FlexibleTextInput
                    title="name"
                    callback={handleCallback}
                    oldValue={null}
                    style ={styles.nameTextInputStyle}
                />
                <FlexibleTextInput
                    title="last name"
                    callback={handleCallback}
                    oldValue={null}
                    style ={styles.nameTextInputStyle}
                />
                <FlexibleTextInput
                    title="age"
                    callback={handleCallback}
                    oldValue={null}
                    style ={styles.ageTextInputStyle}
                    keyBoardType="numeric"
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default BasicInfoScreen;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
        alignItems: 'center',
    },
    contentContainer:{
        width: '95%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    headerTextStyle:{
        color: Color.colorDarkslateblue,
        fontFamily: FontFamily.interBold,
        fontSize: 26,
        textTransform: 'capitalize',
    },
    nameTextInputStyle :{
        width: '100%',
    },
    ageTextInputStyle:{
        width: '45%',
    }

})
// accommodation screen of the adoption form

import { 
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import React from "react";
import { useState, useCallback } from "react";
import { Color, FontFamily } from "../../assets/general/GlobalStyles";
import { generalStyles } from "../../assets/general/generalStyles";
import FlexibleTextInput from "../../components/FlexibleTextnput";
// navigation
import { AccommodationScreenProps } from "../../navigation/AppNavigation";
import { isElement } from "lodash";
const AccommodationScreen = ({route, navigation}:AccommodationScreenProps) =>{
    const [adoptionDestination, setAdoptionDestination] = useState<string|null>(null);

    const handleAdoptionDestinationChange = useCallback((newValue: string|null) =>{
        setAdoptionDestination(newValue);
    }, [])
    return(
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <Text style = {[styles.headerTextStyle]}>{`accommodations`}</Text>
            <ScrollView contentContainerStyle ={[styles.scrollViewContainer]}>
                <View style ={[styles.contentContainer]}>
                    <FlexibleTextInput
                        title="where do you plan to keep the adopted dog/cat?"
                        oldValue={adoptionDestination}
                        callback={handleAdoptionDestinationChange}
                        style ={styles.fullWidth}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default AccommodationScreen;

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
        alignItems: 'center'
    },
    headerTextStyle:{
        color: Color.colorDarkslateblue,
        fontFamily: FontFamily.interBold,
        fontSize: 26,
        textTransform: 'capitalize',
        marginTop: 40,
        paddingBottom: 10,
    },
    fullWidth:{
        width: '100%'
    },
    contentContainer:{
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    scrollViewContainer:{
        alignItems: 'center',
        width: '95%'
    },
})
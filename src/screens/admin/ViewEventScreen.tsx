// screen that show all the created events

import { 
    SafeAreaView,
    FlatList,
    StyleSheet,
    View
} from "react-native";

import { Color } from "../../assets/general/GlobalStyles";
import { generalStyles } from "../../assets/general/generalStyles";
// import event box
import EventBox from "../../components/admin/EventBox";

const ViewEventScreen = () =>{
    return (
        <SafeAreaView style ={[styles.mainContainer,generalStyles.flexContainer]}>
            <View style ={[{width: '95%'}]}>
            <EventBox/>
            <EventBox/>
            </View>
        </SafeAreaView>
    )
}

export default ViewEventScreen

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor: Color.colorWhite,
        alignItems: 'center',
    },
})
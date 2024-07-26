// screen used to list the adoption requests

import { 
    SafeAreaView,
    Text,
    FlatList,
    View,
    StyleSheet
} from "react-native";
import { generalStyles } from "../../assets/general/generalStyles";
import AdoptionRequestBox from "../../components/admin/AdoptionRequestBox";
import { Color } from "../../assets/general/GlobalStyles";
const sampleInfo = {
    name: "soph asdf asd fsadf sd f",
    imgUrl: null,
}

const ViewAdoptionrequestListScreen = () =>{
    return (
        <SafeAreaView style = {[generalStyles.flexContainer, styles.mainContainer]}>
            <View>
                <AdoptionRequestBox
                    adopterInfo={sampleInfo}
                    animalName="doggie"
                />
            </View>
        </SafeAreaView>
    )
}

export default ViewAdoptionrequestListScreen;

const styles = StyleSheet.create({
    mainContainer:{
        alignItems: 'center',
        backgroundColor: Color.colorWhite,
    },
    contentContainer:{
        width: '95%',
    },
})
// screen that shows the list of animals specified based on their type
// provides a list of animals with preview detaisl
import { 
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    ScrollView
} from "react-native"
import { memo } from "react";
import { FontFamily, Color, FontSize } from "../../assets/general/GlobalStyles";

import { AnimalStatus } from "../../backend/realm/schemas/Animal";
import { AnimalListProps } from '../../navigation/admin/AdminNavigationStack';
import { generalStyles } from "../../assets/general/generalStyles";
import AnimalListItem from "../../components/admin/AnimalListItem";
const AnimalListScreen = ({route, navigation}: AnimalListProps) =>{
    // navigation parameter, key "type"
    const type = route.params.type;
    return (
        <SafeAreaView style ={[generalStyles.flexContainer, styles.mainContainer]}>
            <View style = {[styles.contentContainer]}>
                <Text style = {[styles.titleTextStyle]}>{type}</Text>
                <View style = {[styles.listTitleContainer, generalStyles.containerWithShadow]}>
                    <View style = {[styles.headerImages]}>
                        {/* empty here */}
                    </View>
                    <Text style = {[styles.listTitleText, styles.nameWidth]}>
                        name
                    </Text>
                    <Text style = {[styles.listTitleText, styles.statusWidth, {textAlign: 'center'}]}>
                        status
                    </Text>
                    <Text style = {[styles.listTitleText, styles.headerImages, {textAlign: 'center'}]}>
                        edit
                    </Text>
                </View>
            </View>
            {/* list of animals here */}
            {/* maybe use pagination */}
            <ScrollView>
                {/* these are test data, change this later */}
                <AnimalListItem 
                    name="ampon"
                    status={AnimalStatus.ON_CAMPUS}
                    index={0}
                />
                <AnimalListItem 
                    name="ampon"
                    status={AnimalStatus.ON_CAMPUS}
                    index={1}
                />
                <AnimalListItem 
                    name="ampon"
                    status={AnimalStatus.ON_CAMPUS}
                    index={0}
                />
                <AnimalListItem 
                    name="ampon"
                    status={AnimalStatus.ON_CAMPUS}
                    index={1}
                />
                <AnimalListItem 
                    name="ampon"
                    status={AnimalStatus.ON_CAMPUS}
                    index={0}
                />
                <AnimalListItem 
                    name="ampon"
                    status={AnimalStatus.ON_CAMPUS}
                    index={1}
                />
                <AnimalListItem 
                    name="ampon"
                    status={AnimalStatus.ON_CAMPUS}
                    index={0}
                />
                <AnimalListItem 
                    name="ampon"
                    status={AnimalStatus.ON_CAMPUS}
                    index={1}
                />
                <AnimalListItem 
                    name="ampon"
                    status={AnimalStatus.ON_CAMPUS}
                    index={0}
                />
                <AnimalListItem 
                    name="lSR"
                    status={AnimalStatus.ON_CAMPUS}
                    index={1}
                />
                <AnimalListItem 
                    name="last"
                    status={AnimalStatus.ON_CAMPUS}
                    index={0}
                />
                <AnimalListItem 
                    name="last"
                    status={AnimalStatus.ON_CAMPUS}
                    index={0}
                />
                <AnimalListItem 
                    name="last"
                    status={AnimalStatus.ON_CAMPUS}
                    index={0}
                />
                <View style ={[{height: 20}]}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default memo(AnimalListScreen);

const styles = StyleSheet.create({
    // table title width per cell
    nameWidth:{
        flex: 3
    },
    statusWidth:{
        flex: 2
    },
    headerImages:{
        width: 75
    },
    mainContainer:{
        backgroundColor:Color.colorWhite,
        alignItems: 'center',
        height: '100%',
    },
    contentContainer:{
        width: '95%'
    },
    titleTextStyle: {
        alignSelf: 'center',
        fontSize: 32,
        lineHeight: 48,
        fontFamily: FontFamily.epilogueBold,
        color: "#774a7f",
        textAlign: "left",
        fontWeight: "700",
        textTransform: 'capitalize',
    },
    listTitleContainer:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: "#FAFAFB",
        minHeight: 50,
        alignItems: 'center',
        marginBottom: 10
    },
    listTitleText:{
        lineHeight: 22,
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.epilogueRegular,
        textTransform: 'uppercase'
    },

})
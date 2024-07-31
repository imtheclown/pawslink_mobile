// screen that displays the list of events
import { 
    SafeAreaView,
    FlatList,
    View,
    StyleSheet,
} from "react-native";

import { Color } from "../../assets/general/GlobalStyles";
import EventBox from "../../components/admin/EventBox";
import { useState, useEffect } from "react";
// aws
import { DataStore } from "aws-amplify/datastore";
import { Event, LazyEvent } from "../../models";
import { generalStyles } from "../../assets/general/generalStyles";
import { getMinutes } from "react-native-paper-dates/lib/typescript/Time/timeUtils";

interface EventRendereInterface {
    item: LazyEvent,
    index: number
}
const ViewEventListScreen = () =>{
    const [eventList, setEventList] = useState<LazyEvent[]|null>(null);
    const getEvents = async() =>{
        try {
            await DataStore.query(Event)
            .then(res =>{
                setEventList(res);
                console.log(res);
            })
            .catch(err =>{
                console.log(err)
            })
        }
        catch(err){
            console.log(err)
        }
    }
    const itemRenderer = ({item, index}:EventRendereInterface) =>{
        return (
            <EventBox
                eventObject={item}
            />
        )
    }
    useEffect(() =>{
        getEvents();
    }, [])
    return (
        <SafeAreaView style ={[styles.mainContainer, generalStyles.flexContainer]}>
            <View style = {[styles.contentContainer]}>
                <FlatList
                    data={eventList === null? []: eventList}
                    renderItem = {itemRenderer}
                />
            </View>
        </SafeAreaView>
    )
}
export default ViewEventListScreen
const styles = StyleSheet.create({
    mainContainer:{
        alignContent: 'center',
        backgroundColor: Color.colorWhite,
        alignItems: 'center',
    },
    contentContainer:{
        width: '95%',
    }
})
// screen that show all the created events

import { 
    SafeAreaView,
    FlatList,
    StyleSheet,
    View,
    Text
} from "react-native";

import { Color } from "../../assets/general/GlobalStyles";
import { generalStyles } from "../../assets/general/generalStyles";
import { useState, useEffect, useCallback } from 'react';
// aws
import { DataStore } from "aws-amplify/datastore";
import { LazyEvent, Event } from "../../models";
// import event box
import EventBox from "../../components/admin/EventBox";
import EmptyListNotifier from "../../components/EmptyListNotifier";
import { ViewEventProps } from "../../navigation/admin/AdminNavigationStack";

interface CustomRendererInterface {
    item: LazyEvent,
    index: number
}
const ViewEventScreen = ({route, navigation}:ViewEventProps) =>{
    const [eventList, setEventList] = useState<LazyEvent[]|[]|null>(null);

    useEffect(()=>{
        getEventList();
    }, []);
    const getEventList = useCallback(async () =>{
        try{
            const foundEvents = await DataStore.query(Event);
            setEventList(foundEvents);
        }catch(err){
            console.log(err);
        }
    }, []);

    const itemRenderer = ({item, index}: CustomRendererInterface) =>{
        return (
            <EventBox
                key={index}
                eventObject={item}
            />
        )
    }
    return (
        <SafeAreaView style ={[styles.mainContainer,generalStyles.flexContainer]}>
            <View style ={[{width: '95%'}]}>
                <FlatList
                    data={eventList}
                    renderItem={itemRenderer}
                    ListEmptyComponent={<EmptyListNotifier listName="event"/>}
                />
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
// screen that shows the list of events
import { SafeAreaView,
    StyleSheet,
    Text,
    FlatList,
} from "react-native";

import { Color, FontSize,  } from "../assets/general/GlobalStyles";
import { generalStyles } from "../assets/general/generalStyles";
import EventListItem from '../components/EventListItem';
import { useState, useEffect } from "react";
// aws
import { DataStore } from "aws-amplify/datastore";
import { Event } from "../models";
import { LazyEvent } from "../models";
import renderer from 'react-test-renderer';

interface listItemInterface {
    item: LazyEvent,
    index: number
}

const EventListScreen = () =>{
    const [eventList, setEventList] = useState<LazyEvent[]>([]);

    useEffect(() =>{
        generateEventsList();
    }, []);
    const generateEventsList = async() =>{
        await DataStore.query(Event)
        .then(res =>{
            setEventList(res);
        })
        .catch(err =>{
            console.log(err);
        })
    }
    const itemRenderer = ({item, index}: listItemInterface) => {
        return <EventListItem eventObject={item} key={index}/>
    }
    return (
        <SafeAreaView style = {[generalStyles.flexContainer,styles.mainContainer]}>
            <Text style ={[styles.titleText, generalStyles.boldEpilogue]}>Events</Text>
            <FlatList
                data={eventList}
                renderItem = {itemRenderer}
            />
        </SafeAreaView>
    )
}

export default EventListScreen;

const styles = StyleSheet.create({
    mainContainer:{
        alignItems: 'center',
        backgroundColor: Color.colorWhite,
        padding: 20,
    },
    titleText:{
        fontSize: 24,
        lineHeight: 32,
        color: Color.colorDarkPink,
        alignSelf: 'flex-start',
        marginBottom: 10,
    } 
})


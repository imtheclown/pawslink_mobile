// navigation using bottom tabs
import { 
    StyleSheet,
 } from "react-native";
import React from "react";
import { Color } from "../../assets/general/GlobalStyles";
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// import screens here
// screen for the animal database
import AnimalDataScreen from "../../screens/admin/AnimalDatabaseScreen";
// screen for the events
import AdminEventScreen from "../../screens/admin/AdminEventScreen";
// screen for the adoption 
import AdminAdoptionScreen from "../../screens/admin/AdminAdoptionScreen";
// screen for the admin help
import AdminHelpScreen from '../../screens/admin/AdminHelpScreen';
// screen for the user help
import AdminUserHelpScreen from "../../screens/admin/AdminUserHelpScreen";
// import screens here

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import TabBarHeader from "../../components/TabBarHeader";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
// specify types here
import { RootStackParamList } from './AdminNavigationStack';
// list of parameter list and their types for the respective screen for each tab
// undefined for now
type BottomTabNavigationParamsList = {
    animal_database: undefined,
    events: undefined,
    adoption: undefined,
    user_help: undefined,
    admin_help: undefined,
}
// type used to annotate the route and navigation props for the animal database screen
// used to pass navigation and route objects, used to navigate between screens and check navigation path
export type AnimalDatabaseProps = CompositeScreenProps<BottomTabScreenProps<BottomTabNavigationParamsList, 'animal_database'>,
    StackScreenProps<RootStackParamList>
>
export type AdminEventScreenProps = CompositeScreenProps<BottomTabScreenProps<BottomTabNavigationParamsList, 'events'>,
    StackScreenProps<RootStackParamList>
>
const Tab = createBottomTabNavigator<BottomTabNavigationParamsList>()


// tab bar options
// specifying the color of active and inactive tabs
export const activeTabColor = Color.colorDarkslateblue;
export const inactiveTabColor= 'black'

// bottom tab screen options used for all screens in the navigation tab
const tabBarScreenOptions ={
    tabBarActiveTintColor: activeTabColor,
    tabBarInactiveTintColor: inactiveTabColor,
    tabBarHideOnKeyboard: true,
    header: ({ navigation, route, options}:BottomTabHeaderProps) => 
    // displays the header top of the screen that is in the bottom tabs
    <TabBarHeader 

        navigation={navigation}
    />
}

const AdminBottomNavigation = () =>{
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle:[styles.tabBarStyle],
        }}
        >
            <Tab.Screen
                name="animal_database"
                component={AnimalDataScreen}
                options={{
                    ...tabBarScreenOptions,
                    tabBarIcon: ({focused, color, size}) =>{
                        return <IonIcons name='paw-outline' color={color} size={focused? size + 10: size}/>
                    },
                    headerStyle: styles.headerStyle
                }}
            />
            <Tab.Screen
                name="events"
                component={AdminEventScreen}
                options={{
                    ...tabBarScreenOptions,
                    tabBarIcon: ({focused, color, size}) =>{
                        return <MaterialCommunityIcons name='calendar-check-outline' color={color} size={focused? size + 10: size}/>
                    },
                    headerStyle: styles.headerStyle
                }}
            />
            <Tab.Screen
                name="adoption"
                component={AdminAdoptionScreen}
                options={{
                    ...tabBarScreenOptions,
                    tabBarIcon: ({focused, color, size}) =>{
                        return <SimpleLineIcons name='home' color={color} size={focused? size + 10: size}/>
                    },
                    headerStyle: styles.headerStyle
                }}
            />
            <Tab.Screen
                name="user_help"
                component={AdminUserHelpScreen}
                options={{...tabBarScreenOptions,
                    tabBarIcon: ({focused, color, size}) =>{
                        return <MaterialIcons name='people-outline' color={color} size={focused? size + 10: size}/>
                    },
                    headerStyle: styles.headerStyle
                }}
            />
            <Tab.Screen
                name="admin_help"
                component={AdminHelpScreen}
                options={{...tabBarScreenOptions,
                    tabBarIcon: ({focused, color, size}) =>{
                        return <IonIcons name='settings-outline' color={color} size={focused? size + 10: size}/>
                    },
                    headerStyle: styles.headerStyle
                }}
            />
        </Tab.Navigator>
    )
}

export default React.memo(AdminBottomNavigation)

const styles = StyleSheet.create({
    headerStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.colorWhite
    },
    tabBarStyle:{
        height:80
    },
    tabBarPosition :{
        justifyContent: 'center'
    }
})
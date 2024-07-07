// navigation routes for the admin version of the application
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { activeTabColor, inactiveTabColor } from './BottomTabs';
import TabBarHeader from '../components/TabBarHeader';
import { Color } from '../assets/general/GlobalStyles';
import { StyleSheet } from 'react-native';
// import screens here
// animal database screeen
import AnimalDataScreen from "../screens/admin/AnimalDatabaseScreen";
// admin event screen
import AdminEventScreen from '../screens/admin/AdminEventScreen';
// admin adoptions screen
import AdminAdoptionScreen from '../screens/admin/AdminAdoptionScreen';
// admin user help screen
import AdminUserHelpScreen from '../screens/admin/AdminUserHelpScreen';
// admin help
import AdminHelpScreen from '../screens/admin/AdminHelpScreen';

// bottom tab configuration

const Tab = createBottomTabNavigator();

const tabBarScreenOptions ={
    tabBarActiveTintColor: activeTabColor,
    tabBarInactiveTintColor: inactiveTabColor,
    tabBarHideOnKeyboard: true,
    header: () => <TabBarHeader/>,
}
const AdminBottomTabNavigation = () =>{
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle:[styles.tabBarStyle]
            }}
        >
            <Tab.Screen
                name="Animal Database"
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
                name='Events'
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
                name='Adoption'
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
                name='User Help'
                component={AdminUserHelpScreen}
                options={{
                    ...tabBarScreenOptions,
                    tabBarIcon: ({focused, color, size}) =>{
                        return <MaterialIcons name='people-outline' color={color} size={focused? size + 10: size}/>
                    },
                    headerStyle: styles.headerStyle
                }}

            />
            <Tab.Screen
                name="Admin Help"
                component={AdminHelpScreen}
                options={{
                    ...tabBarScreenOptions,
                    tabBarIcon: ({focused, color, size}) =>{
                        return <IonIcons name='settings-outline' color={color} size={focused? size + 10: size}/>
                    },
                    headerStyle: styles.headerStyle
                }}
            />
        </Tab.Navigator>
    )
}

export default AdminBottomTabNavigation;

const styles = StyleSheet.create({
    headerStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.colorWhite
    },
    tabBarStyle:{
        height:80
    }
})
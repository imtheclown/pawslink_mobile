// navigation routes for the admin version of the application
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
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
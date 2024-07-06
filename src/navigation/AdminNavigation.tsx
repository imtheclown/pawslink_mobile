// navigation routes for the admin version of the application
import IonIcons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { activeTabColor, inactiveTabColor } from './BottomTabs';
import TabBarHeader from '../components/TabBarHeader';
import { Color } from '../assets/general/GlobalStyles';
import { StyleSheet } from 'react-native';
// import screens here
import AnimalDataScreen from "../screens/admin/AnimalDatabaseScreen";

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
        <Tab.Navigator>
            <Tab.Screen
                name="animal database"
                component={AnimalDataScreen}
                options={{
                    ...tabBarScreenOptions,
                    tabBarIcon: ({focused, color, size}) =>{
                        return <IonIcons name='paw-outline' color={color} size={focused? size + 10: size}/>
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
    }
})
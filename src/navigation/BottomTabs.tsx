
import {
    StyleSheet
 } from 'react-native';

import { createBottomTabNavigator, BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import IonIcons from 'react-native-vector-icons/Ionicons'
import CommunityMaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Color } from '../assets/general/GlobalStyles';
import TabBarHeader from '../components/TabBarHeader';

// tabs navigation parameter
import { RootStackParamList } from './AppNavigation';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
type BottomTabNavigationParamsList = {
    browse_animal: undefined,
    scan_qr_code: undefined,
    user_profile: undefined,
    event: undefined,
}

export type BrowseAnimalProps = CompositeScreenProps<BottomTabScreenProps<BottomTabNavigationParamsList, "browse_animal">,
    StackScreenProps<RootStackParamList>
>
export type ScanQrCodeProps = CompositeScreenProps<BottomTabScreenProps<BottomTabNavigationParamsList, "scan_qr_code">,
    StackScreenProps<RootStackParamList>
>

export type UserProfileScreenProps = CompositeScreenProps<BottomTabScreenProps< BottomTabNavigationParamsList, "user_profile">,
    StackScreenProps<RootStackParamList>
>

// create the bottom tab navigator
const Tab = createBottomTabNavigator<BottomTabNavigationParamsList>();
// determines the state of the navigation tab icon3
export const activeTabColor = Color.colorDarkslateblue;
export const inactiveTabColor= 'black'

// tab bar item configuration
// applicable to all of the tab bars
const tabBarScreenOption = {
    tabBarActiveTintColor: activeTabColor,
    tabBarInactiveTintColor: inactiveTabColor,
    // static image only
    // configure to have a dynamic header
    // hides the tab bar when the keyboard is opened
    tabBarHideOnKeyboard: true,
    header: ({ navigation, route, options}:BottomTabHeaderProps) => 
        // displays the header top of the screen that is in the bottom tabs
        <TabBarHeader 
            navigation={navigation}
    />
}


// import components here
// browse animal screen
import BrowseAnimal from '../screens/BrowseAnimalScreen';
// qr code screen
import QRCodeScanner from '../screens/QRCodeScannerScreen';
// user profile
import UserProfileScreen from '../screens/UserProfileScreen';
// add Tab.Screen here
// event list screen
import EventListScreen from '../screens/EventListScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// provide name, component and the icon for the tab bar
const BottomTabs = () =>{
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: [styles.tabBarStyle]
        }}
        >
            <Tab.Screen 
                name='browse_animal'
                component={BrowseAnimal}
                options={{
                    ...tabBarScreenOption,
                    tabBarIcon: ({focused, color, size}) =>{
                        return <IonIcons name='paw-outline' color={color} size={focused? size + 10: size}/>
                    }
                }}
            />
            <Tab.Screen
                name='event'
                component={EventListScreen}
                options={{
                    ...tabBarScreenOption,
                    tabBarIcon: ({focused, color, size}) =>{
                        return <MaterialCommunityIcons name='calendar-check-outline' color={color} size={focused? size + 10: size}/>
                    }
                }}
            />
            <Tab.Screen
                name='scan_qr_code'
                component={QRCodeScanner}
                options={{
                    ...tabBarScreenOption,
                    tabBarIcon: ({focused,color, size}) =>{
                        return <MaterialIcons name='qr-code-scanner' color={color} size={focused? size + 10: size}/>
                    }
                }}
            />
            <Tab.Screen
                name='user_profile'
                component={UserProfileScreen}
                options={{
                    ...tabBarScreenOption,
                    headerShown: false,
                    tabBarIcon: ({focused,color, size}) =>{
                        return <MaterialIcons name='person-outline' color={color} size={focused? size + 10: size}/>
                    }
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabs

const styles = StyleSheet.create({
    tabBarStyle:{
        height:80
    }
})
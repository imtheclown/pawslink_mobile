
import {
    View,
    Text,
    StyleSheet
 } from 'react-native';

import { createBottomTabNavigator, BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import IonIcons from 'react-native-vector-icons/Ionicons'
import { Color } from '../assets/general/GlobalStyles';
import TabBarHeader from '../components/TabBarHeader';
// create the bottom tab navigator
const Tab = createBottomTabNavigator();
// trial screen
import { Image } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util'
// placeholder screen
const SampleTab = () =>{
    const directory = ReactNativeBlobUtil.fs.dirs.DocumentDir
    return(
        <View>
            <Text>{`sample tab`}</Text>
            <Image
            resizeMode='cover'
            source={{uri:`file:///${directory}/trial/trial.jpeg`}}
            style = {{width: 200, aspectRatio: 1, backgroundColor: "green"}}
            />
        </View>
    )
}
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
// provide name, component and the icon for the tab bar
const BottomTabs = () =>{
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarStyle: [styles.tabBarStyle]
        }}
        >
            <Tab.Screen 
                name='Home'
                component={BrowseAnimal}
                options={{
                    ...tabBarScreenOption,
                    tabBarIcon: ({focused, color, size}) =>{
                        return <IonIcons name='paw-outline' color={color} size={focused? size + 10: size}/>
                    }
                }}
            />
            <Tab.Screen
                name='Scan QR Code'
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
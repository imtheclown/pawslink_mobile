
import {
    View,
    Text,
    StyleSheet
 } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// browse animal screen
import BrowseAnimal from '../screens/BrowseAnimalScreen';
// qr code screen
import QRCodeScanner from '../screens/QRCodeScannerScreen';
// trial screen
import AskForLoginScreen from '../screens/AskForLogInScreen';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import IonIcons from 'react-native-vector-icons/Ionicons'
import { Color } from '../assets/general/GlobalStyles';
import TabBarHeader from '../components/TabBarHeader';
const Tab = createBottomTabNavigator();

// placeholder screen
const SampleTab = () =>{
    return(
        <View>
            <Text>{`sample tab`}</Text>
        </View>
    )
}
// determines the state of the navigation tab icon
const activeTabColor = Color.colorDarkslateblue;
const inactiveTabColor= 'black'

// tab bar item configuration
// applicable to all of the tab bars
const tabBarScreenOption = {
    tabBarActiveTintColor: activeTabColor,
    tabBarInactiveTintColor: inactiveTabColor,
    // static image only
    // configure to have a dynamic header
    header:  () => <TabBarHeader/>,
    // hides the tab bar when the keyboard is opened
    tabBarHideOnKeyboard: true
}

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
                name='Events'
                component={AskForLoginScreen}
                options={{
                    ...tabBarScreenOption,
                    tabBarIcon: ({focused, color, size}) =>{
                        return <IonIcons name='calendar-outline' color={color} size={focused? size + 10: size}/>
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
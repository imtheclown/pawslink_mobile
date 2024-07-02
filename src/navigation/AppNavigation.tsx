// contains the main navigation endpoints within the project

// import components here


// naming convention for the name of the components
// firstword_secondword

import { createStackNavigator } from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";

const navStack = createStackNavigator();

const navScreenOptions = {
    headerShown: false
}
const AppNavigation = () => {
    return (
        <navStack.Navigator>
            <navStack.Screen
                name="home"
                component={BottomTabs}
                options={navScreenOptions}
            />
        </navStack.Navigator>
    )
}

export default AppNavigation;
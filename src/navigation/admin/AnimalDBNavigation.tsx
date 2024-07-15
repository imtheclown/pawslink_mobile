// navigation stack for the animal database tab
import TabBarHeader from "../../components/TabBarHeader";
import { createStackNavigator, StackHeaderProps } from "@react-navigation/stack"

// screen options
const tabScreenOptions = {
    header: ({ navigation, route, options, back }:StackHeaderProps) => 
    <TabBarHeader 
        logoPosition={{justifyContent: 'center'}}
        back = {back}
        navigation={navigation}
    />
}

// import screens here
import AnimalDataScreen from "../../screens/admin/AnimalDatabaseScreen";
import AddAnimalScreen from "../../screens/admin/AddAnimalScreen";
// type
type NavStackParamList = {
    animal_database: undefined,
    add_animal: undefined,
}
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
// create types here
export type AnimalDBScreenProps = NativeStackScreenProps<NavStackParamList, 'animal_database'>
export type AddAnimalScreenProps = NativeStackScreenProps<NavStackParamList, 'add_animal'>
const NavStack = createStackNavigator<NavStackParamList>();
const AnimalDBNavigationStack = () =>{
    return (
        <NavStack.Navigator>
            <NavStack.Screen
                name="animal_database"
                component={AnimalDataScreen}
                options={tabScreenOptions}
            />
            <NavStack.Screen
                name="add_animal"
                component={AddAnimalScreen}
                options={tabScreenOptions}
            />
        </NavStack.Navigator>
    )
}

export default AnimalDBNavigationStack
// stack navigation for the admin

// import screens here
import AdminBottomNavigation from "./AdminBottomNavigation";
import AddAnimalScreen from "../../screens/admin/AddAnimalScreen";
import AnimalListScreen from "../../screens/admin/AnimalListScreen";
import AddEventScreen from '../../screens/admin/AddEventScreen';
import AdoptionRequestForm from "../../screens/admin/AdoptionRequestFormScreen";
import ViewEventScreen from "../../screens/admin/ViewEventScreen";
import ViewAdoptionrequestListScreen from "../../screens/admin/ViewAdoptionRequestListScreen";
// import screens here

import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NavigationProp } from "@react-navigation/native";
import TabBarHeader from "../../components/TabBarHeader";

// defines the parameters and their types needed be each of the following functional components

// import interfaces classes here
import { LazyAnimal, LazyAdoptionRequest, LazyEvent } from "../../models";
export type RootStackParamList = {
    bottom_nav: undefined,
    add_animal: {
        animalObject?: LazyAnimal
    },
    // type refers to the title in the animal list screen
    // cat or dog
    animal_list: {type:string}
    add_event: {eventObject?: LazyEvent}
    view_event: undefined,
    adoption_request_list : undefined,
    adoption_form: {adoptionRequestObject?: LazyAdoptionRequest},
}
// types used to annotate the route and navigation props for each of the strings in the stack navigator
export type BottomNavProps = NativeStackScreenProps<RootStackParamList, 'bottom_nav'>
export type AddAnimalProps = NativeStackScreenProps<RootStackParamList, 'add_animal'>
export type AnimalListProps = NativeStackScreenProps<RootStackParamList, 'animal_list'>
export type AddEventProps = NativeStackScreenProps<RootStackParamList, 'add_event'>
export type ViewEventProps = NativeStackScreenProps<RootStackParamList, 'view_event'>
export type ViewAdoptionRequestList = NativeStackScreenProps<RootStackParamList, 'adoption_request_list'>


// navigation prop
export type StackNavProps = NavigationProp<RootStackParamList>
const Stack = createStackNavigator<RootStackParamList>()

// define the general options for each of the screens
const navScreenOptions = {
    // displays the header
    header: ({ navigation, route, options, back }:StackHeaderProps) => 
    // header displays a back button if a back route is available
    // back is a string, available only on the stack navigator
    <TabBarHeader 
        back = {back}
        navigation={navigation}
    />
}

const AdminStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="bottom_nav"
                component={AdminBottomNavigation}
                options={{
                    ...navScreenOptions,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="add_animal"
                component={AddAnimalScreen}
                options={{
                    ...navScreenOptions
                }}
            />
            <Stack.Screen
                name="animal_list"
                component={AnimalListScreen}
                options={{
                    ...navScreenOptions
                }}
            />
            <Stack.Screen
                name="add_event"
                component={AddEventScreen}
                options={{
                    ...navScreenOptions
                }}
            />
            <Stack.Screen
                name="view_event"
                component={ViewEventScreen}
                options={{
                    ...navScreenOptions
                }}
            />
            <Stack.Screen
                name="adoption_form"
                component = {AdoptionRequestForm}
                options={{
                    ...navScreenOptions
                }}
            />
            <Stack.Screen
                name="adoption_request_list"
                component={ViewAdoptionrequestListScreen}
                options={{
                    ...navScreenOptions
                }}
            />
        </Stack.Navigator>
    )
}

export default AdminStackNavigator;
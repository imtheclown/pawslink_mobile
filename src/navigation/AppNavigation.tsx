// stack navigation of the application
// contains the screens both in the admin and the user views

// import screens here
// admin view
import AdminBottomNavigation from "./admin/AdminBottomNavigation";
import AddAnimalScreen from "../screens/admin/AddAnimalScreen";
import AnimalListScreen from "../screens/admin/AnimalListScreen";
import AddEventScreen from '../screens/admin/AddEventScreen';
import AdoptionRequestForm from "../screens/admin/AdoptionRequestFormScreen";
import ViewEventScreen from "../screens/admin/ViewEventScreen";
import ViewAdoptionrequestListScreen from "../screens/admin/ViewAdoptionRequestListScreen";
import ViewEventListScreen from "../screens/admin/ViewEventListScreen";
// user view
import BottomTabs from "./BottomTabs";
import BasicInfoScreen from '../screens/adoption_form/BasicInfoScreen';
import PetHistoryScreen from "../screens/adoption_form/PetHistoryScreen";
// import screens here

import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NavigationProp } from "@react-navigation/native";
import TabBarHeader from "../components/TabBarHeader";

// defines the parameters and their types needed be each of the following functional components

// import interfaces classes here
import { LazyAnimal, LazyAdoptionRequest, LazyEvent } from "../models";
import ViewAnimalScreen from "../screens/ViewAnimalScreen";
export type RootStackParamList = {
    // user view
    // user view bottom navigator
    user_nav: undefined,
    view_animal: {animalId: string},
    // adoption forms
    // refers to the basic info screen
    adoption_form_1: {basicInfoObject: LazyAdoptionRequest|null},
    // refers to the pet history screen
    adoption_form_2 : undefined,
    // admin view
    // admin view bottom navigator
    admin_nav: undefined,
    add_animal: {
        animalObject?: LazyAnimal
    },
    animal_list: {type:string}
    add_event: {eventObject?: LazyEvent}
    view_event: undefined,
    adoption_request_list : undefined,
    adoption_form: {adoptionRequestObject?: LazyAdoptionRequest},
    view_event_list : undefined
}
// types used to annotate the route and navigation props for each of the strings in the stack navigator
export type BottomNavProps = NativeStackScreenProps<RootStackParamList, 'admin_nav'>
export type AddAnimalProps = NativeStackScreenProps<RootStackParamList, 'add_animal'>
export type AnimalListProps = NativeStackScreenProps<RootStackParamList, 'animal_list'>
export type AddEventProps = NativeStackScreenProps<RootStackParamList, 'add_event'>
export type ViewEventProps = NativeStackScreenProps<RootStackParamList, 'view_event'>
export type ViewAdoptionRequestList = NativeStackScreenProps<RootStackParamList, 'adoption_request_list'>
export type ViewAnimalProps = NativeStackScreenProps<RootStackParamList, "view_animal">
// user views
export type BasicInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'adoption_form_1'>
export type PetHistoryScreenProps = NativeStackScreenProps<RootStackParamList, "adoption_form_2">

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
    />,

    keyboardHandlingEnabled: false,
}

const AdminStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="user_nav"
                component={BottomTabs}
                options={{
                    ...navScreenOptions,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="admin_nav"
                component={AdminBottomNavigation}
                options={{
                    ...navScreenOptions,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="view_animal"
                component={ViewAnimalScreen}
                options={{
                    ...navScreenOptions,
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
            <Stack.Screen
                name="view_event_list"
                component={ViewEventListScreen}
                options={{
                    ...navScreenOptions
                }}
            />
            <Stack.Screen
                name="adoption_form_1"
                component={BasicInfoScreen}
                options={{
                    ...navScreenOptions,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="adoption_form_2"
                component={PetHistoryScreen}
                options={{
                    ...navScreenOptions,
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default AdminStackNavigator;
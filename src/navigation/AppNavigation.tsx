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
import ThankYouScreen from '../screens/ThankYouScreen';
// user view
import BottomTabs from "./BottomTabs";
import UserProfileScreen from "../screens/UserProfileScreen";
// adoption forms
import BasicInfoScreen from '../screens/adoption_form/BasicInfoScreen';
import PetHistoryScreen from "../screens/adoption_form/PetHistoryScreen";
import AccommodationScreen from '../screens/adoption_form/AccommodationScreen';
import OtherInfoScreen from "../screens/adoption_form/OtherInfoScreen";
import IdVerificationScreen from '../screens/adoption_form/IdVerificationScreen';
import DataPrivacyScreen from "../screens/adoption_form/DataPrivacyScreen";
// adoption forms

// authentication
import SignInScreen from "../screens/authentication/SignInScreen";
import SignUpScreen from "../screens/authentication/SignUpScreen";
// authentication
// import screens here
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { NavigationProp } from "@react-navigation/native";
import TabBarHeader from "../components/TabBarHeader";

// defines the parameters and their types needed be each of the following functional components

// import interfaces classes here
import { LazyAnimal, LazyAdoptionRequest, LazyEvent, LazyAdopterPetHistory, LazyAdopterBasicPersonalInfo, LazyPetAccommodation,
    LazyAdopterOtherInfo
 } from "../models";
import ViewAnimalScreen from "../screens/ViewAnimalScreen";
export type RootStackParamList = {
    // user view
    // user view bottom navigator
    user_nav: undefined,
    view_animal: {animalId: string},
    // adoption forms
    // refers to the basic info screen
    // adoptionRequestObject is the save adoption request in the local database --optional
    adoption_form_1: {adoptionRequestObject?: LazyAdoptionRequest},
    // refers to the pet history screen
    // adoptionRequestObject is the same object/edited object from the previous screen --use only if there is an existing object in the local database
    // basicInfoObject is the object containing data from adoption_form_1
    // used when there is no existing data from the database
    adoption_form_2 : {basicInfoObject?:LazyAdopterBasicPersonalInfo, adoptionRequestObject?: LazyAdoptionRequest},
    // refers to the accommodation screen
    // petHistoryObject --data from the adoption_form_2
    // basicInfoObject and petHistoryObject will be used if there is no adoptionRequestObject converse is true
    adoption_form_3: {basicInfoObject?: LazyAdopterBasicPersonalInfo, petHistoryObject?: LazyAdopterPetHistory, adoptionRequestObject?: LazyAdoptionRequest},
    // refers to the other info screen
    adoption_form_4: {
        basicInfoObject?: LazyAdopterBasicPersonalInfo, 
        petHistoryObject?: LazyAdopterPetHistory, 
        // object/data from the adoption form 3
        petAccommodationObject? : LazyPetAccommodation,
        adoptionRequestObject?: LazyAdoptionRequest
    },
    // refers to the id photo upload screen
    adoption_form_5: {
        basicInfoObject?: LazyAdopterBasicPersonalInfo, 
        petHistoryObject?: LazyAdopterPetHistory, 
        petAccommodationObject? : LazyPetAccommodation,
        // object/data from adoption form 4
        otherInfo?: LazyAdopterOtherInfo,
        adoptionRequestObject?: LazyAdoptionRequest
    },
    // refers to the data privacy screen props
    adoption_form_6 :{
        basicInfoObject?: LazyAdopterBasicPersonalInfo, 
        petHistoryObject?: LazyAdopterPetHistory, 
        petAccommodationObject? : LazyPetAccommodation,
        otherInfo?: LazyAdopterOtherInfo,
        idImageUrl?: string,
        adoptionRequestObject?: LazyAdoptionRequest,
    },
    thank_you_screen : {contentText:string},
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
    view_event_list : undefined,
    // authentication pages
    sign_in : undefined,
    sign_up: undefined,
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
export type AccommodationScreenProps = NativeStackScreenProps<RootStackParamList, "adoption_form_3">
export type OtherInfoScreenProps = NativeStackScreenProps<RootStackParamList, "adoption_form_4">
export type IdVerificationScreenProps = NativeStackScreenProps<RootStackParamList, "adoption_form_5">
export type DataPrivacyScreenProps = NativeStackScreenProps<RootStackParamList, "adoption_form_6">
export type ThankYouScreenProps = NativeStackScreenProps<RootStackParamList, 'thank_you_screen'>
// authentication
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, "sign_in">
export type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, "sign_up">
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
            <Stack.Screen
                name="adoption_form_3"
                component={AccommodationScreen}
                options={{
                    ...navScreenOptions,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="adoption_form_4"
                component={OtherInfoScreen}
                options={{
                    ...navScreenOptions,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="adoption_form_5"
                component={IdVerificationScreen}
                options={{
                    ...navScreenOptions,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="adoption_form_6"
                component={DataPrivacyScreen}
                options={{
                    ...navScreenOptions,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="thank_you_screen"
                component={ThankYouScreen}
                options={{
                    ...navScreenOptions,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="sign_up"
                component={SignUpScreen}
                options={{
                    ...navScreenOptions,
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="sign_in"
                component={SignInScreen}
                options={{
                    ...navScreenOptions,
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default AdminStackNavigator;
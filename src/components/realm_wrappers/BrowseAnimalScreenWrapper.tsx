// realm wrapper for the browse animal screen
// allows the component to access the realm database online or offline
// allows auto sync
import { OfflineAnimalProvider, OnlineAnimalProvider } from "../../backend/realm/contexts";
import { AppProvider, UserProvider } from "@realm/react";
import Animal from "../../backend/realm/schemas/Animal";
import { fetch } from "@react-native-community/netinfo";
import { useState, useEffect } from "react";
import { APP_ID } from "../../backend/realm/config";
import BrowseAnimal from "../../screens/BrowseAnimalScreen";
import AskForLoginScreen from "../../screens/AskForLogInScreen";
import Realm from "realm"
// the realm wrapper for the browse animal screen
const BrowseAnimalWrapper = () =>{
    // internet connection state
    const [isConnected, setIsConnected] = useState(false);
    // realm configuration
    // enables background sync by opeing the realm immediately
    // does not wait for the whole realm to be downloaded before usage
    const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
        type: Realm.OpenRealmBehaviorType.OpenImmediately,
    };

    // checks the internet connection ONCE
    // change if there is a need to check/listen to connection/disconnections
    const checkInternetConnection = () =>{
        fetch()
        .then(state =>{
            if(state.isConnected){
                setIsConnected(state.isConnected);
            }
        })
    }
    useEffect(() =>{
        checkInternetConnection();
    }, []);

    if(isConnected){
        return (
            // provide application id from mongo db
            <AppProvider id={APP_ID}>
                {/* allow user to login anonymously or with credentials */}
                <UserProvider fallback={AskForLoginScreen}>
                    {/* provide sync configuration here */}
                    <OnlineAnimalProvider                        
                        sync={{
                        flexible: true,
                        initialSubscriptions:{
                            update(subs, realm) {
                                subs.add(realm.objects(Animal));
                            }
                        },
                        newRealmFileBehavior: realmAccessBehavior,
                        existingRealmFileBehavior: realmAccessBehavior,
                        onError: (_session, error) => {
                            // maybe return a local version
                            console.log(error);
                        },
                    }}
                    >
                        <BrowseAnimal/>
                    </OnlineAnimalProvider>    
                </UserProvider>
            </AppProvider>
        )
    }else {
        return (
            <OfflineAnimalProvider>
                <BrowseAnimal/>
            </OfflineAnimalProvider>
        )
    }
    // add component here when the device is not connected to the internet
}

export default BrowseAnimalWrapper
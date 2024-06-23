// realm wrapper for the browse animal screen
// allows the component to access the realm database online or offline
// allows auto sync
import { AnimalProvider } from "../../backend/realm/contexts";
import { AppProvider, UserProvider } from "@realm/react";
import Animal from "../../backend/realm/schemas/Animal";
import NetInfo from '@react-native-community/netinfo';
import { useState, useEffect } from "react";

import BrowseAnimal from "../../screens/BrowseAnimalScreen";
const BrowseAnimalWrapper = () =>{
    const [isConnected, setIsConnected] = useState(false);

    const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
        type: Realm.OpenRealmBehaviorType.OpenImmediately,
    };

    const checkInternetConnection = NetInfo.addEventListener(state => {
        if(state.isConnected !== null){
            setIsConnected(state.isConnected)
        }
    })

    useEffect(() =>{
        checkInternetConnection();
    }, []);

    if(isConnected){
        return (
            // provide application id from mongo db
            <AppProvider id="app id here">
                {/* allow user to login anonymously or with credentials */}
                <UserProvider>
                    {/* provide sync configuration here */}
                    <AnimalProvider
                        sync={{
                            flexible: true,
                            initialSubscriptions:{
                                update(subs, realm) {
                                    subs.add(realm.objects(Animal));
                                }
                            },
                            newRealmFileBehavior: realmAccessBehavior,
                            existingRealmFileBehavior: realmAccessBehavior
                        }}
                    >
                        <BrowseAnimal/>
                    </AnimalProvider>
                </UserProvider>
            </AppProvider>
        )
    }
}

export default BrowseAnimalWrapper
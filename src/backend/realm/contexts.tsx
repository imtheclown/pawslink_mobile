// creates pre-programmed realm configuration for the application
import { createRealmContext } from "@realm/react";

// import schemas here
import Animal from "./schemas/Animal";

// create realm contexts

const AnimalContext = createRealmContext(
    {
        schema: [Animal],
        path: 'Animals.realm'
    }
)

const OfflineAnimalContext = createRealmContext({
    schema: [Animal],
    path: 'OfflineAnimal.realm'
})

const OnlineAnimalContext = createRealmContext({
    schema: [Animal],
    path: "OnlineAnimal.realm"
})

// extract hooks here
// usage of different realms in a component

// animal realm configuration for multi-realm exposure
export const{
    // realm tage
    RealmProvider: AnimalProvider,
    // method to retrieve data from the realm
    useRealm: useAnimalRealm,
    // method tp retrieve data from the realm given a primary key
    // in this case of type BSON.objectId
    useObject: useAnimalObject
} = AnimalContext

// animal in offline mode
export const {
    RealmProvider: OfflineAnimalProvider,
    useRealm: useOfflineAnimalRealm,
    useQuery: useOfflineAnimalQuery,
    useObject: useOfflineAnimalObject
} = OfflineAnimalContext;

// animal in synced mode
export const {
    RealmProvider: OnlineAnimalProvider,
    useRealm: useOnlineAnimalRealm,
    useObject: useOnlineAnimalObject,
    useQuery: useOnlineAnimalQuery
} = OnlineAnimalContext


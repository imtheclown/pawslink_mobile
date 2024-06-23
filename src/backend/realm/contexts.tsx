// creates pre-programmed realm configuration for the application
import { createRealmContext } from "@realm/react";

// import schemas here
import Animal from "./schemas/Animal";

// sync configuration can be done in the 
const AnimalContext = createRealmContext(
    {
        schema: [Animal],
        path: 'Animals.realm'
    }
)

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
// schema for the animal object
import Realm from "realm";
import { ObjectSchema } from "realm";

// custom types

// accepted values for animal status
enum AnimalStatus {
    RAINBOW_BRIDGE = "rainbow_bridge",
    OWNED = "owned",
    TRANSIENT = "transient",
    CAMPUS_DOG = "campus_dog"
}

// accepted values for animal species
enum AnimalSpecies {
    DOG ="dog",
    CAT = "cat"
}
// accepted values for animal sex
enum AnimalSex {
    MALE = "m",
    FEMALE = "f",
    UNKNOWN = "u"
}

// export the types for usage in the frontend

export {AnimalStatus, AnimalSpecies, AnimalSex}
class Animal extends Realm.Object<Animal> {
    _id!: Realm.BSON.ObjectId;
    location!: string;
    mainName!: string;
    sex!: AnimalSex;
    status!: Array<AnimalStatus>;
    coatColor!: Array<string>;
    imgUrl!: string;
    notes!: Array<string>;
    species!: AnimalSpecies;
    traitsAndPersonality!: Array<string>;
    disabilities!:Array<string>;
    age!: number;
    sterilizationDate!: Date;

    static schema: ObjectSchema = {
        name: 'Animal',
        properties: {
            _id: {
                type: 'objectId'
            },
            location: {
                type: 'list',
                objectType: 'string'
            },
            mainName:{
                type: 'string',
                indexed: 'full-text'
            },
            sex:{
                type: 'string',
                default: AnimalSex.UNKNOWN
            },
            status: {
                type: 'list',
                objectType: 'string',
                default: [AnimalStatus.TRANSIENT]
            },
            coatColor: {
                type: 'list',
                objectType: 'string',
                default: []
            },
            imgUrl:{
                type: 'string',
                default: ""
            },
            notes: {
                type: 'list',
                objectType: 'string',
                default: []
            },
            species: {
                type: 'string',
            },
            traitsAndPersonality:{
                type: 'list',
                objectType: 'string',
                default: []
            },
            disabilities: {
                type: 'list',
                objectType: 'string',
                default: []
            },
            age: {
                type: 'int',
                optional: true
            },
            sterilizationDate: {
                type: 'date',
                optional: true
            }
        },
        primaryKey: "_id"
    }

}

export default Animal

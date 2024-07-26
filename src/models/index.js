// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const AnimalStatus = {
  "RAINBOW_BRIDGE": "RAINBOW_BRIDGE",
  "OWNED": "OWNED",
  "TRANSIENT": "TRANSIENT",
  "ON_CAMPUS": "ON_CAMPUS",
  "ADOPTED": "ADOPTED"
};

const AnimalSpecies = {
  "DOG": "DOG",
  "CAT": "CAT"
};

const AnimalSex = {
  "MALE": "MALE",
  "FEMALE": "FEMALE",
  "UNKNOWN": "UNKNOWN"
};

const { Todo, Animal, AdoptionRequest, AdopterBasicPersonalInfo, AdopterPetHistory, PetAccommodation, AdopterOtherInfo } = initSchema(schema);

export {
  Todo,
  Animal,
  AdoptionRequest,
  AnimalStatus,
  AnimalSpecies,
  AnimalSex,
  AdopterBasicPersonalInfo,
  AdopterPetHistory,
  PetAccommodation,
  AdopterOtherInfo
};
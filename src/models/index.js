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

const NeuterSpayStatus = {
  "YES_FOR_BOTH": "YES_FOR_BOTH",
  "YES_FOR_NEUTER_ONLY": "YES_FOR_NEUTER_ONLY",
  "YES_FOR_SPAYING_ONLY": "YES_FOR_SPAYING_ONLY",
  "NO_FOR_BOTH": "NO_FOR_BOTH"
};

const { Todo, Animal, AdoptionRequest, Event, AdopterBasicPersonalInfo, AdopterPetHistory, PetAccommodation, AdopterOtherInfo } = initSchema(schema);

export {
  Todo,
  Animal,
  AdoptionRequest,
  Event,
  AnimalStatus,
  AnimalSpecies,
  AnimalSex,
  NeuterSpayStatus,
  AdopterBasicPersonalInfo,
  AdopterPetHistory,
  PetAccommodation,
  AdopterOtherInfo
};
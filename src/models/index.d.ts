import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum AnimalStatus {
  RAINBOW_BRIDGE = "RAINBOW_BRIDGE",
  OWNED = "OWNED",
  TRANSIENT = "TRANSIENT",
  ON_CAMPUS = "ON_CAMPUS",
  ADOPTED = "ADOPTED"
}

export enum AnimalSpecies {
  DOG = "DOG",
  CAT = "CAT"
}

export enum AnimalSex {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNKNOWN = "UNKNOWN"
}

type EagerAdopterBasicPersonalInfo = {
  readonly fname: string;
  readonly lname: string;
  readonly age: number;
  readonly isStudent: boolean;
  readonly contactNum: string;
  readonly emailAdd: string;
  readonly facebookLink: string;
  readonly cmpltHomeAdd: string;
  readonly cmpltCurrentAdd: string;
}

type LazyAdopterBasicPersonalInfo = {
  readonly fname: string;
  readonly lname: string;
  readonly age: number;
  readonly isStudent: boolean;
  readonly contactNum: string;
  readonly emailAdd: string;
  readonly facebookLink: string;
  readonly cmpltHomeAdd: string;
  readonly cmpltCurrentAdd: string;
}

export declare type AdopterBasicPersonalInfo = LazyLoading extends LazyLoadingDisabled ? EagerAdopterBasicPersonalInfo : LazyAdopterBasicPersonalInfo

export declare const AdopterBasicPersonalInfo: (new (init: ModelInit<AdopterBasicPersonalInfo>) => AdopterBasicPersonalInfo)

type EagerAdopterPetHistory = {
  readonly noOfPets: number;
  readonly yearsOfBeingPetOwner: number;
  readonly oldestPetAge: number;
  readonly strlztnAwareness: boolean;
  readonly strlztnWillingness: boolean;
  readonly regVetClinic: string;
}

type LazyAdopterPetHistory = {
  readonly noOfPets: number;
  readonly yearsOfBeingPetOwner: number;
  readonly oldestPetAge: number;
  readonly strlztnAwareness: boolean;
  readonly strlztnWillingness: boolean;
  readonly regVetClinic: string;
}

export declare type AdopterPetHistory = LazyLoading extends LazyLoadingDisabled ? EagerAdopterPetHistory : LazyAdopterPetHistory

export declare const AdopterPetHistory: (new (init: ModelInit<AdopterPetHistory>) => AdopterPetHistory)

type EagerPetAccommodation = {
  readonly adoptionDestination: string;
  readonly indoorOutdoor: string;
  readonly cagedLeashed: string;
}

type LazyPetAccommodation = {
  readonly adoptionDestination: string;
  readonly indoorOutdoor: string;
  readonly cagedLeashed: string;
}

export declare type PetAccommodation = LazyLoading extends LazyLoadingDisabled ? EagerPetAccommodation : LazyPetAccommodation

export declare const PetAccommodation: (new (init: ModelInit<PetAccommodation>) => PetAccommodation)

type EagerAdopterOtherInfo = {
  readonly basicNecesities: string[];
  readonly enrichmentAct: string;
  readonly discoverySource?: string | null;
}

type LazyAdopterOtherInfo = {
  readonly basicNecesities: string[];
  readonly enrichmentAct: string;
  readonly discoverySource?: string | null;
}

export declare type AdopterOtherInfo = LazyLoading extends LazyLoadingDisabled ? EagerAdopterOtherInfo : LazyAdopterOtherInfo

export declare const AdopterOtherInfo: (new (init: ModelInit<AdopterOtherInfo>) => AdopterOtherInfo)

type EagerTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Todo = LazyLoading extends LazyLoadingDisabled ? EagerTodo : LazyTodo

export declare const Todo: (new (init: ModelInit<Todo>) => Todo) & {
  copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

type EagerAnimal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Animal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly location: string;
  readonly mainName: string;
  readonly sex: AnimalSex | keyof typeof AnimalSex;
  readonly status: AnimalStatus[] | Array<keyof typeof AnimalStatus>;
  readonly coatColor?: string[] | null;
  readonly localImgDir?: string | null;
  readonly notes?: string[] | null;
  readonly species: AnimalSpecies | keyof typeof AnimalSpecies;
  readonly traitsAndPersonality?: string[] | null;
  readonly disabilities?: string[] | null;
  readonly age?: number | null;
  readonly sterilizationDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAnimal = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Animal, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly location: string;
  readonly mainName: string;
  readonly sex: AnimalSex | keyof typeof AnimalSex;
  readonly status: AnimalStatus[] | Array<keyof typeof AnimalStatus>;
  readonly coatColor?: string[] | null;
  readonly localImgDir?: string | null;
  readonly notes?: string[] | null;
  readonly species: AnimalSpecies | keyof typeof AnimalSpecies;
  readonly traitsAndPersonality?: string[] | null;
  readonly disabilities?: string[] | null;
  readonly age?: number | null;
  readonly sterilizationDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Animal = LazyLoading extends LazyLoadingDisabled ? EagerAnimal : LazyAnimal

export declare const Animal: (new (init: ModelInit<Animal>) => Animal) & {
  copyOf(source: Animal, mutator: (draft: MutableModel<Animal>) => MutableModel<Animal> | void): Animal;
}

type EagerAdoptionRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AdoptionRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly basicPersonalInfo: AdopterBasicPersonalInfo;
  readonly petHistory: AdopterPetHistory;
  readonly otherInfo: AdopterOtherInfo;
  readonly idImageUrl: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAdoptionRequest = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AdoptionRequest, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly basicPersonalInfo: AdopterBasicPersonalInfo;
  readonly petHistory: AdopterPetHistory;
  readonly otherInfo: AdopterOtherInfo;
  readonly idImageUrl: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type AdoptionRequest = LazyLoading extends LazyLoadingDisabled ? EagerAdoptionRequest : LazyAdoptionRequest

export declare const AdoptionRequest: (new (init: ModelInit<AdoptionRequest>) => AdoptionRequest) & {
  copyOf(source: AdoptionRequest, mutator: (draft: MutableModel<AdoptionRequest>) => MutableModel<AdoptionRequest> | void): AdoptionRequest;
}
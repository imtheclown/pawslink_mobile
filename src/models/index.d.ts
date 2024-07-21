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
// interfaces for the validation of animal object

// edit according to the schema.graphql
import { AnimalSex, AnimalStatus, AnimalSpecies } from "../models"
interface AnimalInterface{
    location: string,
    mainName: string,
    sex: AnimalSex,
    status: AnimalStatus[],
    coatColor:string[],
    localImgDir?: string,
    notes?:string[]
    species: AnimalSpecies,
    traitsAndPersonality?: string[],
    disabilities?: string[],
    age: number,
    sterilizationDate?: string
}

// exports here
// must be at the bottom of the file
export {type AnimalInterface}
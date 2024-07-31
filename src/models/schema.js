export const schema = {
    "models": {
        "Todo": {
            "name": "Todo",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Todos",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "Animal": {
            "name": "Animal",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "location": {
                    "name": "location",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "mainName": {
                    "name": "mainName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "sex": {
                    "name": "sex",
                    "isArray": false,
                    "type": {
                        "enum": "AnimalSex"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": true,
                    "type": {
                        "enum": "AnimalStatus"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "coatColor": {
                    "name": "coatColor",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "localImgDir": {
                    "name": "localImgDir",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "notes": {
                    "name": "notes",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "species": {
                    "name": "species",
                    "isArray": false,
                    "type": {
                        "enum": "AnimalSpecies"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "traitsAndPersonality": {
                    "name": "traitsAndPersonality",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "disabilities": {
                    "name": "disabilities",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "age": {
                    "name": "age",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "sterilizationDate": {
                    "name": "sterilizationDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Animals",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "AdoptionRequest": {
            "name": "AdoptionRequest",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "basicPersonalInfo": {
                    "name": "basicPersonalInfo",
                    "isArray": false,
                    "type": {
                        "nonModel": "AdopterBasicPersonalInfo"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "petHistory": {
                    "name": "petHistory",
                    "isArray": false,
                    "type": {
                        "nonModel": "AdopterPetHistory"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "otherInfo": {
                    "name": "otherInfo",
                    "isArray": false,
                    "type": {
                        "nonModel": "AdopterOtherInfo"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "idImageUrl": {
                    "name": "idImageUrl",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "AdoptionRequests",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "Event": {
            "name": "Event",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "imgURL": {
                    "name": "imgURL",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "location": {
                    "name": "location",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "eventDate": {
                    "name": "eventDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": true,
                    "attributes": []
                },
                "eventTime": {
                    "name": "eventTime",
                    "isArray": false,
                    "type": "AWSTime",
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Events",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        }
    },
    "enums": {
        "AnimalStatus": {
            "name": "AnimalStatus",
            "values": [
                "RAINBOW_BRIDGE",
                "OWNED",
                "TRANSIENT",
                "ON_CAMPUS",
                "ADOPTED"
            ]
        },
        "AnimalSpecies": {
            "name": "AnimalSpecies",
            "values": [
                "DOG",
                "CAT"
            ]
        },
        "AnimalSex": {
            "name": "AnimalSex",
            "values": [
                "MALE",
                "FEMALE",
                "UNKNOWN"
            ]
        }
    },
    "nonModels": {
        "AdopterBasicPersonalInfo": {
            "name": "AdopterBasicPersonalInfo",
            "fields": {
                "fname": {
                    "name": "fname",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "lname": {
                    "name": "lname",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "age": {
                    "name": "age",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "isStudent": {
                    "name": "isStudent",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "contactNum": {
                    "name": "contactNum",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "emailAdd": {
                    "name": "emailAdd",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "facebookLink": {
                    "name": "facebookLink",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "cmpltHomeAdd": {
                    "name": "cmpltHomeAdd",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "cmpltCurrentAdd": {
                    "name": "cmpltCurrentAdd",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "AdopterPetHistory": {
            "name": "AdopterPetHistory",
            "fields": {
                "noOfPets": {
                    "name": "noOfPets",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "yearsOfBeingPetOwner": {
                    "name": "yearsOfBeingPetOwner",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "oldestPetAge": {
                    "name": "oldestPetAge",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "strlztnAwareness": {
                    "name": "strlztnAwareness",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "strlztnWillingness": {
                    "name": "strlztnWillingness",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                },
                "regVetClinic": {
                    "name": "regVetClinic",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "PetAccommodation": {
            "name": "PetAccommodation",
            "fields": {
                "adoptionDestination": {
                    "name": "adoptionDestination",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "indoorOutdoor": {
                    "name": "indoorOutdoor",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "cagedLeashed": {
                    "name": "cagedLeashed",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "AdopterOtherInfo": {
            "name": "AdopterOtherInfo",
            "fields": {
                "basicNecesities": {
                    "name": "basicNecesities",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "enrichmentAct": {
                    "name": "enrichmentAct",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "discoverySource": {
                    "name": "discoverySource",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            }
        }
    },
    "codegenVersion": "3.4.4",
    "version": "bff528dfaf64f32522003803ae5332be"
};
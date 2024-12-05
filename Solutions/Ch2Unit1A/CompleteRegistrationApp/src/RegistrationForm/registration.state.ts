//import { Map } from "immutable"

import { Person } from "../Home/home.state"


export type RegistrationFormState=Person & {
    updateName: (name:string) => (state:RegistrationFormState) =>  RegistrationFormState
    updateLastName: (lastname:string) => (state:RegistrationFormState) =>  RegistrationFormState
    updateAge: (age:number) => (state:RegistrationFormState) =>  RegistrationFormState
}

export const initRegistrationState :RegistrationFormState={
    name: "John",
    lastname:"Doe",
    age:18,
    updateName: (name:string) => (state:RegistrationFormState): RegistrationFormState =>({
        ...state,
        name: name
    }),
    updateLastName: (lastname:string) => (state:RegistrationFormState): RegistrationFormState =>({
        ...state,
        lastname: lastname
    }),
    updateAge: (age:number) => (state:RegistrationFormState): RegistrationFormState =>({
        ...state,
        age: age
    })
}
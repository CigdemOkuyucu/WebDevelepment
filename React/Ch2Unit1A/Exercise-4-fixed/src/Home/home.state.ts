import { Map } from "immutable"
//yarn add immutable 

export interface Person{
    name:string
    lastname:string
    age:number
}

export type ViewState = 
"home" | 
"registration" |
"overview"

// Exercise 4
export interface Address {
    city: string,
    street: string,
    houseNumber: number
}

// Exercise 4
export type AddressEntry =Address & {id:number}

// Exercise 4
export type PersonEntry = 
    Person & 
    {
        id:number,
        addresses : Map<number,AddressEntry>
    }

export interface HomeState {
    //move the storage here to share between the overview and registation pages
    currentPersonId:number,
    // Exercise 4
    currentAddressId:number,
    storage :Map<number,PersonEntry>
    view :ViewState
    updateViewState:(view:ViewState)=>(state: HomeState) => HomeState
    insertPerson:(person:Person)=> (state:HomeState) => HomeState
     // Exercise 4
    insertAddress:(personId:number,address: Address)=> (state:HomeState) => HomeState
    deletePerson:(id:number)=> (state:HomeState) => HomeState
}

export const initHomeState : HomeState = {
    currentPersonId: 0,
    // Exercise 4
    currentAddressId:0,
    storage: Map(),
    view:  "home",
    updateViewState:(view:ViewState)=>(state: HomeState): HomeState => ({
        ...state, //takes the state as it is
        view:view
    }),
    insertPerson:(person:Person)=>(state:HomeState): HomeState=>({
        ...state,
        currentPersonId : state.currentPersonId +1,
        storage: state.storage.set(state.currentPersonId,{
            id:state.currentPersonId,
            name:person.name,
            lastname:person.lastname,
            age : person.age,
            // Exercise 4
            addresses : Map()
        })
    }),
     // Exercise 4
    insertAddress:(personId:number,address: Address)=> (state:HomeState): HomeState =>{
        const existingPerson = state.storage.get(personId)
        if(existingPerson) {
            const newAddress = {
                ...address,
                id:state.currentAddressId
            }
            const currentPerson = {
                ...existingPerson,
                addresses : existingPerson.addresses.set(newAddress.id,newAddress)
            }
            return {
                ...state,
                currentAddressId : state.currentAddressId +1,
                storage: state.storage.set(currentPerson.id, currentPerson)
            }
        }
        return state
    },

    deletePerson: (id: number) => (state: HomeState): HomeState => {
        const currentPerson = state.storage.get(id)
        if(currentPerson) {
            state.storage.delete(id); // Modify the cloned Map
        }
        return state
    }
}

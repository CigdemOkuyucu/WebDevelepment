//// Exercise 3

import { Address, PersonEntry } from "../Home/home.state"

export type OverviewLoader = {
    kind: "loading"
    } | {
        kind: "loaded",
        value: PersonEntry[]
    }

export type DeleteLoader = "unloaded" | "loading" | "loaded"

//implementing the state for the overview
export type Mode = "edit" | "view"
export interface OverviewState {
    mode:  Mode,
    updateMode: (mode:Mode)=>(state:OverviewState) => OverviewState
    //Exercise 4
    // updateCity : (city:string)=>(state:OverviewState) => OverviewState
    // updateStreet : (street:string)=>(state:OverviewState) => OverviewState
    // updateHouseNumber : (num:number)=>(state:OverviewState) => OverviewState
    // // city:string,
    // street:string,
    // houseNumber:number,
    editingAddresses: Map<string, Address>,
    //editingAddresses: Map<number, Address>,
    overviewLoader : OverviewLoader
    deleteLoader : DeleteLoader
    updateLoader : (overviewLoader: OverviewLoader)=>(state:OverviewState) => OverviewState
    updateDeleteLoader : (deleteLoader: DeleteLoader)=>(state:OverviewState) => OverviewState
    //updateEditingAddress : (id:number, adress: Address)=>(state:OverviewState) => OverviewState
    updateCityOfEditingAddress : (id:string, city: string)=>(state:OverviewState) => OverviewState
    //updateStreetOfEditingAddress : (id:number, street: string)=>(state:OverviewState) => OverviewState
    updateStreetOfEditingAddress : (id:string, street: string)=>(state:OverviewState) => OverviewState
    //updateHouseNumOfEditingAddress : (id:number, num: number)=>(state:OverviewState) => OverviewState
    updateHouseNumOfEditingAddress : (id:string, num: number)=>(state:OverviewState) => OverviewState
    

}

export const initOverview:OverviewState = {
    mode:"view",
    updateMode: (mode:Mode)=>(state:OverviewState):OverviewState =>({
        ...state,
        mode:mode
    }),
    overviewLoader :{kind: "loading"},
    deleteLoader : "unloaded",
    //Exercise 4
    // city:"",
    // street:"",
    // houseNumber:1,
    // updateCity : (city:string)=>(state:OverviewState): OverviewState =>({
    //     ...state,
    //     city:city
    // }),
    // updateStreet : (street:string)=>(state:OverviewState) : OverviewState =>({
    //     ...state,
    //     street:street
    // }),
    // updateHouseNumber : (num:number)=>(state:OverviewState) : OverviewState =>({
    //     ...state,
    //     houseNumber:num
    // }),

    //editingAddresses: new Map<number, Address>(),
    editingAddresses: new Map<string, Address>(),
    //updateCityOfEditingAddress : (id:number, city: string)=>(state:OverviewState) : OverviewState => {
    updateCityOfEditingAddress : (id:string, city: string)=>(state:OverviewState) : OverviewState => {
        let currEditingAddress = state.editingAddresses.get(id)
        if(currEditingAddress)
        {
            currEditingAddress.city = city
            state.editingAddresses.set(id,currEditingAddress)
            return state
        } 

        state.editingAddresses.set(id, {city: city, street:"", houseNumber:1})
        return state
    },


    updateStreetOfEditingAddress : (id:string, street: string)=>(state:OverviewState) : OverviewState => {
    //updateStreetOfEditingAddress : (id:number, street: string)=>(state:OverviewState) : OverviewState => {
        const currEditingAddresses = state.editingAddresses.get(id)
        if(currEditingAddresses)
        {
            currEditingAddresses.street = street
            state.editingAddresses.set(id,currEditingAddresses)
            return state
        }  
        state.editingAddresses.set(id, {street: street, city:"", houseNumber:1})  
        return state
    },
    updateHouseNumOfEditingAddress : (id:string, num: number)=>(state:OverviewState) : OverviewState => {
    //updateHouseNumOfEditingAddress : (id:number, num: number)=>(state:OverviewState) : OverviewState => {
        const currEditingAddresses = state.editingAddresses.get(id)
        if(currEditingAddresses)
        {
            currEditingAddresses.houseNumber = num
            state.editingAddresses.set(id,currEditingAddresses)
            return state
        }    
        state.editingAddresses.set(id, {street: "", city:"", houseNumber:num})  
        return state
    }, 
    updateLoader : (overviewLoader: OverviewLoader)=>(state:OverviewState): OverviewState => ({
        ...state,
        overviewLoader: overviewLoader
    }),
    updateDeleteLoader : (deleteLoader: DeleteLoader)=>(state:OverviewState): OverviewState => ({
        ...state,
        deleteLoader: deleteLoader
    })
}
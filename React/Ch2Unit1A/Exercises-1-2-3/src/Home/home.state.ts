export interface Person{
    name:string
    lastname:string
    age:number
}

export type ViewState = 
"home" | 
"registration" |
"overview"

export type PersonEntry = Person & {id:number}

export interface HomeState {
    //move the storage here to share between the overview and registation pages
    currentPersonId:number
    storage :Map<number,PersonEntry>
    view :ViewState
    updateViewState:(view:ViewState)=>(state: HomeState) => HomeState
    insertPerson:(person:Person)=> (state:HomeState) => HomeState
    deletePerson:(id:number)=> (state:HomeState) => HomeState
}

export const initHomeState : HomeState = {
    currentPersonId: 0,
    storage: new Map(),
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
            age : person.age
        })
    }),
    // deletePerson: (id: number) => (state: HomeState): HomeState => {
    //     const currentPerson = state.storage.get(id)
    //     let newStorage = new Map(state.storage)
    //     if(currentPerson) {
    //         newStorage.delete(id); // Modify the cloned Map
    //     }
        
    //     return {
    //         ...state, // Spread operator to keep other properties unchanged
    //         storage: newStorage, // Replace the storage with the updated one
    //     };
    // }

    deletePerson: (id: number) => (state: HomeState): HomeState => {
        const currentPerson = state.storage.get(id)
        if(currentPerson) {
            state.storage.delete(id); // Modify the cloned Map
        }
        return state
    }
}

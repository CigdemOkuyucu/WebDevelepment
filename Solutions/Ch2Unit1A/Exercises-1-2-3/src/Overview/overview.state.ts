//// Exercise 3
//implementing the state for the overview
export type Mode = "edit" | "view"
export interface OverviewState {
    mode:  Mode,
    updateMode: (mode:Mode)=>(state:OverviewState) => OverviewState
}

export const initOverview:OverviewState = {
    mode:"view",
    updateMode: (mode:Mode)=>(state:OverviewState):OverviewState =>({
        ...state,
        mode:mode
    })
}
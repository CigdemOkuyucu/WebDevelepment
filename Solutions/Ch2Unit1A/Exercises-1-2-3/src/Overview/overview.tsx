// Exercise 3
// Change the overview to support an edit mode. The overview will have a button to toggle 
// between view and edit mode. When in edit mode the overview of people has an extra X button
// to remove a people from the in-memory storage.

// Exercise 4
// Add to the overview edit mode the possibility of adding an address (with fields city, street, 
// house number) to a registered person. When in view mode, the overview shows a list of addresses 
// for each person. When in edit mode, all existing addresses can be changed with input boxes. 
// An additional button "Add" is displayed at the bottom, whcih adds a new address for that person 
// with empty values for the fields.


import React from "react"
import { initHomeState, PersonEntry } from "../Home/home.state"
import { initOverview, OverviewState } from "./overview.state"


export interface OverviewProps{
    storage: Map<number,PersonEntry>
    backToHome: () => void
    //Exercise 3
    removePerson: (id:number) => void
}

//Exercise 3
//Changing this Overview componant to a stateful component

export class Overview extends React.Component<OverviewProps,OverviewState>{
    constructor(props:OverviewProps){
        super(props)
        this.state=initOverview
    }

    render():  JSX.Element  {
        return(
            <div>
                <div> 
                    Overview of the Registration 
                </div>
                <div>
                    <button
                        onClick={ _ => 
                            this.state.mode == "view" ?
                            this.setState(this.state.updateMode("edit")):
                            this.setState(this.state.updateMode("view"))
                        }
                    >
                        {this.state.mode == "edit" ? "View the Overview" : "Edit the Overview"}
                    </button>
                </div>
                {
                    Array.from(this.props.storage.values()).map(
                        person => (
                            <div key={`${person.id}`}>
                                Id: {person.id}
                                Name: {person.name}  
                                Last Name: {person.lastname } 
                                Age: {person.age } 
                                {
                                    this.state.mode == "edit" ?
                                        <button
                                            onClick={ _=> this.props.removePerson(person.id)}
                                        >
                                            X
                                        </button>
                                        : null
                                }
                            </div>
                    ))
                }

                <div>
                    <button
                        onClick={_ => this.props.backToHome()}
                    >
                        Back
                    </button>
                </div>
            </div>
        )
    }
}

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
import { Address, initHomeState, PersonEntry } from "../Home/home.state"
import { initOverview, OverviewState } from "./overview.state"
import { Map } from "immutable"

export interface OverviewProps{
    storage: Map<number,PersonEntry>
    backToHome: () => void
    //Exercise 3
    removePerson: (id:number) => void
    //Exercise 4
    addAddress :(personId:number, address:Address ) =>void
}

//Exercise 3
//Changing this Overview componant to a stateful component

export class Overview extends React.Component<OverviewProps,OverviewState>{
    constructor(props:OverviewProps){
        super(props)
        this.state = initOverview
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
                                {
                                    // Exercise 5
                                    <div>
                                    {    
                                        Array.from(person.addresses.values()).map(
                                            adddress => (
                                                <div key = {`${adddress.id}`}>
                                                    City: {adddress.city}
                                                    Street: {adddress.street}
                                                    House Number {adddress.houseNumber}
                                                </div>
                                            )  
                                        )
                                    }
                                    </div>
                                }
                                {
                                    // Exercise 5
                                    this.state.mode == "edit" ?
                                    <div>
                                        <div>
                                            City: 
                                            <input 
                                                value = {this.state.editingAddresses.get(person.id)?.city}
                                                onChange={e => {
                                                    //this.setState(this.state.updateCity(e.currentTarget.value))
                                                    this.setState(this.state.updateCityOfEditingAddress(person.id,e.currentTarget.value))
                                                }}
                                            >
                                            </input>
                                        </div>
                                        <div>
                                            Street: 
                                            <input 
                                                //value = {this.state.street}
                                                value = {this.state.editingAddresses.get(person.id)?.street}
                                                //onChange={e => this.setState(this.state.updateStreet(e.currentTarget.value))}
                                                onChange={e => this.setState(this.state.updateStreetOfEditingAddress(person.id,e.currentTarget.value))}
                                            >
                                            </input>
                                        </div>
                                        <div>
                                            House Number: 
                                            <input 
                                                type = "number"
                                                //value = {this.state.houseNumber}
                                                value = {this.state.editingAddresses.get(person.id)?.houseNumber}
                                                onChange={e => this.setState(this.state.updateHouseNumOfEditingAddress(person.id,e.currentTarget.valueAsNumber))}
                                            >
                                            </input>
                                        </div>
                                        <button
                                            onClick={_ => 
                                                {
                                                    const address = this.state.editingAddresses.get(person.id)
                                                    if(address)
                                                    {
                                                        this.props.addAddress(person.id, address)
                                                    }
                                                
                                                }
                                            }
                                                // city: this.state.city,
                                                // street: this.state.street,
                                                // houseNumber: this.state.houseNumber)}
                                        >
                                            ADD
                                        </button>
                                    </div>
                                    :
                                    null
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

import React from "react";
import { initRegistrationState, RegistrationFormState } from "./registration.state";
import { Person } from "../Home/home.state";
import { submit } from "./registration.api";


export interface RegistrationProps{
     //We don't need this anymore since this will be done via an API call
    //insertPerson:(person:Person) =>void
    backToHome: () => void
}

//Add react component 

export class RegistrationForm extends React.Component<RegistrationProps,RegistrationFormState>{
    constructor(props: RegistrationProps){
        super(props)//base class
        //initialize the state
        this.state = initRegistrationState //invoke 
    }

    render():JSX.Element{
        return(
            <div>
                <div>
                    Name:
                    <input
                        value={this.state.name}
                        onChange={e=> this.setState(this.state.updateName(e.currentTarget.value))}
                    >
                    </input>
                </div>
                <div>
                    Last Name:
                    <input
                        value={this.state.lastname}
                        onChange={e=> this.setState(this.state.updateLastName(e.currentTarget.value))}
                        
                    >
                    </input>
                </div>
                <div>
                    Age:
                    <input
                        value={this.state.age}
                        type="number"
                        onChange={e=>this.setState(this.state.updateAge(e.currentTarget.valueAsNumber))}
                        
                    >
                    </input>
                </div>
                {/* Exercise 2 */}
                <div>
                    {
                        this.state.showConfirmationMessage? 
                        <div>
                            The user has been added
                        </div>: null //Se we don't render anything
                    }
                </div>

                <div>
                    <button
                        //Exercise 1
                        
                        // onClick={e => {
                        //     this.props.insertPerson({
                        //         name:this.state.name,
                        //         lastname:this.state.lastname,
                        //         age:this.state.age
                        //         })
                        //     //this.setState(this.state.clearFileds)
                        //     //Exercise 2
                        //     //this.setState(this.state.setConfirmationState(true))
                        //     //OR combine the two callbacks together
                        //     this.setState(this.state.clearFieldsAndShowMessage)
                        //     }
                        // }

                        //Here we disable the button
                        disabled={this.state.loaderState == "loading"}
                        onClick = { _ => {
                            //THis way setloader state and submit happens just after each other
                            this.setState(this.state.setLoaderState("loading"), () => {
                                submit({
                                    name: this.state.name,
                                    lastname: this.state.lastname,
                                    age: this.state.age
                                    })
                                    .then (_ => {this.setState(this.state.clearFieldsAndShowMessage)

                                    })
                                }) 
                            }
                        }
                    >
                        Submit
                    </button>
                    <button
                        //Exercise 2
                        onClick={_ => {
                            this.props.backToHome()
                            }
                        }
                    >
                        Back
                    </button>
                </div>
            </div>
        )
    }
}
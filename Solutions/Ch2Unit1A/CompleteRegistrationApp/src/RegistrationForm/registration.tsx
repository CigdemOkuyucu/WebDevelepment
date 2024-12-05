import React from "react";
import { initRegistrationState, RegistrationFormState } from "./registration.state";
import { Person } from "../Home/home.state";


export interface RegistrationProps{
    insertPerson:(person:Person) =>void
    backToHome: () => void
}

//Add react component 

export class RegistrationForm extends React.Component<RegistrationProps,RegistrationFormState>{
    constructor(props: RegistrationProps){
        super(props)//base class
        //initialize the state
        //this.state = {}
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
                        onChange={e=> this.setState(this.state.updateAge(e.currentTarget.valueAsNumber))}
                    >
                    </input>
                </div>
                <div>
                    <button
                        onClick={_ => this.props.insertPerson({
                            name:this.state.name,
                            lastname:this.state.lastname,
                            age:this.state.age
                        })}
                    >
                        Submit
                    </button>
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
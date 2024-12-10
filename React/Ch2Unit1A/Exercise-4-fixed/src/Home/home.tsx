import React from "react";
import { Address, HomeState, initHomeState, Person } from "./home.state";
import { RegistrationForm } from "../RegistrationForm/registration";
import { Overview } from "../Overview/overview";


export class Home extends React.Component<{},HomeState>{
    constructor(props: {}){
        //props are readonly information that is passed from a paren t component to their children
        super(props)//base class
        this.state = initHomeState 
    }

    render():JSX.Element{
        switch (this.state.view){
            case "home":
                return (
                    <div>
                    Welcome to our home page!
                        <div>
                            <button
                                onClick={_ => this.setState(this.state.updateViewState("registration"))}
                            >
                                Registration Form
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={_ => this.setState(this.state.updateViewState("overview"))}
                            >
                                Overview
                            </button>
                        </div>
                    </div>
                )

            case "registration":
                return(
                    <RegistrationForm
                        insertPerson={(person:Person) => this.setState(this.state.insertPerson(person))}
                        backToHome={() => this.setState(this.state.updateViewState("home"))}
                    />
                )
            case "overview":
                return(
                    <Overview
                        storage = {this.state.storage}
                        backToHome={() => this.setState(this.state.updateViewState("home"))}
                        // Exercise 3
                        removePerson={(id:number) =>this.setState(this.state.deletePerson(id))}
                        // Exercise 4
                        addAddress={(personId: number, address:Address) => this.setState(this.state.insertAddress(personId,address))}
                    />
                )
            
        }
        
    }
}
import React from "react"
import { PersonEntry } from "../Home/home.state"


export interface OverviewProps{
    storage: Map<number,PersonEntry>
    backToHome: () => void
}


export const Overview = (props:OverviewProps) : JSX.Element => (
    <div>
        <div> 
            Overview of the Registration 
        </div>
        {
            Array.from(props.storage.values()).map(
                person => (
                    <div key={`${person.id}`}>
                        Name: {person.name}  
                        Last Name: {person.lastname } 
                        Age: {person.age } 
                    </div>
            ))
        }

        <div>
            <button
                onClick={_ => props.backToHome()}
            >
                Back
            </button>
        </div>
    </div>
)



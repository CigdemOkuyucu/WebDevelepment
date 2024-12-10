//This file contains the API calls that the client is going to send to the server

import { Person } from "../Home/home.state"

//This function is asyncronous which is represented by promise
//Normally js doesn't support multi treading but it can be simulated, but we will have the implression 
// Promises take a generic type.
export const submit = (person: Person): Promise<void> =>
    //we use the fetch method to make an API call.
    // first parameter is the route
    // second parameter is an object having a method, body and headers
    fetch("api/storage", {
      method: "POST",
      body: JSON.stringify(person),//We have to sringify(serialize) the json to store it
      headers: {
        "content-type": "application/json"
      }
    })
    //the result of the promise will be passed to _ 
    .then(_ => undefined)
  

    //This is the alternative syntax where we can use async and await
    export const submit2 = async (person: Person): Promise<void> => {
      await fetch("api/storage", {
        method: "POST",
        body: JSON.stringify(person),
        headers: {
          "content-type": "application/json"
        }
      })
    }
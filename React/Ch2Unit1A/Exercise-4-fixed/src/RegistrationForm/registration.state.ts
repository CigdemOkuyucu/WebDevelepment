
// Exercise 1 
//Change the registration form component to reset the input boxes to their 
// default value as soon as the submit button is pressed.

// Exercise 2
// Change the registration form component to show a message when a new person is submitted.
// The text is cleared whenever the user goes back to the homepage or he starts typing in 
// any of the input boxes.




import { Person } from "../Home/home.state"


export type RegistrationFormState=Person & {
    updateName: (name:string) => (state:RegistrationFormState) =>  RegistrationFormState
    updateLastName: (lastname:string) => (state:RegistrationFormState) =>  RegistrationFormState
    updateAge: (age:number) => (state:RegistrationFormState) =>  RegistrationFormState
    //Exercise 1
    //clearFileds: (state:RegistrationFormState) => RegistrationFormState

    // Exercise 2
    showConfirmationMessage : boolean
    //setConfirmationState:(show:boolean)=> (state:RegistrationFormState) => RegistrationFormState
    //OR
    clearFieldsAndShowMessage: (state:RegistrationFormState) => RegistrationFormState
}

export const initRegistrationState :RegistrationFormState={
    name: "John",
    lastname:"Doe",
    age:18,
    // Exercise 2
    showConfirmationMessage:false,
    updateName: (name:string) => (state:RegistrationFormState): RegistrationFormState =>({
        ...state,
        name: name,
        // Exercise 2
        showConfirmationMessage:false
    }),
    updateLastName: (lastname:string) => (state:RegistrationFormState): RegistrationFormState =>({
        ...state,
        lastname: lastname,
        // Exercise 2
        showConfirmationMessage:false
    }),
    updateAge: (age:number) => (state:RegistrationFormState): RegistrationFormState =>({
        ...state,
        age: age,
        // Exercise 2
        showConfirmationMessage:false
    }),
    //Exercise 1
    // clearFileds: (state:RegistrationFormState) :RegistrationFormState =>({
    //     ...state,
    //     name:"",
    //     lastname:"",
    //     age:0
    // }),
    // OR
    //clearFileds: (state:RegistrationFormState) :RegistrationFormState =>initRegistrationState

    //Exercise 2
    // setConfirmationState:(show:boolean)=> (state:RegistrationFormState): RegistrationFormState =>({
    //     ...state,
    //     showConfirmationMessage:show
    // })
    // OR
    clearFieldsAndShowMessage: (state:RegistrationFormState) :RegistrationFormState =>({
        ...state,
        name:"",
        lastname:"",
        age:0,
        showConfirmationMessage:true
    })

}
import { PersonEntry } from "../Home/home.state";

export const loadPeople = (): Promise<PersonEntry[]> =>
  fetch("api/storage/all", {
    method: "GET"
  })
  .then(response => response.json())
  .then(content => content as PersonEntry[])

// export const deletePerson = async (id: string): Promise<void> => {
//   await fetch(`api/storage?id=${id}`, {
//     method: "DELETE"
//   })
// }

export const deletePerson = (id: string): Promise<void> =>
    fetch(`api/storage?id=${id}`, {
        method: "DELETE"
        })
    .then(_ =>undefined)
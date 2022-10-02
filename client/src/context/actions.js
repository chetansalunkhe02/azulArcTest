import axios from "axios"

const getEmployeeList = () => {
  return axios.get('http://localhost:4001/employee/list')
    .then((response) => {
      console.log("Response", response.data.data)
      return response.data.data
    }).catch((error) => {
      console.log("error", error)
    })
}

export { getEmployeeList }
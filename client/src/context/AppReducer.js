// import { getEmployeeList } from "./actions";

export default function appReducer(state, action) {
  switch (action.type) {
    case "LIST_EMPLOYEE":
      return {
        ...state,
        employees: action.payload,
      };

    case "ADD_EMPLOYEE":
      let employeesAdded = [...state.employees, action.payload]
      return {
        ...state,
        employees: employeesAdded,
      };

    case "EDIT_EMPLOYEE":
      const updatedEmployee = action.payload;
      const updatedEmployees = state.employees.map((employee) => {
        if (employee.id === updatedEmployee.id) {
          return updatedEmployee;
        }
        return employee;
      });

      return {
        ...state,
        employees: updatedEmployees,
      };

    case "REMOVE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
      };

    default:
      return state;
  }
};
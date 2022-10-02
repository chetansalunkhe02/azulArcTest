import React, { createContext, useReducer } from 'react';
import appReducer from './AppReducer';

const initialState = {
  employees: [
    {
      id: 1,
      name: "Sammy",
      location: "DigitalOcean",
      designation: "Shark"
    }
  ]
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  function listEmployee(employeesData) {
    dispatch({
      type: "LIST_EMPLOYEE",
      payload: employeesData
    });
  }

  function addEmployee(employee) {
    dispatch({
      type: "ADD_EMPLOYEE",
      payload: employee
    });
  }

  function editEmployee(employee) {
    dispatch({
      type: "EDIT_EMPLOYEE",
      payload: employee
    });
  }

  function removeEmployee(id) {
    dispatch({
      type: "REMOVE_EMPLOYEE",
      payload: id
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        employees: state.employees,
        listEmployee,
        addEmployee,
        editEmployee,
        removeEmployee
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
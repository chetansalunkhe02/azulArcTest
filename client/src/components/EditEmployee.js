import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from "axios"
import { GlobalContext } from '../context/GlobalState';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

const EmployeeSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  age: Yup.number().typeError("Please enter number only"),
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
});

export const EditEmployee = (route) => {
  let navigate = useNavigate();
  let { id } = useParams();
  const { employees, editEmployee } = useContext(GlobalContext);
  const [selectedUser, setSelectedUser] = useState({
    // id: id,
    // name: '',
    // age: '',
    // email: '',
    // address: '',
    // photo: '',
    // dateOfBirth: ''
  });

  const currentUserId = id
  useEffect(() => {
    const employeeId = currentUserId;
    const selectedUser = employees.find(
      (currentEmployeeTraversal) => currentEmployeeTraversal.id === parseInt(employeeId)
    );
    setSelectedUser({ ...selectedUser, dateOfBirth: new Date(selectedUser.dateOfBirth) });
  }, [currentUserId, employees]);

  const onSubmit = (values) => {
    console.log("values", values)
    axios.put('http://localhost:4001/employee', values)
      .then((response) => {
        editEmployee(response.data.data);
        navigate("/");
      }).catch((error) => {
        console.log("error", error)
      })
  };

  const onChangeDateOfBirth = (date) => {
    console.log("date", date)
    setSelectedUser({ ...selectedUser, dateOfBirth: date })
  }

  const onFileChange = async (event) => {
    if (event) {
      let file = event.target.files[0]
      let fileSize = event.target.files[0].size / 1024 / 1024;
      // if (fileSize > 1) { // in mb
      //   setInputError(['photo'], 'Image/File must be smaller than 1MB')
      // } else {
      //   let base64 = convertBase64(file)
      //   setNewEmployee({ ...newEmployee, photo: base64 })
      // }
      let base64 = await convertBase64(file)
      setSelectedUser({ ...selectedUser, photo: base64 })
    }
  }

  let convertBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleOnChange = (userKey, newValue) =>
    setSelectedUser({ ...selectedUser, [userKey]: newValue });

  if (!selectedUser || !selectedUser.id) {
    return <div>Invalid Employee ID.</div>;
  }

  return (
    <React.Fragment>
      <div className="w-full max-w-sm container mt-20 mx-auto">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Formik
                initialValues={selectedUser}
                validationSchema={EmployeeSchema}
                onSubmit={onSubmit}
              >
                {({ touched, errors, isSubmitting, values }) =>
                  <div>
                    <div className="row mb-5">
                      <div className="col-lg-12 text-center">
                        <h1 className="mt-5">Edit Employee</h1>
                      </div>
                    </div>
                    <Form>
                      <div className="form-group mb-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">Email</label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          // autocomplete="off"
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600 
                            ${touched.email && errors.email ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage
                          component="div"
                          name="email"
                          className="invalid-feedback text-red-500"
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">Name</label>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Enter name"
                          // autoComplete="off"
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600 
                            ${touched.name && errors.name ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage
                          component="div"
                          name="name"
                          className="invalid-feedback text-red-500"
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">Age</label>
                        <Field
                          type="text"
                          name="age"
                          placeholder="Enter age"
                          // autoComplete="off"
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600 
                            ${touched.age && errors.age ? "is-invalid" : ""}`}
                        />
                        <ErrorMessage
                          component="div"
                          name="age"
                          className="invalid-feedback text-red-500"
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">Address</label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Enter addr"
                          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600`}
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">Date of birth</label>
                        <DatePicker
                          selected={selectedUser.dateOfBirth}
                          onChange={onChangeDateOfBirth}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                        />
                      </div>
                      <div className="form-group mb-2">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">Photo</label>
                        <input
                          className={`mb-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600`}
                          name={'photo'}
                          type="file"
                          accept='.png, .jpg, .jpeg, .pdf'
                          onChange={onFileChange}
                        />
                        <img src={selectedUser.photo} />
                      </div>
                      <button
                        type="submit"
                        className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Submit
                      </button>
                    </Form>
                  </div>
                }
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
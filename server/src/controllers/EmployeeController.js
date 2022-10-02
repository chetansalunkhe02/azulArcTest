import model from '../models'
import { sendSuccessResponse, sendErrorResponse } from '../helper/sendResponse';
const { Employee } = model;

export default {
  async create(req, res) {
    try {
      let { name, age, email, dateOfBirth, address, photo } = req.body
      let employee = await Employee.create({ name, age, email, dateOfBirth, address, photo })
      return sendSuccessResponse(res, 201, employee, 'employee added successfully.')
    } catch (error) {
      let messages = {}
      let code = null
      if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        error.errors.forEach(e => {
          messages[e.path] = e.message
        });
        code = 403
        return sendErrorResponse(res, code, messages)
      } else if (error.name === 'SequelizeDatabaseError') {
        return sendErrorResponse(res, 500, error.message)
      } else {
        return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
      }
    }
  },
  async get(req, res) {
    console.log("inside get")

    try {
      let { id } = req.params
      let employee = await Employee.findByPk(id)
      if (employee) {
        return sendSuccessResponse(res, 201, employee, 'Employee details fetched successfully.')
      } else {
        return sendErrorResponse(res, 201, 'employee not found')
      }
    } catch (error) {
      console.log(error)
      return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
    }
  },
  async list(req, res) {
    try {
      console.log("inside list")
      let employees = await Employee.findAll()
      if (employees) {
        return sendSuccessResponse(res, 201, employees, 'Employees fetched successfully.')
      } else {
        return sendErrorResponse(res, 201, 'employees not found')
      }
    } catch (error) {
      console.log(error)
      return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
    }
  },
  async update(req, res) {
    try {
      let { id, name, age, email, dateOfBirth, address, photo } = req.body
      let employee = await Employee.findOne({ where: { id } })
      if (employee) {
        let employeeUpdated = await employee.update({ name, age, email, dateOfBirth, address, photo })
        return sendSuccessResponse(res, 201, employeeUpdated, 'Employee details updated successfully.')
      } else {
        return sendErrorResponse(res, 201, 'employee not found')
      }
    } catch (error) {
      let messages = {}
      let code = null
      if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError") {
        error.errors.forEach(e => {
          messages[e.path] = e.message
        });
        code = 403
        return sendErrorResponse(res, code, messages)
      } else if (error.name === 'SequelizeDatabaseError') {
        return sendErrorResponse(res, 500, error.message)
      } else {
        return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
      }
    }
  },
  async delete(req, res) {
    try {
      let { id } = req.params;
      let employee = await Employee.destroy({ where: { id: id } })
      if (employee) {
        return sendSuccessResponse(res, 201, "", "deleted")
      } else {
        return sendErrorResponse(res, 201, 'employee not found')
      }
    } catch (error) {
      console.log(error)
      return sendErrorResponse(res, 500, 'Could not perform operation at this time, kindly try again later.')
    }
  }
}
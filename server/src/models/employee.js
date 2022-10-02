'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


    }
  }

  Employee.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: 'Please enter your email address',
        },
        // unique: {
        //   args: true,
        //   msg: 'Email already exists',
        // },
        validate: {
          isEmail: {
            args: true,
            msg: 'Please enter a valid email address',
          },
        },
      },
      age: DataTypes.STRING,
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        // validate: {
        //   customValidator(value) {
        //     if (new Date(value) < new Date()) {
        //       throw new Error("invalid date");
        //     }
        //   },
        // },
      },
      address: DataTypes.TEXT,
      photo: DataTypes.TEXT
    },
    {
      sequelize,
      paranoid: true,
      deletedAt: 'destroyTime'
    },
    {
      sequelize,
      modelName: 'Employee',
    });

  Employee.associate = ((models) => { })
  // Employee.sync({ force: true })
  //   .then((response) => {
  //     console.log("response", response)
  //   }).catch((error) => {
  //     console.log("error", error)
  //   })
  return Employee;
};
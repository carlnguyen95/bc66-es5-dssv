import { Employee } from "./Employee.js";
import {
  InvalidDuplicateError,
  ErrorTypes,
  ErrorMessages,
} from "./InvalidInfoErrors.js";

export var EmployeeManagement = (function () {
  function EmployeeManagement(name = "EmployeeManagement") {
    this._name = name;
    this.isDuplicate = function (info, onlyMail = false) {
      var isDuplicate = false;
      this._EmployeeList.forEach((employee) => {
        if (!onlyMail) {
          if (employee.account === info.account) {
            this._Errors.push(
              new InvalidDuplicateError(
                ErrorTypes.ACCOUNT,
                ErrorMessages.DuplicateAcccount,
              ),
            );
            isDuplicate = true;
            return;
          }
        }
        //Check if there is an account registered with this mail
        if (employee.mail === info.mail && employee.account !== info.account) {
          this._Errors.push(
            new InvalidDuplicateError(
              ErrorTypes.MAIL,
              ErrorMessages.DuplicateMail,
            ),
          );
          isDuplicate = true;
          return;
        }
      });
      return isDuplicate;
    };
    this.saveLocal = function () {
      const EmployeesJson = JSON.stringify(
        this._EmployeeList.map((employee) => {
          return employee.info;
        }),
      );
      localStorage.setItem("DSNV", EmployeesJson);
    };
    this.getDataLocal = function () {
      const data = localStorage.getItem("DSNV");
      let EmployeesJson = data !== null ? JSON.parse(data) : [];
      this._EmployeeList = EmployeesJson.map((employeeInfo) => {
        return new Employee(employeeInfo);
      });
    };
    /**
     * Validate and add employee to the list, return the status
     */
    this.validateAddEmployee = function (info) {
      this._Errors = [];
      const newEmployee = new Employee(info); //validate form and throw errors here
      if (this.isDuplicate(info) || !newEmployee.isValid()) {
        this._Errors.push(...newEmployee.ErrorsList);
        return false;
      }
      this._EmployeeList.push(newEmployee);
      this.saveLocal();
      return true;
    };
    /**
     * Update employee if valid, return status
     */
    this.updateEmployeeByIndex = function (index, info) {
      this._Errors = [];
      if (!this._EmployeeList.hasOwnProperty(index)) {
        console.error(`EmployeeList doesn't have the index ${index}`);
        return false;
      }
      let updateEmployee = new Employee(info);
      if (!updateEmployee.isValid() || this.isDuplicate(info, true)) {
        this._Errors.push(...updateEmployee.ErrorsList);
        return false;
      }
      this._EmployeeList[index] = updateEmployee;
      return true;
    };
    /**
     * Update employee if valid, return status
     */
    this.updateEmployee = function (info) {
      this._Errors = [];
      const index = this.searchIndexOfEmployees("account", info.account);
      const updateEmployee = new Employee(info);
      //If invalid info or duplicate info
      if (!updateEmployee.isValid() || this.isDuplicate(info, true)) {
        this._Errors.push(...updateEmployee.ErrorsList);
        return false;
      }
      this._EmployeeList[index] = updateEmployee;
      this.saveLocal();
      return true;
    };
    this.removeEmployee = function (account) {
      const index = this.searchIndexOfEmployees("account", account);

      if (index.length === 1) {
        this._EmployeeList.splice(index, 1);
        this.saveLocal();
      } else {
        throw new Error(
          `Can't find the employee with account number ${account}`,
        );
      }
    };
    this.searchIndexOfEmployees = function (type, searchKey) {
      let indexArr = [];
      for (let i in this._EmployeeList) {
        const info = this._EmployeeList[i].info;
        if (!info.hasOwnProperty(type))
          throw new Error(`"${type}" is an invalid search type`);
        if (type === "position") {
          if (info[type].title === searchKey) {
            indexArr.push(i);
          }
        } else {
          if (info[type] === searchKey) {
            indexArr.push(i);
          }
        }
      }

      //Double-check if there is duplicate mail/account
      if (type === "account" || type === "mail") {
        if (indexArr.length > 1)
          throw new Error(
            `There are ${indexArr.length} with same ${type} in EmployeeList`,
          );
      }

      return indexArr;
    };
    this.partialSearchIndexOfEmployees = function (type, searchKey) {
      let indexArr = [];
      for (let i in this._EmployeeList) {
        const info = this._EmployeeList[i].info;
        if (!info.hasOwnProperty(type))
          throw new Error(`"${type}" is an invalid search type`);
        if (type === "position") {
          if (info[type].title.search(searchKey) != -1) {
            indexArr.push(i);
          }
        } else {
          if (info[type].search(searchKey) != -1) {
            indexArr.push(i);
          }
        }
      }

      return indexArr;
    };
    this.searchInfoEmployee = function (type, searchKey) {
      let info = {};
      const indexArr = this.searchIndexOfEmployees(type, searchKey);
      indexArr.forEach((index) => {
        info[index] = this._EmployeeList[index];
      });

      /**
       * Don't have to check duplicate for account or array since searchIndexOfEmployee did it
       */
      return info;
    };
    this.partialSearchInfoEmployee = function (type, searchKey) {
      let info = [];

      const indexArr = this.partialSearchIndexOfEmployees(type, searchKey);
      indexArr.forEach((index) => {
        info.push(this._EmployeeList[index]);
      });

      return info;
    };
  }

  Object.defineProperty(EmployeeManagement.prototype, "EmployeeList", {
    get: function () {
      return this._EmployeeList;
    },
  });

  Object.defineProperty(EmployeeManagement.prototype, "Errors", {
    get: function () {
      return this._Errors;
    },
  });

  return EmployeeManagement;
})();

import {
  InvalidFormatError,
  ErrorTypes,
  ErrorMessages,
} from "./InvalidInfoErrors.js";

const EMPLOYEE_CLASSES = {
  OUTSTANDING: "Xuất sắc",
  VERYGOOD: "Rất tốt",
  GOOD: "Tốt",
  AVERAGE: "Khá",
};

const POSITION = {
  MANAGER: {
    value: 3,
    title: "Sếp",
  },
  HEAD_DEPT: {
    value: 2,
    title: "Trưởng phòng",
  },
  STAFF: {
    value: 1,
    title: "Nhân viên",
  },
};

export var Employee = (function () {
  function Employee(info) {
    this._Errors = [];
    this.account = info.account;
    this.name = info.name;
    this.mail = info.mail;
    this.password = info.password;
    this.startDay = info.startDay;
    this.salary = info.salary;
    this.position = info.position;
    this.workingHour = info.workingHour;
    this.isValid = function () {
      return this.ErrorsList.length === 0;
    };
  }

  Object.defineProperty(Employee.prototype, "info", {
    get: function () {
      const info = {
        account: this.account,
        name: this.name,
        mail: this.mail,
        password: this.password,
        startDay: this.startDay,
        salary: this.salary,
        position: this.position,
        workingHour: this.workingHour,
        totalSalary: this.totalSalary,
        class: this.class,
      };
      return info;
    },
  });

  /** Properties **/
  Object.defineProperty(Employee.prototype, "ErrorsList", {
    get: function () {
      return this._Errors;
    },
  });

  Object.defineProperty(Employee.prototype, "account", {
    get: function () {
      return this._account;
    },
    set: function (val) {
      try {
        if (isBlank(val))
          throw new InvalidFormatError(ErrorTypes.ACCOUNT, ErrorMessages.Blank);
        if (!isNumberOnly(val))
          throw new InvalidFormatError(
            ErrorTypes.ACCOUNT,
            ErrorMessages.NotNumber,
          );
        if (isLengthNotInRange(val, 4, 6))
          throw new InvalidFormatError(
            ErrorTypes.ACCOUNT,
            ErrorMessages.LengthNotInRange(4, 6),
          );
        this._account = val;
      } catch (error) {
        this._Errors.push(error);
      }
    },
  });

  Object.defineProperty(Employee.prototype, "name", {
    get: function () {
      return this._name;
    },
    set: function (val) {
      try {
        if (isBlank(val))
          throw new InvalidFormatError(ErrorTypes.NAME, ErrorMessages.Blank);
        if (!isLetterOnly(val))
          throw new InvalidFormatError(
            ErrorTypes.NAME,
            ErrorMessages.WrongFormat + ErrorMessages.InvalidName,
          );
        this._name = val;
      } catch (error) {
        this._Errors.push(error);
      }
    },
  });

  Object.defineProperty(Employee.prototype, "mail", {
    get: function () {
      return this._mail;
    },
    set: function (val) {
      try {
        if (isBlank(val))
          throw new InvalidFormatError(ErrorTypes.MAIL, ErrorMessages.Blank);
        if (
          !String(val).match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
        )
          throw new InvalidFormatError(
            ErrorTypes.MAIL,
            ErrorMessages.WrongFormat,
          );
        this._mail = val;
      } catch (error) {
        this._Errors.push(error);
      }
    },
  });

  Object.defineProperty(Employee.prototype, "password", {
    get: function () {
      return this._password;
    },
    set: function (val) {
      try {
        if (isBlank(val))
          throw new InvalidFormatError(ErrorTypes.PASS, ErrorMessages.Blank);
        if (isLengthNotInRange(val, 6, 10))
          throw new InvalidFormatError(
            ErrorTypes.PASS,
            ErrorMessages.LengthNotInRange(6, 10),
          );
        if (
          !String(val).match(/[A-Z]/) ||
          !String(val).match(/[^a-zA-Z0-9]/) ||
          !String(val).match(/[0-9]/)
        )
          throw new InvalidFormatError(
            ErrorTypes.PASS,
            ErrorMessages.WrongFormat + ErrorMessages.InvalidPass,
          );
        this._password = val;
      } catch (error) {
        this._Errors.push(error);
      }
    },
  });

  Object.defineProperty(Employee.prototype, "startDay", {
    get: function () {
      return this._startDay;
    },
    set: function (val) {
      try {
        if (isBlank(val))
          throw new InvalidFormatError(
            ErrorTypes.STARTDAY,
            ErrorMessages.Blank,
          );
        if (!isStartDayValid(val))
          throw new InvalidFormatError(
            ErrorTypes.STARTDAY,
            ErrorMessages.WrongFormat + ErrorMessages.InvalidStartDay,
          );
        this._startDay = val;
      } catch (error) {
        this._Errors.push(error);
      }
    },
  });

  Object.defineProperty(Employee.prototype, "position", {
    get: function () {
      return this._position;
    },
    set: function (val) {
      try {
        if (!isPositionValid(val))
          throw new InvalidFormatError(
            ErrorTypes.POSITION,
            ErrorMessages.InvalidPosition,
          );
        this._position = val;
      } catch (error) {
        this._Errors.push(error);
      }
    },
  });

  Object.defineProperty(Employee.prototype, "salary", {
    get: function () {
      return this._salary;
    },
    set: function (val) {
      try {
        if (isBlank(val))
          throw new InvalidFormatError(ErrorTypes.SALARY, ErrorMessages.Blank);
        if (!isNumberOnly(val))
          throw new InvalidFormatError(
            ErrorTypes.SALARY,
            ErrorMessages.NotNumber,
          );
        if (isValueNotInRange(val, 1000000, 20000000))
          throw new InvalidFormatError(
            ErrorTypes.SALARY,
            ErrorMessages.ValueNotInRange,
          );
        this._salary = val;
      } catch (error) {
        this._Errors.push(error);
      }
    },
  });

  Object.defineProperty(Employee.prototype, "workingHour", {
    get: function () {
      return this._workingHour;
    },
    set: function (val) {
      try {
        if (isBlank(val))
          throw new InvalidFormatError(ErrorTypes.WH, ErrorMessages.Blank);
        if (!isNumberOnly(val))
          throw new InvalidFormatError(ErrorTypes.WH, ErrorMessages.NotNumber);
        if (isValueNotInRange(val, 80, 200))
          throw new InvalidFormatError(
            ErrorTypes.WH,
            ErrorMessages.ValueNotInRange(80, 200),
          );
        this._workingHour = val;
      } catch (error) {
        this._Errors.push(error);
      }
    },
  });

  Object.defineProperty(Employee.prototype, "totalSalary", {
    get: function () {
      return this.salary * this.position.value;
    },
  });

  Object.defineProperty(Employee.prototype, "class", {
    get: function () {
      const time = parseFloat(this.workingHour);
      if (time < 160) return EMPLOYEE_CLASSES.AVERAGE;
      else if (time < 176) return EMPLOYEE_CLASSES.GOOD;
      else if (time < 192) return EMPLOYEE_CLASSES.VERYGOOD;
      else return EMPLOYEE_CLASSES.OUTSTANDING;
    },
  });

  /** End Properties **/

  function isBlank(val) {
    return String(val).match(/(^$|^\s*$)/);
  }

  function isLengthNotInRange(val, min, max) {
    return String(val).length < min || String(val).length > max;
  }

  function isValueNotInRange(val, min, max) {
    return Number(val) < min || Number(val) > max;
  }

  function isNumberOnly(val) {
    return !String(val).match(/[^0-9]/);
  }

  function isLetterOnly(val) {
    return !String(val).match(/[^a-zA-Z\s]/);
  }

  function isStartDayValid(startDay) {
    //Check format
    const day = new Date(`${startDay}`);
    if (day.toString() === "Invalid Date") return false;

    //The set day can't be in the future
    if (Date.now() - day.getTime() < 0) return false;

    return true;
  }

  function isPositionValid(position) {
    for (let i in POSITION) {
      if (Number(position.value) === POSITION[i].value) {
        return true;
      }
    }

    return false;
  }

  return Employee;
})();

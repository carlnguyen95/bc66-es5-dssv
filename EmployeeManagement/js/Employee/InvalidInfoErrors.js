export function InvalidFormatError(name, message) {
  this.name = name;
  this.message = message;
}

InvalidFormatError.prototype = Error.prototype;

export function InvalidDuplicateError(name, message) {
  this.name = name;
  this.message = message;
}

InvalidDuplicateError.prototype = Error.prototype;

export const ErrorTypes = {
  ACCOUNT: "InvalidAccountError",
  NAME: "InvalidNameError",
  MAIL: "InvalidMailError",
  PASS: "InvalidPasswordError",
  STARTDAY: "InvalidStartDayError",
  POSITION: "InvalidPositionError",
  SALARY: "InvalidSalaryError",
  WH: "InvalidWorkingHourError",
};

export const ErrorMessages = {
  Blank: "Vùng này không được để trống",
  LengthNotInRange: function (min, max) {
    return `Vùng này phải nhập ${min} - ${max} từ`;
  },
  ValueNotInRange: function (min, max) {
    return `Vùng này chỉ có giá trị từ ${min} - ${max}`;
  },
  NotNumber: "Vùng này cần nhập vào số",
  WrongFormat: "Không đúng định dạng. ",
  InvalidPass:
    "Password phải chứa ít nhất một chữ viết hoa, một số, một ký hiệu",
  InvalidName: "Tên chỉ chứa chữ",
  InvalidStartDay: "Vui lòng theo định dạng mm/dd/yyyy",
  InvalidPosition: "Vui lòng chọn chức vụ",
  DuplicateAcccount: "Tài khoản này đã tồn tại, vui lòng chọn stk khác",
  DuplicateMail: "Email này đã tồn tại, vui lòng dùng email khác",
};

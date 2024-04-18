var SinhVien = (function () {
  function SinhVien(svInfo) {
    this._errors = [];
    this.ma = svInfo._ma;
    this.ten = svInfo._ten;
    this.email = svInfo._email;
    this.matKhau = svInfo._matKhau;
    this.toan = svInfo._toan;
    this.ly = svInfo._ly;
    this.hoa = svInfo._hoa;
    this.tinhDTB = function () {
      return (this.toan + this.ly + this.hoa) / 3;
    };
    this.isValid = function () {
      return this._errors.length === 0 ? true : false;
    };
  }

  Object.defineProperty(SinhVien.prototype, "ma", {
    get: function () {
      return this._ma;
    },
    set: function (ma) {
      try {
        if (!isNotBlank(ma))
          throw new InvalidFormatError(
            FormatErrors.ACCOUNT,
            ErrorMessages.Blank,
          );
        this._ma = ma;
      } catch (err) {
        this._errors.push(err);
      }
    },
  });

  Object.defineProperty(SinhVien.prototype, "ten", {
    get: function () {
      return this._ten;
    },
    set: function (ten) {
      try {
        if (!isNotBlank(ten))
          throw new InvalidFormatError(FormatErrors.NAME, ErrorMessages.Blank);
        if (!isInRange(ten, 3, 20))
          throw new InvalidFormatError(
            FormatErrors.NAME,
            ErrorMessages.NotInRange(3, 20),
          );

        this._ten = ten;
      } catch (err) {
        this._errors.push(err);
      }
    },
  });

  Object.defineProperty(SinhVien.prototype, "email", {
    get: function () {
      return this._email;
    },
    set: function (email) {
      try {
        if (!isNotBlank(email))
          throw new InvalidFormatError(FormatErrors.EMAIL, ErrorMessages.Blank);
        if (!isValidEmail(email))
          throw new InvalidFormatError(
            FormatErrors.EMAIL,
            ErrorMessages.WrongFormat,
          );
        this._email = email;
      } catch (err) {
        this._errors.push(err);
      }
    },
  });

  Object.defineProperty(SinhVien.prototype, "matKhau", {
    get: function () {
      return this._matKhau;
    },
    set: function (matKhau) {
      try {
        if (!isNotBlank(matKhau))
          throw new InvalidFormatError(FormatErrors.PASS, ErrorMessages.Blank);
        if (!isInRange(matKhau, 8, 20))
          throw new InvalidFormatError(
            FormatErrors.PASS,
            ErrorMessages.NotInRange(8, 20),
          );
        this._matKhau = matKhau;
      } catch (err) {
        this._errors.push(err);
      }
    },
  });

  Object.defineProperty(SinhVien.prototype, "toan", {
    get: function () {
      return this._toan;
    },
    set: function (toan) {
      try {
        if (!isNotBlank(toan))
          throw new InvalidFormatError(FormatErrors.MATH, ErrorMessages.Blank);
        if (!isScoreValid(toan))
          throw new InvalidFormatError(
            FormatErrors.MATH,
            ErrorMessages.ViolateLimitScore,
          );
        this._toan = toan;
      } catch (err) {
        this._errors.push(err);
      }
    },
  });

  Object.defineProperty(SinhVien.prototype, "ly", {
    get: function () {
      return this._ly;
    },
    set: function (ly) {
      try {
        if (!isNotBlank(ly))
          throw new InvalidFormatError(
            FormatErrors.PHYSIC,
            ErrorMessages.Blank,
          );
        if (!isScoreValid(ly))
          throw new InvalidFormatError(
            FormatErrors.PHYSIC,
            ErrorMessages.ViolateLimitScore,
          );
        this._ly = ly;
      } catch (err) {
        this._errors.push(err);
      }
    },
  });

  Object.defineProperty(SinhVien.prototype, "hoa", {
    get: function () {
      return this._hoa;
    },
    set: function (hoa) {
      try {
        if (!isNotBlank(hoa))
          throw new InvalidFormatError(FormatErrors.CHEM, ErrorMessages.Blank);
        if (!isScoreValid(hoa))
          throw new InvalidFormatError(
            FormatErrors.CHEM,
            ErrorMessages.ViolateLimitScore,
          );
        this._hoa = hoa;
      } catch (err) {
        this._errors.push(err);
      }
    },
  });

  function isScoreValid(score) {
    if (score < 0 || score > 10) return false;
    return true;
  }

  function isNotBlank(val) {
    if (typeof val == "number") val = val.toString();
    return val.length > 0 ? true : false;
  }

  function isInRange(val, min, max) {
    if (typeof val !== "string") val = val.toString();
    return val.length >= min && val.length <= max ? true : false;
  }

  function isValidEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  }
  return SinhVien;
})();

const FormatErrors = {
  ACCOUNT: "AccountInvalidError",
  NAME: "NameInvalidError",
  EMAIL: "EmailInvalidError",
  PASS: "PasswordInvalidError",
  MATH: "MathInvalidError",
  PHYSIC: "PhysicInvalidError",
  CHEM: "ChemistryInvalidError",
};

const ErrorMessages = {
  Blank: "Vùng này không được để trống",
  NotInRange: function (min, max) {
    return `Vùng này chỉcho phép ${min}-${max} từ`;
  },
  ViolateLimitScore: "Điểm cho phép từ 0-10",
  WrongFormat: "Không đúng format",
};

function InvalidFormatError(name, message) {
  this.name = name;
  this.message = message;
}

InvalidFormatError.prototype = Error.prototype;

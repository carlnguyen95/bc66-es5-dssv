/** Global var **/
const codeEl = document.querySelector("#txtMaSV");
const nameEl = document.querySelector("#txtTenSV");
const mailEl = document.querySelector("#txtEmail");
const passEl = document.querySelector("#txtPass");
const mathScoreEl = document.querySelector("#txtDiemToan");
const physicScoreEl = document.querySelector("#txtDiemLy");
const chemisScoreEl = document.querySelector("#txtDiemHoa");
const formEl = document.querySelector("#formQLSV");
const searchEl = document.querySelector("#txtSearch");
const searchBtnEl = document.querySelector("#btnSearch");
var svArray = [];
/** End global var **/

/** Actions **/
window.onload = function () {
  var dssv = localStorage.getItem("DSSV");
  var dataJson = dssv ? JSON.parse(dssv) : [];
  svArray = dataJson.map((svInfo) => {
    return new SinhVien(svInfo);
  });
  renderDssv(svArray);
};

function themSv() {
  var svInfo = {
    _ma: codeEl.value,
    _ten: nameEl.value,
    _email: mailEl.value,
    _matKhau: passEl.value,
    _toan: mathScoreEl.value * 1,
    _ly: physicScoreEl.value * 1,
    _hoa: chemisScoreEl.value * 1,
  };
  var sv = new SinhVien(svInfo);
  clearErrors();
  if (!sv.isValid()) {
    displayErrors(sv._errors);
    return;
  }
  svArray.push(sv);
  saveLocal();
  renderDssv(svArray);
}

function xoaSv(id) {
  const svIndex = svArray.findIndex(function (sv) {
    return id == sv.ma;
  });
  svArray.splice(svIndex, 1);
  saveLocal();
  renderDssv(svArray);
}

function suaSv(id) {
  const svIndex = svArray.findIndex(function (sv) {
    return id == sv.ma;
  });
  codeEl.value = svArray[svIndex].ma;
  nameEl.value = svArray[svIndex].ten;
  mailEl.value = svArray[svIndex].email;
  passEl.value = svArray[svIndex].matKhau;
  mathScoreEl.value = svArray[svIndex].toan;
  physicScoreEl.value = svArray[svIndex].ly;
  chemisScoreEl.value = svArray[svIndex].hoa;
  codeEl.readOnly = true;
}

function resetForm() {
  formEl.reset();
  codeEl.readOnly = false;
}

function capNhat() {
  var info = {
    _ma: codeEl.value,
    _ten: nameEl.value,
    _email: mailEl.value,
    _matKhau: passEl.value,
    _toan: mathScoreEl.value * 1,
    _ly: physicScoreEl.value * 1,
    _hoa: chemisScoreEl.value * 1,
  };
  var updateSv = new SinhVien(info);
  clearErrors();
  if (!updateSv.isValid()) {
    displayErrors(updateSv._errors);
    return;
  }

  svIndex = svArray.findIndex((svInfo) => {
    return (svInfo.ma = codeEl.value);
  });
  svArray[svIndex] = updateSv;
  saveLocal();
  renderDssv(svArray);
}

searchBtnEl.addEventListener("click", () => {
  const searchKey = searchEl.value;
  var matchArr = [];
  svArray.forEach((sv) => {
    if (sv.ten.search(searchKey) != -1) {
      matchArr.push(sv);
    }
  });
  if (searchKey == "") {
    renderDssv(svArray);
  } else {
    renderDssv(matchArr);
  }
});

function saveLocal() {
  var svArrayJson = JSON.stringify(svArray);
  localStorage.setItem("DSSV", svArrayJson);
}

function clearErrors() {
  const spans = document.querySelectorAll(
    ".col-4.form-group span, .col-6.form-group span",
  );
  spans.forEach(function (span) {
    span.textContent = "";
  });
}

function displayErrors(errors) {
  errors.forEach((err) => {
    switch (err.name) {
      case FormatErrors.ACCOUNT:
        document.querySelector("#spanMaSV").textContent = err.message;
        break;
      case FormatErrors.NAME:
        document.querySelector("#spanTenSV").textContent = err.message;
        break;
      case FormatErrors.EMAIL:
        document.querySelector("#spanEmailSV").textContent = err.message;
        break;
      case FormatErrors.PASS:
        document.querySelector("#spanMatKhau").textContent = err.message;
        break;
      case FormatErrors.MATH:
        document.querySelector("#spanToan").textContent = err.message;
        break;
      case FormatErrors.PHYSIC:
        document.querySelector("#spanLy").textContent = err.message;
        break;
      case FormatErrors.CHEM:
        document.querySelector("#spanHoa").textContent = err.message;
        break;
    }
  });
}
/** End Actions **/

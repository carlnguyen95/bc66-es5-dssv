import { EmployeeManagement } from "./Employee/EmployeeManagement.js";
import { ErrorTypes } from "./Employee/InvalidInfoErrors.js";

/*** Global Var ***/
let controller = new EmployeeManagement("controller");

const tblBody = document.querySelector("#tableDanhSach");
const accountInput = document.querySelector("#tknv");
const nameInput = document.querySelector("#name");
const mailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const startDayInput = document.querySelector("#datepicker");
const salaryInput = document.querySelector("#luongCB");
const positionInput = document.querySelector("#chucvu");
const workingHourInput = document.querySelector("#gioLam");
const myModal = document.querySelector("#myModal");
const addBtn = document.querySelector("#btnThem");
const addEmployeeBtn = document.querySelector("#btnThemNV");
const updateEmployeeBtn = document.querySelector("#btnCapNhat");
const searchTypeOpt = document.querySelector("#searchTypeId");
const searchInput = document.querySelector("#searchName");
/*** END Global Var ***/

window.onload = () => {
  controller.getDataLocal(); //Must have
  renderEmloyeesTable();
};

addBtn.addEventListener("click", () => {
  clearAllFormInput();
  clearAllInvalidNoti();
  clearModalStatus();
  updateEmployeeBtn.classList.add("d-none");
  addEmployeeBtn.classList.remove("d-none");
});

/**
 * Add Employee
 */
addEmployeeBtn.addEventListener("click", () => {
  const info = packInfo();
  if (!controller.validateAddEmployee(info)) {
    notifyErr(controller.Errors);
    clearModalStatus();
    return;
  }

  setModalStatus("Tạo nhân viên mới thành công");
  clearAllInvalidNoti();
  renderEmloyeesTable();
});

/**
 * Delete Employee and update on row
 */
tblBody.addEventListener("click", (e) => {
  if (e.target.matches(".delete-btn")) {
    const delBtn = e.target;

    // Get employee info of that row
    const employee = delBtn.parentNode.parentNode;
    const account = employee.querySelector("td").textContent;

    // Find employee in Employess array
    controller.removeEmployee(account);
    renderEmployeesTableOnSearch(searchTypeOpt.value, searchInput.value);
  }

  if (e.target.matches(".update-btn")) {
    clearAllInvalidNoti();
    clearModalStatus();
    const updateBtn = e.target;
    // Get employee info of that row
    const employee = updateBtn.parentNode.parentNode;
    const account = employee.querySelector("td").textContent;

    // Find employee with the account, display on form
    const objInfo = controller.searchInfoEmployee("account", account);
    const employeeObj = Object.values(objInfo)[0];
    const info = employeeObj.info;
    accountInput.value = info.account;
    nameInput.value = info.name;
    mailInput.value = info.mail;
    passwordInput.value = info.password;
    startDayInput.value = info.startDay;
    positionInput.value = info.position.value;
    salaryInput.value = info.salary;
    workingHourInput.value = info.workingHour;
    accountInput.readOnly = true;
    addEmployeeBtn.classList.add("d-none");
    updateEmployeeBtn.classList.remove("d-none");
  }
});

/**
 * Update button in modal form
 */
updateEmployeeBtn.addEventListener("click", () => {
  const info = packInfo();
  if (!controller.updateEmployee(info)) {
    notifyErr(controller.Errors);
    clearModalStatus();
    return;
  }

  setModalStatus("Cập nhật thành công");
  clearAllInvalidNoti();
  renderEmployeesTableOnSearch(searchTypeOpt.value, searchInput.value);
});

/**
 * Choose searching type
 */
searchTypeOpt.addEventListener("change", () => {
  searchInput.value = "";
  switch (searchTypeOpt.value) {
    case "account":
      searchInput.placeholder = "Nhập số Tài khoản NV";
      break;
    case "name":
      searchInput.placeholder = "Nhập tên NV";
      break;
    case "mail":
      searchInput.placeholder = "Nhập email NV";
      break;
    case "position":
      searchInput.placeholder = "Nhập chức vụ NV";
      break;
    case "class":
      searchInput.placeholder = "Nhập xếp loại NV";
      break;
  }
});

/**
 * Search on key change in input field
 */
searchInput.addEventListener("keyup", () => {
  renderEmployeesTableOnSearch(searchTypeOpt.value, searchInput.value);
});

/**
 * Show invalid format error on correspoding field
 * @param {*} err
 */
function notifyErr(errList) {
  clearAllInvalidNoti();
  errList.forEach(function (err) {
    switch (err.name) {
      case ErrorTypes.ACCOUNT:
        displayError("#tbTKNV", err.message);
        break;
      case ErrorTypes.NAME:
        displayError("#tbTen", err.message);
        break;
      case ErrorTypes.MAIL:
        displayError("#tbEmail", err.message);
        break;
      case ErrorTypes.PASS:
        displayError("#tbMatKhau", err.message);
        break;
      case ErrorTypes.STARTDAY:
        displayError("#tbNgay", err.message);
        break;
      case ErrorTypes.SALARY:
        displayError("#tbLuongCB", err.message);
        break;
      case ErrorTypes.POSITION:
        displayError("#tbChucVu", err.message);
        break;
      case ErrorTypes.WH:
        displayError("#tbGiolam", err.message);
        break;
      default:
        throw new Error("Unregconized error!!!" + err.message);
    }
  });
}

/**
 * Subfunction for notifyErr
 * @param {*} id
 * @param {*} message
 */
function displayError(id, message) {
  document.querySelector(id).textContent = message;
  document.querySelector(id).style.display = "block";
}

/**
 * Render table content when there is update on Employees array
 */
function renderEmloyeesTable() {
  tblBody.innerHTML = "";
  controller.EmployeeList.forEach((employee) => {
    const info = employee.info;
    const rowContent = `
      <tr>
        <td>${info.account}</td>
        <td>${info.name}</td>
        <td>${info.mail}</td>
        <td>${info.startDay}</td>
        <td>${info.position.title}</td>
        <td>${info.totalSalary}</td>
        <td>${info.class}</td>
        <td>
          <button
            class="btn btn-success update-btn"
            data-toggle="modal"
            data-target="#myModal"
          >Sửa</button>
          <button class="btn btn-danger delete-btn">Xóa</button>
        </td>
      </tr>
    `;
    tblBody.innerHTML += rowContent;
  });
}

/**
 * Search employees with matching info and render the table
 * @param {*} searchType from searchTypeOpt selection
 * @param {*} searchKey  key to search
 */
function renderEmployeesTableOnSearch(searchType, searchKey) {
  tblBody.innerHTML = "";
  const matchList = controller.partialSearchInfoEmployee(searchType, searchKey);
  matchList.forEach((employee) => {
    const info = employee.info;
    if (searchType === "position") {
      info[searchType].title = info[searchType].title.replaceAll(
        searchKey,
        `<span class='text-danger'>${searchKey}</span>`,
      );
    } else {
      info[searchType] = info[searchType].replaceAll(
        searchKey,
        `<span class='text-danger'>${searchKey}</span>`,
      );
    }
    const rowContent = `
      <tr>
        <td>${info.account}</td>
        <td>${info.name}</td>
        <td>${info.mail}</td>
        <td>${info.startDay}</td>
        <td>${info.position.title}</td>
        <td>${info.totalSalary}</td>
        <td>${info.class}</td>
        <td>
          <button
            class="btn btn-success update-btn"
            data-toggle="modal"
            data-target="#myModal"
          >Sửa</button>
          <button class="btn btn-danger delete-btn">Xóa</button>
        </td>
      </tr>
    `;
    tblBody.innerHTML += rowContent;
  });
}

/**
 * Get info from the form, pack into object
 * @returns info object
 */
function packInfo() {
  let info = {
    account: `${accountInput.value}`,
    name: `${nameInput.value}`,
    mail: `${mailInput.value}`,
    password: `${passwordInput.value}`,
    startDay: `${startDayInput.value}`,
    salary: `${salaryInput.value}`,
    position: {
      value: `${positionInput.value}`,
      title: `${positionInput.options[positionInput.selectedIndex].text}`,
    },
    workingHour: `${workingHourInput.value}`,
  };

  return info;
}

function clearAllFormInput() {
  const form = myModal.querySelector("form");
  form.reset();
  accountInput.readOnly = false;
  clearModalStatus();
}

function setModalStatus(message) {
  document.querySelector(".modal-status").textContent = message;
}

function clearModalStatus() {
  document.querySelector(".modal-status").textContent = "";
}

function clearAllInvalidNoti() {
  const allNotification = document.querySelectorAll(".sp-thongbao");
  allNotification.forEach((element) => {
    element.textContent = "";
    element.style.display = "none";
  });
}

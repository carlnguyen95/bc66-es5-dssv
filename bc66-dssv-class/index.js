var dssv = [];

// lấy dữ liệu từ localStorage render lên table
window.onload = function () {
  var dataJson = localStorage.getItem("DSSV");
  // convert json thành array để đem đi duyệt mảng
  // kiểm tra nếu  data khác null thì render
  var dataRaw = dataJson !== null ? JSON.parse(dataJson) : [];
  // convert array object không có method (method bị mất trong quá trình lưu xuống ) trở thành array object có method
  dataRaw.foreEach(function (data) {
    var sv = new SinhVien(
      data.ma,
      data.ten,
      data.email,
      data.matKhau,
      data.toan,
      data.ly,
      data.hoa,
    );
    dssv.push(sv);
  });
  renderDssv(dssv);
};

/*
1. Lấy thông tin từ form
2. Tạo object dự vào bước 1
3. Thêm object sinh viên vào mảng sinh viên
4. Render array thành table
 */

function themSv() {
  var sv = layThongTinTuForm();
  // validate data trước khi quyết định thêm
  // validate  mã sv
  var isValid = kiemTraRong(sv.ma, "spanMaSV");
  // validate ten sv
  isValid =
    kiemTraRong(sv.ten, "spanTenSV") &&
    kiemTraMinMax(sv.ten, "spanTenSV", 3, 20) &&
    isValid;

  isValid =
    kiemTraRong(sv.matKhau, "spanMatKhau") &&
    kiemTraMinMax(sv.matKhau, "spanMatKhau", 8, 20) &&
    isValid;
  // validate ...

  isValid =
    kiemTraRong(sv.email, "spanEmailSV") && kiemTraEmail(sv.email) && isValid;
  isValid =
    isValid &
    kiemTraRong(sv.toan, "spanToan") &
    kiemTraRong(sv.ly, "spanLy") &
    kiemTraRong(sv.hoa, "spanHoa");
  // a() && b() ~ nếu a() return false thì dòng lệnh sẽ kết thúc tại && => dùng kiến thức mới => &
  // if (!isValid) return;
  if (isValid) {
    //   lưu sv vào danh sách
    dssv.push(sv);
    //   lưu data xuống localStorage
    //   b1: convert array to json
    var dataJson = JSON.stringify(dssv);
    //   b2: lưu json vào vùng nhớ localStorage
    localStorage.setItem("DSSV", dataJson);
    renderDssv(dssv);
    // reset form sau khi thêm thành công
    resetForm();
  }
}

function xoaSv(id) {
  // xoá => splice => cần index => tìm index
  var index = dssv.findIndex(function (item) {
    return item.ma == id;
  });
  dssv.splice(index, 1);
  renderDssv(dssv);
}

function suaSv(id) {
  // tìm object được click button sửa
  var index = dssv.findIndex(function (item) {
    return item.ma == id;
  });
  var sv = dssv[index];
  // show thông tin lên form
  document.getElementById("txtMaSV").value = sv.ma;
  document.getElementById("txtTenSV").value = sv.ten;
  document.getElementById("txtEmail").value = sv.email;
  document.getElementById("txtPass").value = sv.matKhau;
  document.getElementById("txtDiemToan").value = sv.toan;
  document.getElementById("txtDiemLy").value = sv.ly;
  document.getElementById("txtDiemHoa").value = sv.hoa;
  // read only ô input chứa mã
  document.getElementById("txtMaSV").readOnly = true;
}

function capNhatSv() {
  // lấy thông tin từ form
  var sv = layThongTinTuForm();
  console.log("😀 - sv", sv);
  // thay thế object cũ bằng object mới => tìm index
  var index = dssv.findIndex(function (item) {
    return item.ma == sv.ma;
  });
  // update
  dssv[index] = sv;
  renderDssv(dssv);
  // clear form sau khi update thành công
  resetForm();
}

function resetForm() {
  // clear data các thẻ input đang nằm trong thẻ form
  document.getElementById("formQLSV").reset();
  document.getElementById("txtMaSV").readOnly = false;
}
// localStorage js ~ giữ lại data không bị mất sau khi load lại trang  ~ chỉ lưu được json

// JSON.stringtify => convert array to json
// JSON.parse => convert json thành array

// lưu xuống: JSON.stringify => localStorage.setItem(key,value)
// lấy lên: localStorage.getItem(key) => JSON.parse

// cookie / sessionStorage / localStorage

// pass by value : number, string, boolean

// pass by reference : array , object

var a = 2;
var b = a;
var b = 0;

// a = 2

var cat1 = {
  color: "white",
};
var cat2 = cat1;

cat2.color = "black";
console.log(cat1, cat2);

// regex

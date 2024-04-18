// index.js => file chính
// controller.js => file phụ
// tạo function render table
function renderDssv(svArray) {
  //  render array thành table
  var contentHTML = "";
  //duyệt mảng
  for (var i = svArray.length - 1; i >= 0; i--) {
    var sv = svArray[i];
    var trString = ` <tr>
                            <td>${sv.ma}</td>
                            <td>${sv.ten}</td>
                            <td>${sv.email}</td>
                            <td>${sv.tinhDTB()}</td>
                            <td>
                            <button
                            onclick="xoaSv('${sv.ma}')"
                            class='btn btn-danger'>Xoá</button>
                            <button
                            onclick="suaSv('${sv.ma}')"
                            class='btn btn-dark'>Sửa</button>
                            </td>
                       </tr>`;
    contentHTML += trString;
  }

  document.getElementById("tbodySinhVien").innerHTML = contentHTML;
}

function layThongTinTuForm() {
  // lấy thông tin từ form
  var ma = document.getElementById("txtMaSV").value;
  var ten = document.getElementById("txtTenSV").value;
  var email = document.getElementById("txtEmail").value;
  var matKhau = document.getElementById("txtPass").value;
  var toan = document.getElementById("txtDiemToan").value;
  var ly = document.getElementById("txtDiemLy").value;
  var hoa = document.getElementById("txtDiemHoa").value;
  //   tạo object
  var sv = new SinhVien(ma, ten, email, matKhau, toan, ly, hoa);
  return sv;
}

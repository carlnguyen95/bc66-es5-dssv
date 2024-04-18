// index.js => file chính
// controller.js => file phụ
// tạo function render table
function renderDssv(svArray) {
  //  render array thành table
  var contentHTML = "";
  //duyệt mảng
  svArray.forEach((sv) => {
    var trString = ` <tr>
                            <td>${sv.ma}</td>
                            <td>${sv.ten}</td>
                            <td>${sv.email}</td>
                            <td>${sv.tinhDTB().toFixed(2)}</td>
                            <td>
                              <button
                                onclick="suaSv('${sv.ma}')"
                                class='btn btn-success'>Sửa
                              </button>
                              <button
                                onclick="xoaSv('${sv.ma}')"
                                class='btn btn-danger'>Xoá
                              </button>
                            </td>
                       </tr>`;
    contentHTML += trString;
  });

  document.getElementById("tbodySinhVien").innerHTML = contentHTML;
}

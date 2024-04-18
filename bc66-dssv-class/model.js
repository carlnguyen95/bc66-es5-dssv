// tạo lớp đối tượng sinh viên
//  cần 7 data để tạo ra 1 object
function SinhVien(ma, ten, email, matKhau, toan, ly, hoa) {
  this.ma = ma;
  this.ten = ten;
  this.email = email;
  this.matKhau = matKhau;
  this.toan = toan;
  this.ly = ly;
  this.hoa = hoa;
  this.tinhDTB = function () {
    return (this.toan * 1 + this.ly * 1 + this.hoa * 1) / 3;
  };
}

// hợp lệ => true

function kiemTraRong(value, idErr) {
  if (value.length == 0) {
    // không hợp lệ
    document.getElementById(idErr).innerText = "Nội dung này không được bỏ trống";
    return false;
  }
  document.getElementById(idErr).innerText = "";
  return true;
}
// reverse()

function kiemTraMinMax(value, idErr, min, max) {
  if (min <= value.length && value.length <= max) {
    document.getElementById(idErr).innerText = "";
    return true;
  }
  document.getElementById(idErr).innerText = `Nôi dung phải tù ${min} đến ${max}`;
  return false;
}

function kiemTraEmail(email) {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  var isEmail = regex.test(email);
  if (isEmail) {
    document.getElementById("spanEmailSV").innerText = "";
    return true;
  }
  document.getElementById("spanEmailSV").innerText = "Email không đúng định dạng";
  return false;
}

export class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";
  tongLuong = "";
  loaiNhanVien = "";
}

export const tinhTongLuong = (nv) => {
  let tongLuong = 0;
  switch (nv.chucvu) {
    case "Giám đốc":
      tongLuong = nv.luongCB * 3;
      break;
    case "Trưởng phòng":
      tongLuong = nv.luongCB * 2;
      break;
    case "Nhân viên":
      tongLuong = nv.luongCB;
      break;
    default:
      break;
  }
  return tongLuong;
};

export const xepLoaiNhanVien = (nv) => {
  if (nv.gioLam >= 192) {
    return "Xuất sắc";
  } else if (nv.gioLam >= 176) {
    return "Giỏi";
  } else if (nv.gioLam >= 160) {
    return "Khá";
  } else {
    return "Trung bình";
  }
};

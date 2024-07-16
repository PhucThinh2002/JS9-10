import {requiredValidate,lengthValidate,kiemTraChuoiChuCai,dinhDangEmail,dinhDangMatkhau,kiemTraLuongCB,kiemTraGioLam} from "./validation.js";
import {NhanVien,tinhTongLuong,xepLoaiNhanVien} from "./NhanVien.js";

let arrNV = [];

document.querySelector('#myModal').onsubmit = function (e) {
    e.preventDefault();
    // console.log('submit');
    let nv = new NhanVien();
    let arrInput = document.querySelectorAll('#myModal .form-control');
    for (let input of arrInput) {
        let id = input.id;
        let value = input.value;
        nv[id] = value;
    }
    if (arrNV.some(existingNV => existingNV.tknv === nv.tknv)) {//kiểm tra xem tài khoản đã tồn tại hay chưa.
        alert('Tài khoản đã tồn tại!');
        return;
    }
    arrNV.push(nv);
    render(arrNV);
    saveLocalStorage();
}

export const render = (arrNV) => {
    let htmlString = "";
    for (let nv of arrNV) {
        nv.tongLuong = tinhTongLuong(nv);
        nv.loaiNhanVien = xepLoaiNhanVien(nv);
        htmlString += `
                        <tr>
                            <td>${nv.tknv}</td>
                            <td>${nv.name}</td>
                            <td>${nv.email}</td>
                            <td>${nv.datepicker}</td>
                            <td>${nv.chucvu}</td>
                            <td>${nv.tongLuong}</td>
                            <td>${nv.loaiNhanVien}</td>
                            <td>
                                <button class="btn btn-primary mx-2" onclick="chinhSua('${nv.tknv}')">Chỉnh sửa</button>
                                <button class="btn btn-danger" onclick="xoaNhanVien('${nv.tknv}')">Xoá</button>
                            </td>
                        </tr>
        `;
    }
    document.querySelector("#tableDanhSach").innerHTML = htmlString;
    return htmlString;
}

document.querySelector("#btnThemNV").onclick = () => {
    let inputs = document.querySelectorAll(".form-control");
    let valid = true;
    const nv = {};
    for (let input of inputs) {
        nv[input.id] = input.value;
    }

    // Kiểm tra trùng lặp tài khoản
    if (arrNV.some(existingNV => existingNV.tknv === nv.tknv)) {
        alert('Tài khoản đã tồn tại!');
        return;
    }

    // Validate tài khoản
    valid &= requiredValidate(nv.tknv, ".required_TKNV", "Tài khoản") & lengthValidate(nv.tknv, ".number_TKNV", "Tài khoản");
    // Validate tên nhân viên
    valid &= requiredValidate(nv.name, ".required_name", "Tên nhân viên") & kiemTraChuoiChuCai(nv.name, ".chuoi_chu_cai_name", "Họ và tên");
    // Validate email
    valid &= requiredValidate(nv.email, ".requied_email", "Email") & dinhDangEmail(nv.email, ".format_email", "Email");
    // Validate mật khẩu
    valid &= requiredValidate(nv.password, ".required_matKhau", "Mật khẩu") & dinhDangMatkhau(nv.password, ".dinh_dang_mat_khau", "Mật khẩu");
    // Validate lương cơ bản
    valid &= requiredValidate(nv.luongCB, ".required_luongCB", "Lương cơ bản") & kiemTraLuongCB(nv.luongCB, ".number_luongCB", "Lương cơ bản");
    // Validate giờ làm
    valid &= requiredValidate(nv.gioLam, ".required_gioLam", "Giờ làm") & kiemTraGioLam(nv.gioLam, ".number_gioLam", "Giờ làm");

    if (!valid) {
        return;
    }

    nv.tongLuong = tinhTongLuong(nv);
    nv.loaiNhanVien = xepLoaiNhanVien(nv);

    arrNV.push(nv);
    // console.log(arrNV);
    render(arrNV);
    saveLocalStorage();
    $('#myModal').modal('hide');
}

window.xoaNhanVien = function (tknv) {
    let indexDel = arrNV.findIndex(nv => nv.tknv === tknv);
    if (indexDel !== -1) {
        arrNV.splice(indexDel, 1);
        console.log(arrNV);
        render(arrNV);
        saveLocalStorage();
    }
}

window.chinhSua = function(tknv) {
    let nvUpdate = arrNV.find(nv => nv.tknv === tknv);
    if (nvUpdate) {
        // document.querySelector("#tknv").value = nv.tknv;
        // document.querySelector("#name").value = nv.name;
        // document.querySelector("#email").value = nv.email;
        // document.querySelector("#password").value = nv.password;
        // document.querySelector("#datepicker").value = nv.datepicker;
        // document.querySelector("#luongCB").value = nv.luongCB;
        // document.querySelector("#chucvu").value = nv.chucvu;
        // document.querySelector("#gioLam").value = nv.gioLam;
        for (let key in nvUpdate) {
            let input = document.querySelector(`#${key}`);
            if (input) {
                input.value = nvUpdate[key];
            }
        }
        $('#myModal').modal('show');
        document.querySelector("#btnThemNV").disabled = true;
    }
}

document.querySelector("#btnCapNhat").onclick = function () {
    let inputs = document.querySelectorAll(".form-control");
    let valid = true;
    const nv = {};
    for (let input of inputs) {
        nv[input.id] = input.value;
    }

    // Validate tài khoản
    valid &= requiredValidate(nv.tknv, ".required_TKNV", "Tài khoản") & lengthValidate(nv.tknv, ".number_TKNV", "Tài khoản");
    // Validate tên nhân viên
    valid &= requiredValidate(nv.name, ".required_name", "Tên nhân viên") & kiemTraChuoiChuCai(nv.name, ".chuoi_chu_cai_name", "Họ và tên");
    // Validate email
    valid &= requiredValidate(nv.email, ".requied_email", "Email") & dinhDangEmail(nv.email, ".format_email", "Email");
    // Validate mật khẩu
    valid &= requiredValidate(nv.password, ".required_matKhau", "Mật khẩu") & dinhDangMatkhau(nv.password, ".dinh_dang_mat_khau", "Mật khẩu");
    // Validate lương cơ bản
    valid &= requiredValidate(nv.luongCB, ".required_luongCB", "Lương cơ bản") & kiemTraLuongCB(nv.luongCB, ".number_luongCB", "Lương cơ bản");
    // Validate giờ làm
    valid &= requiredValidate(nv.gioLam, ".required_gioLam", "Giờ làm") & kiemTraGioLam(nv.gioLam, ".number_gioLam", "Giờ làm");

    if (!valid) {
        return;
    }

    let indexUpdate = arrNV.findIndex(nvItem => nvItem.tknv === nv.tknv);
    if (indexUpdate !== -1) {
        arrNV[indexUpdate] = nv;
        nv.tongLuong = tinhTongLuong(nv);
        nv.loaiNhanVien = xepLoaiNhanVien(nv);

        render(arrNV);
        saveLocalStorage();

        $('#myModal').modal('hide');
        document.querySelector("#btnThemNV").disabled = false;//Disable button "Thêm" khi thực hiện chức năng cập nhật
    }
}

document.querySelector("#btnTimNV").onclick = function() {
    let filterValue = document.querySelector("#searchName").value.trim().toLowerCase();
    let filteredNV = [];

    if (filterValue === "") {
        filteredNV = arrNV;
    } else {
        filteredNV = arrNV.filter(nv => nv.loaiNhanVien.toLowerCase().includes(filterValue));
    }

    render(filteredNV);
    saveLocalStorage();
};

document.querySelector("#searchName").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        let filterValue = this.value.trim().toLowerCase();
        let filteredNV = [];

        if (filterValue === "") {
            filteredNV = arrNV;
        } else {
            filteredNV = arrNV.filter(nv => nv.loaiNhanVien.toLowerCase().includes(filterValue));
        }

        render(filteredNV);
    }
});

const saveLocalStorage = () => {
    localStorage.setItem("arrNV", JSON.stringify(arrNV));
}

const loadLocalStorage = () => {
    if (localStorage.getItem("arrNV")) {
        arrNV = JSON.parse(localStorage.getItem("arrNV"));
        render(arrNV);
    }
}
loadLocalStorage();

//xóa hết data cũ ở trong form
$('#myModal').on('shown.bs.modal', function (e) {
    let inputs = document.querySelectorAll("#myModal .form-control");
    for (let input of inputs) {
        input.value = "";
    }
    document.querySelector("#btnThemNV").disabled = false;
});


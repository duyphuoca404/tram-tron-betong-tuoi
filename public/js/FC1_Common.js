//////////////////// Tạo các object để lưu thông tin ///////////////////////////
let CapPhoi = {
    STTMacBeTong: 0,
    TenMacBeTong: '',
    DMTP: [0, 0, 0, 0],
    DMXI: 0,
    DMNUOC: 0,
    DMPG: [0, 0],
    DoSutThongKe: '',
    Som3Me: 0,
    SoMe: 0,
    DoAmTP: [0, 0, 0, 0],
    dieuchinh: 0
};

let KhachHang = {
    MaKhachHang: '',
    TenKhachHang: '',
    DiaChi: ''
};

let DonDatHang = {
    MaDonDatHang: '',
    khachhang: KhachHang,
    DiaChiCongTruong: '',
    KLDatHang: 0,
    KLMeNay: 0,
    KLLuyTien: 0
};

let XeBon = {
    STT: 0,
    BienSoXe: '',
    TenLaiXe: ''
};

let PhieuGiaoBeTong = {
    ChuyenSo: '',
    khachhang: '',
    NoiNhanBeTong: '',
    NgayDo: '',
    SoXe: '',
    MacBetong: '',
    DoSut: '',
    YeuCauBom: '',
    YeuCauPG: '',
    ThoiGianCap: '',
    DonGiaBeTong: '',
    DonGiaBom: '',
    DonGiaPG: '',
    Cong: '',
    KhoiLuongChuyen: '',
    KhoiLuongDaDo: '',
    NguoiXuatHang: '',
    LaiXe: '',
    TramSo: ''
};

let PhieuCan = {
    MaPhieuCan: '',
    dondathang: DonDatHang,
    XeBon: XeBon,
    CapPhoi: CapPhoi,
    TenTP: ['', '', '', ''],
    TenXiMang: '',
    TenPG: ['', ''],

    GioXong: new Date(),
    DaChonXe: false,
    DaChonPhieuCan: false,
    DaGhiGioXong: false,
    NhacNhapBienSo: false,

    PhieuGiaoBetong: PhieuGiaoBeTong
};

let DaCanXong = {
    DaCanXongCotLieu: false,
    DaCanXongXi: false,
    DaCanXongNuoc: false,
    DaCanXongPG: false
};
let ThongKe = {
    tungay: '',
    TuGio: '',
    denngay: '',
    DenGio: '',
    MaKhachHang: '',
    TenKhachHang: '',
    MaDonDatHang: '',
    MacBetong: '',
    TheoKhachHang: false,
    TheoDonDatHang: false,
    TheoMac: false,
    TheoGio: false,
    ThongKeChiTiet: false
};

let ThuThap = {
    SoMeDM: 0,
    SoMeHienTaiCotLieu: 0,
    SoMeHienTaiXi: 0,
    SoMeHienTaiNuoc: 0,
    SoMeHienTaiPG: 0,

    TrangThaiCanCotLieu: '',
    TrangThaiCanXi: '',
    TrangThaiCanNuoc: '',
    TrangThaiCanPG: '',

    KhoiLuongHienTaiCotLieu: 0,
    KhoiLuongHienTaiXi: 0,
    KhoiLuongHienTaiNuoc: 0,

    KhoiLuongCotLieu: [0, 0, 0, 0],
    KhoiLuongNuoc: 0,
    KhoiLuongXi: 0,
    KhoiLuongPG: 0,

    GhiGiaTriCL: false,
    GhiGiaTriXi: false,
    GhiGiaTriNuoc: false,
    GhiGiaTriPG: false,

    GhiPhieuCan: false,
    CoMeDangTron: false,
    ChonVitMacDinh: false,
    SoLanLoiTinHieu: 0,

    DaCanXong: DaCanXong
};

let CuaVatLieu = {
    Cua: ['', '', '', ''],
    Xi: '',
    PG: ['', ''],
    ThuThapPG: false
};

let ThongTinCapPhoi = {
    ViTriCapPhoi: 0,
    SoMe: 0,
    Som3Me: 0.0,
    DoAm: [0.0, 0.0, 0.0],
    DangDatCapPhoi: false
};

// Khai báo một số biến toàn cục
var anable_edditting_datThongsocan = false;
var anable_edditting_khungHieuchinhcan = false;
PhieuCan.DaChonPhieuCan = false;

////////////// YÊU CẦU DỮ LIỆU TỪ SERVER- REQUEST DATA //////////////
var myVar = setInterval(myTimer, 100);
function myTimer() {
    socket.emit("Client-send-data", "Request data client");
}

////////////// CÁC KHỐI CHƯƠNG TRÌNH CON ///////////////////////////
// Chương trình con đọc dữ liệu lên IO Field
function fn_IOFieldDataShow(tag, IOField, tofix) {
    let string;
    socket.on(tag, function (data) {
        if (tofix == 0) {
            document.getElementById(IOField).value = data;
            // string = data;
            // console.log(tag);
            // console.log("Du lieu tra ve của " + tag + " là: " + string);
        }
        else {
            // document.getElementById(IOField).value = data.toFixed(tofix);
            var num = Number(data);
            document.getElementById(IOField).value = num.toFixed(tofix);
            // string = data;
            // console.log(tag);
            // console.log("Du lieu tra ve của " + tag + " là: " + string);
        }

    });
}
// Chương trình con đọc dữ liệu lên IO Field ở các trang
function fn_IOField_IO_datThongsocan(tag, IOField, tofix) {
    socket.on(tag, function (data) {
        if (tofix == 0 & anable_edditting_datThongsocan != true) {
            document.getElementById(IOField).value = data;
        }
        else if (anable_edditting_datThongsocan != true) {
            // document.getElementById(IOField).value = data.toFixed(tofix);
            var num = Number(data);
            document.getElementById(IOField).value = num.toFixed(tofix);
        }
    });
}
// Chương trình con đọc dữ liệu lên IO Field thời gian, vì nó đặc biệc ở chỗ đơn vị trên PLC và web UI nó khác nhau nên tôi đã modify hàm fn_scrAuto_IOField_IO
function fn_IOField_showforTime(tag, IOField, tofix) {
    socket.on(tag, function (data) {
        if (tofix == 0 & anable_edditting_datThongsocan != true) {
            document.getElementById(IOField).value = data / 10;
        }
        else if (anable_edditting_datThongsocan != true) {
            // document.getElementById(IOField).value = data.toFixed(tofix) / 10;
            var num = Number(data) / 10;
            document.getElementById(IOField).value = num.toFixed(tofix);
        }
    });
}
// Chương trình con đổi màu Symbol
function fn_SymbolStatus(ObjectID, SymName, Tag) {
    var imglink_0 = "images/Symbol/" + SymName + "_0.png"; // Trạng thái tag = 0
    var imglink_1 = "images/Symbol/" + SymName + "_1.png"; // Trạng thái tag = 1
    var imglink_2 = "images/Symbol/" + SymName + "_2.png"; // Trạng thái tag = 2
    var imglink_3 = "images/Symbol/" + SymName + "_3.png"; // Trạng thái tag = 3
    var imglink_4 = "images/Symbol/" + SymName + "_4.png"; // Trạng thái tag = 4
    var imglink_5 = "images/Symbol/" + SymName + "_5.png"; // Trạng thái tag = 5
    socket.on(Tag, function (data) {
        if (data == 0) {
            document.getElementById(ObjectID).src = imglink_0;
        }
        else if (data == 1) {
            document.getElementById(ObjectID).src = imglink_1;
        }
        else if (data == 2) {
            document.getElementById(ObjectID).src = imglink_2;
        }
        else if (data == 3) {
            document.getElementById(ObjectID).src = imglink_3;
        }
        else if (data == 4) {
            document.getElementById(ObjectID).src = imglink_4;
        }
        else {
            document.getElementById(ObjectID).src = imglink_0;
        }
    });
}

// Chương trình con chuyển trang
function fn_ScreenChange(scr_1, scr_2, scr_3, scr_4) {
    document.getElementById(scr_1).style.visibility = 'visible';   // Hiển thị trang được chọn
    document.getElementById(scr_2).style.visibility = 'hidden';    // Ẩn trang 1
    document.getElementById(scr_3).style.visibility = 'hidden';
    document.getElementById(scr_4).style.visibility = 'hidden';
}

// function fn_ShowOrHideDiv(showDivButton, div) {
//     document.getElementById(showDivButton).addEventListener('click', function () { document.getElementById(div).style.display = 'block'; });
// }
// Hàm hiển thị một đối tượng
function fn_ShowById(element) {
    document.getElementById(element).style.display = 'block';
}
// Hàm ẩn đi một đối tượng
function fn_HideById(element) {
    document.getElementById(element).style.display = 'none';
}
// Hàm ẩn đi một đối tượng với Class
function fn_HideByClass(Class) {
    var myClass = Class;
    var elements = document.getElementsByClassName(myClass);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
}
// Hàm hiển thị một đối tượng với Class
function fn_ShowByClass(Class) {
    var myClass = Class;
    var elements = document.getElementsByClassName(myClass);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'inline-block';
    }
}


// Chương trình con nút sửa/lưu dữ liệu
function fn_DataEdit(button1, button2) {
    document.getElementById(button1).style.zIndex = '1';  // Hiển nút 1
    document.getElementById(button2).style.zIndex = '0';  // Ẩn nút 2
}

// Chương trình con hien thi Trang thai can
function fn_ShowStatus(tag1, tag2, IOField) {
    let string0;
    let string1;
    let string;
    // var string0 = String.fromCharCode(bytenumber0.toString(16));
    // var string1 = String.fromCharCode(bytenumber1.toString(16));

    function capNhatString() {
        if (string0 !== undefined && string1 !== undefined) {
            string = string0 + string1;
            // console.log("Du lieu tra ve:" + string);
        }
        var tmp;
        switch (string) {
            case "EM": tmp = "EMPTY";
                break;
            case "ST": tmp = "STOP";
                break;
            case "FU": tmp = "FULL";
                break;
            case "PE": tmp = "FULL";
                break;
            case "PA": tmp = "PAUSE";
                break;
            case "CO": tmp = "COARSE";
                break;
            case "1C": tmp = "COARSE";
                break;
            case "2C": tmp = "COARSE";
                break;
            case "3C": tmp = "COARSE";
                break;
            case "4C": tmp = "COARSE";
                break;

            case "NU": tmp = "COARSE";
                break;
            case "FI": tmp = "FINE";
                break;
            case "XI": tmp = "COARSE";
                break;
            case "IN": tmp = "IN";
                break;
            case "EN": tmp = "END";
                break;
            case "UP": tmp = "GO UP";
                break;
            case "DO": tmp = "GO DOWN";
                break;
            case "ON": tmp = "ON TOP";
                break;
            default: tmp = "No signal";
        };

        document.getElementById(IOField).value = tmp;
        // console.log(tmp);
        //return tmp;
    }

    socket.on(tag1, function (data) {
        string0 = String.fromCharCode(data);
        // console.log(tag1);
        // console.log("Du lieu tra ve:" + string0);
        capNhatString();
    });

    socket.on(tag2, function (data) {
        string1 = String.fromCharCode(data);
        // console.log(tag2);
        // console.log("Du lieu tra ve:" + string1);
        capNhatString();
    });
}

// Chương trình con hien thi Số mẻ cân
function fn_ShowSoMe(tag1, tag2, IOField) {
    let string0;
    let string1;
    let string;
    // var string0 = String.fromCharCode(bytenumber0.toString(16));
    // var string1 = String.fromCharCode(bytenumber1.toString(16));

    function capNhatString() {
        if (string0 !== undefined && string1 !== undefined) {
            string = string0 + "/" + string1;
            // console.log("So me/So me DM:" + string);
        }
        document.getElementById(IOField).value = string;
        // console.log(string);
        //return tmp;
    }

    socket.on(tag1, function (data) {
        string0 = data.toString();
        // console.log(tag1);
        // console.log("Du lieu tra ve:" + string0);
        capNhatString();
    });

    socket.on(tag2, function (data) {
        string1 = data + '';
        // console.log(tag2);
        // console.log("Du lieu tra ve:" + string1);
        capNhatString();
    });
}

// Xử lý các sự kiện, chức năng cho khung cài đặt Thông số cân
function initSocketForm(containerClass, editButtonId, saveButtonId, eventName) {
    // Khởi tạo kết nối socket với server
    // const socket = io();

    // Lấy phần tử có class containerClass
    const container = document.querySelector(`.${containerClass}`);

    // Lấy danh sách các ô input trong phạm vi của phần tử container
    const inputs = container.querySelectorAll('input[type="number"]');

    // Vô hiệu hóa tất cả các ô input ==> tạm thời không sử dụng chức năng disable này nữa
    // inputs.forEach(input => {
    //     input.disabled = true;
    // });

    // Xử lý sự kiện dblclick trên các ô input
    // inputs.forEach(input => {
    //     input.addEventListener('dblclick', () => {
    //         // Bỏ thuộc tính disabled để cho phép chỉnh sửa
    //         input.disabled = false;
    //         console.log('Có sự kiện double click')
    //     });
    // });

    // Xử lý sự kiện keydown trên các ô input
    inputs.forEach(input => {
        input.addEventListener('keydown', event => {
            // Kiểm tra xem người dùng có nhấn phím Enter hay không
            if (event.key === 'Enter') {
                // Lấy dữ liệu từ ô input hiện tại
                const data = {};
                if (input.id === 'DELAY_1' || input.id === 'TG_NHAY_COM1' || input.id === 'TG_NHAY_COM2'
                    || input.id === 'TG_NHAY_COM3' || input.id === 'TG_NHAY_COM4' || input.id === 'PAUSE1'
                    || input.id === 'DELAY_PE' || input.id === 'TG_TRE_CAN2' || input.id === 'TG_NHAY_XI_1'
                    || input.id === 'PAUSE2' || input.id === 'TG_TRE_XA_XI' || input.id === 'TG_TRE_CAN3'
                    || input.id === 'TG_NHAY_NUOC' || input.id === 'PAUSE3' || input.id === 'TG_TRE_XANUOC'
                    || input.id === 'DUNG_SKIP_DT2' || input.id === 'TG_TRUNGCAP' || input.id === 'DT2_DEN_DT0') {
                    data[input.id] = input.value * 10;
                    //console.log('input.id: ', input.id)
                    //console.log('input.id được nhân với 10 ', data[input.id])
                } else {
                    data[input.id] = input.value;
                    //console.log('input.id không được nhân với 10 ', data[input.id])
                }
                // Gửi dữ liệu qua server
                socket.emit(eventName, data);

                // // Vô hiệu hóa ô input hiện tại
                // input.disabled = true;
            }
        });
    });

    // Lấy nút Sửa và nút Lưu trong phạm vi của phần tử container
    const editButton = container.querySelector(`#${editButtonId}`);
    const saveButton = container.querySelector(`#${saveButtonId}`);

    // Xử lý sự kiện click trên nút Sửa
    const initialValues = {};
    editButton.addEventListener('click', () => {

        // Bỏ thuộc tính disabled trên tất cả các ô input để cho phép chỉnh sửa
        inputs.forEach(input => {
            input.disabled = false;
        });
        anable_edditting_datThongsocan = true;
        // Lưu trữ giá trị ban đầu của các ô input

        inputs.forEach(input => {
            initialValues[input.id] = input.value;
        });
        //console.log('Giá trị ban đầu của tất cả các ô là: ', initialValues)
        //console.log('anable_edditting_datThongsocan: ', anable_edditting_datThongsocan)
    });

    // Xử lý sự kiện click trên nút Lưu
    saveButton.addEventListener('click', () => {
        // Lấy dữ liệu từ các ô input có giá trị thay đổi
        //console.log('anable_edditting_datThongsocan: ', anable_edditting_datThongsocan)
        if (anable_edditting_datThongsocan === true) {
            const data = {};
            inputs.forEach(input => {
                if (input.id === 'DELAY_1' || input.id === 'TG_NHAY_COM1' || input.id === 'TG_NHAY_COM2'
                    || input.id === 'TG_NHAY_COM3' || input.id === 'TG_NHAY_COM4' || input.id === 'PAUSE1'
                    || input.id === 'DELAY_PE' || input.id === 'TG_TRE_CAN2' || input.id === 'TG_NHAY_XI_1'
                    || input.id === 'PAUSE2' || input.id === 'TG_TRE_XA_XI' || input.id === 'TG_TRE_CAN3'
                    || input.id === 'TG_NHAY_NUOC' || input.id === 'PAUSE3' || input.id === 'TG_TRE_XANUOC'
                    || input.id === 'DUNG_SKIP_DT2' || input.id === 'TG_TRUNGCAP' || input.id === 'DT2_DEN_DT0') {
                    data[input.id] = input.value * 10;
                } else {
                    data[input.id] = input.value;
                }
            });
            // Gửi dữ liệu qua server
            socket.emit(eventName, data);

            // Vô hiệu hóa tất cả các ô input ==>  tạm thời chưa sử dung chức năng này
            // inputs.forEach(input => {
            //     input.disabled = true;
            // });
            anable_edditting_datThongsocan = false;
        }

    });
}
// Xử lý nhập liệu cho form Hiệu chỉnh cân
function initSocketFormHieuchinhcan(containerClass, editButtonId, saveButtonId, eventName) {

    // Lấy phần tử có class containerClass
    const container = document.querySelector(`.${containerClass}`);

    // Lấy danh sách các ô input trong phạm vi của phần tử container
    const inputs = container.querySelectorAll('input[type="number"]');

    // Vô hiệu hóa các ô input không được phép hiệu chỉnh bởi người dùng
    inputs.forEach(input => {
        if (input.id === 'ALALOG1' || input.id === 'ALALOG2' || input.id === 'ALALOG3'
            || input.id === 'KL_CAN1' || input.id === 'KL_CAN2' || input.id === 'KL_CAN3'
            || input.id === 'G1_Tem' || input.id === 'G2_Tem' || input.id === 'G3_Tem' || input.id === 'G4_Tem'
            || input.id === 'G1_Tem_Display' || input.id === 'G2_Tem_Display' || input.id === 'G3_Tem_Display' || input.id === 'G4_Tem_Display') {
            input.disabled = true;
        }

    });

    // Xử lý sự kiện keydown trên các ô input
    inputs.forEach(input => {
        input.addEventListener('keydown', event => {
            // Kiểm tra xem người dùng có nhấn phím Enter hay không
            if (event.key === 'Enter') {
                // Lấy dữ liệu từ ô input hiện tại
                const data = {};
                data[input.id] = input.value;
                //console.log('input.id không được nhân với 10 ', data[input.id])
                if (input.id === 'ZEZO1' || input.id === 'ZEZO2' || input.id === 'ZEZO_3'
                    || input.id === 'B1' || input.id === 'B2' || input.id === 'B3'
                    || input.id === 'G1_Feedback' || input.id === 'G2_Feedback' || input.id === 'G3_Feedback'
                    || input.id === 'G4_Feedback' || input.id === 'G1_Real_Tem' || input.id === 'G2_Real_Tem'
                    || input.id === 'G3_Real_Tem' || input.id === 'G4_Real_Tem') {
                    // Gửi dữ liệu qua server
                    socket.emit(eventName, data);
                }
                // // Gửi dữ liệu qua server
                // socket.emit(eventName, data);

                // // Vô hiệu hóa ô input hiện tại
                // input.disabled = true;
            }
        });
    });

    // Lấy nút Sửa và nút Lưu trong phạm vi của phần tử container
    const editButton = container.querySelector(`#${editButtonId}`);
    const saveButton = container.querySelector(`#${saveButtonId}`);

    // Xử lý sự kiện click trên nút Sửa
    editButton.addEventListener('click', () => {

        // Bỏ thuộc tính disabled trên tất cả các ô input để cho phép chỉnh sửa
        // inputs.forEach(input => {
        //     input.disabled = false;
        // });
        anable_edditting_khungHieuchinhcan = true;
        //console.log('anable_edditting_datThongsocan: ', anable_edditting_datThongsocan)
    });

    // Xử lý sự kiện click trên nút Lưu
    saveButton.addEventListener('click', () => {
        // Lấy dữ liệu từ các ô input có giá trị thay đổi
        console.log('anable_edditting_khungHieuchinhcan: ', anable_edditting_khungHieuchinhcan)
        if (anable_edditting_khungHieuchinhcan === true) {
            const data = {};
            inputs.forEach(input => {
                if (input.id === 'ZEZO1' || input.id === 'ZEZO2' || input.id === 'ZEZO_3'
                    || input.id === 'B1' || input.id === 'B2' || input.id === 'B3'
                    || input.id === 'G1_Feedback' || input.id === 'G2_Feedback' || input.id === 'G3_Feedback'
                    || input.id === 'G4_Feedback' || input.id === 'G1_Real_Tem' || input.id === 'G2_Real_Tem'
                    || input.id === 'G3_Real_Tem' || input.id === 'G4_Real_Tem') {
                    data[input.id] = input.value;
                    console.log('data[input.id]: ', data[input.id])
                } else {
                    // data[input.id] = input.value;
                }
            });
            console.log('data: ', data)
            if (data.length !== 0) {

                // Gửi dữ liệu qua server
                console.log('Gửi dữ liệu qua server: ', data)
                socket.emit(eventName, data);
            }

            // Vô hiệu hóa tất cả các ô input
            // inputs.forEach(input => {
            //     input.disabled = true;
            // });
            anable_edditting_khungHieuchinhcan = false;
        }

    });
}

// Lằng nghe sự kiện sau khi đã tải xong html
// Xử lý sự kiện DOMContentLoaded của đối tượng document
document.addEventListener('DOMContentLoaded', () => {
    console.log('Vào hàm xử lý sự kiện hoàn thành tải trang HTML ở FC1_Common')
    // Gọi hàm initSocketForm, xử lý sự kiện, chức năng cho khung cài đặt Thông số cân
    initSocketForm('container-datThongsocan', 'editThongsocan', 'saveThongsocan', 'saveDataThongsocan');
    // Gọi hàm initSocketForm, xử lý sự kiện, chức năng nhập liệu cho form Hiệu chỉnh cân
    initSocketFormHieuchinhcan('container-Hieuchinhcan', 'editHieuchinhcan', 'saveHieuchinhcan', 'saveDataHieuchinhcan');
});
// Tạo 1 tag tạm báo đang sửa dữ liệu
var Auto_Scr_data_edditting = false;
///// CHƯƠNG TRÌNH CON NÚT NHẤN SỬA //////
function fn_scrAuto_EditBtt() {
    // Cho hiển thị nút nhấn lưu
    fn_DataEdit('btt_scrAuto_Save', 'btt_scrAuto_Edit');
    // Cho tag báo đang sửa dữ liệu lên giá trị true
    Auto_Scr_data_edditting = true;
    // Kích hoạt chức năng sửa của các IO Field
    document.getElementById("set_ThoigianXa").disabled = false; // Tag bool
    document.getElementById("set_ThoigianTron").disabled = false; // Tag Byte
    document.getElementById("set_ThemNuoc").disabled = false; // Tag Integer
}
///// CHƯƠNG TRÌNH CON NÚT NHẤN LƯU //////
function fn_scrAuto_SaveBtt() {
    // Cho hiển thị nút nhấn sửa
    fn_DataEdit('btt_scrAuto_Edit', 'btt_scrAuto_Save');
    // Cho tag đang sửa dữ liệu về 0
    Auto_Scr_data_edditting = false;
    // Gửi dữ liệu cần sửa xuống PLC
    var data_edit_array = [document.getElementById('set_ThoigianXa').value * 10, document.getElementById('set_ThoigianTron').value * 10, document.getElementById('set_ThemNuoc').value];
    socket.emit('cmd_scrAuto_Edit_Data', data_edit_array);
    alert('Dữ liệu đã được lưu!'); // Đoạn này là mới chỉ gửi cho server thôi, còn lưu lên PLC chưa thì chưa biết, nên cần có một alert báo status thực tế
    // Vô hiệu hoá chức năng sửa của các IO Field
    document.getElementById("set_ThoigianXa").disabled = true;    // Tag bool
    document.getElementById("set_ThoigianTron").disabled = true;    // Tag Byte
    document.getElementById("set_ThemNuoc").disabled = true; // Tag Integer
}

// Chương trình con đọc dữ liệu lên IO Field ở trang Auto/Main
function fn_scrAuto_IOField_IO(tag, IOField, tofix) {
    socket.on(tag, function (data) {
        if (tofix == 0 & Auto_Scr_data_edditting != true) {
            document.getElementById(IOField).value = data;
        }
        else if (Auto_Scr_data_edditting != true) {
            // document.getElementById(IOField).value = data.toFixed(tofix);
            var num = Number(data);
            document.getElementById(IOField).value = num.toFixed(tofix);
        }
    });
}

// Chương trình con đọc dữ liệu lên IO Field thời gian Trộn và Xả, vì nó đặc biệc ở chỗ đơn vị trên PLC và web UI nó khác nhau nên tôi đã modify hàm fn_scrAuto_IOField_IO
function fn_scrAuto_IOField_TronXA(tag, IOField, tofix) {
    socket.on(tag, function (data) {
        if (tofix == 0 & Auto_Scr_data_edditting != true) {
            document.getElementById(IOField).value = data / 10;
        }
        else if (Auto_Scr_data_edditting != true) {
            // document.getElementById(IOField).value = data.toFixed(tofix) / 10;
            var num = Number(data) / 10;
            document.getElementById(IOField).value = num.toFixed(tofix);
            //console.log("Giá trị biến edit: ", document.getElementById(IOField).value);
        }
    });
}


// Hàm nhận dữ liệu XeBon từ PhieuCan được server gửi lên, 
// hàm này chỉ là nhận và hiển thị trong listbox thôi nhé, về việc xử lý khi click chọn Xebon thì tìm hàm  $('.scr_Auto_listbox-xebon').on('change', function ()
// Code VB6 cho chức năng này là cboXeBon_Click()
socket.on('scr_Auto_updateDataXebon', function (data) {
    console.log('Dữ liệu xe bồn được gửi từ server và hiện trong listbox ở mà hình Auto là: ', data)
    // Cập nhật listbox-donhang-khachhang
    var listbox = $('.scr_Auto_listbox-xebon');
    // listbox.empty(); //lệnh này đầu tiên sẽ xóa trắng listbox, nên nếu muốn để lại các option đã khai báo trong html thì bỏ đoạn này đi
    // Xóa các tùy chọn bắt đầu từ vị trí thứ hai trở đi, mục đích là để listbox khách hàng chỉ hiển thị chữ Vui lòng chọn .... mỗi khi nhấn vào nút ĐẶT CẤP PHÔI
    // listbox.find('option').slice(1).remove();
    for (var i = 0; i < data.length; i++) {
        var option = $('<option>' + data[i].BienSoXe + '</option>');
        option.data('rowData', data[i]);
        listbox.append(option);
    }
});

function mnuThiHanhDatCapPhoi_Click() {
    console.log('Vao menu DatCapPhoi')
    //Call DienDanhSachXe
    if (PhieuCan.DaChonXe === true) {
        //Me.cboXeBon.Text = PhieuCan.XeBon.BienSoXe;
        document.querySelector('.scr_Auto_listbox-xebon').value = PhieuCan.XeBon.BienSoXe;
        console.log('Đã chọn xe và hiển thị trên màn hình chính là: ', document.querySelector('.scr_Auto_listbox-xebon').value)
    } else {
        PhieuCan.DaChonXe = true;
        document.querySelector('.scr_Auto_listbox-xebon').value = PhieuCan.XeBon.BienSoXe;
        console.log('Đã đặt lại PhieuCan.DaChonXe = true và hiển thị trên màn hình chính là: ', document.querySelector('.scr_Auto_listbox-xebon').value)
        // Đồng bộ dữ liệu với server
        updateDataOnServer();
    }
    if (PhieuCan.DaChonPhieuCan === true) {
        console.log('PhieuCan.DaChonPhieuCan === true, và chuẩn bị vào hàm DatCacThongSoPhieuCanBanDau()')
        DatCacThongSoPhieuCanBanDau();
    }
    // Lệnh này sẽ tắt tính năng disable (hay nó sẽ được enable) nút Xe Trộn Mới, đồng nghĩa việc phải chọn vào nút THIẾT LẬP CẤU HÌNH thì mới enable nút Xe Trộn Mới được
    cmdXeTronMoi.disabled = false;
}

function showPhieucanHientai() {
    // Nếu muốn hiển thị chi tiết thông tin của Macbetong thì sửa đoạn code bên dưới cho đúng
    // for (let i = 0; i <= 3; i++) {
    //     this.txtDMTP[i] = PhieuCan.CapPhoi.DMTP[i];
    //     this.cboDoAmTP[i] = PhieuCan.CapPhoi.DoAmTP[i];
    // }
    // this.txtDMXi = PhieuCan.CapPhoi.DMXI;
    // this.txtDMNuoc = PhieuCan.CapPhoi.DMNUOC;
    // this.txtDMPG = PhieuCan.CapPhoi.DMPG;
    document.querySelector('#indicator_MaPhieu').value = PhieuCan.MaPhieuCan;
    document.querySelector('#indicator_Macbetong').value = PhieuCan.CapPhoi.TenMacBeTong;
    document.querySelector('#indicator_m3Me').value = PhieuCan.CapPhoi.Som3Me;
    document.querySelector('#indicator_soMe').value = PhieuCan.CapPhoi.SoMe;
    document.querySelector('#indicator_DonHang').value = PhieuCan.dondathang.MaDonDatHang;
    document.querySelector('#indicator_KhachHang').value = PhieuCan.dondathang.khachhang.TenKhachHang;
    console.log("-------------------------showPhieucanHientai lên popup------------------------------------");
    console.log('Thông tin mẻ hiện tại: ', PhieuCan.MaPhieuCan);
    console.log('Thông tin mẻ hiện tại: ', PhieuCan.CapPhoi.TenMacBeTong);
    console.log('Thông tin mẻ hiện tại: ', PhieuCan.CapPhoi.Som3Me);
    console.log('Thông tin mẻ hiện tại: ', PhieuCan.CapPhoi.SoMe);
    console.log('Thông tin mẻ hiện tại: ', PhieuCan.dondathang.MaDonDatHang);
    console.log('Thông tin mẻ hiện tại: ', PhieuCan.dondathang.khachhang.TenKhachHang);
    console.log('Thông tin mẻ hiện tại: ', PhieuCan);
    console.log("-------------------------showPhieucanHientai lên popup---------------------------------");
    // this.txtMacBeTong = PhieuCan.CapPhoi.TenMacBeTong;
    // this.txtDoSut = PhieuCan.CapPhoi.DoSutThongKe;
    let maPhieuElement = document.querySelector('#indicator_MaPhieu');
    if (maPhieuElement) {
        maPhieuElement.value = PhieuCan.MaPhieuCan;
        console.log('Thông tin mã Phiếu cân của mẻ hiện tại: ', PhieuCan.MaPhieuCan);
    } else {
        console.log('Element with id "indicator_MaPhieu" not found');
    }
}

// // Khi trang web được load thì cần làm gì
// function Form_Load() {

//     if (!PhieuCan.dondathang.MaDonDatHang) {
//         // cmdXeTronMoi.Enabled = false;
//     }

//     socket.emit('scr_Auto_getDataXebon');
//     PhieuCan.DaChonXe = false;

//     // for (let i = 0; i < 4; i++) {
//     //     ThongTinCapPhoi.DoAm[i] = 0;
//     // }
//     ThongTinCapPhoi.Som3Me = 1;
//     ThongTinCapPhoi.SoMe = 1;
//     ThongTinCapPhoi.DangDatCapPhoi = false;

//     // ThietLapBanDauDieuKhien(); // hàm này gọi hàm DocGiaTriBanDau, là hàm đọc các giá trị thêm nước, thời gian trộn/xả để hiển thị lên màn hình chính, cái này mình làm rồi nhé
// }

// Tạo một hàm để hiển thị popup
function showPopup() {
    // Lấy phần tử div của bạn
    var div = document.querySelector(".form-reportPhieucanDetail");

    // Tạo một phần tử div mới để làm nền cho popup
    var overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";

    // Tạo một phần tử div mới để chứa nội dung của popup
    var popup = document.createElement("div");
    popup.setAttribute("id", "my-popup"); // Thêm id duy nhất cho phần tử popup
    popup.style.position = "absolute";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "#fff";
    popup.style.padding = "20px";

    // Thêm nội dung của thẻ div của bạn vào phần tử div mới này
    popup.appendChild(div.cloneNode(true));

    // Tạo một nút đóng cho popup
    var closeButton = document.createElement("button");
    closeButton.innerHTML = "X";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";

    // Thêm sự kiện cho nút đóng để đóng popup khi nhấn vào nút này
    closeButton.addEventListener("click", function () {
        document.body.removeChild(overlay);
    });

    // Thêm nút đóng vào popup
    popup.appendChild(closeButton);

    // Thêm phần tử div mới này vào nền của popup
    overlay.appendChild(popup);

    // Thêm nền của popup vào trang web
    document.body.appendChild(overlay);

    // Thêm sự kiện cho phép đóng popup khi nhấn chuột bên ngoài popup
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            document.body.removeChild(overlay);
        }
    });

    // Thêm sự kiện cho phép di chuyển popup bằng chuột
    var isDragging = false;
    var currentX;
    var currentY;
    var initialX;
    var initialY;
    var xOffset = 0;
    var yOffset = 0;

    popup.addEventListener("mousedown", dragStart, false);
    document.addEventListener("mouseup", dragEnd, false);
    document.addEventListener("mousemove", drag, false);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === popup) {
            isDragging = true;
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;

        isDragging = false;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, popup);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }

    popup.querySelector('[data-label="MaPhieuCan"]').value = PhieuCan.MaPhieuCan;
    if (PhieuCan.MaPhieuCan !== 'undefined' || PhieuCan.MaPhieuCan !== "" || PhieuCan.MaPhieuCan !== null) {
        // Gửi giá trị MaPhieuCan đến server
        socket.emit('get_data_popup', PhieuCan.MaPhieuCan);
    }

    // Thêm sự kiện cho trường Mã Phiếu Xuất trong popup
    popup.querySelector('[data-label="MaPhieuCan"]').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            // Lấy giá trị MaPhieuCan từ input field
            let MaPhieuCan = this.value;
            // Lấy giá trị của MaPhieuCan hiện tại trong object PhieuCan
            console.log('Giá trị trong ô Mã Số Phiếu: ', MaPhieuCan)
            console.log('Loại dữ liệu của MaPhieuCan trong ô Mã Số Phiếu: ', typeof MaPhieuCan)
            // Gửi giá trị MaPhieuCan đến server
            socket.emit('get_data_popup', MaPhieuCan);
        }
    });
}

// Nhận dữ liệu từ server và hiển thị lên trang web
socket.on('data_popup', function (data) {
    console.log('Nội dung được nhận trên popup: ', data)
    // Kiểm tra xem đối tượng phieucan có tồn tại trong dữ liệu trả về từ server hay không
    // Kiểm tra xem popup có tồn tại hay không
    var popup = document.querySelector("#my-popup");
    if (!popup) {
        return;
    }
    if (!data.phieucan) {
        // Nếu đối tượng phieucan không tông tại, thì thông báo lỗi cho người dùng
        if (confirm('Mã phiếu cân số ' + popup.querySelector('[data-label="MaPhieuCan"]').value + ' không có dữ liệu phiếu cân. \nVui lòng chọn một mã phiếu cân khác. Cảm ơn.')) {
            popup.querySelector('[data-label="MaPhieuCan"]').focus();
        } else popup.querySelector('[data-label="MaPhieuCan"]').focus();
        return;
    }

    // Hiển thị dữ liệu lên các input field
    //popup.querySelector('[data-label="TenKhachHang"]').value = data.phieucan.TenKhachHang;
    popup.querySelector('[data-label="BienSoXe"]').value = data.phieucan.BienSoXe;
    popup.querySelector('[data-label="SoM3"]').value = data.phieucan.Som3Me;
    popup.querySelector('[data-label="MacBeTong"]').value = data.phieucan.MacBeTong;
    popup.querySelector('[data-label="Ngay"]').value = data.phieucan.Ngay;
    popup.querySelector('[data-label="GioXong"]').value = data.phieucan.GioXong;
    popup.querySelector('[data-label="DoSut"]').value = data.phieucan.DoSut;

    // Hiển thị dữ liệu lên bảng
    let table = popup.querySelector('#reportTablePhieuCanMaPhieuCan');
    let thead = table.getElementsByTagName('thead')[0];
    let tbody = table.getElementsByTagName('tbody')[0];
    let rows = tbody.getElementsByTagName('tr');
    // Điền dữ liệu vào title của bảng
    let titleRow = thead.getElementsByTagName('tr')[0];
    titleRow.cells[2].innerHTML = data.phieucan.TenTP1;
    titleRow.cells[3].innerHTML = data.phieucan.TenTP2;
    titleRow.cells[4].innerHTML = data.phieucan.TenTP3;
    titleRow.cells[5].innerHTML = data.phieucan.TenTP4;
    titleRow.cells[6].innerHTML = data.phieucan.TenXiMang;
    titleRow.cells[8].innerHTML = data.phieucan.TenPG1;
    titleRow.cells[9].innerHTML = data.phieucan.TenPG2;

    // Xóa dữ liệu cũ trong bảng
    for (let i = rows.length - 1; i >= 1; i--) {
        tbody.deleteRow(i);
    }

    // Điền dữ liệu vào bảng
    for (let i = 0; i < data.chitietphieucan.length; i++) {
        let chitietphieucan = data.chitietphieucan[i];
        // Tạo một hàng mới
        let row = tbody.insertRow(-1);
        // Điền dữ liệu vào các ô
        row.insertCell(-1).innerHTML = '';
        row.insertCell(-1).innerHTML = chitietphieucan.STTMe;
        row.insertCell(-1).innerHTML = formatNumber(chitietphieucan.TP1, "0.0");
        row.insertCell(-1).innerHTML = formatNumber(chitietphieucan.TP2, "0.0");
        row.insertCell(-1).innerHTML = formatNumber(chitietphieucan.TP3, "0.0");
        row.insertCell(-1).innerHTML = formatNumber(chitietphieucan.TP4, "0.0");
        row.insertCell(-1).innerHTML = formatNumber(chitietphieucan.Xi, "0.0");
        row.insertCell(-1).innerHTML = formatNumber(chitietphieucan.Nuoc, "0.0");
        row.insertCell(-1).innerHTML = formatNumber(chitietphieucan.PG1, "0.00");
        row.insertCell(-1).innerHTML = formatNumber(chitietphieucan.PG2, "0.00");
    }

    // Tạo hàng Định Mức
    let dinhmucRow = rows[0];
    dinhmucRow.cells[0].innerHTML = 'Định Mức';
    dinhmucRow.cells[1].innerHTML = '';
    dinhmucRow.cells[2].innerHTML = formatNumber(data.phieucan.DMTP1, "0.0");
    dinhmucRow.cells[3].innerHTML = formatNumber(data.phieucan.DMTP2, "0.0");
    dinhmucRow.cells[4].innerHTML = formatNumber(data.phieucan.DMTP3, "0.0");
    dinhmucRow.cells[5].innerHTML = formatNumber(data.phieucan.DMTP4, "0.0");
    dinhmucRow.cells[6].innerHTML = formatNumber(data.phieucan.DMXi, "0.0");
    dinhmucRow.cells[7].innerHTML = formatNumber(data.phieucan.DMNuoc, "0.0");
    dinhmucRow.cells[8].innerHTML = formatNumber(data.phieucan.DMPG1, "0.00");
    dinhmucRow.cells[9].innerHTML = formatNumber(data.phieucan.DMPG2, "0.00");

    // Tạo hàng Tổng mới
    let tongRow = tbody.insertRow(-1);
    tongRow.insertCell(-1).innerHTML = 'Tổng';
    tongRow.insertCell(-1).innerHTML = ''; // Ô trống ngay sau ô chứa chữ "Tổng"
    for (let i = 2; i < 10; i++) {
        let sum = 0;
        for (let j = 1; j < rows.length - 1; j++) {
            let cell = rows[j].cells[i];
            if (cell) {
                sum += Number(cell.innerHTML);
            }
        }
        tongRow.insertCell(-1).innerHTML = sum.toFixed(1);
    }
});

// ///////////////////////////////////////////////////////// Hàm lắng nghe sự kiện HTML đã tải xong cấu trúc, chưa tải xong video, ảnh, ... ///////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    console.log("Đây là hàm lắng nghe sự kiện DOM ở màn hình Auto");
    console.log('Dữ liệu PhieuCan tại thời điểm vừa load xong HTML là: ', PhieuCan)
    console.log('Dữ liệu ThuThap tại thời điểm vừa load xong HTML là: ', ThuThap)
    console.log('Dữ liệu CuaVatLieu tại thời điểm vừa load xong HTML là: ', CuaVatLieu)
    // Đồng bộ dữ liệu đến server
    console.log('Gọi hàm updateDataOnServer để yêu cầu server gửi lên dữ liệu từ server sau lần kết nối đầu tiên của client');
    updateDataOnServer();
    // update objects with the data received from the server
    socket.on('syncData', (data) => {
        // update your objects with the data received from the server
        CapPhoi = data.CapPhoi;
        KhachHang = data.KhachHang;
        DonDatHang = data.DonDatHang;
        XeBon = data.XeBon;
        PhieuGiaoBeTong = data.PhieuGiaoBeTong;
        PhieuCan = data.PhieuCan;
        DaCanXong = data.DaCanXong;
        ThongKe = data.ThongKe;
        ThuThap = data.ThuThap;
        CuaVatLieu = data.CuaVatLieu;
        ThongTinCapPhoi = data.ThongTinCapPhoi;
    });
    console.log('Updated objects with the data received from the server');
    console.log('Dữ liệu PhieuCan tại thời điểm sau khi gọi hàm updateDataOnServer là: ', PhieuCan)
    console.log('Dữ liệu ThuThap tại thời điểm sau khi gọi hàm updateDataOnServer là: ', ThuThap)
    console.log('Dữ liệu CuaVatLieu tại thời điểm sau khi gọi hàm updateDataOnServer là: ', CuaVatLieu)
    // Tiến hành thực hiện một số khởi tạo sau khi load xong
    ///////////////////////////////////////////////////// Hàm gửi yêu cầu server get Cửa vật liệu //////////////////////////////////////////////////////////////
    console.log('Gọi hàm getCuaVatLieu');
    socket.emit('getCuaVatLieu');
    console.log('Đã gọi hàm getCuaVatLieu');
    // Gọi hàm đọc Phiếu cân gần nhất để có dữ liệu đã cân trước đó
    // Call LatestPhieucanValues and pass showPhieucanHientai as the callback function
    console.log('Gọi hàm lấy Phiếu cân gần nhất');
    LatestPhieucanValues(socket, showPhieucanHientai);

    console.log('Đã gọi hàm lấy Phiếu cân gần nhất');
    console.log('Dữ liệu PhieuCan tại thời điểm sau khi gọi hàm LatestPhieucanValues là: ', PhieuCan)
    console.log('Dữ liệu ThuThap tại thời điểm sau khi gọi hàm LatestPhieucanValues là: ', ThuThap)
    console.log('Dữ liệu CuaVatLieu tại thời điểm sau khi gọi hàm LatestPhieucanValues là: ', CuaVatLieu)

    // // tat flag da chon phieu can de ko ghi lai phieu can khi chua chon,
    // // Việc cài đặt các thông số ban đầu khi load chương trình nên được thực hiện dưới server
    // PhieuCan.DaChonPhieuCan = false;
    // ThuThap.CoMeDangTron = false;
    // ThuThap.ChonVitMacDinh = false;
    // ThuThap.SoLanLoiTinHieu = 0

    // Tạm thời disable nút Xe Tron Moi sau khi reload lại trang web
    // cmdXeTronMoi.disabled = true;

    // Hàm gửi yêu cầu server get data Xe bon, đặt ở đây thì không cần click vào nút AUTO, chỉ cần Refresh là đc
    // Ở file VB gốc, có hàm Form_Load của Main form, sẽ gọi danh sách xe khi form được Load
    socket.emit('scr_Auto_getDataXebon');

    // Hàm xử lý khi có sự kiện click lên nút nhấn btt_Screen_Auto
    document.querySelector('#btt_Screen_Auto').addEventListener('click', function () {
        console.log('Đã gọi được sư kiện click nút Auto, và gửi đi tin nhắn getCuaVtLieu')
        // Hàm gửi yêu cầu server get Cửa vật liệu
        socket.emit('getCuaVatLieu');

        fn_ScreenChange('Screen_Auto', 'Screen_Manu', 'Screen_datCapphoi', 'Screen_report');
        fn_ShowByClass('bang_Phieubetong');
        // Vì sau khi đặt cấp phối PhieuCan không cập nhật mới vào khung hiển thị nên gọi hàm này khi nhấn HOME mục đích là để hiển thị lên khung popup
        showPhieucanHientai();
        // Chú ý: Đặt log ở đây sẽ không in được MaPhieuCan sau khi nhấn nút Auto, vì lúc này PhieuCan chưa được đọc (chưa đc lưu), 
        // để có thể lấy được MaPhieuCan thì phải nhấn nút DatCapPhoi để gọi hàm đọc Phieucan gần nhất, lúc này sẽ có MaPhieuCan để hiển thị
        // update: đã xử lý xong hiện tượng trên băng cách sử dụng hàm callback sau khi gọi hàm lấy Phiêu cân gần nhất
        console.log('Kiểm tra PhieuCan.MaPhieuCan: ', PhieuCan.MaPhieuCan)
        console.log('Kiểm tra dữ liệu PhieuCan tại thời điểm nhấn nút HOME: ', PhieuCan)
    });

    // Hàm xử lý khi có sự kiện click lên nút nhấn btt_Screen_Manu
    $('#btt_Screen_Manu').on('click', function () { // Hàm này sử dụng cú pháp của Query, còn một cách khác sử dụng javascript
        fn_ScreenChange('Screen_Manu', 'Screen_Auto', 'Screen_datCapphoi', 'Screen_report');
        fn_ShowById('Screen_Manu');
        fn_HideByClass('bang_Phieubetong');
        fn_Table01_SQL_Show();
        // Khi chọn menu quản lý Mac bê tông thì
        ThongTinCapPhoi.DangDatCapPhoi = false;
        // Đồng bộ dữ liệu đến server
        updateDataOnServer();
    });

    // Hàm xử lý khi có sự kiện click lên nút nhấn btt_Screen_datCapphoi
    $('#btt_Screen_datCapphoi').on('click', function () { // Hàm này sử dụng cú pháp của Query, còn một cách khác sử dụng javascript, phải đảm bảo query được gọi trước khi gọi js này
        fn_ScreenChange('Screen_datCapphoi', 'Screen_Manu', 'Screen_Auto', 'Screen_report');
        fn_ShowById('Screen_datCapphoi');
        fn_HideByClass('bang_Phieubetong');
        fn_Table02_SQL_Show();
        // Khi tiến hành chọ đạt cấp phối thì
        mnuThiHanhDatCapPhoi_Click();
    });
    // Hàm xử lý khi có sự kiện click lên nút nhấn btt_Screen_report
    $('#btt_Screen_report').on('click', function () { // Hàm này sử dụng cú pháp của Query, còn một cách khác sử dụng javascript, phải đảm bảo query được gọi trước khi gọi js này
        fn_ScreenChange('Screen_report', 'Screen_Manu', 'Screen_Auto', 'Screen_datCapphoi');
        fn_ShowById('Screen_report');
        fn_HideByClass('bang_Phieubetong');
        fn_Table03_SQL_Show();
        // Khi tiến hành chọ đạt cấp phối thì
        // mnuThiHanhDatCapPhoi_Click();
        document.querySelector('[data-label="MaPhieuCan"]').value = PhieuCan.MaPhieuCan;
        if (PhieuCan.MaPhieuCan !== 'undefined' || PhieuCan.MaPhieuCan !== "" || PhieuCan.MaPhieuCan !== null) {
            // Gửi giá trị MaPhieuCan đến server
            socket.emit('get_data', PhieuCan.MaPhieuCan);
        }
        // Gọi danh sách khách hàng cho form thống kê
        socket.emit('getDataReportKhachhang');
        // Gọi danh sách đơn hàng cho form thống kê
        // socket.emit('getDataReportDonHang');
    });
    // Phải đưa hàm thay đổi sự kiện này vào trong hàm lắng nghe event, vì file js chứa hàm này nó được gọi trước khi HTML load xong, vậy nên khi nhấn vào listbox nó ko work,
    // chỉ khi mình đưa vào hàm lắng nghe này thì nó mới hoạt động, do khi đó khung HTML đã được gọi xong, vậy nên chọn list nó mới chạy hàm được
    $('.scr_Auto_listbox-xebon').on('change', function () { // Phải đảm bảo query đã được gọi trước khi file js này được gọi, duyphuoc
        var selectedOption = $(this).find('option:selected');
        var rowData = selectedOption.data('rowData');
        // Lấy giá trị đang được chọn bằng cách sử dụng thuộc tính value của phần tử select
        let selectedValue1 = document.querySelector('.scr_Auto_listbox-xebon').value;
        console.log(`Giá trị đang được chọn (cách 1): ${selectedValue1}`);

        // Lấy giá trị đang được chọn bằng cách sử dụng phương thức val() của đối tượng jQuery
        let selectedValue2 = $('.scr_Auto_listbox-xebon').val();
        console.log(`Giá trị đang được chọn (cách 2): ${selectedValue2}`);
        if (selectedValue1.length > 0) {
            // $('#xebon_recently').val(rowData.BienSoXe); // Việc hiển thị Biển số xe sẽ được thực hiện khi chọn XeTronMoi
            // Cập nhật giá trị của các thuộc tính trong đối tượng PhieuCan.XeBon
            PhieuCan.XeBon.STT = rowData.STT;
            PhieuCan.XeBon.BienSoXe = rowData.BienSoXe;
            PhieuCan.XeBon.TenLaiXe = rowData.TenLaiXe;
            PhieuCan.DaChonXe = true;

            // Đồng bộ dữ liệu đến server
            updateDataOnServer();

            // Chỗ này theo VB code là sẽ cần ghi dữ liệu xe bồn của pHiếu Cân, tìm ở cboXeBon_Click()
            // Nhiệm vụ của đoạn này là tìm record có MaPhieuCan trung với PhieuCan.MaPhieuCan, 
            // sau đó cập nhật trường MaXe với PhieuCan.XeBon.STT, trường BienSoXe với PhieuCan.XeBon.BienSoXe
            // Hãy kiểm tra xem có chỗ nào khác đã thực hiện việc này trong chương trình của mình chưa


        } else {
            PhieuCan.DaChonXe = false;

            // Đồng bộ dữ liệu đến server
            updateDataOnServer();
        }
        // console.log('Đã chọn xe: ', PhieuCan.DaChonXe)
        // console.log('Kiểm tra dữ liệu XeBon: ', PhieuCan.XeBon.STT)
        // console.log('Kiểm tra dữ liệu XeBon: ', PhieuCan.XeBon.BienSoXe)
        // console.log('Kiểm tra dữ liệu XeBon: ', PhieuCan.XeBon.TenLaiXe)
        // console.log('Hiện tại Mã Phiếu Cân là: ', PhieuCan.MaPhieuCan)
        // Cập nhật giá trị của ba trường input
        // $('#sttXebon').val(rowData.STT);
        // $('#bienso').val(rowData.BienSoXe);
        // $('#taixe').val(rowData.TenLaiXe);
    });

    // // Thêm sự kiện cho nút bấm của bạn để hiển thị popup
    // document.querySelector("#bttAuto_ChitietPhieucan").addEventListener("click", showPopup);

    // Thêm sự kiện cho nút bấm của bạn để hiển thị popup
    document.querySelector("#bttAuto_ChitietPhieucan").addEventListener("click", function () {
        // Hiển thị popup
        showPopup();
    });

});





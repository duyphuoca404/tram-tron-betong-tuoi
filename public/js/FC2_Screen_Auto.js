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
// Hàm cập nhật tên của các Cửa vật liệu, xi, PG vào bảng trong màn hình chính
function updateTableHeaders(CuaVatLieu) {
    console.log('Đã vào hàm cập nhật Cuavatlieu từ bảng cuavatlieu')
    // Lấy các phần tử thẻ th trong bảng
    let tableHeaders = document.querySelectorAll(".responsive-table-input-matrix thead th");

    // Điền giá trị của thuộc tính Cua vào các ô tương ứng
    for (let i = 0; i < CuaVatLieu.Cua.length; i++) {
        tableHeaders[i + 2].textContent = CuaVatLieu.Cua[i];
        // console.log('table header_Cua_' + (i + 2) + ' _ ' + tableHeaders[i + 2].textContent)
    }

    // Điền giá trị của thuộc tính Xi vào ô tương ứng
    tableHeaders[6].textContent = CuaVatLieu.Xi;
    // console.log('table header_Xi_6: ' + tableHeaders[6].textContent)
    // console.log('Đã cập nhật xong tên của các TP và Xi')
    // Điền giá trị của thuộc tính PG vào các ô tương ứng
    for (let i = 0; i < CuaVatLieu.PG.length; i++) {
        tableHeaders[i + 8].textContent = CuaVatLieu.PG[i];
        // console.log('table header_PG_' + (i + 8) + ' _ ' + tableHeaders[i + 8].textContent)
    }
    console.log('Đã cập nhật xong tên các CuaVatLieu từ bảng cuavatlieu')
}

// Sử dụng hàm updateTableHeaders để cập nhật nội dung của bảng
// let CuaVatLieu = {
//     Cua: ['TP1', 'TP2', 'TP3', 'TP4'],
//     Xi: 'Xi Măng',
//     PG: ['Phụ Gia 1', 'Phụ Gia 2'],
//     ThuThapPG: false
// };

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
    //Call DienDanhSachXe
    if (PhieuCan.DaChonXe === true) {
        //Me.cboXeBon.Text = PhieuCan.XeBon.BienSoXe;
        document.querySelector('.scr_Auto_listbox-xebon').value = PhieuCan.XeBon.BienSoXe;

    } else {
        PhieuCan.DaChonXe = true;
        document.querySelector('.scr_Auto_listbox-xebon').value = PhieuCan.XeBon.BienSoXe;
        //MsgBox("Da chon xe trong Dat cap phoi", vbOKOnly);
    }
    if (PhieuCan.DaChonPhieuCan === true) {
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

// ///////////////////////////////////////////////////////// Hàm lắng nghe sự kiện HTML đã tải xong cấu trúc, chưa tải xong video, ảnh, ... ///////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    console.log("Đây là hàm lắng nghe sự kiện DOM ở màn hình Auto");
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
    console.log('updated objects with the data received from the server');
    // Tiến hành thực hiện một số khởi tạo sau khi load xong
    ///////////////////////////////////////////////////// Hàm gửi yêu cầu server get Cửa vật liệu //////////////////////////////////////////////////////////////
    socket.emit('getCuaVatLieu');

    // Gọi hàm đọc Phiếu cân gần nhất để có dữ liệu đã cân trước đó
    // Call LatestPhieucanValues and pass showPhieucanHientai as the callback function
    LatestPhieucanValues(socket, showPhieucanHientai);
    // tat flag da chon phieu can de ko ghi lai phieu can khi chua chon
    PhieuCan.DaChonPhieuCan = false;
    ThuThap.CoMeDangTron = false;
    ThuThap.ChonVitMacDinh = false;
    ThuThap.SoLanLoiTinHieu = 0

    // Tạm thời disable nút Xe Tron Moi sau khi reload lại trang web
    // cmdXeTronMoi.disabled = true;

    // Hàm gửi yêu cầu server get data Xe bon, đặt ở đây thì không cần click vào nút AUTO, chỉ cần Refresh là đc
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

            // Chỗ này theo VB code là sẽ cần ghi dữ liệu xe bồn của pHiếu Cân, tìm ở cboXeBon_Click()
            // Nhiệm vụ của đoạn này là tìm record có MaPhieuCan trung với PhieuCan.MaPhieuCan, 
            // sau đó cập nhật trường MaXe với PhieuCan.XeBon.STT, trường BienSoXe với PhieuCan.XeBon.BienSoXe
            // Hãy kiểm tra xem có chỗ nào khác đã thực hiện việc này trong chương trình của mình chưa


        } else {
            PhieuCan.DaChonXe = false;
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

});





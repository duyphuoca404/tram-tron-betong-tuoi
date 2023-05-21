///// CHƯƠNG TRÌNH CON NÚT NHẤN SỬA //////
// Tạo 1 tag tạm báo đang sửa dữ liệu
var Auto_Scr_data_edditting = false;
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
    var data_edit_array = [document.getElementById('set_ThoigianXa').value * 10,
    document.getElementById('set_ThoigianTron').value * 10,
    document.getElementById('set_ThemNuoc').value];
    socket.emit('cmd_scrAuto_Edit_Data', data_edit_array);
    alert('Dữ liệu đã được lưu!');
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
            document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}

// Chương trình con đọc dữ liệu lên IO Field ở trang Auto/Main
function fn_scrAuto_IOField_TronXA(tag, IOField, tofix) {
    socket.on(tag, function (data) {
        if (tofix == 0 & Auto_Scr_data_edditting != true) {
            document.getElementById(IOField).value = data / 10;
        }
        else if (Auto_Scr_data_edditting != true) {
            document.getElementById(IOField).value = data.toFixed(tofix) / 10;
        }
    });
}
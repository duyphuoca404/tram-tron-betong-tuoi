///// CHƯƠNG TRÌNH CON NÚT NHẤN SỬA //////
// Tạo 1 tag tạm báo đang sửa dữ liệu
var Auto_Scr_data_edditting = false;
function fn_scrAuto_EditBtt(){
    // Cho hiển thị nút nhấn lưu
    fn_DataEdit('btt_scrAuto_Save','btt_scrAuto_Edit');
    // Cho tag báo đang sửa dữ liệu lên giá trị true
    Auto_Scr_data_edditting = true; 
    // Kích hoạt chức năng sửa của các IO Field
    document.getElementById("set_Weight1").disabled = false; // Tag bool
    document.getElementById("set_Weight2").disabled = false; // Tag Byte
    document.getElementById("set_Time_Tron").disabled = false; // Tag Integer
}
///// CHƯƠNG TRÌNH CON NÚT NHẤN LƯU //////
function fn_scrAuto_SaveBtt(){
// Cho hiển thị nút nhấn sửa
fn_DataEdit('btt_scrAuto_Edit','btt_scrAuto_Save');
    // Cho tag đang sửa dữ liệu về 0
    Auto_Scr_data_edditting = false; 
    // Gửi dữ liệu cần sửa xuống PLC
    var data_edit_array = [document.getElementById('set_Weight1').value,
                            document.getElementById('set_Weight2').value,
                            document.getElementById('set_Time_Tron').value];
    socket.emit('cmd_Edit_Data', data_edit_array);
    alert('Dữ liệu đã được lưu!');
    // Vô hiệu hoá chức năng sửa của các IO Field
    document.getElementById("set_Weight1").disabled = true;    // Tag bool
    document.getElementById("set_Weight2").disabled = true;    // Tag Byte
    document.getElementById("set_Time_Tron").disabled = true; // Tag Integer
}
 
// Chương trình con đọc dữ liệu lên IO Field
function fn_scrAuto_IOField_IO(tag, IOField, tofix)
{
    socket.on(tag, function(data){
        if (tofix == 0 & Auto_Scr_data_edditting != true)
        {
            document.getElementById(IOField).value = data;
        }
        else if(Auto_Scr_data_edditting != true)
        {
            document.getElementById(IOField).value = data.toFixed(tofix);
        }
    });
}
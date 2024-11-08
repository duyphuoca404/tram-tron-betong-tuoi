////////////////////////////////Đoạn chương trình tra cứu và cập nhật các bảng và listbox //////////////////////////////
// 2 Cách viết hàm updateDatabase:
// Cách 1:
// function updateDatabase() {
//     console.log('Gọi hàm updateDatabase');
//     // Lấy giá trị từ các trường nhập liệu
//     let field1 = document.querySelector('.form-container-macBetong-left > div:nth-child(1) > input').value || "0";
//     let field2 = document.querySelector('.form-container-macBetong-left > div:nth-child(2) > input').value || "0";
//     let field3 = document.querySelector('.form-container-macBetong-left > div:nth-child(3) > input').value || "0";
//     let field4 = document.querySelector('.form-container-macBetong-left > div:nth-child(4) > input').value || "0";
//     let field5 = document.querySelector('.form-container-macBetong-left > div:nth-child(5) > input').value || "0";
//     let field6 = document.querySelector('.form-container-macBetong-left > div:nth-child(6) > input').value || "0";
//     let field7 = document.querySelector('.form-container-macBetong-right > div:nth-child(1) > input').value || "0";
//     let field8 = document.querySelector('.form-container-macBetong-right > div:nth-child(2) > input').value || "0";
//     let field9 = document.querySelector('.form-container-macBetong-right > div:nth-child(3) > input').value || "0";
//     let field10 = document.querySelector('.form-container-macBetong-right > div:nth-child(4) > input').value || "0";
//     let field11 = document.querySelector('.form-container-macBetong-right > div:nth-child(5) > input').value || "0";
//     // Gửi sự kiện updateDatabase cùng với dữ liệu từ các trường nhập liệu đến máy chủ
//     socket.emit('updateDatabase', { field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11 });
// }
// Cách 2: cách này khi thay đổi cấu trúc html sẽ không cần sửa code như cách 1
function updateDatabase() {
    console.log('Gọi hàm updateDatabase');
    // Lấy giá trị từ các trường nhập liệu
    let inputs = document.querySelectorAll('.form-container-macBetong input[data-label]');
    let data = {};
    inputs.forEach(input => {
        let label = input.getAttribute('data-label');
        data[label] = input.value || "0";
    });
    // Kiểm tra giá trị trả về của các câu lệnh document.querySelector
    console.log('Dữ liệu lấy được từ các trường input là: ', data);
    // Gửi sự kiện updateDatabase cùng với dữ liệu từ các trường nhập liệu đến máy chủ
    socket.emit('updateDatabase', data);
}

// // Ham kiểm tra các textbox nhập vào có đúng là số không, nếu đúng thì gọi hàm
function validateNumberInput() {
    let inputs = document.querySelectorAll(".form-container-macBetong input[type='text']:not(.exclude)");
    let invalidInput = false;
    let invalidLabel = "";

    inputs.forEach(function (input) {
        if (input.value !== "" && input.value !== "null" && isNaN(input.value)) {
            invalidInput = true;
            invalidLabel = input.getAttribute("data-label");
        }
    });

    if (invalidInput) {
        alert("Vui lòng nhập đúng giá trị số vào " + invalidLabel + "!");
        return false;
    } else {
        inputs.forEach(function (input) {
            if (input.value === "null") {
                input.value = "";
            }
        });
        updateDatabase();
        //fn_Table01_SQL_Show(); // Nên xét tình huống có thực sự cần thiết không mới gọi hàm này
        // Sau khi kiểm tra các input field có được nhập đúng dữ liệu số không, nếu đúng thì sẽ gọi hàm updateDatabase() để yêu cầu phía server cập nhật dữ liệu MacBeTong
        // Tiếp theo là sẽ gửi bức điện msg_SQL_Show để yêu cầu server lấy dữ liệu MacBeTong mới nhất, sau đó gửi lại bức điện SQL_Show để yêu cầu phí client cập nhật các bảng/listbox cần thiết
        socket.emit("msg_SQL_Show", "true");
        console.log('Gửi sms msg_SQL_Show yêu cầu show table 01, 02');
        return true;
    }
}
// Chương trình con đọc dữ liệu bảng MaBeTong để show lên form Macbetong, nhấn nút QUản lý chung
function fn_Table01_SQL_Show() {
    socket.emit("msg_SQL_Show", "true");
    console.log('Gửi sms msg_SQL_Show trong hàm fn_Table01_SQL_Show để yêu cầu show table 01, 02');
    socket.emit('getDataDonhang');
    socket.emit('getDataKhachhang');
    socket.emit('getDataXebon');
    showPhieucanHientai();
}

// Chương trình con đọc dữ liệu SQL để show lên bảng form Datcapphoi, nhấn nút Thiết lập cấu hình
function fn_Table02_SQL_Show() {
    socket.emit("msg_SQL_Show", "true");
    console.log('Gọi hàm  fn_Table02_SQL_Show() để Gửi sms msg_SQL_Show yêu cầu show table 01, 02');
    socket.emit('getDataDatcapphoiKhachhang');
    console.log('Gửi sms yêu cầu server cập nhật dữ liệu khách hàng');
    // // Emit a socket event to request the most recent MaPhieuCan, Som3Me, and SoMe values from the phieucan table
    // //socket.emit('getLatestPhieucanValues');
    // // Call LatestPhieucanValues and pass showPhieucanHientai as the callback function
    // LatestPhieucanValues(socket, showPhieucanHientai);

    // Hàm gửi yêu cầu server để lấy tên các Cửa vật liệu, Xi và PG
    socket.emit('getCuaVatLieu');

}
// Chương trình con đọc dữ liệu SQL để show lên bảng report, nhấn nút Báo Cáo
function fn_Table03_SQL_Show() {
    socket.emit("msg_report_Show", "true");
    console.log('Gửi sms yêu cầu server gửi qua lịch sử của Chi tiết phiếu cân');

}
// Chương trình con hiển thị SQL ra bảng
function fn_table_01(data) {
    if (data) {
        $("#macBetong tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                txt += "<tr><td>" + data[i].STT
                    + "</td><td>" + data[i].TenMacBeTong
                    + "</td><td>" + data[i].TP1
                    + "</td><td>" + data[i].TP2
                    + "</td><td>" + data[i].TP3
                    + "</td><td>" + data[i].TP4
                    + "</td><td>" + data[i].Xi
                    + "</td><td>" + data[i].Nuoc
                    + "</td><td>" + data[i].PG1
                    + "</td><td>" + data[i].PG2
                    + "</td><td>" + data[i].DoSutThongKe
                    + "</td></tr>";
            }
            if (txt != "") {
                txt += "</tbody>";
                $("#macBetong").append(txt);
            }
        }
    }
}
// Chương trình con hiển thị SQL ra bảng
function fn_table_02(data) {
    if (data) {
        $("#datCapphoi tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                // Lưu trữ dữ liệu đầy đủ của hàng trong thuộc tính data của phần tử tr
                txt += `<tr data-row-data='${JSON.stringify(data[i])}'>`;
                txt += "<td>" + data[i].STT + "</td>";
                txt += "<td>" + data[i].TenMacBeTong + "</td>";
                txt += "</tr>";
            }
            if (txt != "") {
                txt += "</tbody>";
                $("#datCapphoi").append(txt);
            }
        }
    }
}
// Chương trình con hiển thị SQL ra bảng
function fn_table_03(data) {
    if (data) {
        $("#reportPhieucan tbody").empty();
        var len = data.length;
        var txt = "<tbody>";
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                txt += "<tr><td>" + data[i].MaPhieuCan
                    + "</td><td>" + data[i].Gio
                    + "</td><td>" + data[i].STTMe
                    + "</td><td>" + data[i].TP1
                    + "</td><td>" + data[i].TP2
                    + "</td><td>" + data[i].TP3
                    + "</td><td>" + data[i].TP4
                    + "</td><td>" + data[i].Xi
                    + "</td><td>" + data[i].Nuoc
                    + "</td><td>" + data[i].PG1
                    + "</td><td>" + data[i].PG2
                    + "</td></tr>";
            }
            if (txt != "") {
                txt += "</tbody>";
                $("#reportPhieucan").append(txt);
            }
        }
    }
}
// Hàm lắng nghe sự kiện, khi có một bức điện "SQL_Show" sẽ thực hiện việc gì
socket.on('SQL_Show', function (data) {
    fn_table_01(data);
    fn_table_02(data);
    console.log('Nhận bức điện SQL_Show từ server để gọi hàm show lên bảng 01 và 02');
});

// Hàm lắng nghe sự kiện, khi có một bức điện "report_Show" sẽ thực hiện việc gì
socket.on('report_Show', function (data) {
    fn_table_03(data);
    console.log('Nhận bức điện report_Show từ server để gọi hàm show lên bảng 03 Lịch sử phiếu cân');
});

socket.on('updateDataMacbetongSuccess', function () {
    // Xử lý thông báo thành công từ server
    alert("Đã cập nhật thành công Mác bê tông " + "!");
});

// Tìm kiếm SQL theo khoảng thời gian
function fn_SQL_By_Time() {
    ThongKe.MaPhieuCan = document.querySelector('#maphieucan').value;
    ThongKe.BienSoXe = document.querySelector('[data-label="bienSoXe"]').value;
    ThongKe.MacBetong = document.querySelector('[data-label="macBetong"]').value;
    var val = [document.getElementById('dtpk_Search_Start').value, document.getElementById('dtpk_Search_End').value, ThongKe.MaDonDatHang, ThongKe.TenKhachHang, ThongKe.MaPhieuCan, ThongKe.BienSoXe, ThongKe.MacBetong];
    socket.emit('msg_SQL_ByTime', val);
    socket.on('SQL_ByTime', function (data) {
        fn_table_03(data); // Show sdata
    });
}



//////////////Hàm hiển thị nội dung các input sau khi một dòng của table được chọn (chỉ hiển thị, chưa tính toán) ////////////////////////////
function addRowClickListener(tableSelector, inputSelector) {
    const table = document.querySelector(tableSelector);
    const inputs = document.querySelectorAll(inputSelector);
    let selectedRow;

    table.addEventListener('click', (event) => {
        const row = event.target.closest('tr');
        if (!row) return;

        if (selectedRow) {
            selectedRow.classList.remove('selected');
        }
        row.classList.add('selected');
        selectedRow = row;

        const cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
            inputs[index].value = cell.textContent;
        });
    });
}
///////////////////////////// Hàm chon một row trong bảng và cập nhật giá trị lên input field theo một công thức đặt trước ////////////////////
function updateInputsOnRowClick(tableSelector, inputSelector) {
    // Lấy phần tử bảng và các phần tử input
    let table = document.querySelector(tableSelector);
    let inputs = document.querySelectorAll(inputSelector);

    // Thêm sự kiện click vào bảng
    table.addEventListener("click", event => {
        // Lấy hàng được click
        let row = event.target.closest("tr");
        if (!row) return;

        // Lấy dữ liệu của hàng từ thuộc tính data của phần tử tr
        let rowData = JSON.parse(row.dataset.rowData);
        //console.log(rowData)
        // Duyệt qua từng thuộc tính của dữ liệu hàng và cập nhật giá trị của phần tử input tương ứng
        // Object.keys(rowData).forEach((key, index) => {
        //     if (index < inputs.length) {
        //         inputs[index].value = rowData[key];
        //     }
        // });
        for (let key in rowData) {
            let input = document.querySelector(`input[data-label="${key}"]`);
            if (input) {
                input.value = rowData[key];
            }
            // console.log(key);
            // console.log(input);
            // console.log(input.value);
        }

        updateInputFields(rowData);
    });

    function updateInputFields(rowData) {
        let SoM3Me = parseFloat(document.querySelector('#som3me-datCapphoi').value);

        if (isNaN(SoM3Me)) {
            for (let i = 1; i <= 4; i++) {
                document.querySelector(`input[data-label="TP${i}"]`).value = '';
            }
            document.querySelector(`input[data-label="Nuoc"]`).value = '';
            document.querySelector(`input[data-label="Xi"]`).value = '';
            return;
        }
        for (let i = 1; i <= 4; i++) {
            let TPi = parseFloat(rowData[`TP${i}`]);
            let DoAmTPiValue = document.querySelector(`#DoAmTP${i}`).value;
            console.log('DoAmTP' + i + " : " + document.querySelector(`#DoAmTP${i}`).value)
            // let DoAmTPi = DoAmTPiValue === '' ? 0 : parseFloat(DoAmTPiValue); // đây là câu lệnh if rút gọn
            let DoAmTPi;
            if (DoAmTPiValue === '') {
                DoAmTPi = 0;
            } else {
                DoAmTPi = parseFloat(DoAmTPiValue);
            }
            document.querySelector(`input[data-label="TP${i}"]`).value = (TPi * SoM3Me * (DoAmTPi * 0.01 + 1)).toFixed(1);
            let Nuoc = parseFloat(rowData['Nuoc']);
            document.querySelector(`input[data-label="Nuoc"]`).value = (Nuoc * SoM3Me - (DoAmTPi * 0.01 * TPi)).toFixed(1);
        }

        let Xi = parseFloat(rowData['Xi']);
        document.querySelector(`input[data-label="Xi"]`).value = (Xi * SoM3Me).toFixed(1);
    }

    document.querySelector('#som3me-datCapphoi').addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            updateInputFields(getSelectedRowData(tableSelector));
        }
    });

    for (let i = 1; i <= 4; i++) {
        document.querySelector(`#DoAmTP${i}`).addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                updateInputFields(getSelectedRowData(tableSelector));
            }
        });
    }

    inputs.forEach((input, index) => {
        input.addEventListener('keyup', event => {
            if (event.key === 'Enter') {
                let nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
    });
}

function getSelectedRowData(tableSelector) {
    let table = document.querySelector(tableSelector);
    let selectedRow = table.querySelector('tr.selected');
    if (selectedRow) {
        return JSON.parse(selectedRow.dataset.rowData);
    } else {
        return {};
    }
}
///////////////////////////// Tra cứu cập nhật dữ liệu Khách hàng /////////////////////////////////////////////////////////////////////////////
socket.on('updateDataKhachhang', function (data) {
    // Cập nhật nội dung của listbox
    var listbox = $('.listbox-khachhang');
    listbox.empty();
    for (var i = 0; i < data.length; i++) {
        var option = $('<option>' + data[i].MaKhachHang + ' - ' + data[i].TenKhachHang + '</option>');
        option.data('rowData', data[i]);
        listbox.append(option);
    }
});
// Cập nhật giá trị của ba trường input khi một dòng trong listbox được chọn
$('.listbox-khachhang').on('change', function () {
    var selectedOption = $(this).find('option:selected');
    var rowData = selectedOption.data('rowData');
    // Cập nhật giá trị của ba trường input
    $('#makhachhang').val(rowData.MaKhachHang);
    $('#tenkhachhang').val(rowData.TenKhachHang);
    $('#diachi-khachhang').val(rowData.DiaChi);
});

// Cập nhật một dòng hiện có trong bảng khi nút "Sửa" được nhấn
$('#editKhachhang').on('click', function () {
    var selectedOption = $('.listbox-khachhang').find('option:selected');
    var rowData = selectedOption.data('rowData');
    var data = {
        MaKhachHang: rowData.MaKhachHang,
        TenKhachHang: $('#tenkhachhang').val(),
        DiaChi: $('#diachi-khachhang').val()
    };
    socket.emit('editDataKhachhang', data);
    socket.emit('getDataKhachhang'); // Cập nhật lại list-box Khách hàng
});
// Thêm một dòng mới vào bảng khi nút "Thêm" được nhấn
$('#addKhachhang').on('click', function () {
    var data = {
        TenKhachHang: $('#tenkhachhang').val(),
        DiaChi: $('#diachi-khachhang').val()
    };
    socket.emit('addData', data);
    socket.emit('getDataKhachhang'); // Cập nhật lại list-box Khách hàng
});
$('#deleteKhachhang').on('click', function () {
    var selectedOption = $('.listbox-khachhang').find('option:selected');
    var rowData = selectedOption.data('rowData');

    var data = {
        MaKhachHang: rowData.MaKhachHang
    };
    socket.emit('deleteDataKhachhang', data);
    socket.emit('getDataKhachhang'); // Cập nhật lại list-box Khách hàng
});
socket.on('addDataSuccess', function () {
    // Xử lý thông báo thành công từ server
    alert("Đã thêm khách hàng " + $('#tenkhachhang').val() + "!");
});

socket.on('updateDataSuccess', function () {
    // Xử lý thông báo thành công từ server
    alert("Đã thay đổi thông tin của khách hàng " + $('#tenkhachhang').val() + "!");
});
///////////////////////////// Tra cứu cập nhật dữ liệu Xe bồn /////////////////////////////////////////////////////////////////////////////
// Các chức năng liên quan đến Xebon
socket.on('updateDataXebon', function (data) {
    var listbox = $('.' + 'listbox-xebon');
    listbox.empty();
    for (var i = 0; i < data.length; i++) {
        var option = $('<option>' + data[i].STT + ' - ' + data[i].BienSoXe + '</option>');
        option.data('rowData', data[i]);
        listbox.append(option);
    }
});
// Cập nhật giá trị của ba trường input khi một dòng trong listbox được chọn
$('.listbox-xebon').on('change', function () {
    var selectedOption = $(this).find('option:selected');
    var rowData = selectedOption.data('rowData');
    // Cập nhật giá trị của ba trường input
    $('#sttXebon').val(rowData.STT);
    $('#bienso').val(rowData.BienSoXe);
    $('#taixe').val(rowData.TenLaiXe);
});

// Cập nhật một dòng hiện có trong bảng khi nút "Sửa" được nhấn
$('#editXebon').on('click', function () {
    var selectedOption = $('.listbox-xebon').find('option:selected');
    var rowData = selectedOption.data('rowData');
    var data = {
        STT: rowData.STT,
        BienSoXe: $('#bienso').val(),
        TenLaiXe: $('#taixe').val()
    };
    socket.emit('editDataXebon', data);
    socket.emit('getDataXebon'); // Cập nhật lại list-box xe bồn
});
// Thêm một dòng mới vào bảng khi nút "Thêm" được nhấn
$('#addXebon').on('click', function () {
    var data = {
        BienSoXe: $('#bienso').val(),
        TenLaiXe: $('#taixe').val()
    };
    socket.emit('addDataXebon', data);
    socket.emit('getDataXebon'); // Cập nhật lại list-box xe bồn
});
$('#deleteXebon').on('click', function () {
    var selectedOption = $('.listbox-xebon').find('option:selected');
    var rowData = selectedOption.data('rowData');
    var data = {
        STT: rowData.STT
    };
    socket.emit('deleteXebon', data);
    socket.emit('getDataXebon'); // Cập nhật lại list-box xe bồn
});
socket.on('addDataXebonSuccess', function () {
    // Xử lý thông báo thành công từ server
    alert("Đã thêm Xe bồn có biển số " + $('#bienso').val() + "!");
});
socket.on('updateDataXebonSuccess', function () {
    // Xử lý thông báo thành công từ server
    alert("Đã thay đổi thông tin của Xe bồn có biển số " + $('#bienso').val() + "!");
});
///////////////////////////// Tra cứu cập nhật dữ liệu Đơn hàng /////////////////////////////////////////////////////////////////////////////
// Các chức năng liên quan đến Xebon
socket.on('updateDataDonhang', function (data) {
    var listbox = $('.listbox-donhang');
    listbox.empty();
    for (var i = 0; i < data.length; i++) {
        var option = $('<option>' + data[i].MaDonDatHang + ' - ' + data[i].TenKhachHang + '</option>');
        option.data('rowData', data[i]);
        listbox.append(option);
    }
    console.log(data);
});
socket.on('updateDataDonhangKhachhang', function (data) {
    // Cập nhật listbox-donhang-khachhang
    var listboxdonhangkhachhang = $('.listbox-donhang-khachhang');
    //listboxdonhangkhachhang.empty();
    // Xóa các tùy chọn bắt đầu từ vị trí thứ hai trở đi
    listboxdonhangkhachhang.find('option').slice(1).remove();
    for (var i = 0; i < data.length; i++) {
        var option = $('<option>' + data[i].MaKhachHang + ' - ' + data[i].TenKhachHang + '</option>');
        option.data('rowData', data[i]);
        listboxdonhangkhachhang.append(option);
    }
});
// Cập nhật giá trị của ba trường input khi một dòng trong listbox được chọn
$('.listbox-donhang').on('change', function () {
    // Get selected option
    var selectedOption = $(this).find('option:selected');
    // Get row data
    var rowData = selectedOption.data('rowData');
    // Update listbox-khachhang
    $('#madondathang').val(rowData.MaDonDatHang);
    // $('#donhangkhachhang').val(rowData.MaKhachHang + ' - ' + rowData.TenKhachHang);
    $('#donhangkhachhang option:selected').text(rowData.MaKhachHang + ' - ' + rowData.TenKhachHang);
    $('#makhachhang-donhang').val(rowData.MaKhachHang);
    $('#diachi-donhang').val(rowData.DiaChi);
    $('#diachicongtruong').val(rowData.DiaChiCongTruong);
    $('#som3dathang').val(rowData.SoM3Dat);
    $('#som3dado').val(rowData.SoM3DaDo);
    //socket.emit('getDataDonhangKhachhang'); //Nếu yêu cầu ở đây thì nó sẽ ghi đè lên Listbox-khachhang-donhang, dẫn đến giá trị không đúng với Khách hàng đã chọn trong listbox-donhang
    console.log(rowData);
});
// Handle change event on listbox-khachhang
$('#donhangkhachhang').on('change', function () {
    // Get selected option
    var selectedOption = $(this).find('option:selected');
    // Get row data
    var rowData = selectedOption.data('rowData');
    // Update input field
    $('#diachi-donhang').val(rowData.DiaChi);
    $('#makhachhang-donhang').val(rowData.MaKhachHang);
    //console.log(`Du lieu khach hang trong bang don hang: `, rowData);
});
// Chức năng của nut Sửa trong phần Đơn đặt hàng khi được click
var editingDonhang = false;
$('#editDonhang').on('click', function () {
    // Ẩn nút Sửa và hiển thị nút Lưu

    editingDonhang = true;
    // Yêu cầu server gửi dữ liệu Khách hàng lên để chọn
    socket.emit('getDataDonhangKhachhang');
    // Lấy giá trị trong input field #makhachhang-donhang
    var maDonDatHang = document.getElementById('madondathang').value.trim();
    // Kiểm tra xem ô Mã đơn hàng có trống hay không
    if (maDonDatHang === '') {
        // Nếu trống, yêu cầu người dùng chọn một đơn hàng trong listbox-donhang
        alert('Vui lòng chọn một đơn hàng trong danh sách');
    } else {
        // Kiểm tra xem giá trị trong input field có đúng với cấu trúc DH+"3 chữ số tiến" hay không
        if (/^DH\d{3}$/.test(maDonDatHang)) {
            document.getElementById('editDonhang').style.display = 'none';
            document.getElementById('saveDonhang').style.display = 'inline';

            //alert('Đơn hàng cấu trúc đúng"');
            //console.log(`editingDonhang: ` + editingDonhang + ' maDonDatHang: ' + maDonDatHang);
        } else {
            // Nếu không đúng, hiện thông báo yêu cầu người dùng sửa lại cấu trúc cho đúng
            alert('Vui lòng nhập mã đơn hàng theo cấu trúc DH+"3 chữ số"');
        }
    }
});
// Cập nhật một dòng hiện có trong bảng khi nút "Sửa" được nhấn
$('#saveDonhang').on('click', function () {
    // Lấy giá trị trong input field #makhachhang-donhang
    var maDonDatHang = document.getElementById('madondathang').value.trim();
    // Kiểm tra xem giá trị trong input field có trống hay không
    if (maDonDatHang === '') {
        // Nếu trống, yêu cầu người dùng chọn một đơn hàng trong listbox-donhang
        alert('Thông tin mã đơn hàng chưa được điền');
    } else {
        // Nếu đã có Mã đơn hàng, Kiểm tra xem giá trị trong input field có đúng với cấu trúc DH+"3 chữ số" hay không
        if (!(/^DH\d{3}$/.test(maDonDatHang))) {
            // Nếu không đúng, hiện thông báo yêu cầu người dùng sửa lại cấu trúc cho đúng
            alert('Vui lòng nhập mã đơn hàng theo cấu trúc DH+"3 chữ số"');
        } else {
            // Nếu đúng định dạng cho Mã đơn hàng, kiểm tra xem giá trị có trùng với bất kỳ MaDonHang nào trong listbox-donhang hay không
            var listbox = document.querySelector('.listbox-donhang');
            //var listbox = $('.listbox-donhang');
            var options = listbox.querySelectorAll('option');
            var found = false;
            for (var i = 0; i < options.length; i++) {
                var rowData = $(options[i]).data('rowData');
                if (rowData.MaDonDatHang === maDonDatHang) {
                    found = true;
                    break;
                }
            }
            //console.log(`editingDonhang: ` + editingDonhang + 'found: ' + found);
            if (editingDonhang) {
                if (!found) {
                    alert('Mã đơn hàng này không có trong cơ sở dữ liệu, vui lòng thử lại!');
                } else {
                    // Nếu tìm thấy, tăng mã đơn hàng lên một đơn vị theo cấu trúc DH+"số gồm bốn chữ số sẽ được tăng tự động"
                    if (confirm("Bạn có muốn lưu thông tin vừa mới sửa không?")) {
                        // Gọi function đã được viết từ trước để lưu thông tin đơn hàng mới
                        // Ẩn nút Lưu và hiển thị nút Sửa
                        document.getElementById('saveDonhang').style.display = 'none';
                        document.getElementById('editDonhang').style.display = 'inline';
                        var data = {
                            MaDonDatHang: $('#madondathang').val(),
                            MaKhachHang: $('#makhachhang-donhang').val(),
                            DiaChiCongTruong: $('#diachicongtruong').val(),
                            SoM3Dat: $('#som3dathang').val(),
                            SoM3DaDo: $('#som3dado').val()
                        };
                        socket.emit('editDataDonhang', data);
                        editingDonhang = false;
                        console.log('Dữ liệu trước khi gửi server: ', data)
                    } else {
                        // Người dùng tiếp tục hiệu chỉnh thông tin đơn hàng
                    }
                }

            }
            if (addingDonhang) {
                if (confirm("Bạn có muốn thêm mã đơn hàng mới này không?")) {
                    // Gọi function đã được viết từ trước để lưu thông tin đơn hàng mới
                    document.getElementById('addDonhang').style.display = 'inline';
                    document.getElementById('saveDonhang').style.display = 'none';
                    var data = {
                        MaDonDatHang: $('#madondathang').val(),
                        MaKhachHang: $('#makhachhang-donhang').val(),
                        DiaChiCongTruong: $('#diachicongtruong').val(),
                        SoM3Dat: $('#som3dathang').val(),
                        SoM3DaDo: $('#som3dado').val()
                    };
                    socket.emit('addDataDonhang', data);
                    addingDonhang = false;
                } else {
                    // Người dùng tiếp tục hiệu chỉnh thông tin đơn hàng
                }

            }
            socket.emit('getDataDonhang'); // Cập nhật list-box Đơn hàng
        }

    }
});

// Thêm một dòng mới vào bảng khi nút "Thêm" được nhấn
var addingDonhang = false;
$('#addDonhang').on('click', function () {
    // Yêu cầu server gửi dữ liệu Khách hàng trong đơn hàng để người dùng chọn
    socket.emit('getDataDonhangKhachhang');
    // Tìm mã đơn hàng lớn nhất trong listbox-donhang
    var listbox = document.querySelector('.listbox-donhang');
    var options = listbox.querySelectorAll('option');
    var maxMaDonHang = '';
    for (var i = 0; i < options.length; i++) {
        var rowData = $(options[i]).data('rowData');
        if (rowData.MaDonDatHang > maxMaDonHang) {
            maxMaDonHang = rowData.MaDonDatHang;
        }
    }
    // Tăng mã đơn hàng lên một đơn vị theo cấu trúc DH+"4 chữ số tiến"
    var newMaDonHang = 'DH' + String(parseInt(maxMaDonHang.slice(2)) + 1).padStart(3, '0');

    // Lưu mã đơn hàng mới vào input field #madondathang
    document.getElementById('madondathang').value = newMaDonHang;

    // Xóa các input fields #diachicongtruong, #som3dathang và #som3dado
    document.getElementById('diachicongtruong').value = '';
    document.getElementById('som3dathang').value = '';
    document.getElementById('som3dado').value = '';
    addingDonhang = true;
    // Gọi function đã được viết từ trước
    // ...
    document.getElementById('addDonhang').style.display = 'none';
    document.getElementById('saveDonhang').style.display = 'inline';
});
$('#deleteDonhang').on('click', function () {
    var selectedOption = $('.listbox-donhang').find('option:selected');
    var rowData = selectedOption.data('rowData');
    var data = {
        MaDonDatHang: rowData.MaDonDatHang
    };
    socket.emit('deleteDonhang', data);
    socket.emit('getDataDonhang'); // Cập nhật list-box Đơn hàng
});
socket.on('addDataDonhangSuccess', function () {
    // Xử lý thông báo thành công từ server
    alert("Đã thêm Đơn hàng có Mã đơn hàng là " + $('#madondathang').val() + "!");
});
socket.on('updateDataDonhangSuccess', function () {
    console.log('Received updateDataDonhangSuccess event');
    // Xử lý thông báo thành công từ server
    console.log(`Du lieu update xong`);
    alert("Đã thay đổi thông tin của Mã đơn hàng số " + $('#madondathang').val() + "!");
});

///////////////////////////// Update data Thông tin cấp phối/////////////////////////////////////////////////
socket.on('updateDataDatcaphoiKhachhang', function (data) {
    // Cập nhật listbox-donhang-khachhang
    var listbox = $('.listbox-datcapphoi-khachhang');
    //listbox.empty(); //lệnh này đầu tiên sẽ xóa trắng listbox, nên nếu muốn để lại các option đã khai báo trong html thì bỏ đoạn này đi
    // Xóa các tùy chọn bắt đầu từ vị trí thứ hai trở đi, mục đích là để listbox khách hàng chỉ hiển thị chữ Vui lòng chọn .... mỗi khi nhấn vào nút ĐẶT CẤP PHÔI
    listbox.find('option').slice(1).remove();
    for (var i = 0; i < data.length; i++) {
        var option = $('<option>' + data[i].MaKhachHang + ' - ' + data[i].TenKhachHang + '</option>');
        option.data('rowData', data[i]);
        listbox.append(option);
    }
});
// Listen for changes in listbox-datcapphoi-khachhang
$('.listbox-datcapphoi-khachhang').on('change', function () {
    // Cách viết hay được sử dụng ở nhưng đoạn code trước đây từng sử dụng sẽ viết như thế này để lấy MaKhachHang
    var selectedOption = $('.listbox-datcapphoi-khachhang').find('option:selected');
    var rowData = selectedOption.data('rowData');
    var MaKhachHang = rowData.MaKhachHang;
    // Còn đây là cách viết gọn, nó là cách viết nối chứ không phải tách ra từng phần như trên
    // Get the selected MaKhachHang
    // const MaKhachHang = $(this).find(':selected').data('rowData').MaKhachHang;

    // Emit the 'getDonHang' event with the selected MaKhachHang
    socket.emit('getDataDatcapphoiDonHang', MaKhachHang);
    console.log('Gửi tin nhắn yêu cầu gửi thông tin đơn hàng của MaKhachHang: ' + MaKhachHang);
    // Lưu MaKhachHang và TenKhachHang vao trong object PhieuCan
    PhieuCan.dondathang.khachhang.MaKhachHang = rowData.MaKhachHang;
    PhieuCan.dondathang.khachhang.TenKhachHang = rowData.TenKhachHang;
    // console.log("MaKhachHang: " + PhieuCan.dondathang.khachhang.MaKhachHang);
    // console.log("TenKhachHang: " + PhieuCan.dondathang.khachhang.TenKhachHang);
});
socket.on('updateDataDatcapphoiDonhang', function (data) {
    var listbox = $('.listbox-datcapphoi-donhang');
    // listbox.empty(); 
    // lệnh này đầu tiên sẽ xóa trắng listbox, nên nó sẽ xóa luôn option đầu tiên đã đặt trong html là "Vui lòng chọn ...." (bao gồm cả những 
    // option đã được xuất hiện từ các mã hàng trước đó). Vậy nên khi sử dụng lệnh này, cụm từ "Vui lòng chọn ...." sẽ bị xóa đi, nhưng đồng thời khi ta chọn khách hàng mới thì
    // option đầu tiên trong danh sách đơn hàng của khách hàng mới này nó sẽ xuất hiện trong listbox đơn hàng, vậy nên câu lệnh lưu MaDonHang vào object PhieuCan nó không thực hiện được
    // hay chính xác hơn trong trường hợp này ta không nên xóa trắng listbox
    // Việc xóa các tùy chọn bắt đầu từ vị trí thứ hai trở đi, mục đích là để listbox đơn hàng chỉ hiển thị chữ Vui lòng chọn .... mỗi khi nhấn vào nút Datcapphoi,
    // Chú ý: sau mỗi lần chọn một Khách hàng thì toàn bộ mã đơn hàng thuộc về khách hàng đó sẽ xuất hiện trong listbox-datcapphoi-donhang, điều đó có nghĩa là ta phải xóa mấy cái 
    // option từ option thứ 2 trở đi để nó chỉ hiện mỗi cụm từ "Vui lòng chọn ....", rồi sau đó với những câu lệnh bện dưới nó sẽ cập nhật được những Đơn hàng mới, 
    // và bao gồm luôn cả cụm từ "Vui lòng chọn ...." sẽ nằm ở trên cùng, sau đó ta sẽ phải xổ listbox ra để chọn đợn hàng, nên khi đó việc lưu MaDonHang sẽ được thực hiện
    listbox.find('option').slice(1).remove();
    for (var i = 0; i < data.length; i++) {
        var option = $('<option>' + data[i].MaDonDatHang + ' - ' + data[i].DiaChiCongTruong + '</option>');
        option.data('rowData', data[i]);
        listbox.append(option);
    }
    console.log("Đơn đặt hàng được gửi từ server có Cấp phối là: ", data);
});
// Listen for changes in listbox-datcapphoi-khachhang
$('.listbox-datcapphoi-donhang').on('change', function () {
    // Cách viết hay được sử dụng ở nhưng đoạn code trước đây từng sử dụng sẽ viết như thế này để lấy MaKhachHang
    var selectedOption = $('.listbox-datcapphoi-donhang').find('option:selected');
    var rowData = selectedOption.data('rowData');
    // Lưu MaDonDatHang vao trong object PhieuCan
    PhieuCan.dondathang.MaDonDatHang = rowData.MaDonDatHang;
    console.log("MaDonDatHang: " + PhieuCan.dondathang.MaDonDatHang);
});
// socket.on('error', function (message) {
//     alert(message);
// });
socket.on('error', function (data) {
    alert(data.message);
    if (data.error) {
        console.error(data.error)
    }
});
//////////////////////////////////////////////////////// Update data for report /////////////////////////////////////////////////////////////////////////
socket.on('updateDataReportKhachhang', function (data) {
    // Cập nhật listbox-donhang-khachhang
    var listbox = $('.listbox-report-khachhang');
    //listbox.empty(); //lệnh này đầu tiên sẽ xóa trắng listbox, nên nếu muốn để lại các option đã khai báo trong html thì bỏ đoạn này đi
    // Xóa các tùy chọn bắt đầu từ vị trí thứ hai trở đi, mục đích là để listbox khách hàng chỉ hiển thị chữ Vui lòng chọn .... mỗi khi nhấn vào nút ĐẶT CẤP PHÔI
    listbox.find('option').slice(1).remove();
    for (var i = 0; i < data.length; i++) {
        var option = $('<option>' + data[i].MaKhachHang + ' - ' + data[i].TenKhachHang + '</option>');
        option.data('rowData', data[i]);
        listbox.append(option);
    }
});
// Listen for changes in listbox-datcapphoi-khachhang
$('.listbox-report-khachhang').on('change', function () {
    // Cách viết hay được sử dụng ở nhưng đoạn code trước đây từng sử dụng sẽ viết như thế này để lấy MaKhachHang
    var selectedOption = $('.listbox-report-khachhang').find('option:selected');
    var rowData = selectedOption.data('rowData');
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ rowdata: ', rowData)
    if (rowData !== undefined) {
        var MaKhachHang = rowData.MaKhachHang;
        // Còn đây là cách viết gọn, nó là cách viết nối chứ không phải tách ra từng phần như trên
        // Get the selected MaKhachHang
        // const MaKhachHang = $(this).find(':selected').data('rowData').MaKhachHang;

        // Emit the 'getDonHang' event with the selected MaKhachHang
        socket.emit('getDataReportDonHang', MaKhachHang);
        console.log('Gửi tin nhắn yêu cầu gửi thông tin đơn hàng của MaKhachHang: ' + MaKhachHang);
        // Lưu MaKhachHang và TenKhachHang vao trong object PhieuCan
        ThongKe.MaKhachHang = rowData.MaKhachHang;
        ThongKe.TenKhachHang = rowData.TenKhachHang;
        // console.log("ThongKe.MaKhachHang: " + ThongKe.MaKhachHang);
        // console.log("ThongKe.TenKhachHang: " + ThongKe.TenKhachHang);
    } else {
        ThongKe.MaKhachHang = '';
        ThongKe.TenKhachHang = '';
    }

});
socket.on('updateDataReportDonhang', function (data) {
    var listbox = $('.listbox-report-donhang');
    // listbox.empty(); 
    // lệnh này đầu tiên sẽ xóa trắng listbox, nên nó sẽ xóa luôn option đầu tiên đã đặt trong html là "Vui lòng chọn ...." (bao gồm cả những 
    // option đã được xuất hiện từ các mã hàng trước đó). Vậy nên khi sử dụng lệnh này, cụm từ "Vui lòng chọn ...." sẽ bị xóa đi, nhưng đồng thời khi ta chọn khách hàng mới thì
    // option đầu tiên trong danh sách đơn hàng của khách hàng mới này nó sẽ xuất hiện trong listbox đơn hàng, vậy nên câu lệnh lưu MaDonHang vào object PhieuCan nó không thực hiện được
    // hay chính xác hơn trong trường hợp này ta không nên xóa trắng listbox
    // Việc xóa các tùy chọn bắt đầu từ vị trí thứ hai trở đi, mục đích là để listbox đơn hàng chỉ hiển thị chữ Vui lòng chọn .... mỗi khi nhấn vào nút Datcapphoi,
    // Chú ý: sau mỗi lần chọn một Khách hàng thì toàn bộ mã đơn hàng thuộc về khách hàng đó sẽ xuất hiện trong listbox-datcapphoi-donhang, điều đó có nghĩa là ta phải xóa mấy cái 
    // option từ option thứ 2 trở đi để nó chỉ hiện mỗi cụm từ "Vui lòng chọn ....", rồi sau đó với những câu lệnh bện dưới nó sẽ cập nhật được những Đơn hàng mới, 
    // và bao gồm luôn cả cụm từ "Vui lòng chọn ...." sẽ nằm ở trên cùng, sau đó ta sẽ phải xổ listbox ra để chọn đợn hàng, nên khi đó việc lưu MaDonHang sẽ được thực hiện
    listbox.find('option').slice(1).remove();
    for (var i = 0; i < data.length; i++) {
        var option = $('<option>' + data[i].MaDonDatHang + ' - ' + data[i].DiaChiCongTruong + '</option>');
        option.data('rowData', data[i]);
        listbox.append(option);
    }
    console.log("Đơn đặt hàng được gửi từ server có Cấp phối là: ", data);
});
// Listen for changes in listbox-datcapphoi-khachhang
$('.listbox-report-donhang').on('change', function () {
    // Cách viết hay được sử dụng ở nhưng đoạn code trước đây từng sử dụng sẽ viết như thế này để lấy MaKhachHang
    var selectedOption = $('.listbox-report-donhang').find('option:selected');
    var rowData = selectedOption.data('rowData');
    if (rowData !== undefined) {
        // Lưu MaDonDatHang vao trong object PhieuCan
        ThongKe.MaDonDatHang = rowData.MaDonDatHang;
        console.log("MaDonDatHang: " + ThongKe.MaDonDatHang);
    } else {
        ThongKe.MaDonDatHang = '';
    }

});

/////////////////////////////////////////////////////////////////////////////////// End //////////////////////////////////////////////////////////////////////////////


// Đọc giá trị của phiếu cân gần nhất trong bảng PhieuCan
function LatestPhieucanValues(socket, callback) {
    console.log('Vào hàm LatestPhieucanValues để lấy Phiếu cân gần nhất');
    // Emit a socket event to request the most recent MaPhieuCan, Som3Me, and SoMe values from the phieucan table
    socket.emit('getLatestPhieucanValues');

    // Listen for the socket event with the retrieved data
    socket.on('latestPhieucanValues', data => {
        console.log('Đang trong hàm latestPhieucanValues: nhận dữ liệu từ server của phiếu cân gần nhất LatestPhieucanValues')
        // Update the value of the input fields with the retrieved data
        //document.querySelector('#sophieu').value = data.MaPhieuCan + 1;

        // Sử dụng cách Gọi hàm đọc MaPhieuCan
        getDocMaPhieuCan(socket, (docmaphieucan) => {
            document.querySelector('#sophieu').value = docmaphieucan;
        });
        document.querySelector('#som3me-datCapphoi').value = data.Som3Me;
        document.querySelector('#some-datCapphoi').value = data.SoMe;
        if (data) {
            // Update the properties of the PhieuCan object with the retrieved data
            // PhieuCan.MaPhieuCan = data.MaPhieuCan + 1;
            if (!ThuThap.CoMeDangTron) {
                PhieuCan.MaPhieuCan = data.MaPhieuCan + 1;
            }
            else PhieuCan.MaPhieuCan = data.MaPhieuCan;
            PhieuCan.dondathang.MaDonDatHang = data.MaDonDatHang;
            PhieuCan.dondathang.khachhang.TenKhachHang = data.TenKhachHang;
            // PhieuCan.DaChonXe = false;
            PhieuCan.XeBon.BienSoXe = data.BienSoXe;
            PhieuCan.TenXiMang = data.TenXiMang;
            PhieuCan.TenTP[0] = data.TenTP1;
            PhieuCan.TenTP[1] = data.TenTP2;
            PhieuCan.TenTP[2] = data.TenTP3;
            PhieuCan.TenTP[3] = data.TenTP4;
            PhieuCan.TenPG[0] = data.TenPG1;
            PhieuCan.CapPhoi.Som3Me = data.Som3Me;
            PhieuCan.CapPhoi.SoMe = data.SoMe;
            PhieuCan.CapPhoi.DMTP[0] = data.DMTP1;
            PhieuCan.CapPhoi.DMTP[1] = data.DMTP2;
            PhieuCan.CapPhoi.DMTP[2] = data.DMTP3;
            PhieuCan.CapPhoi.DMTP[3] = data.DMTP4;
            PhieuCan.CapPhoi.DMNUOC = data.DMNuoc;
            PhieuCan.CapPhoi.DMXI = data.DMXi;
            PhieuCan.CapPhoi.DMPG[0] = data.DMPG1;
            PhieuCan.CapPhoi.DMPG[1] = data.DMPG2;
            PhieuCan.CapPhoi.DoSutThongKe = data.DoSut;
            PhieuCan.CapPhoi.TenMacBeTong = data.MacBeTong;
            PhieuCan.CapPhoi.DoAmTP[0] = data.DoAmTP1;
            PhieuCan.CapPhoi.DoAmTP[1] = data.DoAmTP2;
            PhieuCan.CapPhoi.DoAmTP[2] = data.DoAmTP3;
            PhieuCan.CapPhoi.DoAmTP[3] = data.DoAmTP4;
        } else {
            // Set the MaPhieucan property of the Phieucan object to 1
            PhieuCan.MaPhieucan = 1;
        }

        // Log the updated values of the PhieuCan object to the console
        console.log('Đang trong hàm latestPhieucanValues: Thông tin phiếu cân gần nhất, với MaPhieuCan đã được +1: ', PhieuCan);
        //console.log('Thông tin phiếu cân gần nhất, với MaPhieuCan đã được +1: ', PhieuCan.CapPhoi.DMPG);
        // Call the callback function after data has been processed
        callback();
        // Hiển thị số mẻ ĐM và các thành phần định mức khác
        hienthiDinhMuc();
        // Hiển thị thông tin xe bồn đang được chọn
        document.querySelector('#xebon_recently').value = PhieuCan.XeBon.BienSoXe;
        // document.querySelector('.scr_Auto_listbox-xebon').option = PhieuCan.XeBon.BienSoXe; // Lệnh này không có ý nghĩa với option list

        console.log('Giá trị của đối tượng PhieuCan trong đối tượng toàn cục window hay window.PhieuCan khi chưa lặp lại việc gán window.PhieuCan = PhieuCan;: ', window.PhieuCan);
        syncWindowObject();
        console.log('Giá trị của đối tượng PhieuCan trong đối tượng toàn cục window hay window.PhieuCan khi ĐÃ lặp lại việc gán window.PhieuCan = PhieuCan;: ', window.PhieuCan);
        let propertiesPhieuCan = Object.keys(window.PhieuCan).map(prop => `PhieuCan.${prop}`);
        console.log('propertiesPhieuCan: trong hàm LatestPhieucanValues cũng có gọi hàm updateDataOnServer1(propertiesPhieuCan); ', propertiesPhieuCan);
        updateDataOnServer1(propertiesPhieuCan);

    });
    console.log('Thoát hàm LatestPhieucanValues để lấy Phiếu cân gần nhất');
}

// Đọc mã phiếu cân từ bảng Phiếu Cân
function getDocMaPhieuCan(socket, callback) {
    console.log('Vào hàm getDocMaPhieuCan: đọc mã phiếu cân lên client đang đươc kết nối');
    // Emit a socket event to request the data from the phieucan table from the server
    socket.emit('getPhieucanData');

    // Listen for the socket event with the retrieved data
    socket.on('phieucanData', data => {
        let count = data.count;
        let docmaphieucan;

        if (count > 0) {
            // Nếu có bản ghi thì tiếp tục kiểm tra xem MaPhieuCan ở bản ghi cuối cùng có phải là giá trị null không
            let last_maphieucan = data.last_maphieucan;

            if (last_maphieucan === null) {
                tmp = 0;
            } else {
                tmp = last_maphieucan;
            }

            tmp += 1;
            docmaphieucan = tmp;
        } else {
            // Trong trường hợp không có bản ghi nào tồn tại thì gán DocMaPhieuCan bằng 1
            docmaphieucan = 1;
        }

        // Gọi hàm callback với giá trị của docmaphieucan
        console.log('Mã phiếu cần được đọc từ server và sau đó cộng thêm 1 là: ', docmaphieucan);
        callback(docmaphieucan);
    });
}


function sendDataDatcapphoi(emptyValue) {
    console.log('Vào hàm truyền Cấp phối')
    emptyValue = emptyValue.trim();
    var sttValue = document.querySelector('[data-label="STT"]').value.trim();
    var khachhangListbox = document.querySelector('#datcapphoikhachhang');
    var donhangListbox = document.querySelector('#datcapphoidonhang');
    var khachhangValue = khachhangListbox.options[khachhangListbox.selectedIndex].textContent.trim();
    var donhangValue = donhangListbox.options[donhangListbox.selectedIndex].textContent.trim();
    // console.log("khachhangValue: " + JSON.stringify(khachhangValue));
    // console.log("donhangValue: " + JSON.stringify(donhangValue));
    // console.log("emptyValue: " + JSON.stringify(emptyValue));
    if (sttValue === "") {
        alert("Phải chọn cấp phối trước khi truyền");
    } else if (khachhangValue === emptyValue || donhangValue === emptyValue) {
        alert("Phải chọn đơn hàng của khách hàng trước khi truyền");
    } else {
        for (var i = 1; i <= 4; i++) {
            var inputFieldTP = document.querySelector('[data-label="TP' + i + '"]');
            var inputValueTP = parseFloat(inputFieldTP.value.trim());
            // var inputFieldDoAmTP = document.querySelector(`#DoAmTP${i}`); // Cách 1 để láy giá trị của id input field
            var inputFieldDoAmTP = document.querySelector('#DoAmTP' + i); // Cách 2 để láy giá trị của id input field: chú ý trong js thì một chuỗi cộng với số được và nó sẽ trở thành chuối
            var inputValueDoAmTP = parseFloat(inputFieldDoAmTP.value.trim());
            PhieuCan.CapPhoi.DMTP[i - 1] = inputValueTP || 0;
            PhieuCan.CapPhoi.DoAmTP[i - 1] = inputValueDoAmTP || 0;
        }

        PhieuCan.CapPhoi.DMXI = parseFloat(document.querySelector('[data-label="Xi"]').value.trim());
        PhieuCan.CapPhoi.DMNUOC = parseFloat(document.querySelector('[data-label="Nuoc"]').value.trim());
        PhieuCan.CapPhoi.DMPG[0] = parseFloat(document.querySelector('[data-label="PG1"]').value.trim());
        PhieuCan.CapPhoi.DMPG[1] = parseFloat(document.querySelector('[data-label="PG2"]').value.trim());
        // Tại đây sẽ lấy mã số phiếu đã được cộng 1 để làm mã phiếu cân mới sau khi truyền Cấp phối, rồi gửi qua server để tạo Phiếu Cân
        // Ở client ta vẫn giữ MaPhieuCan như mã đã được đọc từ Phiếu cân gần nhất
        PhieuCan.MaPhieuCan = document.querySelector('#sophieu').value.trim();
        PhieuCan.CapPhoi.dieuchinh = true;
        PhieuCan.CapPhoi.Som3Me = parseFloat(document.querySelector('#som3me-datCapphoi').value.trim());
        PhieuCan.CapPhoi.SoMe = parseFloat(document.querySelector('#some-datCapphoi').value.trim());
        // PhieuCan.dondathang.MaDonDatHang // đã được lưu ở đây $('.listbox-datcapphoi-donhang').on('change', function ()
        // PhieuCan.dondathang.khachhang.MaKhachHang // đã được lưu ở đây $('.listbox-datcapphoi-khachhang').on('change', function ()
        // PhieuCan.dondathang.khachhang.TenKhachHang // đã được lưu ỏ đây $('.listbox-datcapphoi-khachhang').on('change', function ()
        PhieuCan.CapPhoi.DoSutThongKe = document.querySelector('[data-label="DoSutThongKe"]').value.trim();
        PhieuCan.CapPhoi.TenMacBeTong = document.querySelector('[data-label="TenMacBeTong"]').value.trim();
        // In ra các log để daignose
        console.log("DMTP1: " + PhieuCan.CapPhoi.DMTP[0]);
        console.log("DMTP2: " + PhieuCan.CapPhoi.DMTP[1]);
        console.log("DMTP3: " + PhieuCan.CapPhoi.DMTP[2]);
        console.log("DMTP4: " + PhieuCan.CapPhoi.DMTP[3]);
        console.log("DoAmTP1: " + PhieuCan.CapPhoi.DoAmTP[0]);
        console.log("DoAmTP2: " + PhieuCan.CapPhoi.DoAmTP[1]);
        console.log("DoAmTP3: " + PhieuCan.CapPhoi.DoAmTP[2]);
        console.log("DoAmTP4: " + PhieuCan.CapPhoi.DoAmTP[3]);
        console.log("Tôi muốn xem Phiếu cân Cấp phối tại thời điêm đặt Cấp phối là gì: ", PhieuCan);

        PhieuCan.DaChonPhieuCan = true;

        // Truyền mảng định mức trực tiếp vào PLC
        var data_edit_array_dinhmuc = [PhieuCan.CapPhoi.DMTP[0], PhieuCan.CapPhoi.DMTP[1], PhieuCan.CapPhoi.DMTP[2], PhieuCan.CapPhoi.DMTP[3], PhieuCan.CapPhoi.DMXI, PhieuCan.CapPhoi.DMNUOC, PhieuCan.CapPhoi.SoMe];
        socket.emit('senDataDatcapphoi_Dinhmuc', data_edit_array_dinhmuc);
        // alert('Dữ liệu đã được lưu!');
        console.log("Dữ liệu cấp phối truyền qua server để ghi vào PLC: ", data_edit_array_dinhmuc);


        // socket.emit('XE_TRON_MOI', true);
        // console.log('XE_TRON_MOI được set lên 1 khi truyền Cấp phối')

        // // Đọc tin done, sau đó nó đợi **(s) mới tiếp tục gửi lệnh reset đi
        // socket.on('done', function (data) {
        //     if (data) {
        //         setTimeout(function () {
        //             socket.emit('XE_TRON_MOI', false);
        //             console.log('Gửi lệnh yêu cầu reset bit XE_TRON_MOI')
        //         }, 1000);
        //     }
        // });
        // socket.on('error', function (msg) {
        //     console.log(msg);
        // });

        // Đồng bộ dữ liệu với server
        // updateDataOnServer();
        syncWindowObject();
        console.log("thông tin phiếu cân trước khi updateDataOnServer1 trong hàm sendDataDatcapphoi: ", PhieuCan);
        console.log("thông tin window phiếu cân trước khi updateDataOnServer1 trong hàm sendDataDatcapphoi: ", window.PhieuCan);
        // updateDataOnServer1(["PhieuCan.MaPhieuCan", "PhieuCan.CapPhoi.dieuchinh", "PhieuCan.CapPhoi.Som3Me", "PhieuCan.CapPhoi.SoMe", "PhieuCan.CapPhoi.DMXI", "PhieuCan.CapPhoi.DMNUOC",
        //     "PhieuCan.CapPhoi.DMPG[0]", "PhieuCan.CapPhoi.DMPG[1]", "PhieuCan.CapPhoi.DMTP[0]", "PhieuCan.CapPhoi.DMTP[1]", "PhieuCan.CapPhoi.DMTP[2]", "PhieuCan.CapPhoi.DMTP[3]",
        //     "PhieuCan.CapPhoi.DoAmTP[0]", "PhieuCan.CapPhoi.DoAmTP[1]", "PhieuCan.CapPhoi.DoAmTP[2]", "PhieuCan.CapPhoi.DoAmTP[3]", "PhieuCan.CapPhoi.DoSutThongKe", "PhieuCan.CapPhoi.TenMacBeTong", "PhieuCan.DaChonPhieuCan"]);
        let propertiesPhieuCan = Object.keys(window.PhieuCan).map(prop => `PhieuCan.${prop}`);
        console.log('propertiesPhieuCan: trong hàm sendDataDatcapphoi cũng có gọi hàm updateDataOnServer1(propertiesPhieuCan); ', propertiesPhieuCan);
        updateDataOnServer1(propertiesPhieuCan);
        // cmdXeTronMoi_Click();

        console.log("Thoát hàm sendDataDatcapphoi và thông tin phiếu cân trước khi thoát hàm sendDataDatcapphoi: ", PhieuCan);
    }
}

document.querySelector('#sendDatcapphoi').addEventListener('click', function () {
    sendDataDatcapphoi("Vui lòng chọn ...............");
    localStorage.setItem('savedSoM3Dat', '');
    localStorage.setItem('savedSoM3DaDo', '');
});

// Phần code liên quan đến việc ghi Phiếu cân vào Mysql, hàm này sẽ kiểm tra và lấy xác nhận của người dùng về việc .... CHỨC NĂNG NÀY CHƯA XONG
socket.on('confirm', function (message) {
    // Hiển thị hộp thoại xác nhận cho người dùng
    let result = confirm(message);
    console.log('result của confirm: ', result)
    if (result) {
        // Người dùng chọn OK
        // Gửi sự kiện 'confirmResult' đến server với kết quả 'update'
        console.log('Sending confirmResult event to server with data: update');
        //socket.emit('confirmResult', 'update');
        console.log('Đã gửi lệnh update cho việc Ghi phiếu cân')
        alert('Xin lỗi. Hiện tại chức năng này chưa được cập nhật, vui lòng thoát ra và thực hiện lại. Cảm ơn.')
        socket.emit('confirmResult', 'cancel');
    } else {
        // Người dùng chọn Cancel
        // Hiển thị hộp thoại xác nhận thêm một lần nữa
        let result2 = confirm('Bạn có muốn thêm một mã Phiếu cân mới không?');
        console.log('result2 của confirm: ', result2)
        if (result2) { // Tạm thời chưa xử lý được chức năng thêm mã mới trong phần đạt cấp phối này, nên sẽ thông báo hệ thống chưa đc update chức năng này
            // Người dùng chọn OK
            // Gửi sự kiện 'confirmResult' đến server với kết quả 'insert'
            console.log('Sending confirmResult event to server with data: insert');
            // socket.emit('confirmResult', 'insert'); // Gửi lệnh thêm mã mới tới server để thêm vào sql, tuy nhiên hiện tại chưa xử lý được các lỗi phát sinh
            console.log('Đã gửi lệnh insert cho việc Ghi phiếu cân')
            alert('Xin lỗi. Hiện tại chức năng này chưa được cập nhật, vui lòng thoát ra và thực hiện lại. Cảm ơn.')
            socket.emit('confirmResult', 'cancel');
        } else {
            // Người dùng chọn Cancel
            // Gửi sự kiện 'confirmResult' đến server với kết quả 'cancel'
            console.log('Sending confirmResult event to server with data: cancel');
            socket.emit('confirmResult', 'cancel');
            console.log('Đã gửi lệnh cancel cho việc Ghi phiếu cân')
        }
    }
});

////////////////////////////////////////////// Các hàm chức năng liên quan đến việc xử lý Cửa vật liệu và cuavatlieu của PhieuCan ///////////////////////////////
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

socket.on('cuaVatLieuData', (data) => {
    console.log('Vào sự kiện socket.on cuaVatLieuData để lấy thông tin cửa liệu tử database');
    // Update PhieuCan object
    PhieuCan.TenXiMang = data.Xi;
    for (let i = 0; i < 4; i++) {
        PhieuCan.TenTP[i] = data.Cua[i];
        // console.log('PhieuCan.TenTP' + i + ' : ' + PhieuCan.TenTP[i]);
    }
    for (let i = 0; i < 2; i++) {
        PhieuCan.TenPG[i] = data.PG[i];
        // console.log('PhieuCan.TenPG' + (i + 1) + ' : ' + PhieuCan.TenPG[i]);
        // console.log('Tên PG' + i + ':' + ' - ' + PhieuCan.TenPGi); //gọi thuộc tính theo cách này vẫn được
    }

    // Update CuaVatLieu object
    CuaVatLieu.Xi = data.Xi;
    for (let i = 0; i < 4; i++) {
        CuaVatLieu.Cua[i] = data.Cua[i];
        // console.log('CuaVatLieu.Cua' + (i + 1) + ' - ' + CuaVatLieu.Cua[i]);
    }
    for (let i = 0; i < 2; i++) {
        CuaVatLieu.PG[i] = data.PG[i];
        // console.log('CuaVatLieu.PG' + (i + 1) + ' - ' + CuaVatLieu.PG[i]);
        //console.log('Tên PG' + i + ':' + ' - ' + CuaVatLieu.PGi);
    }
    // console.log('CuaVatLieu.Xi' + ' - ' + CuaVatLieu.Xi);

    // Update table headers
    updateTableHeaders(CuaVatLieu);
    // Đồng bộ dữ liệu với server
    // updateDataOnServer();
});

// // Đọc giá trị cân
// socket.on('DocGiaTriCan', (data) => {
//     DocGiaTriCan(data);

// });

// Phía client
socket.on('KetQuaTinhToan', ({ CanSo, KetQua }) => {
    console.log('Nhận kết quả tính toán từ server');
    console.log('Nhận kết quả tính toán từ server: ', CanSo);
    console.log('Nhận kết quả tính toán từ server: ', KetQua);
    HienThiKetQua(CanSo, KetQua);
});

function HienThiKetQua(CanSo, KetQua) {
    console.log('Vào hàm DocGiaTriCan_Client để hiển thị lên bảng trong màn hình chính')
    const flexData = document.querySelector('#responsive-table-input-matrix');
    let i;

    switch (CanSo) {
        case 1:
            console.log('Mảng KetQua nhận được trên client: ', KetQua)
            for (i = 1; i <= 4; i++) {
                flexData.rows[2].cells[i + 1].textContent = formatNumber(KetQua.KhoiLuongCotLieu[i - 1], "0.0");
                console.log('Mảng Kết Quả: ', KetQua.KhoiLuongCotLieu[i - 1])
                ThuThap.KhoiLuongCotLieu[i - 1] = Number(flexData.rows[2].cells[i + 1].textContent);
                if (ThuThap.KhoiLuongCotLieu[i - 1] !== 0 && PhieuCan.CapPhoi.DMTP[i - 1] !== 0) {
                    flexData.rows[3].cells[i + 1].textContent = formatNumber(((ThuThap.KhoiLuongCotLieu[i - 1] - PhieuCan.CapPhoi.DMTP[i - 1]) / PhieuCan.CapPhoi.DMTP[i - 1]) * 100, "0.0");
                }
            }
            console.log('Mảng thu thập trên client: ', ThuThap)
            break;
        case 2:
            flexData.rows[2].cells[6].textContent = formatNumber(KetQua.KhoiLuongXi, "0.0");
            ThuThap.KhoiLuongXi = Number(flexData.rows[2].cells[6].textContent);
            if (ThuThap.KhoiLuongXi !== 0 && PhieuCan.CapPhoi.DMXI !== 0) {
                flexData.rows[3].cells[6].textContent = formatNumber(((ThuThap.KhoiLuongXi - PhieuCan.CapPhoi.DMXI) / PhieuCan.CapPhoi.DMXI) * 100, "0.0");
            }
            console.log('Mảng thu thập trên client: ', ThuThap)
            break;
        case 3:
            flexData.rows[2].cells[7].textContent = formatNumber(KetQua.KhoiLuongNuoc, "0.0");
            ThuThap.KhoiLuongNuoc = Number(flexData.rows[2].cells[7].textContent);
            if (ThuThap.KhoiLuongNuoc !== 0 && PhieuCan.CapPhoi.DMNUOC !== 0) {
                flexData.rows[3].cells[7].textContent = formatNumber(((ThuThap.KhoiLuongNuoc - PhieuCan.CapPhoi.DMNUOC) / (PhieuCan.CapPhoi.DMNUOC)) * 100, "0.0");
            }
            flexData.rows[2].cells[8].textContent = formatNumber(KetQua.KhoiLuongPG, "0");
            if (ThuThap.KhoiLuongPG !== 0 && PhieuCan.CapPhoi.DMPG[0] !== 0) {
                flexData.rows[3].cells[8].textContent = formatNumber(((ThuThap.KhoiLuongPG - PhieuCan.CapPhoi.DMPG[0]) / PhieuCan.CapPhoi.DMPG[0]) * 100, "0.00");
            }
            console.log('Mảng thu thập trên client: ', ThuThap)
            break;
    }
    console.log('Phiếu cân tại thời điểm kết thúc hàm DocGiaTriCan: ', PhieuCan)
    console.log('Thoát hàm DocGiaTriCan_Client')
}



// Cập nhật tên cửa liệu, Xi, PG vào các list box trong option của form đặt lại tên cửa vật liệu
let tmpCuaVatLieu = Object.create(CuaVatLieu);
let pheuCan1 = document.querySelector('#pheuCan1');
let pheuCan2 = document.querySelector('#pheuCan2');
let pheuCan3 = document.querySelector('#pheuCan3');
let pheuCan4 = document.querySelector('#pheuCan4');
// Hàm chức năng cập nhập các cửa liệu vào Option list
function updateOptionList(inputElement, dataListId) {
    let dataList = document.querySelector(dataListId);
    let options = dataList.querySelectorAll('option');
    let inputText = inputElement.value;
    if (inputText !== '') {
        for (let i = options.length - 1; i > 0; i--) {
            options[i].value = options[i - 1].value;
        }
        options[0].value = inputText;
        inputElement.value = '';
        inputElement.value = options[0].value;
    }
}

pheuCan1.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        updateOptionList(pheuCan1, '#pheuCan1List');
        //tmpCuaVatLieu.Cua[0] = pheuCan1.value;
        pheuCan2.focus();
        //console.log('Phễu cân 1: ' + ' - ' + tmpCuaVatLieu.Cua[0]);
    }
});

pheuCan2.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        updateOptionList(pheuCan2, '#pheuCan2List');
        //tmpCuaVatLieu.Cua[1] = pheuCan2.value;
        pheuCan3.focus();
        //console.log('Phễu cân 2: ' + ' - ' + tmpCuaVatLieu.Cua[1]);
    }
});

pheuCan3.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        updateOptionList(pheuCan3, '#pheuCan3List');
        //tmpCuaVatLieu.Cua[2] = pheuCan3.value;
        pheuCan4.focus();
        //console.log('Phễu cân 3: ' + ' - ' + tmpCuaVatLieu.Cua[2]);
    }
});

pheuCan4.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        updateOptionList(pheuCan4, '#pheuCan4List');
        //tmpCuaVatLieu.Cua[3] = pheuCan4.value;
        tenXi.focus();
        //console.log('Phễu cân 4: ' + ' - ' + tmpCuaVatLieu.Cua[3]);
    }
});
tenXi.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        //updateOptionList(pheuCan4, '#pheuCan4List');
        //tmpCuaVatLieu.Cua[3] = pheuCan4.value;
        tenPG1.focus();
        //console.log('Phễu cân 4: ' + ' - ' + tmpCuaVatLieu.Cua[3]);
    }
});
tenPG1.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        //updateOptionList(pheuCan4, '#pheuCan4List');
        //tmpCuaVatLieu.Cua[3] = pheuCan4.value;
        tenPG2.focus();
        //console.log('Phễu cân 4: ' + ' - ' + tmpCuaVatLieu.Cua[3]);
    }
});
tenPG2.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        //updateOptionList(pheuCan4, '#pheuCan4List');
        //tmpCuaVatLieu.Cua[3] = pheuCan4.value;
        saveCuavatlieu.focus();
        //console.log('Phễu cân 4: ' + ' - ' + tmpCuaVatLieu.Cua[3]);
    }
});

// Hàm này dùng để gán các giá trị của thuộc tính trong đối tượng tmpCuaVatLieu sang đối tượng CuaVatLieu
// let saveCuavatlieu = document.querySelector('#saveCuavatlieu');
// for (let key in tmpCuaVatLieu) {
//     CuaVatLieu[key] = tmpCuaVatLieu[key];
// }
// Ghi thông tin các phễu cân xuống Mysql
function saveDataCuavatlieu() {
    if (confirm('Bạn có muốn cập nhật tên cho các cửa liệu không?')) {
        // Lấy dữ liệu từ các phần tử input và lưu vào object CuaVatLieu
        CuaVatLieu.Cua[0] = document.querySelector('#pheuCan1').value;
        CuaVatLieu.Cua[1] = document.querySelector('#pheuCan2').value;
        CuaVatLieu.Cua[2] = document.querySelector('#pheuCan3').value;
        CuaVatLieu.Cua[3] = document.querySelector('#pheuCan4').value;
        CuaVatLieu.Xi = document.querySelector('#tenXi').value;
        CuaVatLieu.PG[0] = document.querySelector('#tenPG1').value;
        CuaVatLieu.PG[1] = document.querySelector('#tenPG2').value;
        console.log("Đã lấy xong tên của các cửa liệu trên form đang hiển thị, bao gồm:");
        for (let i = 0; i < 4; i++) {
            // In ra để kiểm tra thử
            console.log('Cửa liệu ' + (i + 1) + ' : ' + CuaVatLieu.Cua[i]);
        }
        console.log('Cửa Xi ' + ' : ' + CuaVatLieu.Xi);
        for (let i = 0; i < 2; i++) {
            // In ra để kiểm tra thử
            console.log('Cửa phụ gia ' + (i + 1) + ' : ' + CuaVatLieu.PG[i]);
        }

        // Gửi yêu cầu và dữ liệu xuống server để ghi vào MySQL
        socket.emit('saveDataCuavatlieu', { CuaVatLieu: CuaVatLieu });
        // Đồng bộ dữ liệu với server
        // updateDataOnServer();
    }
}

// Lắng nghe sự kiện saveDataCuavatlieu từ server
socket.on('saveDataCuavatlieuSuccess', function (data) {
    console.log(data.message);
    alert(data.message)
});

// Lắng nghe sự kiện saveDataCuavatlieuError từ server
socket.on('saveDataCuavatlieuError', function (data) {
    console.log(data.message);
    alert(data.message)
});

socket.on('saveDataSuccess', function (data) {
    console.log(data.message);
    alert(data.message)
    // fn_ScreenChange('Screen_datCapphoi', 'Screen_Manu', 'Screen_Auto');
    // fn_ShowById('Screen_datCapphoi');
    // fn_HideByClass('bang_Phieubetong');
    // fn_Table02_SQL_Show();
});

saveCuavatlieu.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        saveDataCuavatlieu();
    }
});

saveCuavatlieu.addEventListener('click', function () {
    saveDataCuavatlieu();
});

/////////////////////// Khi nhận được sự kiện 'updateDataChinhCanFromPLC' từ server sau mỗi 1s, hàm sẽ hiển thị giá trị lên 'Hieu chinh can' ////////////////////////////////////
socket.on('updateDataChinhCanFromPLC', data => {
    // Lấy phần tử có class containerClass
    const container = document.querySelector(`.khungHieuchinhcan`);

    // Lấy danh sách các ô input trong phạm vi của phần tử container
    const inputs = container.querySelectorAll('input[type="number"]');
    // Cập nhật dữ liệu cho các ô input
    // console.log('Nhận dữ liệu chỉnh cân từ server: ', data);
    if (anable_edditting_khungHieuchinhcan !== true) {
        // inputs.forEach(input => {
        //     if (input.id in data) {
        //         if (input.id === 'ALALOG1' || input.id === 'ZEZO1' || input.id === 'ALALOG2' || input.id === 'ZEZO2' || input.id === 'ALALOG3' || input.id === 'ZEZO_3') {
        //             input.value = data[input.id].toFixed(0);
        //         } else {
        //             input.value = data[input.id].toFixed(1);
        //         }
        //     }
        // });
        inputs.forEach(input => {
            if (input.id in data) {
                if (typeof data[input.id] === 'number') {
                    if (input.id === 'ALALOG1' || input.id === 'ZEZO1' || input.id === 'ALALOG2' || input.id === 'ZEZO2' || input.id === 'ALALOG3' || input.id === 'ZEZO_3') {
                        input.value = data[input.id].toFixed(0);
                    } else {
                        input.value = data[input.id].toFixed(1);
                    }
                } else {
                    console.log(`Giá trị của ${input.id} không phải là một số:`, data[input.id]);
                }
            }
        });

    }

});
//////////////////////////////////////// Xử lý chức năng điều khiển trên màn hình chính //////////////////////////////////////////////////////

const cmdChay = document.getElementById('bttAuto_Chay');
const cmdXeTronMoi = document.getElementById('bttAuto_XeTronMoi');
var SoM3Dat;
var SoM3DaDo;
socket.on('capnhatSoM3DaDo', function (data) {
    SoM3Dat = data.SoM3Dat;
    SoM3DaDo = data.SoM3DaDo;
    // Xử lý hai giá trị tại đây
    localStorage.setItem('savedSoM3Dat', SoM3Dat);
    localStorage.setItem('savedSoM3DaDo', SoM3DaDo);
});
// Định nghĩa hàm xử lý sự kiện nhấp chuột vào nút cmdXeTronMoi
function cmdXeTronMoi_Click() {
    console.log('XE_TRON_MOI đã được nhấn để gọi hàm XeTronMoi')
    console.log('Đã chọn xe (sau khi nhấn chọn nút XeTronMoi): ', PhieuCan.DaChonXe)
    console.log('Kiểm tra dữ liệu XeBon (sau khi nhấn chọn nút XeTronMoi): ', PhieuCan.XeBon.STT)
    console.log('Kiểm tra dữ liệu XeBon (sau khi nhấn chọn nút XeTronMoi): ', PhieuCan.XeBon.BienSoXe)
    console.log('Kiểm tra dữ liệu XeBon (sau khi nhấn chọn nút XeTronMoi): ', PhieuCan.XeBon.TenLaiXe)
    console.log('Hiện tại Mã Phiếu Cân là (sau khi nhấn chọn nút XeTronMoi): ', PhieuCan.MaPhieuCan)
    var SoM3DatCurrent = parseFloat(localStorage.getItem('savedSoM3Dat'));
    var SoM3DaDoCurrent = parseFloat(localStorage.getItem('savedSoM3DaDo'));
    if ((SoM3DatCurrent - SoM3DaDoCurrent) < (PhieuCan.CapPhoi.SoMe * PhieuCan.CapPhoi.Som3Me)) {
        alert(`Đơn hàng ${PhieuCan.dondathang.MaDonDatHang} còn lại ${SoM3DatCurrent - SoM3DaDoCurrent}m3 không đủ để tạo xe trộn mới, vui lòng kiểm tra lại.`);
        return
    }
    if (cmdChay.textContent === "DỪNG") {
        alert('Vui lòng Dừng hệ thống trước khi chọn xe trộn mới.')
        return
    }
    if (document.querySelector('#xebon_recently').value) {
        // alert('Xe bồn chưa được chọn, vui lòng thực hiện lại!')
        // return
        if (confirm('Chọn OK để tạo Xe trộn mới với biển số xe ' + PhieuCan.XeBon.BienSoXe + ' cho đơn hàng đang được thực hiện có số ' + PhieuCan.dondathang.MaDonDatHang + '. Hoặc chọn Cancel để đổi xe khác.')) {
            PhieuCan.DaChonXe = true;
            //ThuThap.CoMeDangTron = true;
            // return
        } else {
            //ThuThap.CoMeDangTron = false;
            return
        }
    }
    // Kích hoạt điều khiển cmdChay
    cmdChay.disabled = false;

    // Đặt thuộc tính DaChonPhieuCan của đối tượng PhieuCan thành true
    PhieuCan.DaChonPhieuCan = true;

    // Đồng bộ dữ liệu với server
    // updateDataOnServer();
    syncWindowObject();
    updateDataOnServer1(["PhieuCan.DaChonPhieuCan", "PhieuCan.DaChonXe"]);

    // Gọi hàm XeTronMoi
    XeTronMoi();
}

function cmdChay_Click() {
    // Gửi sự kiện socket lên máy chủ với tên là "cmdChay_Click" và dữ liệu là giá trị hiện tại của thuộc tính textContent của nút bttAuto_Chay
    socket.emit("cmdChay_Click", cmdChay.textContent);
}

// Đăng ký trình xử lý sự kiện cho sự kiện socket "bttAuto_Chay_Caption"
socket.on("bttAuto_Chay_Caption", function (data) {
    // Cập nhật thuộc tính textContent của nút bttAuto_Chay thành giá trị mới
    cmdChay.textContent = data;
});


function XeTronMoi() { // Hàm này cớ bản đã chuyển xong
    // Bật bit xe trộn mới lên 1, SAU ĐÓ RESET
    socket.emit('XE_TRON_MOI', true);
    // socket.emit('XE_TRON_MOI',false);
    console.log(`Hàm XeTronMoi() đã được goi, và đã gửi hàm socket.emit('XE_TRON_MOI', true); để set bit XE_TRON_MI`)
    console.log('Tiếp theo server sẽ nhận lệnh và xử lý việc bật tắt bit M21.5 XE_TRON_MI                                          ')
    // // Đọc tin done, sau đó nó đợi **(s) mới tiếp tục gửi lệnh reset đi
    // socket.on('done', function (data) {
    //     if (data) {
    //         setTimeout(function () {
    //             socket.emit('XE_TRON_MOI', false);
    //             console.log('Gửi lệnh yêu cầu reset bit XE_TRON_MOI')
    //         }, 1000);
    //     }
    // });
    // socket.on('error', function (msg) {
    //     console.log(msg);
    // });

    // Gọi hàm DatCacThongSoPhieuCanBanDau để nếu:
    // Không có MaDonDatHang nào được lưu trong PhieuCan.dondathang.MaDonDatHang thì gọi hàm LatestPhieucanValues để đọc lên các giá trị của Phiếu cân gần nhất
    // Ngược lại thì sẽ gọi hàm DocMaPhieuCan để trả về mã phiếu cân của phiếu cần gần nhất và + thêm 1
    // Cũng đọc các giá trị của thời gian trộn, thời gian xả, thêm nước, ... (một vài thông tin đã luôn được đọc ở màn hình chính)
    // Hiển thị tiêu đề bảng hiển thị trong màn hình chính, ghi Số Mẻ vào bảng
    // Đồng thời sẽ reset (hay ghi 0) vào bảng hiển thị trong màn hình chính

    DatCacThongSoPhieuCanBanDau();
}
function DatCacThongSoPhieuCanBanDau() { // Hàm này cơ bản đã chuyển xong
    console.log('Bắt đầu vào hàm DatCacThongSoPhieuCanBanDau')
    // Không chọn phiếu cân trước
    console.log('Mã đơn đặt hàng hiện tại là: ', PhieuCan.dondathang.MaDonDatHang)
    if (PhieuCan.dondathang.MaDonDatHang == "") {
        console.log('Chưa có Mã đơn đặt hàng nên sẽ lấy dữ liệu của Phiếu cân gần nhất từ server')
        // Call LatestPhieucanValues and pass showPhieucanHientai as the callback function
        LatestPhieucanValues(socket, showPhieucanHientai);
        console.log('Mã đơn đặt hàng sau khi lấy dữ liệu Phiếu cân gần nhất từ server là: ', PhieuCan.dondathang.MaDonDatHang)
        // Đồng bộ dữ liệu với server
        syncWindowObject();
        updateDataOnServer1(["PhieuCan.dondathang.MaDonDatHang"]);
        console.log('Mã đơn đặt hàng trong trường hợp chưa có MaDonDatHang sau khi đồng bộ là: ', PhieuCan.dondathang.MaDonDatHang)
        console.log('PhieuCan.MaPhieuCan trong trường hợp chưa có MaDonDatHang sau khi đồng bộ là: ', PhieuCan.MaPhieuCan)
    }

    // Gọi hàm đọc MaPhieuCan, thay cho hàm này trong VB6: PhieuCan.MaPhieuCan = DocMaPhieuCan();
    getDocMaPhieuCan(socket, (docmaphieucan) => {
        console.log('Mã đơn đặt hàng đã có, không cần goi Phiếu cân gần nhất: ', PhieuCan.dondathang.MaDonDatHang)
        PhieuCan.MaPhieuCan = docmaphieucan;
        // Đồng bộ dữ liệu với server
        // updateDataOnServer();
        syncWindowObject();
        updateDataOnServer1(["PhieuCan.MaPhieuCan"]);
        console.log('Mã đơn đặt hàng sau khi đồng bộ là: ', PhieuCan.dondathang.MaDonDatHang)
        console.log('PhieuCan.MaPhieuCan sau khi đồng bộ là: ', PhieuCan.MaPhieuCan)
    });
    console.log('DaChonXe: ', PhieuCan.DaChonXe)
    console.log('PhieuCan.XeBon.BienSoXe: ', PhieuCan.XeBon.BienSoXe)
    if (PhieuCan.DaChonXe) {
        document.querySelector('#xebon_recently').value = PhieuCan.XeBon.BienSoXe;
        var event = new Event('input', { bubbles: true });
        document.querySelector('#xebon_recently').dispatchEvent(event);
    }

    PhieuCan.DaGhiGioXong = false;
    PhieuCan.NhacNhapBienSo = false;
    ThuThap.GhiPhieuCan = false;
    ThuThap.SoMeDM = PhieuCan.CapPhoi.SoMe;
    // Đồng bộ dữ liệu với server
    // updateDataOnServer();
    syncWindowObject();
    updateDataOnServer1(["PhieuCan.DaChonXe", "PhieuCan.XeBon.BienSoXe", "PhieuCan.DaGhiGioXong", "PhieuCan.NhacNhapBienSo", "ThuThap.GhiPhieuCan", "ThuThap.SoMeDM"]);

    console.log('ThuThap.GhiPhieuCan : ', ThuThap.GhiPhieuCan)
    console.log('ThuThap.SoMeDM: ', ThuThap.SoMeDM)
    console.log('window.PhieuCan: ', window.PhieuCan)
    // Các giá trị thời gian trộn - thời gian xả - thêm nước ... để hiển thị lên các ô chức năng
    // DocGiaTriBanDau(); // Yêu cầu nãy đã được thược hiện khi trang web đươc load
    console.log('Phiếu cân tại thời điểm gọi hàm DatCacThongSoPhieuCanBanDau: ', PhieuCan)
    console.log('Thu thập tại thời điểm gọi hàm DatCacThongSoPhieuCanBanDau: ', ThuThap)
    // const flexData = document.querySelector('#responsive-table-input-matrix');
    //  HienThiLaiTieuDeBangSoLieu(); // đã đươc thực hiện, đó chính là chức năng hiển thị các giá trị lên tiêu đề bảng trong trang chính ở dòng đầu tiên (chỉ số dòng là 0), 
    // xem ở phần cửa vật liệu, updateTableHeaders
    // Tiếp theo ở đây là tới phần hiển thị thông tin bên trong bảng, ở giai đoạn này, thông tin trong bảng ở dòng đầu thứ 2 (chỉ số dòng là 1) sẽ là các DMTPi, DMXi. DMNuoc, DMPG,...
    // Thông tin ở dòng thứ 3 (chỉ số dòng là row=2) sẽ là giá trị thực tế của các mục ở tỏng dòng 1, tuy nhiên nó sẽ là "0", bắt đầu từ cột thứ 2 trở đi, chú ý cột đầu tiên sẽ có chỉ số là 0 nhé
    // Thông tin ở dòng thứ 4 (row=3) sẽ là sai số của các mục, tính từ mục đầu tiên là cột Định mức (cột = 1), giá trị của tất cả đều là ""

    // Hiển thị số mẻ ĐM và các thành phần định mức khác
    hienthiDinhMuc();
    console.log('Phiếu cân tại thời điểm kết thúc hàm DatCacThongSoPhieuCanBanDau: ', PhieuCan)
    console.log('Thu thập tại thời điểm kết thúc hàm DatCacThongSoPhieuCanBanDau: ', ThuThap)
    console.log('Thoát hàm DatCacThongSoPhieuCanBanDau')
}


function hienthiDinhMuc() {
    const flexData = document.querySelector('#responsive-table-input-matrix');
    console.log('Hiển thị số Mẻ ĐM của Phiếu cân hiện tại là: ', PhieuCan.CapPhoi.SoMe)
    flexData.rows[1].cells[1].textContent = PhieuCan.CapPhoi.SoMe.toString();

    // // Hiển thi các thành phần định mức, ĐMXi, Nuoc, PG
    // console.log('Ghi giá trị định mức của các TP')
    // for (let i = 0; i <= 3; i++) {
    //     flexData.rows[1].cells[i + 2].textContent = PhieuCan.CapPhoi.DMTP[i].toFixed(0);

    //     console.log('Kiểu dữ liệu của các DMTP lấy từ object PhieuCan: ', typeof PhieuCan.CapPhoi.DMTP[i])
    //     console.log('Giá trị ĐMTP hiển thị lên bảng: ', PhieuCan.CapPhoi.DMTP[i].toFixed(0))
    // }
    // console.log('Ghi giá trị định mức của Xi, Nước')
    // flexData.rows[1].cells[6].textContent = PhieuCan.CapPhoi.DMXI.toFixed(1);

    // flexData.rows[1].cells[7].textContent = PhieuCan.CapPhoi.DMNUOC.toFixed(1);

    // // flexData.rows[1].cells[8].textContent = PhieuCan.CapPhoi.DMPG.toFixed(2);
    // console.log('Ghi giá trị định mức của Phụ Gia')
    // for (let i = 0; i <= 1; i++) {
    //     flexData.rows[1].cells[i + 8].textContent = PhieuCan.CapPhoi.DMPG[i].toFixed(0);
    // }

    // Hiển thi các thành phần định mức, ĐMXi, Nuoc, PG
    console.log('Ghi giá trị định mức của các TP Ghi giá trị định mức của các TP Ghi giá trị định mức của các TP Ghi giá trị định mức của các TP')
    for (let i = 0; i <= 3; i++) {
        let value = Number(PhieuCan.CapPhoi.DMTP[i]);
        if (!isNaN(value)) {
            flexData.rows[1].cells[i + 2].textContent = value.toFixed(0);
        } else {
            // Handle the case where PhieuCan.CapPhoi.DMTP[i] cannot be converted to a number
            console.log('Cannot be converted to a number')
        }
        console.log('Kiểu dữ liệu của các DMTP lấy từ object PhieuCan: ', typeof PhieuCan.CapPhoi.DMTP[i])
        console.log('Giá trị ĐMTP hiển thị lên bảng: ', value.toFixed(0))
    }

    console.log('Ghi giá trị định mức của Xi, Nước')
    let valueDMXI = Number(PhieuCan.CapPhoi.DMXI);
    if (!isNaN(valueDMXI)) {
        flexData.rows[1].cells[6].textContent = valueDMXI.toFixed(1);
    } else {
        // Handle the case where PhieuCan.CapPhoi.DMXI cannot be converted to a number
        console.log('Cannot be converted to a number')
    }

    let valueDMNUOC = Number(PhieuCan.CapPhoi.DMNUOC);
    if (!isNaN(valueDMNUOC)) {
        flexData.rows[1].cells[7].textContent = valueDMNUOC.toFixed(1);
    } else {
        // Handle the case where PhieuCan.CapPhoi.DMNUOC cannot be converted to a number
        console.log('Cannot be converted to a number')
    }

    // flexData.rows[1].cells[8].textContent = PhieuCan.CapPhoi.DMPG.toFixed(2);
    console.log('Ghi giá trị định mức của Phụ Gia')
    for (let i = 0; i <= 1; i++) {
        let value = Number(PhieuCan.CapPhoi.DMPG[i]);
        if (!isNaN(value)) {
            flexData.rows[1].cells[i + 8].textContent = value.toFixed(0);
        } else {
            // Handle the case where PhieuCan.CapPhoi.DMPG[i] cannot be converted to a number
            console.log('Cannot be converted to a number')
        }
    }

    console.log('Đưa các giá trị thực tế về 0')
    for (let i = 0; i <= 3; i++) {
        flexData.rows[2].cells[i + 2].textContent = '0';
    }

    flexData.rows[2].cells[6].textContent = '0.0';

    flexData.rows[2].cells[7].textContent = '0.0';

    flexData.rows[2].cells[8].textContent = '0.00';
    flexData.rows[2].cells[9].textContent = '0.00';

    for (let i = 1; i <= 9; i++) {
        flexData.rows[3].cells[i].textContent = '';
    }
}






// // Hàm làm tròn số
function formatNumber(number, format) {
    if (typeof format === 'undefined' || !format.split || !format.split('.')[1]) {
        return number;
    }
    if (typeof number !== 'number' || isNaN(number)) {
        // Xử lý trường hợp number không phải là một số
        // Bạn có thể trả về một giá trị mặc định hoặc thông báo lỗi
        return 0;
    }
    return number.toFixed(format.split('.')[1].length);
}


// Lắng nghe sự kiện nhấn phím Enter trên form report Chi tiết phiếu cân
document.querySelector('[data-label="MaPhieuCan"]').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        // Lấy giá trị MaPhieuCan từ input field
        let MaPhieuCan = this.value;

        // Gửi giá trị MaPhieuCan đến server
        socket.emit('get_data', MaPhieuCan);
    }
});


// Nhận dữ liệu từ server và hiển thị lên trang web
socket.on('data', function (data) {
    console.log('Nội dung nhận được từ server là: ', data)
    // Kiểm tra xem đối tượng phieucan có tồn tại trong dữ liệu trả về từ server hay không
    if (!data.phieucan) {
        // Nếu đối tượng phieucan không tông tại, thì thông báo lỗi cho người dùng
        if (confirm('Mã phiếu cân số ' + document.querySelector('[data-label="MaPhieuCan"]').value + ' không có dữ liệu phiếu cân. \nVui lòng chọn một mã phiếu cân khác. Cảm ơn.')) {
            document.querySelector('[data-label="MaPhieuCan"]').focus();
        } else document.querySelector('[data-label="MaPhieuCan"]').focus();
        return;
    }

    // Hiển thị dữ liệu lên các input field
    document.querySelector('[data-label="TenKhachHang"]').value = data.phieucan.TenKhachHang;
    document.querySelector('[data-label="BienSoXe"]').value = data.phieucan.BienSoXe;
    document.querySelector('[data-label="SoM3"]').value = data.phieucan.Som3Me;
    document.querySelector('[data-label="MacBeTong"]').value = data.phieucan.MacBeTong;
    document.querySelector('[data-label="Ngay"]').value = data.phieucan.Ngay;
    document.querySelector('[data-label="GioXong"]').value = data.phieucan.GioXong;
    document.querySelector('[data-label="DoSut"]').value = data.phieucan.DoSut;
    // Hiển thị dữ liệu lên bảng
    let table = document.getElementById('reportTablePhieuCanMaPhieuCan');
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
    console.log('Số dòng lúc đầu: ', rows.length)
    // Xóa dữ liệu cũ trong bảng
    for (let i = rows.length - 1; i >= 1; i--) {
        tbody.deleteRow(i);
        console.log('Số dòng hiện tại: ', rows.length)
    }
    console.log('Số dòng còn lại: ', rows.length)
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
    dinhmucRow.cells[0].style.fontWeight = 'bold';
    // dinhmucRow.cells[0].style.fontSize = '20px';
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
    tongRow.cells[0].style.fontWeight = 'bold';
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

/////////////////////////////////////////////////////////////Lắng nghe sự kiện tải lại trang và gọi hàm khi có sự kiện Click//////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    console.log('Gọi hàm lắng nghe sự kiện HTML đã tải song cú pháp ở file Setup js');

    addRowClickListener(`#macBetong`, `.form-container-macBetong input`);
    addRowClickListener(`#datCapphoi`, `.form-container-datCapphoi input`);
    updateInputsOnRowClick('#datCapphoi', '.form-container-datCapphoi input');
    // Đăng ký hàm xử lý sự kiện nhấp chuột vào nút cmdXeTronMoi
    cmdXeTronMoi.addEventListener('click', cmdXeTronMoi_Click);
    // Đăng ký hàm xử lý sự kiện nhấp chuột vào nút cmdChay
    cmdChay.addEventListener('click', cmdChay_Click);
    console.log('Bít đã chọn xe đang là: ', PhieuCan.DaChonXe);
    console.log('Trạng thái bít disable Xe Tron Moi: ', cmdXeTronMoi.disabled);

    // btChay_status();

    // // Đây là đoạn chương trình kiểm tra việt set và reset, chú ý bit XE_TRON_MOI đã được đổi sang M230.0, nhớ sửa lại. Ngoài ra cũng có một nút TEST được tạo mới để phục vụ việc kiểm tra
    // $('#test').on('click', function () {
    //     socket.emit('nhannutTest', true);
    //     console.log('Test đã được nhấn')
    // });
    // Đọc tin done, sau đó nó đợi 3s mới tiếp tục gửi lệnh reset đi
    /////////////////////////////////////////////////////////////// HÀM NÀY LÀ HÀM CHUNG, NÓ CHỈ CẦN LẮNG NGHE VÀ YÊU CẦU SERVER THỰC HIỆN LỆNH RESET///////////////////
    socket.on('done', function (data) {
        if (data) {
            setTimeout(function () {

                console.log('Gửi lệnh yêu cầu reset bit')
                socket.emit('XE_TRON_MOI', false);

            }, 100);
        }
        socket.emit("cmdChay_Click", "DỪNG");
    });
    socket.on('error', function (msg) {
        console.log(msg);
    });

    // Không có tiemOut
    // socket.on('done', function (data) {
    //     if (data) {

    //         socket.emit('nhannutTest', false);
    //         console.log('Gửi lệnh yêu cầu reset bit')

    //     }
    // });
    // socket.on('error', function (msg) {
    //     console.log(msg);
    // });
    socket.on('CHAY_DUNG_Status', function (data) {
        if (data) {
            console.log('CHAY_DUNG_Status', data)

        } else {
            console.log('Chưa set được CHAY_DUNG_Status', data)
        }
    });
    socket.on('error', function (msg) {
        console.log(msg);
    });

});
/////////////////////////////////////////////////////////////////////////////////////////////////
// function updateDatabase() {
//     // Lấy giá trị từ các trường nhập liệu
//     let field1 = document.querySelector('.form-container input:nth-of-type(1)').value || "0";
//     let field2 = document.querySelector('.form-container input:nth-of-type(2)').value || "0";
//     let field3 = document.querySelector('.form-container input:nth-of-type(3)').value || "0";
//     let field4 = document.querySelector('.form-container input:nth-of-type(4)').value || "0";
//     let field5 = document.querySelector('.form-container input:nth-of-type(5)').value || "0";
//     let field6 = document.querySelector('.form-container input:nth-of-type(6)').value || "0";
//     let field7 = document.querySelector('.form-container input:nth-of-type(7)').value || "0";
//     let field8 = document.querySelector('.form-container input:nth-of-type(8)').value || "0";
//     let field9 = document.querySelector('.form-container input:nth-of-type(9)').value || "0";
//     let field10 = document.querySelector('.form-container input:nth-of-type(10)').value || "0";
//     let field11 = document.querySelector('.form-container input:nth-of-type(11)').value || "0";

//     // Gửi sự kiện updateDatabase cùng với dữ liệu từ các trường nhập liệu đến máy chủ
//     socket.emit('updateDatabase', { field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11 });
// }

/////////////////////////////////////////////////////////////////////////////////////////////////
function updateDatabase() {
    // Lấy giá trị từ các trường nhập liệu
    let field1 = document.querySelector('.form-container > div:nth-child(1) > input').value || "0";
    let field2 = document.querySelector('.form-container > div:nth-child(2) > input').value || "0";
    let field3 = document.querySelector('.form-container > div:nth-child(3) > input').value || "0";
    let field4 = document.querySelector('.form-container > div:nth-child(4) > input').value || "0";
    let field5 = document.querySelector('.form-container > div:nth-child(5) > input').value || "0";
    let field6 = document.querySelector('.form-container > div:nth-child(6) > input').value || "0";
    let field7 = document.querySelector('.form-container > div:nth-child(7) > input').value || "0";
    let field8 = document.querySelector('.form-container > div:nth-child(8) > input').value || "0";
    let field9 = document.querySelector('.form-container > div:nth-child(9) > input').value || "0";
    let field10 = document.querySelector('.form-container > div:nth-child(10) > input').value || "0";
    let field11 = document.querySelector('.form-container > div:nth-child(11) > input').value || "0";

    // Gửi sự kiện updateDatabase cùng với dữ liệu từ các trường nhập liệu đến máy chủ
    socket.emit('updateDatabase', { field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11 });
}
// Thêm sự kiện click cho Nút 1, 2 SỰ KIỆN NÀY ĐÃ ĐƯỢC MOVE VÀO HÀM validateNumberInput()
// document.querySelector('.button-container button:nth-of-type(1)').addEventListener('click', updateDatabase);
// document.querySelector('.button-container button:nth-of-type(1)').addEventListener('click', fn_Table01_SQL_Show);

// // Ham kiểm tra các textbox nhập vào có đúng là só không, nếu đúng thì gọi hàm
function validateNumberInput() {
    let inputs = document.querySelectorAll(".form-container input[type='text']:not(.exclude)");
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
        fn_Table01_SQL_Show();
        return true;
    }
}
// Chương trình con đọc dữ liệu SQL
function fn_Table01_SQL_Show() {
    socket.emit("msg_SQL_Show", "true");
    socket.on('SQL_Show', function (data) {
        fn_table_01(data);
        fn_table_02(data);
    });
}
// Chương trình con đọc dữ liệu SQL
function fn_Table02_SQL_Show() {
    socket.emit("msg_SQL_Show", "true");
    socket.on('SQL_Show', function (data) {
        // fn_table_01(data);
        fn_table_02(data);
    });
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
//Cập nhật vào trường input trong datCapphoi
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
        console.log(rowData)
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
            console.log(key);
            console.log(input);
            console.log(input.value);
        }
    });
}
//////////////Hàm chọn và chỉnh sửa nội dung tổng bảng////////////////////////////
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
//Lắng nghe sự kiện tải lại trang và gọi hàm khi có sự kiện Click
document.addEventListener('DOMContentLoaded', () => {
    updateInputsOnRowClick(`#datCapphoi`, `.form-container-datCapphoi input`);
    addRowClickListener(`#macBetong`, `.form-container-macBetong input`);
});
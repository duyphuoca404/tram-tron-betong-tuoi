// /////////////////////////++THIẾT LẬP KẾT NỐI VỚI SERVER VỚI PLC/////////////////////////

// KHỞI TẠO KẾT NỐI PLC
var nodes7 = require('nodes7');
var conn_plc = new nodes7; //PLC1
// Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)
conn_plc.initiateConnection({ port: 102, host: '192.168.1.87', rack: 0, slot: 1 }, PLC_connected);
// Bảng tag trong Visual studio code
var tags_list = {
    btt_Auto: 'DB1,X0.0',           // Dữ liệu dạng bool
    btt_Manu: 'DB1,X0.1',
    btt_Auto_Confirm: 'DB1,X0.2',
    btt_V1_Open: 'DB1,X0.3',
    btt_V1_Close: 'DB1,X0.4',
    btt_V2_Open: 'DB1,X0.5',
    btt_V2_Close: 'DB1,X0.6',
    btt_V3_Open: 'DB1,X0.7',
    btt_V3_Close: 'DB1,X1.0',
    btt_DC_Tron_Run: 'DB1,X1.1',
    btt_DC_Tron_Stop: 'DB1,X1.2',
    CB_Can: 'DB1,X1.3',
    Q_Lamp_Auto: 'DB1,X1.4',
    Q_Lamp_Manu: 'DB1,X1.5',
    status_Valve_1: 'DB1,BYTE2',          // Dữ liệu dạng Byte
    status_Valve_2: 'DB1,BYTE3',
    status_Valve_3: 'DB1,BYTE4',
    status_DC_Tron: 'DB1,BYTE5',
    Setting_Time_Tron: 'DB1,INT6',        // Dữ liệu dạng số nguyên integer
    Act_Time_Tron: 'DB1,INT8',


    Setting_Weight_1: 'DB1,REAL10',          // Dữ liệu dạng số thực real
    Setting_Weight_2: 'DB1,REAL14',
    Act_Weight_1: 'DB1,REAL18',
    Act_Weight_2: 'DB1,REAL22'
};

// GỬI DỮ LIỆu TAG CHO PLC
function PLC_connected(err) {
    if (typeof (err) !== "undefined") {
        console.log(err); // Hiển thị lỗi nếu không kết nối đƯỢc với PLC
    }
    conn_plc.setTranslationCB(function (tag) { return tags_list[tag]; });  // Đưa giá trị đọc lên từ PLC và mảng
    conn_plc.addItems([
        'btt_Auto',
        'btt_Manu',
        'btt_Auto_Confirm',
        'btt_V1_Open',
        'btt_V1_Close',
        'btt_V2_Open',
        'btt_V2_Close',
        'btt_V3_Open',
        'btt_V3_Close',
        'btt_DC_Tron_Run',
        'btt_DC_Tron_Stop',
        'CB_Can',
        'Q_Lamp_Auto',
        'Q_Lamp_Manu',
        'status_Valve_1',
        'status_Valve_2',
        'status_Valve_3',
        'status_DC_Tron',
        'Setting_Time_Tron',
        'Act_Time_Tron',
        'Setting_Weight_1',
        'Setting_Weight_2',
        'Act_Weight_1',
        'Act_Weight_2'
    ]);
}

// Đọc dữ liệu từ PLC và đưa vào array tags
var arr_tag_value = []; // Tạo một mảng lưu giá trị tag đọc về
function valuesReady(anythingBad, values) {
    if (anythingBad) { console.log("Lỗi khi đọc dữ liệu tag"); } // Cảnh báo lỗi
    var lodash = require('lodash'); // Chuyển variable sang array
    arr_tag_value = lodash.map(values, (item) => item);
    console.log(values); // Hiển thị giá trị để kiểm tra
}

// Hàm chức năng scan giá trị
function fn_read_data_scan() {
    conn_plc.readAllItems(valuesReady);
}
// Time cập nhật mỗi 1s
setInterval(
    () => fn_read_data_scan(),
    1000 // 1s = 1000ms
);

// /////////////////////////++THIẾT LẬP KẾT NỐI VỚI TRÌNH DUYỆT PHÍA CLIENT/////////////////////////
var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);
// Home calling
app.get("/", function (req, res) {
    res.render("home")
});
//
// ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
function fn_tag() {
    io.sockets.emit("btt_Auto", arr_tag_value[0]);
    io.sockets.emit("btt_Manu", arr_tag_value[1]);
    io.sockets.emit("btt_Auto_Confirm", arr_tag_value[2]);
    io.sockets.emit("btt_V1_Open", arr_tag_value[3]);
    io.sockets.emit("btt_V1_Close", arr_tag_value[4]);
    io.sockets.emit("btt_V2_Open", arr_tag_value[5]);
    io.sockets.emit("btt_V2_Close", arr_tag_value[6]);
    io.sockets.emit("btt_V3_Open", arr_tag_value[7]);
    io.sockets.emit("btt_V3_Close", arr_tag_value[8]);
    io.sockets.emit("btt_DC_Tron_Run", arr_tag_value[9]);
    io.sockets.emit("btt_DC_Tron_Stop", arr_tag_value[10]);
    io.sockets.emit("CB_Can", arr_tag_value[11]);
    io.sockets.emit("Q_Lamp_Auto", arr_tag_value[12]);
    io.sockets.emit("Q_Lamp_Manu", arr_tag_value[13]);
    io.sockets.emit("status_Valve_1", arr_tag_value[14]);
    io.sockets.emit("status_Valve_2", arr_tag_value[15]);
    io.sockets.emit("status_Valve_3", arr_tag_value[16]);
    io.sockets.emit("status_DC_Tron", arr_tag_value[17]);
    io.sockets.emit("Setting_Time_Tron", arr_tag_value[18]);
    io.sockets.emit("Act_Time_Tron", arr_tag_value[19]);
    io.sockets.emit("Setting_Weight_1", arr_tag_value[20]);
    io.sockets.emit("Setting_Weight_2", arr_tag_value[21]);
    io.sockets.emit("Act_Weight_1", arr_tag_value[22]);
    io.sockets.emit("Act_Weight_2", arr_tag_value[23]);
}
// ///////////GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT)///////////
io.on("connection", function (socket) {
    socket.on("Client-send-data", function (data) {
        fn_tag();
    });
});

// ///////////HÀM GHI DỮ LIỆU XUỐNG PLC//////////
function valuesWritten(anythingBad) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
    console.log("Done writing.");
}

// ///////////// Nhận các bức điện được gửi từ trình duyệt//////////
io.on("connection", function(socket){
    ///////////// Nhận các bức điện được gửi từ trình duyệt ở chế độ TỰ ĐỘNG
    // Nút nhấn chọn chế độ tự động
        socket.on("cmd_Auto", function(data){
        conn_plc.writeItems('btt_Auto', data, valuesWritten);
    });
    // Nút nhấn chọn chế độ bằng tay
    socket.on("cmd_Manu", function(data){
        conn_plc.writeItems('btt_Manu', data, valuesWritten);
    });
    // Nút nhấn xác nhận chế độ
    socket.on("cmd_Confirm", function(data){
        conn_plc.writeItems('btt_Auto_Confirm', data, valuesWritten);
    });
    ///////////// Nhận các bức điện được gửi từ trình duyệt ở chế độ BẰNG TAY
    // Nút nhấn Mở van 1
    socket.on("cmd_OpenV1", function(data){
        conn_plc.writeItems('btt_V1_Open', data, valuesWritten);
    });
    // Nút nhấn Đóng van 1
    socket.on("cmd_CloseV1", function(data){
        conn_plc.writeItems('btt_V1_Close', data, valuesWritten);
    });
    // Nút nhấn Mở van 2
    socket.on("cmd_OpenV2", function(data){
        conn_plc.writeItems('btt_V2_Open', data, valuesWritten);
    });
    // Nút nhấn Đóng van 2
    socket.on("cmd_CloseV2", function(data){
        conn_plc.writeItems('btt_V2_Close', data, valuesWritten);
    });
    // Nút nhấn Mở van 3
    socket.on("cmd_OpenV3", function(data){
        conn_plc.writeItems('btt_V3_Open', data, valuesWritten);
    });
    // Nút nhấn Đóng van 3
    socket.on("cmd_CloseV3", function(data){
        conn_plc.writeItems('btt_V3_Close', data, valuesWritten);
    });
    // Nút nhấn Chạy động cơ trộn
    socket.on("cmd_RunM1", function(data){
        conn_plc.writeItems('btt_DC_Tron_Run', data, valuesWritten);
    });
    // Nút nhấn Đóng van 3
    socket.on("cmd_StopM1", function(data){
        conn_plc.writeItems('btt_DC_Tron_Stop', data, valuesWritten);
    });
    ///////////// Đoạn lệnh nhận các bức điện cmd khi cần Edit từ trình duyệt và ghi xuống PLC ///////////////
    // Ghi dữ liệu từ IO field
    socket.on("cmd_Edit_Data", function(data){
        conn_plc.writeItems([
                            'Setting_Weight_1','Setting_Weight_2','Setting_Time_Tron'],
                            [data[0],data[1],data[2]
                        ], valuesWritten);  
        });
});
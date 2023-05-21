// /////////////////////////++THIẾT LẬP KẾT NỐI VỚI SERVER VỚI PLC/////////////////////////

// KHỞI TẠO KẾT NỐI PLC
var nodes7 = require('nodes7');
var conn_plc = new nodes7; //PLC1
// Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)
conn_plc.initiateConnection({ port: 102, host: '192.168.0.5', rack: 0, slot: 1 }, PLC_connected);
// Bảng tag trong Visual studio code
var tags_list = {
    DTO: 'I0.0',
    I01: 'I0.1',
    COI_CHAY: 'I0.2',
    DTT: 'I0.3',
    MTT: 'I0.4',
    I05: 'I0.5',
    DT1: 'I0.6',
    DT2: 'I0.7',
    CAN_TAY: 'I1.0',
    CAN_TD: 'I1.1',
    XA_TAY: 'I1.2',
    XA_TD: 'I1.3',
    GAU_TAY: 'I1.4',
    GAU_TD: 'I1.5',
    IN_TP1: 'I1.6',
    IN_TP2: 'I1.7',
    I20: 'I2.0',
    IN_XI: 'I2.1',
    IN_NUOC: 'I2.2',
    IN_GAU_LEN: 'I2.3',
    IN_GAU_XUONG: 'I2.4',
    IN_XA_XI: 'I2.5',
    IN_XA_NUOC: 'I2.6',
    IN_XA_BT: 'I2.7',
    IN_DONG_BT: 'I3.0',
    I31: 'I3.1',
    I32: 'I3.2',
    I33: 'I3.3',
    I34: 'I3.4',
    I35: 'I3.5',
    IN_BN: 'I3.6',
    IN_TP3: 'I3.7',
    I40: 'I4.0',
    TP1: 'Q0.0',
    TP2: 'Q0.1',
    TP3: 'Q0.2',
    CAN_XIMANG: 'Q0.3',
    Q04: 'Q0.4',
    TP4: 'Q0.4',
    OUT_CAN_NUOC: 'Q0.5',
    XA_XI: 'Q0.6',
    XA_NUOC: 'Q0.7',
    XA_BT: 'Q1.0',
    Q11: 'Q1.1',
    Q12: 'Q2.0',
    GAU_LEN: 'Q2.1',
    GAU_XUONG: 'Q2.2',
    Q15: 'Q2.4',
    Q16: 'Q2.4',
    Q17: 'Q2.5',
    CAN_COM3: 'M5.0',
    PAUSE_COM3: 'M5.1',
    CHAY_DUNG: 'M20.0',
    XE_TRON_MOI: 'M21.5',
    EMTY1: 'DB1,REAL0',
    PAUSE1: 'DB1,INT4',
    CUT_COM1: 'DB1,REAL6',
    DELAY_1: 'DB1,INT14',
    SO_ME_HT1: 'DB1,INT18',
    SO_ME_DM: 'DB1,INT20',
    COM1: 'DB1,REAL22',
    Sym_VD66: 'DB1,REAL38',
    TG_NHAY_COM1: 'DB1,INT46',
    CUT_COM2: 'DB1,REAL62',
    COM2: 'DB1,REAL70',
    Sym_VD366: 'DB1,REAL86',
    TG_NHAY_COM2: 'DB1,INT94',
    CUT_COM3: 'DB1,REAL102',
    COM3: 'DB1,REAL110',
    Sym_VD566: 'DB1,REAL126',
    TG_NHAY_COM3: 'DB1,INT134',
    DELAY_PE: 'DB1,INT150',
    TG_TRUNGCAP: 'DB1,INT152',
    DUNG_SKIP_DT2: 'DB1,INT154',
    DT2_DEN_DT0: 'DB1,INT156',
    EMTY2: 'DB1,REAL158',
    PAUSE2: 'DB1,INT162',
    CUT_XI1: 'DB1,REAL164',
    TG_TRE_CAN2: 'DB1,INT172',
    TG_TRE_XA_XI: 'DB1,INT174',
    SO_ME_HT2: 'DB1,INT180',
    XI_MANG1: 'DB1,REAL182',
    Sym_VD1066: 'DB1,REAL198',
    TG_NHAY_XI_1: 'DB1,INT206',
    EMTY3: 'DB1,REAL222',
    PAUSE3: 'DB1,INT226',
    CUT_NUOC: 'DB1,REAL228',
    TG_TRE_CAN3: 'DB1,INT236',
    TG_TRE_XANUOC: 'DB1,INT238',
    SOME_HT3: 'DB1,INT244',
    NUOC_THEM: 'DB1,REAL246',
    NUOC_DM: 'DB1,REAL250',
    Sym_VD2066: 'DB1,REAL266',
    TG_NHAY_NUOC: 'DB1,INT274',
    TGTRON: 'DB1,INT286',
    TG_XA: 'DB1,INT288',
    KL_CAN2: 'DB1,REAL298',
    ZEZO2: 'DB1,REAL302',
    ALALOG2: 'DB1,REAL314',
    B2: 'DB1,REAL330',
    VB4154: 'DB1,BYTE348',
    VB4155: 'DB1,BYTE349',
    KL_CAN3: 'DB1,REAL354',
    ZEZO_3: 'DB1,REAL358',
    ALALOG3: 'DB1,REAL370',
    B3: 'DB1,REAL386',
    VB4254: 'DB1,BYTE404',
    VB4255: 'DB1,BYTE405',
    KL_CAN1: 'DB1,REAL412',
    ZEZO1: 'DB1,REAL416',
    ALALOG1: 'DB1,REAL428',
    B1: 'DB1,REAL444',
    VB5054: 'DB1,BYTE462',
    VB5055: 'DB1,BYTE463',
    VB3036: 'DB1,BYTE474',
    VW3034: 'DB1,BYTE476',
    VB3037: 'DB1,BYTE478',
    T55: 'DB1,REAL480',
    T56: 'DB1,REAL484',
    VW4612: 'DB1,REAL488',
    G1_Feedback: 'DB1,REAL490',
    G2_Feedback: 'DB1,REAL494',
    G3_Feedback: 'DB1,REAL498',
    G4_Feedback: 'DB1,REAL502',
    G1_Real_Tem: 'DB1,REAL506',
    G2_Real_Tem: 'DB1,REAL510',
    G3_Real_Tem: 'DB1,REAL514',
    G4_Real_Tem: 'DB1,REAL518',
    G1_Tem: 'DB1,REAL522',
    G2_Tem: 'DB1,REAL526',
    G3_Tem: 'DB1,REAL530',
    G4_Tem: 'DB1,REAL534',
    G1_Tem_Display: 'DB1,REAL538',
    G2_Tem_Display: 'DB1,REAL542',
    G3_Tem_Display: 'DB1,REAL546',
    G4_Tem_Display: 'DB1,REAL550',
    COM4: 'DB1,REAL554',
    CUT_COM4: 'DB1,REAL560',
    Sym_VD766: 'DB1,REAL574',
    TG_NHAY_COM4: 'DB1,INT590',
    CountDownXaBON: 'DB1,INT598',
    CountDownTronBON: 'DB1,INT600'
};

// GỬI DỮ LIỆu TAG CHO PLC
function PLC_connected(err) {
    if (typeof (err) !== "undefined") {
        console.log(err); // Hiển thị lỗi nếu không kết nối đƯỢc với PLC
    }
    conn_plc.setTranslationCB(function (tag) { return tags_list[tag]; });  // Đưa giá trị đọc lên từ PLC và mảng
    conn_plc.addItems([
        'DTO',
        'I01',
        'COI_CHAY',
        'DTT',
        'MTT',
        'I05',
        'DT1',
        'DT2',
        'CAN_TAY',
        'CAN_TD',
        'XA_TAY',
        'XA_TD',
        'GAU_TAY',
        'GAU_TD',
        'IN_TP1',
        'IN_TP2',
        'I20',
        'IN_XI',
        'IN_NUOC',
        'IN_GAU_LEN',
        'IN_GAU_XUONG',
        'IN_XA_XI',
        'IN_XA_NUOC',
        'IN_XA_BT',
        'IN_DONG_BT',
        'I31',
        'I32',
        'I33',
        'I34',
        'I35',
        'IN_BN',
        'IN_TP3',
        'I40',
        'TP1',
        'TP2',
        'TP3',
        'CAN_XIMANG',
        'Q04',
        'TP4',
        'OUT_CAN_NUOC',
        'XA_XI',
        'XA_NUOC',
        'XA_BT',
        'Q11',
        'Q12',
        'GAU_LEN',
        'GAU_XUONG',
        'Q15',
        'Q16',
        'Q17',
        'CAN_COM3',
        'PAUSE_COM3',
        'CHAY_DUNG',
        'XE_TRON_MOI',
        'EMTY1',
        'PAUSE1',
        'CUT_COM1',
        'DELAY_1',
        'SO_ME_HT1',
        'SO_ME_DM',
        'COM1',
        'Sym_VD66',
        'TG_NHAY_COM1',
        'CUT_COM2',
        'COM2',
        'Sym_VD366',
        'TG_NHAY_COM2',
        'CUT_COM3',
        'COM3',
        'Sym_VD566',
        'TG_NHAY_COM3',
        'DELAY_PE',
        'TG_TRUNGCAP',
        'DUNG_SKIP_DT2',
        'DT2_DEN_DT0',
        'EMTY2',
        'PAUSE2',
        'CUT_XI1',
        'TG_TRE_CAN2',
        'TG_TRE_XA_XI',
        'SO_ME_HT2',
        'XI_MANG1',
        'Sym_VD1066',
        'TG_NHAY_XI_1',
        'EMTY3',
        'PAUSE3',
        'CUT_NUOC',
        'TG_TRE_CAN3',
        'TG_TRE_XANUOC',
        'SOME_HT3',
        'NUOC_THEM',
        'NUOC_DM',
        'Sym_VD2066',
        'TG_NHAY_NUOC',
        'TGTRON',
        'TG_XA',
        'KL_CAN2',
        'ZEZO2',
        'ALALOG2',
        'B2',
        'VB4154',
        'VB4155',
        'KL_CAN3',
        'ZEZO_3',
        'ALALOG3',
        'B3',
        'VB4254',
        'VB4255',
        'KL_CAN1',
        'ZEZO1',
        'ALALOG1',
        'B1',
        'VB5054',
        'VB5055',
        'VB3036',
        'VW3034',
        'VB3037',
        'T55',
        'T56',
        'VW4612',
        'G1_Feedback',
        'G2_Feedback',
        'G3_Feedback',
        'G4_Feedback',
        'G1_Real_Tem',
        'G2_Real_Tem',
        'G3_Real_Tem',
        'G4_Real_Tem',
        'G1_Tem',
        'G2_Tem',
        'G3_Tem',
        'G4_Tem',
        'G1_Tem_Display',
        'G2_Tem_Display',
        'G3_Tem_Display',
        'G4_Tem_Display',
        'COM4',
        'CUT_COM4',
        'Sym_VD766',
        'TG_NHAY_COM4',
        'CountDownXaBON',
        'CountDownTronBON'
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
    io.sockets.emit("DTO", arr_tag_value[0]);
    io.sockets.emit("I01", arr_tag_value[1]);
    io.sockets.emit("COI_CHAY", arr_tag_value[2]);
    io.sockets.emit("DTT", arr_tag_value[3]);
    io.sockets.emit("MTT", arr_tag_value[4]);
    io.sockets.emit("I05", arr_tag_value[5]);
    io.sockets.emit("DT1", arr_tag_value[6]);
    io.sockets.emit("DT2", arr_tag_value[7]);
    io.sockets.emit("CAN_TAY", arr_tag_value[8]);
    io.sockets.emit("CAN_TD", arr_tag_value[9]);
    io.sockets.emit("XA_TAY", arr_tag_value[10]);
    io.sockets.emit("XA_TD", arr_tag_value[11]);
    io.sockets.emit("GAU_TAY", arr_tag_value[12]);
    io.sockets.emit("GAU_TD", arr_tag_value[13]);
    io.sockets.emit("IN_TP1", arr_tag_value[14]);
    io.sockets.emit("IN_TP2", arr_tag_value[15]);
    io.sockets.emit("I20", arr_tag_value[16]);
    io.sockets.emit("IN_XI", arr_tag_value[17]);
    io.sockets.emit("IN_NUOC", arr_tag_value[18]);
    io.sockets.emit("IN_GAU_LEN", arr_tag_value[19]);
    io.sockets.emit("IN_GAU_XUONG", arr_tag_value[20]);
    io.sockets.emit("IN_XA_XI", arr_tag_value[21]);
    io.sockets.emit("IN_XA_NUOC", arr_tag_value[22]);
    io.sockets.emit("IN_XA_BT", arr_tag_value[23]);
    io.sockets.emit("IN_DONG_BT", arr_tag_value[24]);
    io.sockets.emit("I31", arr_tag_value[25]);
    io.sockets.emit("I32", arr_tag_value[26]);
    io.sockets.emit("I33", arr_tag_value[27]);
    io.sockets.emit("I34", arr_tag_value[28]);
    io.sockets.emit("I35", arr_tag_value[29]);
    io.sockets.emit("IN_BN", arr_tag_value[30]);
    io.sockets.emit("IN_TP3", arr_tag_value[31]);
    io.sockets.emit("I40", arr_tag_value[32]);
    io.sockets.emit("TP1", arr_tag_value[33]);
    io.sockets.emit("TP2", arr_tag_value[34]);
    io.sockets.emit("TP3", arr_tag_value[35]);
    io.sockets.emit("CAN_XIMANG", arr_tag_value[36]);
    io.sockets.emit("Q04", arr_tag_value[37]);
    io.sockets.emit("TP4", arr_tag_value[38]);
    io.sockets.emit("OUT_CAN_NUOC", arr_tag_value[39]);
    io.sockets.emit("XA_XI", arr_tag_value[40]);
    io.sockets.emit("XA_NUOC", arr_tag_value[41]);
    io.sockets.emit("XA_BT", arr_tag_value[42]);
    io.sockets.emit("Q11", arr_tag_value[43]);
    io.sockets.emit("Q12", arr_tag_value[44]);
    io.sockets.emit("GAU_LEN", arr_tag_value[45]);
    io.sockets.emit("GAU_XUONG", arr_tag_value[46]);
    io.sockets.emit("Q15", arr_tag_value[47]);
    io.sockets.emit("Q16", arr_tag_value[48]);
    io.sockets.emit("Q17", arr_tag_value[49]);
    io.sockets.emit("CAN_COM3", arr_tag_value[50]);
    io.sockets.emit("PAUSE_COM3", arr_tag_value[51]);
    io.sockets.emit("CHAY_DUNG", arr_tag_value[52]);
    io.sockets.emit("XE_TRON_MOI", arr_tag_value[53]);
    io.sockets.emit("EMTY1", arr_tag_value[54]);
    io.sockets.emit("PAUSE1", arr_tag_value[55]);
    io.sockets.emit("CUT_COM1", arr_tag_value[56]);
    io.sockets.emit("DELAY_1", arr_tag_value[57]);
    io.sockets.emit("SO_ME_HT1", arr_tag_value[58]);
    io.sockets.emit("SO_ME_DM", arr_tag_value[59]);
    io.sockets.emit("COM1", arr_tag_value[60]);
    io.sockets.emit("Sym_VD66", arr_tag_value[61]);
    io.sockets.emit("TG_NHAY_COM1", arr_tag_value[62]);
    io.sockets.emit("CUT_COM2", arr_tag_value[63]);
    io.sockets.emit("COM2", arr_tag_value[64]);
    io.sockets.emit("Sym_VD366", arr_tag_value[65]);
    io.sockets.emit("TG_NHAY_COM2", arr_tag_value[66]);
    io.sockets.emit("CUT_COM3", arr_tag_value[67]);
    io.sockets.emit("COM3", arr_tag_value[68]);
    io.sockets.emit("Sym_VD566", arr_tag_value[69]);
    io.sockets.emit("TG_NHAY_COM3", arr_tag_value[70]);
    io.sockets.emit("DELAY_PE", arr_tag_value[71]);
    io.sockets.emit("TG_TRUNGCAP", arr_tag_value[72]);
    io.sockets.emit("DUNG_SKIP_DT2", arr_tag_value[73]);
    io.sockets.emit("DT2_DEN_DT0", arr_tag_value[74]);
    io.sockets.emit("EMTY2", arr_tag_value[75]);
    io.sockets.emit("PAUSE2", arr_tag_value[76]);
    io.sockets.emit("CUT_XI1", arr_tag_value[77]);
    io.sockets.emit("TG_TRE_CAN2", arr_tag_value[78]);
    io.sockets.emit("TG_TRE_XA_XI", arr_tag_value[79]);
    io.sockets.emit("SO_ME_HT2", arr_tag_value[80]);
    io.sockets.emit("XI_MANG1", arr_tag_value[81]);
    io.sockets.emit("Sym_VD1066", arr_tag_value[82]);
    io.sockets.emit("TG_NHAY_XI_1", arr_tag_value[83]);
    io.sockets.emit("EMTY3", arr_tag_value[84]);
    io.sockets.emit("PAUSE3", arr_tag_value[85]);
    io.sockets.emit("CUT_NUOC", arr_tag_value[86]);
    io.sockets.emit("TG_TRE_CAN3", arr_tag_value[87]);
    io.sockets.emit("TG_TRE_XANUOC", arr_tag_value[88]);
    io.sockets.emit("SOME_HT3", arr_tag_value[89]);
    io.sockets.emit("NUOC_THEM", arr_tag_value[90]);
    io.sockets.emit("NUOC_DM", arr_tag_value[91]);
    io.sockets.emit("Sym_VD2066", arr_tag_value[92]);
    io.sockets.emit("TG_NHAY_NUOC", arr_tag_value[93]);
    io.sockets.emit("TGTRON", arr_tag_value[94]);
    io.sockets.emit("TG_XA", arr_tag_value[95]);
    io.sockets.emit("KL_CAN2", arr_tag_value[96]);
    io.sockets.emit("ZEZO2", arr_tag_value[97]);
    io.sockets.emit("ALALOG2", arr_tag_value[98]);
    io.sockets.emit("B2", arr_tag_value[99]);
    io.sockets.emit("VB4154", arr_tag_value[100]);
    io.sockets.emit("VB4155", arr_tag_value[101]);
    io.sockets.emit("KL_CAN3", arr_tag_value[102]);
    io.sockets.emit("ZEZO_3", arr_tag_value[103]);
    io.sockets.emit("ALALOG3", arr_tag_value[104]);
    io.sockets.emit("B3", arr_tag_value[105]);
    io.sockets.emit("VB4254", arr_tag_value[106]);
    io.sockets.emit("VB4255", arr_tag_value[107]);
    io.sockets.emit("KL_CAN1", arr_tag_value[108]);
    io.sockets.emit("ZEZO1", arr_tag_value[109]);
    io.sockets.emit("ALALOG1", arr_tag_value[110]);
    io.sockets.emit("B1", arr_tag_value[111]);
    io.sockets.emit("VB5054", arr_tag_value[112]);
    io.sockets.emit("VB5055", arr_tag_value[113]);
    io.sockets.emit("VB3036", arr_tag_value[114]);
    io.sockets.emit("VW3034", arr_tag_value[115]);
    io.sockets.emit("VB3037", arr_tag_value[116]);
    io.sockets.emit("T55", arr_tag_value[117]);
    io.sockets.emit("T56", arr_tag_value[118]);
    io.sockets.emit("VW4612", arr_tag_value[119]);
    io.sockets.emit("G1_Feedback", arr_tag_value[120]);
    io.sockets.emit("G2_Feedback", arr_tag_value[121]);
    io.sockets.emit("G3_Feedback", arr_tag_value[122]);
    io.sockets.emit("G4_Feedback", arr_tag_value[123]);
    io.sockets.emit("G1_Real_Tem", arr_tag_value[124]);
    io.sockets.emit("G2_Real_Tem", arr_tag_value[125]);
    io.sockets.emit("G3_Real_Tem", arr_tag_value[126]);
    io.sockets.emit("G4_Real_Tem", arr_tag_value[127]);
    io.sockets.emit("G1_Tem", arr_tag_value[128]);
    io.sockets.emit("G2_Tem", arr_tag_value[129]);
    io.sockets.emit("G3_Tem", arr_tag_value[130]);
    io.sockets.emit("G4_Tem", arr_tag_value[131]);
    io.sockets.emit("G1_Tem_Display", arr_tag_value[132]);
    io.sockets.emit("G2_Tem_Display", arr_tag_value[133]);
    io.sockets.emit("G3_Tem_Display", arr_tag_value[134]);
    io.sockets.emit("G4_Tem_Display", arr_tag_value[135]);
    io.sockets.emit("COM4", arr_tag_value[136]);
    io.sockets.emit("CUT_COM4", arr_tag_value[137]);
    io.sockets.emit("Sym_VD766", arr_tag_value[138]);
    io.sockets.emit("TG_NHAY_COM4", arr_tag_value[139]);
    io.sockets.emit("CountDownXaBON", arr_tag_value[140]);
    io.sockets.emit("CountDownTronBON", arr_tag_value[141]);
}

// ///////////GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT)///////////
io.on("connection", function (socket) {
    socket.on("Client-send-data", function (data) {
        fn_tag();
    });
    fn_SQLSearch(); // Hàm tìm kiếm SQL

    socket.on('updateDatabase', (data) => {
        // Cập nhật hàng trong bảng macbetong với dữ liệu từ máy khách
        // Thay thế 'your_connection' bằng đối tượng kết nối MySQL của bạn
        // Thay thế 'your_row_id' bằng ID của hàng bạn muốn cập nhật
        console.log('Received updateDatabase event from client with data:', data);
        sqlcon.query(
            'UPDATE macbetong SET STT = ?, TenMacBeTong = ?, TP1 = ?, TP2 = ?, TP3 = ?, TP4 = ?, Xi = ?, Nuoc = ?, PG1 = ?, PG2 = ?, DoSutThongKe = ? WHERE STT = ?',
            [data.field1, data.field2, data.field3, data.field4, data.field5, data.field6, data.field7, data.field8, data.field9, data.field10, data.field11, data.field1],
            function (error, results, fields) {
                if (error) throw error;
                // Cập nhật thành công
                // Gọi lại hàm fn_SQLSearch() để truy vấn và hiển thị dữ liệu mới nhất
                fn_SQLSearch();
            }
        );
    });

});

// Khởi tạo SQL
var mysql = require('mysql');
var sqlcon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dp123456789*-",
    database: "sql_plc",
    dateStrings: true // Hiển thị không có T và Z
});
// Đọc dữ liệu từ SQL
function fn_SQLSearch() {
    io.on("connection", function (socket) {
        socket.on("msg_SQL_Show", function (data) {
            var sqltable_Name = "macbetong";
            var queryy1 = "SELECT * FROM " + sqltable_Name + ";"
            sqlcon.query(queryy1, function (err, results, fields) {
                if (err) {
                    console.log(err);
                } else {
                    const objectifyRawPacket = row => ({ ...row });
                    const convertedResponse = results.map(objectifyRawPacket);
                    socket.emit('SQL_Show', convertedResponse);
                    console.log(convertedResponse);
                }
            });
        });
    });
}


// ///////////HÀM GHI DỮ LIỆU XUỐNG PLC//////////
function valuesWritten(anythingBad) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
    console.log("Done writing.");
}

// ///////////// Nhận các bức điện được gửi từ trình duyệt//////////
io.on("connection", function (socket) {
    ///////////// Nhận các bức điện được gửi từ trình duyệt ở chế độ TỰ ĐỘNG
    // Nút nhấn chọn chế độ tự động
    socket.on("cmd_XeTronMoi", function (data) {
        conn_plc.writeItems('XE_TRON_MOI', data, valuesWritten);
    });
    // Nút nhấn chọn chế độ bằng tay
    socket.on("cmd_Chay", function (data) {
        conn_plc.writeItems('btt_Manu', data, valuesWritten);
    });
    // Nút nhấn xác nhận chế độ
    socket.on("cmd_Confirm", function (data) {
        conn_plc.writeItems('btt_Auto_Confirm', data, valuesWritten);
    });
    ///////////// Nhận các bức điện được gửi từ trình duyệt ở chế độ BẰNG TAY
    // Nút nhấn Mở van 1
    socket.on("cmd_OpenV1", function (data) {
        conn_plc.writeItems('btt_V1_Open', data, valuesWritten);
    });
    // Nút nhấn Đóng van 1
    socket.on("cmd_CloseV1", function (data) {
        conn_plc.writeItems('btt_V1_Close', data, valuesWritten);
    });
    // Nút nhấn Mở van 2
    socket.on("cmd_OpenV2", function (data) {
        conn_plc.writeItems('btt_V2_Open', data, valuesWritten);
    });
    // Nút nhấn Đóng van 2
    socket.on("cmd_CloseV2", function (data) {
        conn_plc.writeItems('btt_V2_Close', data, valuesWritten);
    });
    // Nút nhấn Mở van 3
    socket.on("cmd_OpenV3", function (data) {
        conn_plc.writeItems('btt_V3_Open', data, valuesWritten);
    });
    // Nút nhấn Đóng van 3
    socket.on("cmd_CloseV3", function (data) {
        conn_plc.writeItems('btt_V3_Close', data, valuesWritten);
    });
    // Nút nhấn Chạy động cơ trộn
    socket.on("cmd_RunM1", function (data) {
        conn_plc.writeItems('btt_DC_Tron_Run', data, valuesWritten);
    });
    // Nút nhấn Đóng van 3
    socket.on("cmd_StopM1", function (data) {
        conn_plc.writeItems('btt_DC_Tron_Stop', data, valuesWritten);
    });
    ///////////// Đoạn lệnh nhận các bức điện cmd khi cần Edit từ trình duyệt và ghi xuống PLC ///////////////
    // Ghi dữ liệu từ IO field
    socket.on("cmd_scrAuto_Edit_Data", function (data) {
        conn_plc.writeItems([
            'TG_XA', 'TGTRON', 'NUOC_THEM'],
            [data[0], data[1], data[2]
            ], valuesWritten);
    });
});
//////////////////// Tạo các object để lưu thông tin phía server ///////////////////////////
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

// ////////////////////////////////////////////////////////////////////////// ++THIẾT LẬP KẾT NỐI VỚI SERVER VỚI PLC/////////////////////////////////////////////////////////////

// KHỞI TẠO KẾT NỐI PLC
var nodes7 = require('nodes7');
var conn_plc = new nodes7; //PLC1
// Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)
conn_plc.initiateConnection({ port: 102, host: '192.168.0.5', rack: 0, slot: 1 }, PLC_connected);
// Bảng tag trong Visual studio code, chú ý là bảng tag này phải đúng thứ tự nhé, nó phải trùng với thứ tự trong TIA thì phải (check lại điểm này)
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

///////////////////////////////////////////////////////////////////////////// Đọc dữ liệu từ PLC và đưa vào array tags /////////////////////////////////////////////////////////////
var arr_tag_value = []; // Tạo một mảng lưu giá trị tag đọc về
let valuesKey;
function valuesReady(anythingBad, values) {
    if (anythingBad) { console.log("Lỗi khi đọc dữ liệu tag"); } // Cảnh báo lỗi
    var lodash = require('lodash'); // Chuyển variable sang array
    arr_tag_value = lodash.map(values, (item) => item);
    // console.log('Gia tri của values', values); // Hiển thị giá trị để kiểm tra
    // console.log('Giá trị của mảng arr_tag_value', arr_tag_value); // Hiển thị giá trị của mảng, mảng này chỉ chứa giá trị, không chứa các thuộc tính của object giống như values

    valuesKey = values;

    // console.log('=============================================');
    // console.log('values: ', valuesKey); // Hiển thị giá trị để kiểm tra
    // console.log('=============================================');
}
///////////////////////////////////////////////////////////////////////////// Đọc dữ liệu từ PLC và đưa vào array tags /////////////////////////////////////////////////////////////
// Hàm chức năng scan giá trị
function fn_read_data_scan() {
    conn_plc.readAllItems(valuesReady);
}
// Time cập nhật mỗi 1s=1000ms
setInterval(() => {
    fn_read_data_scan();
    // console.log('=============================================');
    // console.log('values: ', valuesKey); // Hiển thị giá trị để kiểm tra
    // console.log('=============================================');
    if (arr_tag_value.length !== 0) {
        getDataChinhCanFromPLC();
        DocMangThuThap(valuesKey);
        //console.log('valuesKey: ', valuesKey);
    }

}, 1000);

// ///////////////////////////////////////////////////////////////////////////////////////++THIẾT LẬP KẾT NỐI VỚI TRÌNH DUYỆT PHÍA CLIENT/////////////////////////
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
// //////////////////////////////////////////////////////////////////////////////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
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
function getDataChinhCanFromPLC() {
    // Khi nhận được sự kiện 'getDataChinhCanFromPLC' từ client
    // Đọc dữ liệu từ PLC
    let dataFromPLC = {};
    for (let key in tags_list) {
        dataFromPLC[key] = valuesKey[key];
    }


    // Gửi dữ liệu đọc được từ PLC về cho client
    io.sockets.emit('updateDataChinhCanFromPLC', dataFromPLC);
    //console.log('Dữ liệu hiệu chỉnh cân được gửi đi: ', dataFromPLC)
}

// //////////////////////////////////////////////////////////////////// GỬI NHẬN DỮ LIỆU VỚI CLIENT (TRÌNH DUYỆT)//////////////////////////////////////////////////
io.on("connection", function (socket) {
    socket.on("Client-send-data", function (data) {
        fn_tag();
        // Khi nhận được tin nhắn "Client-send-data", thì server sẽ gửi dữ liệu là fn_tag(), trong này sẽ chứa những tin nhắn mà client cần nhận cho các ứng dụng cụ thể
        // Ví dụ: io.sockets.emit("TGTRON", arr_tag_value[94]); đây là lệnh gửi đi tin nhắn TGTRON và dữ liệu là arr_tag_value[94], nó chính là 305 đọc từ PLC, vậy thì qua bên client sẽ nhận được TGTRON: 305
        // Nghĩa là, nếu dùng câu lệnh socket.on(tag, function (data){} , nếu tag là TGTRON thì giá trị nhận được sẽ là 305
    });

    // emit the data to the client when they first connect
    socket.emit('syncData', { CapPhoi, KhachHang, DonDatHang, XeBon, PhieuGiaoBeTong, PhieuCan, DaCanXong, ThongKe, ThuThap, CuaVatLieu, ThongTinCapPhoi });

    // listen for changes from the client and update the server data accordingly
    socket.on('updateData', (data) => {
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

        // emit the updated data to all connected clients
        io.emit('syncData', { CapPhoi, KhachHang, DonDatHang, XeBon, PhieuGiaoBeTong, PhieuCan, DaCanXong, ThongKe, ThuThap, CuaVatLieu, ThongTinCapPhoi });
    });

    // Đoạn lệnh này sẽ nhận lệnh SET bit, sau đó nó sẽ gửi tin báo done lên client kèm với data chính là true mà phía client đã gửi trươc đó,
    // phía client sẽ kiểm tra nếu data phía server gửi lên là true (mà thực tế đây là true mà, vì cũng là data nó gửi từ đâu), vậy nên chương trình này chưa ổn
    socket.on("nhannutTest", function (data) {
        conn_plc.writeItems('XE_TRON_MOI', data, function (err) {
            if (err) {
                console.log("Error writing to PLC: ", err);
                socket.emit("error", "Error writing to PLC");
            } else {
                console.log('Trạng thái bit XE_TRON_MOI: ', data);
                socket.emit("done", data);
            }
        });
    });
    // Lệnh SET và RESET trạng thái bit XE_TRON_MOI
    socket.on("XE_TRON_MOI", function (data) {
        conn_plc.writeItems('XE_TRON_MOI', data, function (err) {
            if (err) {
                console.log("Error writing to PLC: ", err);
                socket.emit("error", "Error writing to PLC");
            } else {
                console.log('Trạng thái bit XE_TRON_MOI: ', data);
                socket.emit("done", data);
            }
        });
    });

    // Chương trình này cải tiến hơn ở chỗ nó sẽ đọc lại trạng thái của bit mới vừa được SET, sau đó nó sẽ gửi trạng thái này tới client, phía client vẫn giữ chương trình cũ
    // nó sẽ thực hiện kiểm tra bit data mà server gửi lên, nếu nó là True thì client sẽ gửi yêu cầu reset trạng thái bít này về 0
    // socket.on("nhannutTest", function (data) {
    //     conn_plc.writeItems('XE_TRON_MOI', data, function (err) {
    //         if (err) {
    //             console.log("Error writing to PLC: ", err);
    //             socket.emit("error", "Error writing to PLC");
    //         } else {
    //             conn_plc.readAllItems(function (err, values) {
    //                 if (err) {
    //                     console.log("Error reading from PLC: ", err);
    //                     socket.emit("error", "Error reading from PLC");
    //                 } else {
    //                     console.log('Trạng thái bit XE_TRON_MOI: ', values['XE_TRON_MOI']);
    //                     socket.emit("done", values['XE_TRON_MOI']);
    //                 }
    //             });
    //         }
    //     });
    // });


    // Cập nhật lại một MacBeTong trong bảng macbetong với dữ liệu được hiệu chỉnh từ client
    socket.on('updateDatabase', (data) => {
        // Cập nhật hàng trong bảng macbetong với dữ liệu từ máy khách
        console.log('Received updateDatabase event from client with data:', data);
        sqlcon.query(
            'UPDATE macbetong SET STT = ?, TenMacBeTong = ?, TP1 = ?, TP2 = ?, TP3 = ?, TP4 = ?, Xi = ?, Nuoc = ?, PG1 = ?, PG2 = ?, DoSutThongKe = ? WHERE STT = ?',
            [data.STT, data.TenMacBeTong, data.TP1, data.TP2, data.TP3, data.TP4, data.Xi, data.Nuoc, data.PG1, data.PG2, data.DoSutThongKe, data.STT], function (error, results, fields) {
                if (error) throw error;
                // Cập nhật thành công
                socket.emit('updateDataMacbetongSuccess');
            }
        );
    });
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
                console.log("Gửi dữ liệu qua client bằng bức điện SQL_Show");
            }
        });
    });

    socket.on('getDataKhachhang', function () {
        sqlcon.query('SELECT MaKhachHang, TenKhachHang, DiaChi FROM khachhang', function (error, results, fields) {
            if (error) throw error;
            socket.emit('updateDataKhachhang', results);
            //console.log('Received tenkhachhang event from client with data:', results);
        });
    });
    socket.on('getDataDonhangKhachhang', function () {
        sqlcon.query('SELECT MaKhachHang, TenKhachHang, DiaChi FROM khachhang', function (error, results, fields) {
            if (error) throw error;
            socket.emit('updateDataDonhangKhachhang', results);
            console.log('Dữ liệu Khách hàng của đơn hàng gửi qua trình duyệt là:', results);
        });
    });
    socket.on('getDataXebon', function () {
        sqlcon.query('SELECT STT, BienSoXe, TenLaiXe FROM xebon', function (error, results, fields) {
            if (error) throw error;
            socket.emit('updateDataXebon', results);
            //console.log('Received Xebon event from client with data:', results);
        });
    });
    socket.on('scr_Auto_getDataXebon', function () {
        sqlcon.query('SELECT STT, BienSoXe, TenLaiXe FROM xebon', function (error, results, fields) {
            if (error) throw error;
            socket.emit('scr_Auto_updateDataXebon', results);
            console.log('Received Xebon event from client with data:', results);
        });
    });
    socket.on('addData', function (data) {
        var query = 'INSERT INTO khachhang (TenKhachHang, DiaChi) VALUES (?, ?)';
        sqlcon.query(query, [data.TenKhachHang, data.DiaChi], function (error, results, fields) {
            if (error) throw error;
            // Gửi thông báo thành công về cho máy khách
            socket.emit('addDataSuccess');
        });
    });

    socket.on('editDataKhachhang', function (data) {
        var query = 'UPDATE khachhang SET TenKhachHang = ?, DiaChi = ? WHERE MaKhachHang = ?';
        sqlcon.query(query, [data.TenKhachHang, data.DiaChi, data.MaKhachHang], function (error, results, fields) {
            if (error) throw error;
            // Gửi thông báo thành công về cho máy khách
            socket.emit('updateDataSuccess');
        });
    });
    socket.on('deleteDataKhachhang', function (data) {
        var maKhachHang = data.MaKhachHang;
        var query = 'DELETE FROM khachhang WHERE MaKhachHang = ?';
        sqlcon.query(query, [maKhachHang], function (error, results, fields) {
            if (error) throw error;
            // Xử lý kết quả xóa dữ liệu tại đây
        });
    });
    socket.on('addDataXebon', function (data) {
        var query = 'INSERT INTO xebon (BienSoXe, TenlaiXe) VALUES (?, ?)';
        sqlcon.query(query, [data.BienSoXe, data.TenLaiXe], function (error, results, fields) {
            if (error) throw error;
            // Gửi thông báo thành công về cho máy khách
            socket.emit('addDataXebonSuccess');
        });
    });

    socket.on('editDataXebon', function (data) {
        var query = 'UPDATE xebon SET BienSoXe = ?, TenLaiXe = ? WHERE STT = ?';
        sqlcon.query(query, [data.BienSoXe, data.TenLaiXe, data.STT], function (error, results, fields) {
            if (error) throw error;
            // Gửi thông báo thành công về cho máy khách
            socket.emit('updateDataXebonSuccess');
            //console.log('Received Xebon event from client with data:', results);
        });
    });
    socket.on('deleteXebon', function (data) {
        var STT = data.STT;
        var query = 'DELETE FROM xebon WHERE STT = ?';
        sqlcon.query(query, [STT], function (error, results, fields) {
            if (error) throw error;
            // Xử lý kết quả xóa dữ liệu tại đây
        });
    });
    socket.on('getDataDonhang', function () {
        var query = 'SELECT dondathang.MaDonDatHang, dondathang.DiaChiCongTruong, dondathang.SoM3Dat, dondathang.SoM3DaDo, khachhang.MaKhachHang, khachhang.TenKhachHang, khachhang.DiaChi FROM dondathang INNER JOIN khachhang ON dondathang.MaKhachHang = khachhang.MaKhachHang';
        sqlcon.query(query, function (error, results, fields) {
            if (error) throw error;
            socket.emit('updateDataDonhang', results);
            console.log('Dữ liệu Đơn hàng gửi qua trình duyệt là:', results);
        });
    });
    socket.on('addDataDonhang', function (data) {
        var query = 'INSERT INTO dondathang (MaDonDatHang, MaKhachHang, DiaChiCongTruong, SoM3Dat, SoM3DaDo) VALUES (?, ?, ?, ?, ?)';
        sqlcon.query(query, [data.MaDonDatHang, data.MaKhachHang, data.DiaChiCongTruong, data.SoM3Dat, data.SoM3DaDo], function (error, results, fields) {
            if (error) throw error;
            // Gửi thông báo thành công về cho máy khách
            socket.emit('addDataDonhangSuccess');
        });
    });
    socket.on('editDataDonhang', function (data) {
        console.log('Dữ liệu đơn hàng được gửi từ trình duyệt để cập nhật vào SQL:', data);
        var query = 'UPDATE dondathang SET MaKhachHang = ?, DiaChiCongTruong = ?, SoM3Dat = ?, SoM3DaDo = ? WHERE MaDonDatHang = ?';
        sqlcon.query(query, [data.MaKhachHang, data.DiaChiCongTruong, data.SoM3Dat, data.SoM3DaDo, data.MaDonDatHang], function (error, results, fields) {
            console.log('Executed query with results:', results);
            if (error) throw error;
            // Gửi thông báo thành công về cho máy khách
            socket.emit('updateDataDonhangSuccess');
        });
    });
    socket.on('deleteDonhang', function (data) {
        var STT = data.STT;
        var query = 'DELETE FROM dondathang WHERE MaDonDatHang = ?';
        sqlcon.query(query, [MaDonDatHang], function (error, results, fields) {
            if (error) throw error;
            // Xử lý kết quả xóa dữ liệu tại đây
        });
    });
    socket.on('getDataDatcapphoiKhachhang', function () {
        sqlcon.query('SELECT MaKhachHang, TenKhachHang, DiaChi FROM khachhang', function (error, results, fields) {
            if (error) throw error;
            socket.emit('updateDataDatcaphoiKhachhang', results);
            console.log('Server gửi data về khách hàng cho Thông tin cấp phối:', results);
        });
    });
    socket.on('getDataDatcapphoiDonHang', function (maKhachHang) {
        // Thực hiện truy vấn cơ sở dữ liệu để lấy thông tin đơn đặt hàng
        var query = 'SELECT MaDonDatHang, DiaChiCongTruong FROM dondathang WHERE MaKhachHang = ?';
        sqlcon.query(query, [maKhachHang], function (error, results) {
            if (error) throw error;
            // Kiểm tra xem có kết quả nào được trả về không
            if (results.length === 0) {
                // Gửi thông báo lỗi đến máy khách
                socket.emit('error', 'Khách hàng này hiện tại chưa có đơn hàng nào trên hệ thống');
            } else {
                // Gửi kết quả truy vấn đến máy khách
                socket.emit('updateDataDatcapphoiDonhang', results);
                console.log('Server gửi data về các Đơn hàng của Khách hàng có MaKhachHang: ' + maKhachHang + ' va các Đơn hàng ' + results);
            }
        });
    });
    socket.on('getLatestPhieucanValues', () => {
        sqlcon.query('SELECT * FROM phieucan ORDER BY MaPhieuCan DESC LIMIT 1', (error, results) => {
            // if (error) throw error;
            if (error) {
                // Xử lý lỗi ở đây, ví dụ như thông báo lên client
                // Gửi thông báo lỗi đến máy khách
                socket.emit('error', 'Đã có lỗi khi xử lý dữ liệu Phiếu Cân gần nhất');
            } else {
                // Lấy kết quả truy vấn
                let data = results[0];
                // Phát ra sự kiện latestPhieucanValues với dữ liệu đính kèm
                socket.emit('latestPhieucanValues', data);
                console.log('Server gửi data của phiếu cần gần nhất: ', data);
            }
        });
    });
    // Hàm đọc mã phiếu cân để điền vào Số phiếu ở đạt cấp phối
    socket.on('getPhieucanData', () => {
        sqlcon.query('SELECT COUNT(*) FROM phieucan', (error, results) => {
            if (error) {
                // Xử lý lỗi ở đây, ví dụ như thông báo lên client
                // Gửi thông báo lỗi đến máy khách
                socket.emit('error', 'Đã có lỗi khi xử lý dữ liệu Phiếu Cân');
            } else {
                let count = results[0]['COUNT(*)'];

                if (count > 0) {
                    // Nếu có bản ghi thì tiếp tục kiểm tra xem MaPhieuCan ở bản ghi cuối cùng có phải là giá trị null không
                    sqlcon.query('SELECT MaPhieuCan FROM phieucan ORDER BY MaPhieuCan DESC LIMIT 1', (error, results) => {
                        if (error) {
                            // Xử lý lỗi ở đây, ví dụ như thông báo lên client
                            // Gửi thông báo lỗi đến máy khách
                            socket.emit('error', 'Đã có lỗi khi xử lý dữ liệu Phiếu Cân');
                        } else {
                            let last_maphieucan = results[0]['MaPhieuCan'];

                            // Phát ra sự kiện phieucanData với dữ liệu đính kèm
                            socket.emit('phieucanData', { count: count, last_maphieucan: last_maphieucan });
                        }
                    });
                } else {
                    // // Trong trường hợp không có bản ghi nào tồn tại thì gán DocMaPhieuCan bằng 1
                    // docmaphieucan = 1; // không cần thiết thực hiện việc gán này

                    // Phát ra sự kiện phieucanData với dữ liệu đính kèm
                    socket.emit('phieucanData', { count: count });
                }
            }
        });
    });
    // Hàm nhận tin nhắn getCuaVatLieu, sau đó gọi hàm getCuaVatLieu để đọc tên các cửa vật liệu đang được lưu trong bảng cuavatlieu dưới mysql, và cuối cùng gửi qua client
    socket.on('getCuaVatLieu', () => {
        getCuaVatLieu(function (result) {
            socket.emit('cuaVatLieuData', result);
        });
    });
    socket.on('saveDataCuavatlieu', function (data) {
        let CuaVatLieu = data.CuaVatLieu;
        let query = 'SELECT * FROM cuavatlieu';
        sqlcon.query(query, function (error, results, fields) {
            if (error) {
                socket.emit('saveDataCuavatlieuError', { message: 'Có lỗi xảy ra khi truy vấn dữ liệu từ bảng cuavatlieu' });
                throw error;
            }
            if (results.length === 0) {
                // Chưa có bản ghi nào trong bảng cuavatlieu
                // Tạo thêm một bản ghi và ghi dữ liệu mới vào
                let query = 'INSERT INTO cuavatlieu (Can1, Can2, Can3, Can4, Xi, PG1, PG2, ThuThapPG) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
                sqlcon.query(query, [CuaVatLieu.Cua[0], CuaVatLieu.Cua[1], CuaVatLieu.Cua[2], CuaVatLieu.Cua[3], CuaVatLieu.Xi, CuaVatLieu.PG[0], CuaVatLieu.PG[1], CuaVatLieu.ThuThapPG], function (error, results, fields) {
                    if (error) {
                        socket.emit('saveDataCuavatlieuError', { message: 'Có lỗi xảy ra khi thêm dữ liệu mới vào bảng cuavatlieu' });
                        throw error;
                    }
                    socket.emit('saveDataCuavatlieuSuccess', { message: 'Đã thêm dữ liệu mới vào bảng cuavatlieu' });
                });
            } else {
                // Đã có bản ghi trong bảng cuavatlieu
                // Tiến hành cập nhật dữ liệu cũ bằng dữ liệu mới
                let query = 'UPDATE cuavatlieu SET Can1 = ?, Can2 = ?, Can3 = ?, Can4 = ?, Xi = ?, PG1 = ?, PG2 = ?, ThuThapPG = ?';
                sqlcon.query(query, [CuaVatLieu.Cua[0], CuaVatLieu.Cua[1], CuaVatLieu.Cua[2], CuaVatLieu.Cua[3], CuaVatLieu.Xi, CuaVatLieu.PG[0], CuaVatLieu.PG[1], CuaVatLieu.ThuThapPG], function (error, results, fields) {
                    if (error) {
                        socket.emit('saveDataCuavatlieuError', { message: 'Có lỗi xảy ra khi cập nhật dữ liệu trong bảng cuavatlieu' });
                        throw error;
                    }
                    socket.emit('saveDataCuavatlieuSuccess', { message: 'Đã cập nhật dữ liệu trong bảng cuavatlieu' });
                });
            }
        });
    });
    // Lấy dữ liệu từ bảng Chitietphieucan để hiển thị lên Lịch sử phiếu cân bên client
    socket.on("msg_report_Show", function (data) {
        var sqltable_Name = "chitietphieucan";
        var queryy1 = "SELECT * FROM " + sqltable_Name + ";"
        sqlcon.query(queryy1, function (err, results, fields) {
            if (err) {
                console.log(err);
                socket.emit('error', 'Đã có lỗi khi xử lý dữ liệu Chi tiết phiếu cân');
                throw err; // Bỏ qua lỗi
            } else {
                const objectifyRawPacket = row => ({ ...row });
                const convertedResponse = results.map(objectifyRawPacket);
                socket.emit('report_Show', convertedResponse);
                console.log("Gửi dữ liệu qua client bằng bức điện report_Show");
            }
        });
    });
    // Đọc dữ liệu SQL theo thời gian, phục vụ việc lọc Lịch sử phiếu cân theo thời gian
    socket.on("msg_SQL_ByTime", function (data) {
        console.log('Dữ liệu tìm kiếm theo thời gian của Phiếu cân', data);
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset time Việt Nam (GMT7+)
        // // Lấy thời gian tìm kiếm từ date time piker
        // var timeS = new Date(data[0]); // Thời gian bắt đầu
        // var timeE = new Date(data[1]); // Thời gian kết thúc
        // // Quy đổi thời gian ra định dạng cua MySQL
        // var timeS1 = "'" + (new Date(timeS - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";
        // var timeE1 = "'" + (new Date(timeE - tzoffset)).toISOString().slice(0, -1).replace("T", " ") + "'";


        var timeS = new Date(convertDateFormat(data[0])); // Thời gian bắt đầu
        var timeE = new Date(convertDateFormat(data[1])); // Thời gian kết thúc

        var timeS1 = "'" + (new Date(timeS - tzoffset)).toISOString().slice(0, 10) + "'";
        var timeE1 = "'" + (new Date(timeE - tzoffset)).toISOString().slice(0, 10) + "'";

        if (isNaN(timeS) || isNaN(timeE)) {
            console.log('Giá trị ngày tháng không hợp lệ:', data[0], data[1]);
            return;
        }


        var timeR = timeS1 + "AND" + timeE1; // Khoảng thời gian tìm kiếm (Time Range)

        var sqltable_Name = "chitietphieucan"; // Tên bảng
        var dt_col_Name = "Gio";  // Tên cột thời gian

        var Query1 = "SELECT * FROM " + sqltable_Name + " WHERE " + dt_col_Name + " BETWEEN ";
        var Query = Query1 + timeR + ";";

        sqlcon.query(Query, function (err, results, fields) {
            if (err) {
                console.log(err);
            } else {
                const objectifyRawPacket = row => ({ ...row });
                const convertedResponse = results.map(objectifyRawPacket);
                // Đây là chỗ quan trọng, mảng SQL_Excel này sẽ lưu lại dữ liệu và gửi qua hàm xuất ra excel
                SQL_Excel = convertedResponse; // Xuất báo cáo Excel
                console.log('Dữ liệu SQL_Excel: ', SQL_Excel)
                socket.emit('SQL_ByTime', convertedResponse);
            }
        });
    });
    // Đọc dữ liệu SQL theo MaPhieuCan
    // socket.on('getDetails', function (MaPhieuCan) {
    //     sqlcon.query(
    //         `SELECT chitietphieucan.STTMe, phieucan.TenTP1, phieucan.TenTP2, phieucan.TenTP3, phieucan.TenTP4, phieucan.TenXiMang, chitietphieucan.Nuoc, phieucan.TenPG1, phieucan.TenPG2 FROM chitietphieucan INNER JOIN phieucan ON chitietphieucan.MaPhieuCan=phieucan.MaPhieuCan WHERE chitietphieucan.MaPhieuCan=?`,
    //         [MaPhieuCan],
    //         function (error, chitietphieucanResults, fields) {
    //             if (error) throw error;

    //             sqlcon.query(
    //                 `SELECT TenKhachHang, BienSoXe, Som3Me, SoMe, MacBeTong, Ngay, GioXong, DoSut FROM phieucan WHERE MaPhieuCan=?`,
    //                 [MaPhieuCan],
    //                 function (error, phieucanResults, fields) {
    //                     if (error) throw error;

    //                     socket.emit('displayDetails', {
    //                         chitietphieucan: chitietphieucanResults,
    //                         phieucan: phieucanResults[0]
    //                     });
    //                     console.log('Chi tiết phiếu cân: ', chitietphieucanResults)
    //                     console.log('Phiếu cân: ', phieucanResults[0])
    //                 }
    //             );
    //         }
    //     );
    // });


    // Nhận giá trị MaPhieuCan từ client
    socket.on('get_data', function (MaPhieuCan) {
        // Truy vấn dữ liệu từ cơ sở dữ liệu MySQL
        let query = `SELECT * FROM phieucan WHERE MaPhieuCan=${MaPhieuCan}`;
        sqlcon.query(query, function (err, result) {
            if (err) throw err;

            // Lấy dữ liệu từ bảng phieucan
            let phieucan = result[0];

            // Truy vấn dữ liệu từ bảng chitietphieucan
            query = `SELECT * FROM chitietphieucan WHERE MaPhieuCan=${MaPhieuCan}`;
            sqlcon.query(query, function (err, result) {
                if (err) throw err;

                // Lấy dữ liệu từ bảng chitietphieucan
                let chitietphieucan = result;

                // Gửi dữ liệu đến client
                socket.emit('data', { phieucan: phieucan, chitietphieucan: chitietphieucan });
                console.log('Chi tiết phiếu cân: ', chitietphieucan)
                console.log('Phiếu cân: ', phieucan)
            });
        });
    });
    // Hàm nhận lệnh xuất dữ liệu ra file Excel
    socket.on("msg_Excel_Report", function (data) {
        console.log('Nhận được yêu cầu xuất report')
        const [SaveAslink1, Bookname] = fn_excelExport();
        var data = [SaveAslink1, Bookname];
        socket.emit('send_Excel_Report', data);
        console.log('Gửi report qua client')
    });

    // Đăng ký trình xử lý sự kiện cho sự kiện socket "cmdChay_Click"
    socket.on("cmdChay_Click", function (data) {
        let newTextContent;
        if (data === "CHẠY") {
            // GhiGiaTri(MangDieuKhien[2], 1);
            // GhiGiaTri(MangDieuKhien[8], 1);
            // socket.emit('CHAY_DUNG', true);
            // socket.emit('PAUSE_COM3', true);
            newTextContent = "DỪNG";
        } else {
            // GhiGiaTri(MangDieuKhien[2], 0);
            // socket.emit('CHAY_DUNG', false);
            newTextContent = "CHẠY";
        }

        // Gửi lại dữ liệu xuống tất cả các client khác
        io.sockets.emit("bttAuto_Chay_Caption", newTextContent);
    });

});

// // Hàm đọc tên cửa vật liệu sau đó gửi qua trình duyệt
// setupSocketListeners(); có thể tạo một hàm và trong đó gọi sự kiện lắng nghe io.on hoặc io.emit để lắng nghe sự kiên cient kết nối với server, 
// sau đó sử dụng hàm lắng nghe sự kiện socket.on và socket.emit để nhận và gửi các bức điện qua lại giữa client và server nhằm thực hiện các yêu cầu khác nhau của dự án
// setupSocketListeners(); là một ví dụ, bên dưới là một cách viết khác, trong cách này chúng ta không cần tạo hàm như trên mà sử dụng trực tiếp io.on()
// io.on("connection", function (socket) {
//     // This event listener is called when a new client connects to the server

//     socket.on('event1', function (data) {
//         // This event listener is called when the connected client emits the 'event1' event
//         // ...
//     });

//     socket.on('event2', function (data) {
//         // This event listener is called when the connected client emits the 'event2' event
//         // ...
//     });

//     socket.on('event3', function (data) {
//         // This event listener is called when the connected client emits the 'event3' event
//         // ...
//     });
// });
// // Hàm đọc tên cửa vật liệu sau đó gửi qua trình duyệt
function getCuaVatLieu(callback) {
    let CuaVatLieu = {
        Cua: ['', '', '', ''],
        Xi: '',
        PG: ['', ''],
        ThuThapPG: false
    };
    sqlcon.query('SELECT * FROM cuavatlieu', function (error, results, fields) {
        if (error) throw error;
        console.log('Kết quả đọc từ bảng cuavatlieu: ', results);
        console.log('Chiều dài mảng dữ liệu đọc từ bảng cuavatlieu là: ', results.length);
        // Nếu tồn tại tên các cửa vật liệu trang bảng cuavatlieu thì sẽ đọc và gửi qua trình duyệt
        if (results.length > 0) {
            console.log('Bảng cửa vật liệu có bản ghi từ trước, nên object CuaVatLieu sẽ là dữ liệu CŨ trong mysql: ');
            for (let i = 0; i < 4; i++) {
                CuaVatLieu.Cua[i] = results[0][`Can${i + 1}`] || `TP${i + 1}`;
                console.log('Cửa liệu' + (i + 1) + ': ' + CuaVatLieu.Cua[i]);
            }
            for (let i = 0; i < 2; i++) {
                CuaVatLieu.PG[i] = results[0][`PG${i + 1}`] || `PG${i + 1}`;
                console.log('Cửa PG' + (i + 1) + ': ' + CuaVatLieu.PG[i]);
            }
            CuaVatLieu.Xi = results[0].Xi || 'Xi';
            //CuaVatLieu.PG = results[0].PG1 || 'PG1';
            CuaVatLieu.ThuThapPG = results[0].ThuThapPG || true;
        } else {
            console.log('Bảng cửa vật liệu chưa có bản ghi, nên object CuaVatLieu mới sẽ là giá trị tự đặt TP1, TP2, ...: ');
            for (let i = 0; i < 4; i++) {
                CuaVatLieu.Cua[i] = `TP${i + 1}`;
                console.log('Cửa liệu' + (i + 1) + ': ' + CuaVatLieu.Cua[i]);

            }
            for (let i = 0; i < 2; i++) {
                CuaVatLieu.PG[i] = `PG${i + 1}`;
                console.log('Cửa PG' + (i + 1) + ': ' + CuaVatLieu.PG[i]);
            }
            CuaVatLieu.Xi = 'Xi';
            //CuaVatLieu.PG = 'PG';
            CuaVatLieu.ThuThapPG = true;
        }
        callback(CuaVatLieu);
    });
}

///////////////////////////////////////////////////////////////////////////// Khởi tạo SQL //////////////////////////////////////////////////////////////////////////////////
var mysql = require('mysql');
var sqlcon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dp123456789*-",
    database: "sql_plc",
    dateStrings: true // Hiển thị không có T và Z
});

// //////////////////////////////////////////////////////////////////////// Hàm callback khi ghi dữ liệu xuống PLC ///////////////////////////////////////////////////////////
function valuesWritten(anythingBad) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
    console.log("Done writing.");
}

// ////////////////////////////////////////////////////////////////// Nhận các bức điện được gửi từ trình duyệt//////////
io.on("connection", function (socket) {
    // Không nên gọi thêm socket, nên tôi đã di chuyển vào trong một io.on duy nhất (duyphuoc)
    // ////////////////////////////////////////////////////////////////// Nhận các bức điện được gửi từ trình duyệt//////////
    ///////////// Nhận các bức điện được gửi từ trình duyệt ở chế độ TỰ ĐỘNG
    // Nút nhấn chọn chế độ tự động
    socket.on("PAUSE_COM3", function (data) {
        conn_plc.writeItems('PAUSE_COM3', data, valuesWritten);
        console.log('Trạng thái bit PAUSE_COM3: ', data)
    });
    socket.on("cmd_XeTronMoi_setON", () => {
        conn_plc.writeItems('Q17', true, valuesWritten);
        console.log('Đã Set bit Xe_Tron_Moi')
    });
    socket.on("cmd_XeTronMoi_resetOFF", () => {
        conn_plc.writeItems('Q17', false, valuesWritten);
        console.log('Đã Reset bit Xe_Tron_Moi')
    });
    // Nút nhấn chọn chế độ bằng tay
    socket.on("CHAY_DUNG", function (data) {
        conn_plc.writeItems('Q12', data, valuesWritten);
        console.log('Trạng thái bit CHAY_DUNG: ', data)
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
        conn_plc.writeItems(['TG_XA', 'TGTRON', 'NUOC_THEM'], [data[0], data[1], data[2]], valuesWritten);
    });
    socket.on('senDataDatcapphoi_Dinhmuc', data => {
        // Xử lý dữ liệu được gửi từ client
        console.log('Dữ liệu cấp phối định mức sẽ đươc truyền bào PLC: ', data);
        // Ghi dữ liệu vào PLC
        conn_plc.writeItems(['COM1', 'COM2', 'COM3', 'COM4', 'XI_MANG1', 'NUOC_DM', 'SO_ME_DM'],
            [data[0], data[1], data[2], data[3], data[4], data[5], data[6]], valuesWritten);
        // conn_plc.writeItems(['COM1', 'COM2'],
        //     [data[0], data[1]], valuesWritten);
    });

    socket.on('saveDataThongsocan', data => {
        // Xử lý dữ liệu được gửi từ client
        console.log(data);

        // So sánh dữ liệu mới với dữ liệu cũ
        // Tạo một mảng để lưu trữ các thẻ và giá trị cần ghi vào PLC
        let tagsToWrite = [];
        let valuesToWrite = [];

        // Duyệt qua các thuộc tính của đối tượng data
        for (let key in data) {
            //console.log('Các key trong data gửi qua server: ', key)
            // Kiểm tra xem giá trị của thuộc tính có khác với giá trị tương ứng trên PLC hay không
            if (data[key] != valuesKey[key]) {
                // console.log('Key đang được so sánh: ', key)
                // console.log('Data key đang được so sánh: ', data[key])
                // console.log('values[key] đang được so sánh: ', valuesKey[key])
                // console.log('----------------------------------------------------')
                // Nếu có, thêm thẻ và giá trị vào mảng
                tagsToWrite.push(key);
                valuesToWrite.push(data[key]);
                //console.log('tagsToWrite: ', tagsToWrite)
                //console.log('valuesToWrite: ', valuesToWrite)
            }
        }
        console.log('tagsToWrite: ', tagsToWrite)
        console.log('valuesToWrite: ', valuesToWrite)
        // Ghi dữ liệu vào PLC
        if (tagsToWrite.length !== 0) {
            conn_plc.writeItems(tagsToWrite, valuesToWrite, valuesWritten);
            socket.emit('saveDataSuccess', { message: 'Đã cập nhật dữ liệu thông số cân' });
        } else console.log('Không có giá trị nào cần thay đổi so với giá trị trong PLC')

    });
    socket.on('saveDataHieuchinhcan', data => {
        // Xử lý dữ liệu được gửi từ client
        console.log(data);

        // So sánh dữ liệu mới với dữ liệu cũ
        // Tạo một mảng để lưu trữ các thẻ và giá trị cần ghi vào PLC
        let tagsToWrite = [];
        let valuesToWrite = [];

        // Duyệt qua các thuộc tính của đối tượng data
        for (let key in data) {
            //console.log('Các key trong data gửi qua server: ', key)
            // Kiểm tra xem giá trị của thuộc tính có khác với giá trị tương ứng trên PLC hay không
            if (Number(data[key]) != Number(valuesKey[key]).toFixed(1)) {
                console.log('Key đang được so sánh: ', key)
                console.log('Data key đang được so sánh: ', data[key])
                console.log('values[key] đang được so sánh: ', valuesKey[key])
                console.log('----------------------------------------------------')
                console.log('Kiểu dữ liệu của data[key]:', typeof data[key]);
                console.log('Kiểu dữ liệu của valuesKey[key]:', typeof valuesKey[key]);
                console.log('*********************************************************************')
                // Nếu có, thêm thẻ và giá trị vào mảng
                tagsToWrite.push(key);
                valuesToWrite.push(data[key]);
                //console.log('tagsToWrite: ', tagsToWrite)
                //console.log('valuesToWrite: ', valuesToWrite)
            }
        }
        console.log('tagsToWrite: ', tagsToWrite)
        console.log('valuesToWrite: ', valuesToWrite)
        // Ghi dữ liệu vào PLC
        if (tagsToWrite.length !== 0) {
            conn_plc.writeItems(tagsToWrite, valuesToWrite, valuesWritten);
            socket.emit('saveDataSuccess', { message: 'Đã cập nhật dữ liệu thông số cân' });
        } else console.log('Không có giá trị nào cần thay đổi so với giá trị trong PLC')

    });
});

// /////////////////////////////// BÁO CÁO EXCEL ///////////////////////////////
const Excel = require('exceljs');
// Mảng xuất dữ liệu report Excel
var SQL_Excel = [];  // Dữ liệu nhập kho
const { CONNREFUSED } = require('dns');
function fn_excelExport() {
    // =====================CÁC THUỘC TÍNH CHUNG=====================
    // Lấy ngày tháng hiện tại
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let day = date_ob.getDay();
    var dayName = '';
    if (day == 0) { dayName = 'Chủ nhật,' }
    else if (day == 1) { dayName = 'Thứ hai,' }
    else if (day == 2) { dayName = 'Thứ ba,' }
    else if (day == 3) { dayName = 'Thứ tư,' }
    else if (day == 4) { dayName = 'Thứ năm,' }
    else if (day == 5) { dayName = 'Thứ sáu,' }
    else if (day == 6) { dayName = 'Thứ bảy,' }
    else { };
    // Tạo và khai báo Excel
    let workbook = new Excel.Workbook()
    let worksheet = workbook.addWorksheet('Báo cáo sản xuất', {
        pageSetup: { paperSize: 9, orientation: 'landscape' },
        properties: { tabColor: { argb: 'FFC0000' } },
    });
    // Page setup (cài đặt trang)
    worksheet.properties.defaultRowHeight = 20;
    worksheet.pageSetup.margins = {
        left: 0.3, right: 0.25,
        top: 0.75, bottom: 0.75,
        header: 0.3, footer: 0.3
    };
    // =====================THẾT KẾ HEADER=====================
    // Logo công ty
    const imageId1 = workbook.addImage({
        filename: 'public/images/Logo.png',
        extension: 'png',
    });
    worksheet.addImage(imageId1, 'A1:A3');
    // Thông tin công ty
    worksheet.getCell('B1').value = 'Huỳnh Duy Phước';
    worksheet.getCell('B1').style = { font: { name: 'Times New Roman', bold: true, size: 11 }, alignment: { horizontal: 'left', vertical: 'middle' } };
    worksheet.getCell('B2').value = 'Địa chỉ:  KĐT Vinhomes Grand Park, Long Thạnh Mỹ, Tp. Thủ Đức, Tp. Hồ Chí Minh';
    worksheet.getCell('B3').value = 'Cellphone: (+84)904998714';
    // Tên báo cáo
    worksheet.getCell('A5').value = 'BÁO CÁO SẢN XUẤT';
    worksheet.mergeCells('A5:L5');
    worksheet.getCell('A5').style = { font: { name: 'Times New Roman', bold: true, size: 16 }, alignment: { horizontal: 'center', vertical: 'middle' } };
    // Ngày in phiếu
    worksheet.getCell('L6').value = "Ngày in phiếu: " + dayName + date + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
    worksheet.getCell('L6').style = { font: { bold: false, italic: true }, alignment: { horizontal: 'right', vertical: 'bottom', wrapText: false } };

    // Tên nhãn các cột
    var rowpos = 7;
    // var collumName = ["STT", "Thời gian", "Dữ liệu Bool", "Dữ liệu Byte", "Dữ liệu Integer", "Dữ liệu Số thực", "Dữ liệu String", "Ghi chú"]
    var collumName = ["STT", "Thời gian", "STT MẺ", "TP1", "TP2", "TP3", "TP4", "Xi", "Nước", "PG1", "PG2", "Ghi chú"]
    worksheet.spliceRows(rowpos, 1, collumName);


    // =====================XUẤT DỮ LIỆU EXCEL SQL=====================
    // Dump all the data into Excel
    var rowIndex = 0;
    SQL_Excel.forEach((e, index) => {
        // row 1 is the header.  
        rowIndex = index + rowpos;
        // worksheet1 collum
        worksheet.columns = [
            { key: 'STT' },
            { key: 'Gio' },
            // {key: 'MaPhieuCan'},
            { key: 'STTMe' },
            { key: 'TP1' },
            { key: 'TP2' },
            { key: 'TP3' },
            { key: 'TP4' },
            { key: 'Xi' },
            { key: 'Nuoc' },
            { key: 'PG1' },
            { key: 'PG2' }
        ]
        worksheet.addRow({
            STT: {
                formula: index + 1
            },
            ...e
        })
    })

    // Lấy tổng số hàng
    const totalNumberOfRows = worksheet.rowCount;
    // Tính tổng
    worksheet.addRow([
        'Tổng cộng:',
        '',
        '',
        { formula: `=sum(D${rowpos + 1}:D${totalNumberOfRows})` },
        { formula: `=sum(E${rowpos + 1}:E${totalNumberOfRows})` },
        { formula: `=sum(F${rowpos + 1}:F${totalNumberOfRows})` },
        { formula: `=sum(G${rowpos + 1}:G${totalNumberOfRows})` },
        { formula: `=sum(H${rowpos + 1}:H${totalNumberOfRows})` },
        { formula: `=sum(I${rowpos + 1}:I${totalNumberOfRows})` },
        { formula: `=sum(J${rowpos + 1}:J${totalNumberOfRows})` },
        { formula: `=sum(K${rowpos + 1}:K${totalNumberOfRows})` }
    ])
    // Style cho hàng total (Tổng cộng)
    worksheet.getCell(`A${totalNumberOfRows + 1}`).style = { font: { bold: true, size: 12 }, alignment: { horizontal: 'center', } };
    // Tô màu cho hàng total (Tổng cộng)
    const total_row = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
    total_row.forEach((v) => {
        worksheet.getCell(`${v}${totalNumberOfRows + 1}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'f2ff00' } }
    })


    // Style các cột
    const HeaderStyle = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    HeaderStyle.forEach((v) => {
        worksheet.getCell(`${v}${rowpos}`).style = { font: { bold: true }, alignment: { horizontal: 'center', vertical: 'middle', wrapText: true } };
        worksheet.getCell(`${v}${rowpos}`).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
        }
    })
    // Cài đặt độ rộng cột
    worksheet.columns.forEach((column, index) => {
        column.width = 10;
    })
    // Set width header
    worksheet.getColumn(1).width = 8;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 8;
    worksheet.getColumn(12).width = 20;


    // ++++++++++++Style cho các hàng dữ liệu++++++++++++
    worksheet.eachRow({ includeEmpty: true }, function (row, rowNumber) {
        var datastartrow = rowpos;
        var rowindex = rowNumber + datastartrow;
        const rowlength = datastartrow + SQL_Excel.length
        if (rowindex >= rowlength + 1) { rowindex = rowlength + 1 }
        const insideColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
        // Tạo border
        insideColumns.forEach((v) => {
            // Border
            worksheet.getCell(`${v}${rowindex}`).border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
            },
                // Alignment
                worksheet.getCell(`${v}${rowindex}`).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
        })
    })


    // =====================THẾT KẾ FOOTER=====================
    worksheet.getCell(`K${totalNumberOfRows + 3}`).value = 'Ngày …………tháng ……………năm 20………';
    worksheet.getCell(`K${totalNumberOfRows + 3}`).style = { font: { bold: true, italic: false }, alignment: { horizontal: 'right', vertical: 'middle', wrapText: false } };

    worksheet.getCell(`B${totalNumberOfRows + 4}`).value = 'Bên giao';
    worksheet.getCell(`B${totalNumberOfRows + 5}`).value = '(Ký, ghi rõ họ tên)';
    worksheet.getCell(`B${totalNumberOfRows + 4}`).style = { font: { bold: true, italic: false }, alignment: { horizontal: 'center', vertical: 'bottom', wrapText: false } };
    worksheet.getCell(`B${totalNumberOfRows + 5}`).style = { font: { bold: false, italic: true }, alignment: { horizontal: 'center', vertical: 'top', wrapText: false } };

    worksheet.getCell(`F${totalNumberOfRows + 4}`).value = 'Lái xe';
    worksheet.getCell(`F${totalNumberOfRows + 5}`).value = '(Ký, ghi rõ họ tên)';
    worksheet.getCell(`F${totalNumberOfRows + 4}`).style = { font: { bold: true, italic: false }, alignment: { horizontal: 'center', vertical: 'bottom', wrapText: false } };
    worksheet.getCell(`F${totalNumberOfRows + 5}`).style = { font: { bold: false, italic: true }, alignment: { horizontal: 'center', vertical: 'top', wrapText: false } };

    worksheet.getCell(`K${totalNumberOfRows + 4}`).value = 'Bên nhận';
    worksheet.getCell(`K${totalNumberOfRows + 5}`).value = '(Ký, ghi rõ họ tên)';
    worksheet.getCell(`K${totalNumberOfRows + 4}`).style = { font: { bold: true, italic: false }, alignment: { horizontal: 'center', vertical: 'bottom', wrapText: false } };
    worksheet.getCell(`K${totalNumberOfRows + 5}`).style = { font: { bold: false, italic: true }, alignment: { horizontal: 'center', vertical: 'top', wrapText: false } };
    console.log()
    // =====================THỰC HIỆN XUẤT DỮ LIỆU EXCEL=====================
    // Export Link
    var currentTime = year + "_" + month + "_" + date + "_" + hours + "h" + minutes + "m" + seconds + "s";
    var saveasDirect = "Report/Report_" + currentTime + ".xlsx";
    SaveAslink = saveasDirect; // Send to client
    var booknameLink = "public/" + saveasDirect;

    var Bookname = "Report_" + currentTime + ".xlsx";
    // Write book name
    workbook.xlsx.writeFile(booknameLink)

    // Return
    return [SaveAslink, Bookname]

} // Đóng fn_excelExport

// // =====================TRUYỀN NHẬN DỮ LIỆU VỚI TRÌNH DUYỆT=====================
// // Hàm chức năng truyền nhận dữ liệu với trình duyệt
// function fn_Require_ExcelExport() {
//     io.on("connection", function (socket) {
//         socket.on("msg_Excel_Report", function (data) {
//             const [SaveAslink1, Bookname] = fn_excelExport();
//             var data = [SaveAslink1, Bookname];
//             socket.emit('send_Excel_Report', data);
//         });
//     });
// }
// Chú ý: //////// Nếu sử dụng cách tạo một hàm chưa socket.on và socket.emit hoặc có thể có một trong 2 như thế này, sau đó gọi nó trong một sự kiện lắng nghe io.on
//////// thì hậu quả là việc gửi lệnh/ nhận lệnh sẽ bị lặp lại, vì mỗi lần gọi hàm nó sẽ tạo ra một hàm callback, và đến khi nó nhận lệnh socket.on nó sẽ 
//////// gọi đúng bằng số lần hàm callback được tạo ra, có thể hỏi Bing để rõ hơn

// Đoạn code sau sẽ chuyển đổi định dạng ngày tháng từ DD/MM/YYYY sang YYYY-MM-DD
// Trong JavaScript, định dạng ngày tháng chuẩn là YYYY-MM-DD hoặc MM/DD/YYYY
function convertDateFormat(dateString) {
    var dateParts = dateString.split("/");
    return dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
}

function DocMangThuThap(values) {
    // Luu giu vao trong object thu thap
    // can cot lieu VB5054 VB5055
    ThuThap.TrangThaiCanCotLieu = String.fromCharCode(values.VB5054) + String.fromCharCode(values.VB5055);
    ThuThap.SoMeHienTaiCotLieu = values.SO_ME_HT1;
    console.log('ThuThap.TrangThaiCanCotLieu ', ThuThap.TrangThaiCanCotLieu)
    console.log('ThuThap.SoMeHienTaiCotLieu ', ThuThap.SoMeHienTaiCotLieu)
    // can xi
    ThuThap.TrangThaiCanXi = String.fromCharCode(values.VB4154) + String.fromCharCode(values.VB4155);
    ThuThap.SoMeHienTaiXi = values.SO_ME_HT2;
    console.log('ThuThap.TrangThaiCanXi ', ThuThap.TrangThaiCanXi)
    console.log('ThuThap.SoMeHienTaiXi ', ThuThap.SoMeHienTaiXi)

    // can nuoc
    ThuThap.TrangThaiCanNuoc = String.fromCharCode(values.VB4155) + String.fromCharCode(values.VB4255);
    ThuThap.SoMeHienTaiNuoc = values.SOME_HT3;
    console.log('ThuThap.TrangThaiCanNuoc ', ThuThap.TrangThaiCanNuoc)
    console.log('ThuThap.SoMeHienTaiNuoc ', ThuThap.SoMeHienTaiNuoc)

    // can PG
    // ThuThap.TrangThaiCanPG = GiaTriTrangThai(CStr(Chr(result(31)) & Chr(result(32))))
    // ThuThap.SoMeHienTaiPG = CInt(result(33))

    ThuThap.KhoiLuongCotLieu[0] = values.Sym_VD66;
    ThuThap.KhoiLuongCotLieu[1] = values.Sym_VD366;
    ThuThap.KhoiLuongCotLieu[2] = values.Sym_VD566;

    ThuThap.KhoiLuongXi = values.Sym_VD1066
    ThuThap.KhoiLuongNuoc = values.Sym_VD2066
    // ThuThap.KhoiLuongPG[0] = result(43)
    // ThuThap.KhoiLuongPG[1] = result(44)
    console.log('ThuThap.KhoiLuongXi ', ThuThap.KhoiLuongXi)
    console.log('ThuThap.KhoiLuongNuoc ', ThuThap.KhoiLuongNuoc)
    console.log('ThuThap.KhoiLuongCotLieu[0]', ThuThap.KhoiLuongCotLieu[0])
    console.log('ThuThap.KhoiLuongCotLieu[1]', ThuThap.KhoiLuongCotLieu[1])
    console.log('ThuThap.KhoiLuongCotLieu[2]', ThuThap.KhoiLuongCotLieu[2])
}


console.log('Đã đến cuối chương trình index.js')

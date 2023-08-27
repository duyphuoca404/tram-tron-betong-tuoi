// Gửi yêu cầu xuất Excel qua index.js
function fn_excel() {
    var linktext = "";
    var bookname = "";
    console.log('Client Gửi yêu cầu xuất report')
    socket.emit("msg_Excel_Report", true);
    console.log('Bắt đầu nhận report')

}
// Báo cáo chi tiết của Phiếu cân
function fn_excel2() {
    var linktext = "";
    var bookname = "";
    console.log('Client Gửi yêu cầu xuất report Báo cáo chi tiết của Phiếu cân')
    socket.emit("msg_Excel_Report2", true);
    console.log('Bắt đầu nhận report Báo cáo chi tiết của Phiếu cân')

}

socket.on('send_Excel_Report', function (data) {
    linktext = data[0];
    bookname = data[1];
    // Delay save as
    var delayInMilliseconds = 1000; //Delay 1 second
    setTimeout(function () {
        saveAs(linktext, bookname);
        console.log('Lưu file report')
    }, delayInMilliseconds);
});

socket.on('send_Excel_Report2', function (data) {
    linktext = data[0];
    bookname = data[1];
    // Delay save as
    var delayInMilliseconds = 1000; //Delay 1 second
    setTimeout(function () {
        saveAs(linktext, bookname);
        console.log('Lưu file report')
    }, delayInMilliseconds);
});
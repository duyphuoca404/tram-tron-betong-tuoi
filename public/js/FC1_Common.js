////////////// YÊU CẦU DỮ LIỆU TỪ SERVER- REQUEST DATA //////////////
var myVar = setInterval(myTimer, 100);
function myTimer() {
    socket.emit("Client-send-data", "Request data client");
}
////////////// CÁC KHỐI CHƯƠNG TRÌNH CON ///////////////////////////
// Chương trình con đọc dữ liệu lên IO Field
function fn_IOFieldDataShow(tag, IOField, tofix) {
    let string;
    socket.on(tag, function (data) {
        if (tofix == 0) {
            document.getElementById(IOField).value = data;
            // string = data;
            // console.log(tag);
            // console.log("Du lieu tra ve của " + tag + " là: " + string);
        }
        else {
            document.getElementById(IOField).value = data.toFixed(tofix);
            // string = data;
            // console.log(tag);
            // console.log("Du lieu tra ve của " + tag + " là: " + string);
        }

    });
}
// Chương trình con đổi màu Symbol
function fn_SymbolStatus(ObjectID, SymName, Tag) {
    var imglink_0 = "images/Symbol/" + SymName + "_0.png"; // Trạng thái tag = 0
    var imglink_1 = "images/Symbol/" + SymName + "_1.png"; // Trạng thái tag = 1
    var imglink_2 = "images/Symbol/" + SymName + "_2.png"; // Trạng thái tag = 2
    var imglink_3 = "images/Symbol/" + SymName + "_3.png"; // Trạng thái tag = 3
    var imglink_4 = "images/Symbol/" + SymName + "_4.png"; // Trạng thái tag = 4
    var imglink_5 = "images/Symbol/" + SymName + "_5.png"; // Trạng thái tag = 5
    socket.on(Tag, function (data) {
        if (data == 0) {
            document.getElementById(ObjectID).src = imglink_0;
        }
        else if (data == 1) {
            document.getElementById(ObjectID).src = imglink_1;
        }
        else if (data == 2) {
            document.getElementById(ObjectID).src = imglink_2;
        }
        else if (data == 3) {
            document.getElementById(ObjectID).src = imglink_3;
        }
        else if (data == 4) {
            document.getElementById(ObjectID).src = imglink_4;
        }
        else {
            document.getElementById(ObjectID).src = imglink_0;
        }
    });
}

// Chương trình con chuyển trang
function fn_ScreenChange(scr_1, scr_2, scr_3) {
    document.getElementById(scr_1).style.visibility = 'visible';   // Hiển thị trang được chọn
    document.getElementById(scr_2).style.visibility = 'hidden';    // Ẩn trang 1
    document.getElementById(scr_3).style.visibility = 'hidden';
    // document.getElementById(scr_4).style.visibility = 'hidden';
}

// function fn_ShowOrHideDiv(showDivButton, div) {
//     document.getElementById(showDivButton).addEventListener('click', function () { document.getElementById(div).style.display = 'block'; });
// }
// Hàm hiển thị một đối tượng
function fn_ShowById(element) {
    document.getElementById(element).style.display = 'block';
}
// Hàm ẩn đi một đối tượng
function fn_HideById(element) {
    document.getElementById(element).style.display = 'none';
}
// Hàm ẩn đi một đối tượng với Class
function fn_HideByClass(Class) {
    var myClass = Class;
    var elements = document.getElementsByClassName(myClass);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
}
// Hàm hiển thị một đối tượng với Class
function fn_ShowByClass(Class) {
    var myClass = Class;
    var elements = document.getElementsByClassName(myClass);
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'inline-block';
    }
}


// Chương trình con nút sửa/lưu dữ liệu
function fn_DataEdit(button1, button2) {
    document.getElementById(button1).style.zIndex = '1';  // Hiển nút 1
    document.getElementById(button2).style.zIndex = '0';  // Ẩn nút 2
}

// Chương trình con hien thi Trang thai can
function fn_ShowStatus(tag1, tag2, IOField) {
    let string0;
    let string1;
    let string;
    // var string0 = String.fromCharCode(bytenumber0.toString(16));
    // var string1 = String.fromCharCode(bytenumber1.toString(16));

    function capNhatString() {
        if (string0 !== undefined && string1 !== undefined) {
            string = string0 + string1;
            // console.log("Du lieu tra ve:" + string);
        }
        var tmp;
        switch (string) {
            case "EM": tmp = "EMPTY";
                break;
            case "ST": tmp = "STOP";
                break;
            case "FU": tmp = "FULL";
                break;
            case "PE": tmp = "FULL";
                break;
            case "PA": tmp = "PAUSE";
                break;
            case "CO": tmp = "COARSE";
                break;
            case "1C": tmp = "COARSE";
                break;
            case "2C": tmp = "COARSE";
                break;
            case "3C": tmp = "COARSE";
                break;
            case "4C": tmp = "COARSE";
                break;

            case "NU": tmp = "COARSE";
                break;
            case "FI": tmp = "FINE";
                break;
            case "XI": tmp = "COARSE";
                break;
            case "IN": tmp = "IN";
                break;
            case "EN": tmp = "END";
                break;
            case "UP": tmp = "GO UP";
                break;
            case "DO": tmp = "GO DOWN";
                break;
            case "ON": tmp = "ON TOP";
                break;
            default: tmp = "No signal";
        };

        document.getElementById(IOField).value = tmp;
        // console.log(tmp);
        //return tmp;
    }

    socket.on(tag1, function (data) {
        string0 = String.fromCharCode(data);
        // console.log(tag1);
        // console.log("Du lieu tra ve:" + string0);
        capNhatString();
    });

    socket.on(tag2, function (data) {
        string1 = String.fromCharCode(data);
        // console.log(tag2);
        // console.log("Du lieu tra ve:" + string1);
        capNhatString();
    });



}

// Chương trình con hien thi Trang thai can
function fn_ShowSoMe(tag1, tag2, IOField) {
    let string0;
    let string1;
    let string;
    // var string0 = String.fromCharCode(bytenumber0.toString(16));
    // var string1 = String.fromCharCode(bytenumber1.toString(16));

    function capNhatString() {
        if (string0 !== undefined && string1 !== undefined) {
            string = string0 + "/" + string1;
            // console.log("So me/So me DM:" + string);
        }
        document.getElementById(IOField).value = string;
        // console.log(string);
        //return tmp;
    }

    socket.on(tag1, function (data) {
        string0 = data.toString();
        // console.log(tag1);
        // console.log("Du lieu tra ve:" + string0);
        capNhatString();
    });

    socket.on(tag2, function (data) {
        string1 = data + '';
        // console.log(tag2);
        // console.log("Du lieu tra ve:" + string1);
        capNhatString();
    });
}
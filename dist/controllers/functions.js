"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIp = void 0;
//
//function zero_first_format(value:any)
//{
//    if (value < 10)
//    {
//        value='0'+value;
//    }
//    return value;
//}
//
///* функция получения текущей даты и времени */
//export function date_time()
//{
//    var current_datetime = new Date();
//    var day = zero_first_format(current_datetime.getDate());
//    var month = zero_first_format(current_datetime.getMonth()+1);
//    var year = current_datetime.getFullYear();
//    var hours = zero_first_format(current_datetime.getHours());
//    var minutes = zero_first_format(current_datetime.getMinutes());
//    //var seconds = zero_first_format(current_datetime.getSeconds());
//
//    return day+"."+month+"."+year+" "+hours+":"+minutes;//+":"+seconds;
//}
function getUserIp(ip) {
    //console.log(req.ip.split("f:"))
    let ips = ip.split("f:");
    //console.log('User ip = ' +ips[1])
    return ips[1];
}
exports.getUserIp = getUserIp;

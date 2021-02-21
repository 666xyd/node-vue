export default {

    //获取当前的时间  年月日时分秒
    getCurrentTime(){
        let time = '';
        let yy = new Date().getFullYear();
        let mm = new Date().getMonth()+1;
        let dd = new Date().getDate();
        let hh = new Date().getHours();
        let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
        time = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        return time;
    },

    is_phone(phone) {
        // 仅数字，不能超过11位，不用判断第一个数字
        // return /^\d{1,11}$/.test(phone)        //限制位数为1～11
        return /^\d{11}$/.test(phone)             //限制位数为11
    },
}
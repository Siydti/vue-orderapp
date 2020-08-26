export function gettime(time) {
    let date = new Date( time )
    return date.getFullYear() +'-'+ getnum(date.getMonth()) +'-'+ getnum(date.getDate()) +' '+ getnum(date.getHours()) +':'+ getnum(date.getMinutes()) +':'+ getnum(date.getSeconds())
}

function getnum(num) {
    return num > 10 ? num : '0'+num
}
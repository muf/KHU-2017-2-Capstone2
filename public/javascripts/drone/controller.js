
function init(){
    $.ajax({
        type: 'GET',     
        url: '/init',
        success: function () {
            console.log("success")
        }})
}
function takeoff(){
    $.ajax({
        type: 'GET',     
        url: '/takeoff',
        success: function () {
            console.log("success")
        }})
}
function land(){
    $.ajax({
        type: 'GET',     
        url: '/land',
        success: function () {
            console.log("success")
        }})
}
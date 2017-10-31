/* trigger events */
$('#add-coords').click(function () {
    add_new_coords();
});
$('#apply').click(function () {
    make_table_rows();
});

/* global variable */
var len = 0 
var latlong_regex = /[^1234567890.,]/g;
// 주의 밑에서 이걸로 logic 계산하면 전역 변수라서 전역 변수에 접근한다는 점 주의하자. 
// 예전에 eventmap service 만들때도 그랬음.

function select_menu(id){

}
/* functions */ 
function add_new_coords() {
    var num = len;
    para = $('<input type="text" name="coords" class = "coords" id="co-line' + num + '" >');
    para.appendTo('#side-button-container');
    para = $(' <button id="remove-coords" class="remove-coords  co-line' + num +'">-</button>');
    para.appendTo('#side-button-container');
    $('.co-line' + num).click(function () {
        $('.co-line' + num).remove();
        $('#co-line' + num).remove();
        len --;
    });

    len++;
}
function make_table_rows(){
    
}


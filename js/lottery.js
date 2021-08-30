
function init() {
    document.getElementById('modal_content').style.display = "none";
    $('#value').text(999);
}
function start() {
    var stones = $("#value").text();
    if (stones < 200) {
        // document.getElementById('modal_content').style.display = "";
        setMessageBox("lowStones");
    } else {
        $("#value").text(stones - 200);
        var giftBox;
        // var giftDesc;
        var x = 0;
        //可修改ArrList以定义每一奖项中奖概率;
        var ArrList = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
        //position用于定位每一个抽奖格;
        var position = [0,1,2,4,7,6,5,3];//[0, 1, 2, 5, 8, 7, 6, 3];
        var initial = getArrayItems(ArrList, 1);
        for (var i = -1; i < initial; i++) {
            setTimeout(() => {
                $('.gift_item').removeClass("selected");
                //:eq() 选择器选取带有指定 index 值的元素。
                giftBox = $('.gift_item:eq(' + position[(x % 7)] + ')');
                // giftDesc = $('.text:eq(' + position[(x % 7)] + ')');
                giftBox.addClass('selected');
                
                if (x == initial) {
                    setTimeout(() => {
                        // alert('恭喜获得礼物：' + giftBox.text());
                        console.log(position[(x % 7)]);
                        x = 0;
                        setMessageBox(giftBox);
                    }, 10)
                }else{
                    x++;
                }
                
            }, i * 50);//控制速度
        }
    }
}
function setMessageBox(value){
    var title = $('.modal_title');
    var body_title = $('.modal_body_title');
    var body_desc = $('.modal_body_desc');
    var body_img = $('.modal_body_img');
    if(value == "lowStones"){
        title.text("友情提示");
        body_title.text("当前矿石不足");
        body_desc.text("多多赚取矿石吧~");
    }else{
        title.text("🎉 恭喜中奖！");
        var giftdel = value.children();
        console.log(giftdel[0]);
        var giftpic = giftdel[0].getAttribute('src');
        var giftdesc = giftdel[1].textContent;
        console.log(giftpic);
        body_img.src=giftpic;
        body_title.text("恭喜获得"+giftdesc);
        body_desc.text("真棒👍🏻");
        console.log(body_img);
    }
    document.getElementById('modal_content').style.display = "";
}
function hide() {
    document.getElementById('modal_content').style.display = "none";
}
function jumpToGainList() {
    var url = "../html/awardList.html"
    location.replace(url);
}
function getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    //取出的数值项,保存在此数组
    var return_array = new Array();
    for (var i = 0; i < num; i++) {
        //判断如果数组还有可以取出的元素,以防下标越界
        if (temp_array.length > 0) {
            //在数组中产生一个随机索引
            var arrIndex = Math.floor(Math.random() * temp_array.length);
            //将此随机索引的对应的数组元素值复制出来
            return_array[i] = temp_array[arrIndex];
            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
            temp_array.splice(arrIndex, 1);
        } else {
            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
            break;
        }
    }
    return return_array;
}
$(document).ready(function () {
    init();
});
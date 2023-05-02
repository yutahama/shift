// atd=17;

// 
// ChatGPTからの出力を入力する処理を入れる
// 

// CheckAtd(atd)

// function CheckAtd(atd){
//     if(atd!=17){
//         // atd=18
//         LateAtd(atd)
//     }
// }
// function LateAtd(atd){
    
// }
dt=[['1','17'], ['2','17'], ['3','17'], ['8','17'], ['9','17'], ['10','17'], ['11','17'], ['17','17'], ['18','17'], ['22','17'], ['23','17'], ['25','17'], ['28','17'], ['29','17'], ['30','17'], ['31','17']]




const week = ["日", "月", "火", "水", "木", "金", "土"];
//Mon May 01 2023 08:22:01 GMT+0900 (日本標準時) 今日の日付を取得
const today = new Date();
// 月末だとずれる可能性があるため、1日固定で取得
//getFullYear:2023 getMonth:4
let showDate = new Date(today.getFullYear(), today.getMonth(), 1);

// 初期表示
window.onload = function () {
    showProcess(today, calendar);
};
// 前の月表示
function prev(){
    showDate.setMonth(showDate.getMonth() - 1);
    showProcess(showDate);
}

// 次の月表示
function next(){
    showDate.setMonth(showDate.getMonth() + 1);
    showProcess(showDate);
}

// カレンダー表示
function showProcess(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    document.querySelector('#header').innerHTML = year + "年 " + (month + 1) + "月";

    var calendar = createProcess(year, month);
    // このハンドラーは、カーソルが順序なしリストの上を移動した
    // ときに1度だけ実行されます

    document.querySelector('#calendar').innerHTML = calendar;
    // このハンドラーは異なるリスト項目の上を移動するごとに
    // 実行されます
    document.querySelector('#calendar').addEventListener("mouseover", function( event ) {
        // mouseover の対象を強調
        document.querySelector('#calendar').css({opacity:0.8, display:"none"}).fadeIn(400);

    
        // 少し待ってから色をリセット
        setTimeout(function() {
        event.target.style.color = "";
        }, 500);
    }, false);
    

}

// カレンダー作成
function createProcess(year, month) {
    // 曜日
    var calendar = "<table><tr class='dayOfWeek'>";
    for (var i = 0; i < week.length; i++) {
        calendar += "<th>" + week[i] + "</th>";
    }
    calendar += "</tr>";

    var count = 0;
    // 今月が何曜日から始まるかを取得
    var startDayOfWeek = new Date(year, month, 1).getDay();
    // 今月が何日で終わるかを取得
    var endDate = new Date(year, month + 1, 0).getDate();
    // 先月が何日で終わっているかを取得
    var lastMonthEndDate = new Date(year, month, 0).getDate();
    // Math.ceil 引数として与えた数以上の最小の整数を返す
    // 1か２が出てくる
    var row = Math.ceil((startDayOfWeek + endDate) / week.length);

    // 1行ずつ設定
    for (var i = 0; i < row; i++) {
        calendar += "<tr>";
        // 1列単位で設定
        for (var j = 0; j < week.length; j++) {
            if (i == 0 && j < startDayOfWeek) {
                // 1行目で1日まで先月の日付を設定
                calendar += "<td class='disabled'>" +(lastMonthEndDate - startDayOfWeek + j + 1) + "</td>";
            } else if (count >= endDate) {
                // 最終行で最終日以降、翌月の日付を設定
                count++;
                calendar += "<td class='disabled'>" + (count - endDate) + "</td>";
            } else {
                // 当月の日付を曜日に照らし合わせて設定
                count++;
                if(year == today.getFullYear()
                  && month == (today.getMonth())
                  && count == today.getDate()){
                    calendar += "<td class='today'>" + count + "</td>";
                } else {
                    calendar += "<td>" + count + "</td>";
                }
            }
        }
        calendar += "</tr>";
    }
    return calendar;
}

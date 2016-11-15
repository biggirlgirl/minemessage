/**
 * Created by Administrator on 2016/11/11.
 */
var xhr=new XMLHttpRequest();
xhr.onreadystatechange=function () {
    if(xhr.readyState==4 && xhr.status==200){
    //    发送成功
        console.log(xhr.responseText);
        var arr=JSON.parse(xhr.responseText);
        // console.log(typeof arr);
        var result='';
        for(var i=arr.length-1;i>-1;i--){
            var message=arr[i];
            result +='<section>';
            result +='<p>';
            result +=message.content;
            result +='</p>';
            result +='<span>';
            result +=formattime(message.time);
            result +='</span>';
            result +='<div>';
            result +=formatip(message.ip);
            result +='</div>';
            result +='</section>';
        }
        document.querySelector('article').innerHTML=result;
    }
}
xhr.open('get','/message');
xhr.send();
function  formattime(time) {
  var time=new Date(time);
    var year=time.getFullYear();
    var month=time.getMonth()+1;
    var day=time.getDate();
    var h=time.getHours();
    var min=time.getMinutes();
    month =month<10?'0'+month:month;
    day =day<10?'0'+day:day;
    h =h<10?'0'+h:h;
    min =min<10?'0'+min:min;
    return year+' '+month +' '+day+ ' '+h+':'+min;
}
function formatip(ip) {
    if(ip.startsWith('::1')){
        return'127.0.0.1';
    }
}
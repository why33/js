var Js=function(selector){
    return document.querySelector(selector);
}
var JsAll=function(selector){
    return document.querySelectorAll(selector);
}
//---------------
//--------------控制DIV属性
// 最麻烦的一种
/*
function changeWidth(){
   Js('#byControlDivId').style.width="300px";
}
function changeHeight(){
    Js('#byControlDivId').style.height='300px';
}
function changeColor(){
    Js('#byControlDivId').style.backgroundColor=randomColor();
}
function randomColor(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return "rgb("+r+","+g+","+b+")";
}
function changeHide(){
    Js('#byControlDivId').style.visibility='hidden';
    JsAll('.controlBut>button').disabled='disabled';
    var arrBut=Array.prototype.slice.call(JsAll('.controlBut>button'));
    arrBut.forEach(function(item,index,arr){
        if(index<=2){
            item.disabled='disabled'
        }
       
    })
    
}
function changeReset(){
    Js('#byControlDivId').style.visibility='visible';
    Js('#byControlDivId').style.backgroundColor='#000';
    Js('#byControlDivId').style.width='100px';
    Js('#byControlDivId').style.height='100px';
    var arrBut=Array.prototype.slice.call(JsAll('.controlBut>button'));
    arrBut.forEach(function(item,index,arr){
            item.disabled=''
    })
}
*/
//精简的一种
function randomColor(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return "rgb("+r+","+g+","+b+")";
}
var color='0123456789abcdef';
var buts=JsAll('.controlBut button');
var attrs=['width','height','backgroundColor','visibility','visibility'];
var attrVal=['300px','300px','#000','hidden','visible'];
for(var i=0;i<buts.length;i++){
    buts[i].index=i;
    buts[i].onclick=function(){
        this.index==buts.length-1 &&  (Js('#byControlDivId').style.cssText='');
        Js('#byControlDivId').style[(attrs[this.index])]=attrVal[this.index];
        this.index==2 && (Js('#byControlDivId').style.backgroundColor=randomColor());
        if(this.index==3) {
            for(var j=0;j<3;j++){
                buts[j].disabled='disabled';
            }
        }else{
            for(var j=0;j<3;j++){
                buts[j].disabled='';
            }
        }
        
       
    }
}
// --------------------------
// -------------换风格
var colors=[randomColor(),randomColor(),randomColor()];
var lis=JsAll('.changeStyle li');
[].forEach.call(lis,function(item,index,arr){
   item.style.backgroundColor=colors[index];
   index==0 && (checkCookie(item.id,item))
   item.onclick=function(){
       for(var i=0;i<lis.length;i++){
           lis[i].classList.remove('checked');
       }
       setCookie(this.id,this);
       Js('#byControlColorStatusId').style.backgroundColor=this.style.backgroundColor;
   }
})
//cookie

function setCookie(val,item){
    var date=new Date();
    date.setTime(date.getTime()+60*60*24*1000);
    var times=date.toUTCString();
    document.cookie="id="+val+'; expires='+times+';';
    item.classList.add('checked');
    Js('#byControlColorStatusId').style.backgroundColor=item.style.backgroundColor;
}
// getCookie('ss');
function getCookie(name){
    var cookies=document.cookie;
    var arr=cookies.split(";")
    try{
        arr.forEach(function(item,index){
            var arrC=item.trim();
            if(arrC.indexOf(name)==0){
                throw arrC.substring(name.length+1,arrC.length)
            }
        })
    }
    catch(e){
        return e
    }
    return '';
    /*
    for(var i=0;i<arr.length;i++){
        var arr0=arr[i].trim();
        if(arr0.indexOf(name==0)){
            return 123
        }
    }
    return ""
    */
}

function checkCookie(id,item){
    if(!document.cookie){
        setCookie(id,item);
    }else{
        var val=getCookie('id');
        lis[val-1].classList.add('checked');
        Js('#byControlColorStatusId').style.backgroundColor=colors[val-1];
    }
}
//让window.onload具有覆盖性，后面的会覆盖前面的，window.onload加载多个函数和追加函数
//window.onload =function() { t();  b(); c() ;})也行
function x2(){
    // alert(2)
}
function x1(){
    // alert(1)
}
function x3(){
    // alert(3)
}
onloadFunction(x1);
onloadFunction(x2);
onloadFunction(x3);
function onloadFunction(fun){
    var onloadF=window.onload;//保存得到上一个onload事件的函数
    //判断一下类型是否为function，window.onload第一次被方法赋值后类型变为function（window.onload初始类型为object，被方法赋值后类型变为function）
    if(typeof onloadF != 'function'){
        window.onload=fun;
    //判断类型为function时，重新为window.onload赋值方法，方法里先执行原来onload中的代码，然后再执行传入的方法。
    }else{
        window.onload=function(){
            onloadF()
            fun()
        }       
    }
}


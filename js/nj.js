function getStyle(obj,attr){
	// if(obj.currentStyle){
	// 	return obj.currentStyle[attr];   //IE6.7.8
	// }else{
	// 	return getComputedStyle(obj)[attr];
	// }
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}

// 简单运动框架(attr是字符串)
function doMove(obj,attr,speed,target,endFn){      
	if(obj.timeMove){
		return false;
	}
	speed=parseInt(getStyle(obj,attr))<target?speed:-speed;
	clearInterval(obj.timeMove);
	obj.timeMove=setInterval(function(){
		var step=parseInt(getStyle(obj,attr))+speed;
		if(step>target && speed>0 || step<target && speed<0){
			step=target;
		}
		obj.style[attr]=step+'px';
		if(step==target){
			clearInterval(obj.timeMove);
			obj.timeMove=null;
			endFn && endFn();
		}
	},10)
}
// 透明度变化,target最大100
function doOpacity(obj,speed,target,endFn){
	var init=Math.round(parseFloat(getStyle(obj,'opacity'))*100);
	speed=init<target?speed:-speed;
	clearInterval(obj.timeOpacity);
	obj.timeOpacity=setInterval(function(){
		var step=Math.round(parseFloat(getStyle(obj,'opacity'))*100)+speed;
		if(step>target && speed>0 || step<target && speed<0){
			step=target;
		}
		obj.style.opacity=step/100+'';
		obj.style.filter='alpha(opacity:'+step+')';
		if(step==target){
			clearInterval(obj.timeOpacity);
			obj.timeOpacity=null;
			endFn && endFn();
		}
	},30)
}
//窗口震动
function shake(obj,attr,endFn){
	if(obj.shake){
		return false;
	}
	var num=0;
	var pos=parseInt(getStyle(obj,attr));
	var arr=[];  //20,-20,18,-18....0
	for(var i=20;i>0;i-=2){
		arr.push(i,-i);
	}
	arr.push(0);
	clearInterval(obj.shake);
	obj.shake=setInterval(function(){
		obj.style[attr]=pos+arr[num]+'px';
		num++;
		if(num==arr.length){
			clearInterval(obj.shake);
			obj.shake=null;
			endFn && endFn();
		}
	},50);
}

//json的格式{width:300,height:300}
function startMove(obj,json,fnEnd){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var bStop=true;    //假设所有的值都已经到了
		for(attr in json){
			var cur=0;
			if(attr=='opacity'){
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				cur=parseInt(getStyle(obj,attr));
			}
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			if(cur!=json[attr]){
				bStop=false;  
				//已经等于目标值的不会改变bStop的值，不等于目标值的会把bStop变成false
			}
			if(attr=='opacity'){
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+speed)/100;
			}else{
				obj.style[attr]=cur+speed+'px';				
			}
		}
		if(bStop){
			clearInterval(obj.timer);
			if(fnEnd){fnEnd()}			
		}
	},30);
}


//元素获取

//定位元素距离
function getPos(obj){
	var pos={left:0,top:0};
	while(obj){
		pos.left+=obj.offsetLeft;
		pos.top+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return pos;
}

//getElementsByClassName
// function getElementsByClassName(element, names) {
//     if (element.getElementsByClassName) {
//         return element.getElementsByClassName(names);
//     } else {
//         var elements = element.getElementsByTagName('*');
//         var result = [];
//         var element,
//             classNameStr,
//             flag;
//         names = names.split(' ');
//         for (var i = 0; element = elements[i]; i++) {
//             classNameStr = ' ' + element.className + ' ';
//             flag = true;
//             for (var j = 0, name; name = names[j]; j++) {
//                 if (classNameStr.indexOf(' ' + name + '') == -1) {
//                     flag = false;
//                     break;
//                 }
//             }
//             if (flag) {
//                 result.push(element);
//             }
//         }
//         return result;
//     }
// }

function getElementsByClassName(element, names) {
    if (element.getElementsByClassName) {
        return element.getElementsByClassName(names);
    } else {
        var aEls=element.getElementsByTagName('*');
        var arr=[];
        for(var i=0;i<aEls.length;i++){
        	var aClass=aEls[i].className.split(' ');
        	for(var j=0;j<aClass.length;j++){
        		if(aClass[j]==names){
        			arr.push(aEls[i]);
        			break;
        		}
        	}
        }
    	return arr;
    }
}

//添加className
function addClass(obj,className){
	//如果原来没有class
	if(obj.className==''){
		obj.className=className;
	}else{
		var arrClassName=obj.className.split(' ');
		var _index=arrIndexOf(arrClassName,className);
		if(_index == -1){
			//如果要添加的class在原来的class不存在
			obj.className+=' '+className;
		}
	}
	function arrIndexOf(arr ,v){
		for(var i=0;i<arr.length;i++){
			if(arr[i]==v){
				return i;
			}
		}
		return -1;
	}
}
//删除className
function removeClass(obj,className){
	if(obj.className!=''){
		var arrClassName=obj.className.split(' ');
		var _index=arrIndexOf(arrClassName,className);
		//如果有要移除的class
		if(_index != -1){
			arrClassName.splice(_index,1);
			obj.className=arrClassName.join(' ');
		}
	}
	function arrIndexOf(arr ,v){
		for(var i=0;i<arr.length;i++){
			if(arr[i]==v){
				return i;
			}
		}
		return -1;
	}
}

//事件绑定
function addEvent(obj,evname,fn){
	if(obj.addEventListener){
		obj.addEventListener(evname,fn,false);
	}else{
		obj.attachEvent('on'+evname, function(){
			fn.call(obj);
		})
	}
}
//事件取消
function removeEvent(obj,evname,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(evname,fn,false);
	}else{
		obj.detachEvent('on'+evname, fn);
	}
}

//cookie
function setCookie(key,value,t){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+t);
	document.cookie=key+'='+value+';expires='+oDate.toGMTString();
}


function getCookie(key){
	var arr1=document.cookie.split('; ');
	for(var i=0;i<arr1.length;i++){
		var arr2=arr1[i].split('=');
		if(arr2[0]==key){
			return decodeURI(arr2[1]);
		}
	}
}

function removeCookie(key){
	setCookie(key,'',-1);
}

//ajax
function ajax(url,fnSucc,fnFaild){
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}
	oAjax.open('GET',url,true);
	oAjax.send();
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4 && oAjax.status==200){
			fnSucc(oAjax.responseText);
		}else{
			fnFaild && fnFaild(oAjax.status);
		}
	}
}


/*
* 头部js
* */
(function(){
    //导航栏
    var oBtm=document.getElementById('m-btm');
    (function(){
        var oHeader=document.getElementById('g-header');
        var oNav=document.getElementById('m-nav');
        var aLi=oNav.getElementsByTagName('li');
        var num=0;
        addEvent(aLi[0],'click',function(){
            oHeader.style.height='104px';
            oHeader.style.boxShadow='';
            oBtm.style.display='block';
        });
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            addEvent(aLi[i],'click',function(){
                if(this.index!=0){
                    oHeader.style.height='76px';
                    oHeader.style.boxShadow='0 3px 3px grey';
                    oBtm.style.display='none';
                }
                removeClass(aLi[num],'active');
                removeClass(this,'hover');
                addClass(this,'active');
                num=this.index;
            });
            addEvent(aLi[i],'mouseover',function(){
                if(this!=aLi[num]){
                    addClass(this,'hover');
                }
            });
            addEvent(aLi[i],'mouseout',function(){
                removeClass(this,'hover');
            });
        }
    })();
    //搜索栏
    (function(){
        var oSearch=document.getElementById('m-search');
        var oInp=oSearch.getElementsByTagName('input')[0];
        var oLabel=oSearch.getElementsByTagName('label')[0];
        addEvent(oInp,'focus',function(){
            oLabel.style.display='none';
        });
        addEvent(oInp,'blur',function(){
            if(oInp.value==''){
                oLabel.style.display='inline';
            }else{
                oLabel.style.display='none';
            }
        });
    })();
    //下方导航条点击
    (function(){
        var aLi=oBtm.getElementsByTagName('li');
        var num1=0;
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            addEvent(aLi[i],'click',function(){
                removeClass(aLi[num1],'active');
                addClass(this,'active');
                num1=this.index;
            });
        }
    })();
})();


/*
 * 轮播图js
 * */
(function(){
    var oBanner=document.getElementById('g-banner');
    var oImage=new Image();
    var arrBac=['#100805','#0D1A22','#CFCECA','#171E28','#27010E','#D4D4D2','#11100C','#E9F3F5'];
    var arrImg=['http://7xs6u5.com1.z0.glb.clouddn.com/banner-1.jpg','http://7xs6u5.com1.z0.glb.clouddn.com/banner-2.jpg','http://7xs6u5.com1.z0.glb.clouddn.com/banner-3.jpg','http://7xs6u5.com1.z0.glb.clouddn.com/banner-4.jpg','http://7xs6u5.com1.z0.glb.clouddn.com/banner-5.jpg','http://7xs6u5.com1.z0.glb.clouddn.com/banner-6.jpg','http://7xs6u5.com1.z0.glb.clouddn.com/banner-7.jpg','http://7xs6u5.com1.z0.glb.clouddn.com/banner-8.jpg'];
    var oImg=document.getElementById('img');
    var oWrap=getElementsByClassName(oBanner,'wrap')[0];
    var aI=oWrap.getElementsByTagName('i');
    var oLr=getElementsByClassName(oBanner,'m-lr')[0];
    var aA=oLr.getElementsByTagName('a');
    var timer=null;
    var iCur=1;
    var num=0;
    //预加载图片,从第二张开始
    (function loadImg(){
        oImage.src=arrImg[iCur];
        oImage.onload=oImage.onerror=function(){
            iCur+=1;
            if(iCur<arrImg.length){
                loadImg();
            }
        }
    })();
    //写入i标签
    (function(){
        var text='';
        for(var i=0;i<arrImg.length;i++){
            text+="<i></i>";
        }
        oWrap.innerHTML=text;
        addClass(aI[0],'hover');
    })();
    //给i加点击和hover事件
    (function (){
        for(var i=0;i<aI.length;i++){
            aI[i].index=i;
            addEvent(aI[i],'click',function(){
                num=this.index;
                click(num);
            });
            addEvent(aI[i],'mouseover',function(){
                click(num);
                clear();
                addClass(this,'hover');
            });
            addEvent(aI[i],'mouseout',function(){
                clear();
                set();
                if(this.index!=num){
                    removeClass(this,'hover');
                }
            });
        }
    })();
    //左右按钮点击和hover事件
    (function(){
        addEvent(aA[0],'click',function(){
            if(!oImg.timeOpacity){
                num--;
            }
            if(num==-1){
                num=arrImg.length-1;
            }
            click(num);
            clear();
        });
        addEvent(aA[1],'click',function(){
            if(!oImg.timeOpacity){
                num++;
            }
            if(num==arrImg.length){
                num=0;
            }
            click(num);
            clear();
        });
        for(var i=0;i<aA.length;i++){
            addEvent(aA[i],'mouseover',function(){
                click(num);
                clear();
            });
            addEvent(aA[i],'mouseout',function(){
                clear();
                set();
            });
        }
    })();
    //轮播
    timer=setInterval(function(){
        num++;
        if(num==arrImg.length){
            num=0;
        }
        listPlay(num);
    },5000);
    //轮播函数
    function listPlay(index){
        for(var i=0;i<aI.length;i++){
            removeClass(aI[i],'hover');
        }
        doOpacity(oImg,5,0,function(){
            oImg.src=arrImg[index];
            oBanner.style.background=arrBac[index];
            oImg.style.opacity='0';
            oImg.style.filter='alpha(opacity=0)';
            addClass(aI[index],'hover');
            doOpacity(oImg,5,100);
        });
    }
    //图片跳转函数
    function click(index){
        clear();
        for(var i=0;i<aI.length;i++){
            removeClass(aI[i],'hover');
        }
        oImg.src=arrImg[index];
        oBanner.style.background=arrBac[index];
        addClass(aI[index],'hover');
        oImg.style.opacity='1';
        oImg.style.filter='alpha(opacity=100)';
        set();
    }
    //设置清除定时器
    function clear(){
        clearInterval(timer);
        clearInterval(oImg.timeOpacity);
        timer=null;
        oImg.timeOpacity=null;
    }
    function set(){
        timer = setInterval(function () {
            num++;
            if (num == arrImg.length) {
                num = 0;
            }
            listPlay(num);
        }, 5000);
    }
})();
/*
* 专辑点击滚动
* */
(function(){
    var oRoll=document.getElementById('m-roll');
    var aUl=oRoll.getElementsByTagName('ul');
    var oLf=document.getElementById('lf');
    var oRt=document.getElementById('rt');
    var len=aUl.length;
    var on=1;
    var num2=0;
    addEvent(oLf,'click',function(){
        roll(num2,1);
    });
    addEvent(oRt,'click',function(){

        roll(num2,-1);
    });
    function roll(index,dir){
        //for(var i=0;i<aUl.length;i++){
        //    if(aUl[i].timeMove){
        //        return false;
        //    }
        //}
        if(on){
            on=0;
            if(dir==-1){
                doMove(aUl[index],'left',10,-645,door);
                if(index!=len-1){
                    aUl[index+1].style.left='645px';
                    doMove(aUl[index+1],'left',10,0,door);
                }else if(index==len-1){
                    aUl[0].style.left='645px';
                    doMove(aUl[0],'left',10,0,door);
                }
                num2++;
                if(num2==aUl.length){
                    num2=0;
                }
            }else{
                doMove(aUl[index],'left',10,645,door);
                if(index!=0){
                    aUl[index-1].style.left='-645px';
                    doMove(aUl[index-1],'left',10,0,door);
                }else if(index==0){
                    aUl[len-1].style.left='-645px';
                    doMove(aUl[len-1],'left',10,0,door);
                }
                num2--;
                if(num2==-1){
                    num2=len-1;
                }
            }
        }
    }
    function door(){
        on=1;
    }
})();
/*
 * 获取日期
 * */
(function(){
    var oDate=document.getElementById('date');
    var oWeek=document.getElementById('week');
    var dayNames =["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
    var date=new Date();
    var da=date.getDate();
    var we=date.getDay();
    oDate.innerHTML=da;
    oWeek.innerHTML=dayNames[we];
})();

/*
 * 返回顶部按钮和调整窗口函数
 * */
(function(){
    var oParent=document.getElementById('parent');
    var oScroll=document.getElementById('g-scroll');
    var width=window.screen.availWidth;
    addEvent(oParent,'scroll',reh);
    addEvent(oScroll,'click',function(){
        oParent.scrollTop=0;
    });
    addEvent(window,'resize',reh);
    //addEvent(window,'resize',rew);
    function reh(){
        var height=(document.documentElement.clientHeight || document.body.clientHeight)-210;
        var top=oParent.scrollTop;
        var target=height+top;
        if(top>0){
            oScroll.style.display='block';
        }else{
            oScroll.style.display='none';
        }
        oScroll.style.top=target+'px';
    }
    //更改页面内容宽度使两面剩余对称
    // function rew(){
    //     var nowWidth=document.documentElement.clientWidth || document.body.clientWidth;
    //     if(nowWidth>982){
    //         oParent.style.width=nowWidth+'px';
    //     }
    // }
})();
/*
* 播放器面板锁
* */
(function(){
    var oParent=document.getElementById('parent');
    var oPlayer=document.getElementById('g-player');
    var oLock=document.getElementById('lock');
    var lockNum=0;

    addEvent(oLock,'click',function(){
        if(lockNum==0){
            oLock.className='ul';
            oParent.onmousemove=function(){
                hide();
            };
            lockNum=1;
        }else{
            oLock.className='lk';
            oParent.onmousemove=oPlayer.onmousemove=null;
            lockNum=0;
        }
    });
    //隐藏面板
    function hide(){
        oParent.onmousemove=null;
        doMove(oPlayer,'bottom',10,-45);
        oPlayer.onmousemove=show;
    }
    //显示面板
    function show(){
        oPlayer.onmousemove=null;
        doMove(oPlayer,'bottom',10,0);
        oParent.onmousemove=hide;
    }
})();
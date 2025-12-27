var BJ_REPORT=function(e){
function n(){
if(t.id!=v.IDS.DEFAULT||t.key!=v.KEY)return{
id:t.id,
key:t.key
};
var e={
_href:location.href,
href:location.href.replace(/https?:\/\/mp\.weixin\.qq\.com\//,"")
};
e.cgi=e.href.indexOf("?")>-1?e.href.match(/.*?\?/g)[0].slice(0,-1):e.href;
var n=(e.href+"&").match(/action\=(.*?)&/);
n&&n[1]&&(e.action=n[1]);
var r=v.IDS.DEFAULT,o=v.KEY;
return o="wxopen/initprofile"==e.cgi?4:"wxopen/wacodepage"==e.cgi?5:"wxopen/wadevelopcode"==e.cgi?6:"wxopen/authprofile"==e.cgi?7:"wxopen/appdatacount"==e.cgi?8:"wxopen/visitanalysis"==e.cgi?9:"wxopen/apprealtimecount"==e.cgi?10:"wxopen/tmplmsg"==e.cgi?11:"wxopen/frame"==e.cgi?12:"wxopen/basicprofile"==e.cgi?13:"wxopen/devprofile"==e.cgi?14:"wxopen/wakf"==e.cgi?15:"wxopen/home"==e.cgi?16:"wxopen/wxverify"==e.cgi?17:3,
t.id=r,t.key=o,{
id:r,
key:o
};
}
function r(e,n){
return/Mozilla\/5.0.*ipad.*BaiduHD/i.test(n)&&e.indexOf("ReferenceError: Can't find variable: bds")>-1?!1:/Linux; U; Android.*letv/i.test(n)&&e.indexOf("ReferenceError: diableNightMode is not defined")>-1?!1:!0;
}
if(e.BJ_REPORT)return e.BJ_REPORT;
var o=[],t={
uin:0,
url:"https://badjs.weixinbridge.com/badjs",
combo:5,
level:4,
ignore:[],
random:1,
delay:3e3,
submit:null
},i=function(e,n){
return Object.prototype.toString.call(e)==="[object "+(n||"Object")+"]";
},a=function(e){
var n=typeof e;
return"object"===n&&!!e;
},c=function(e){
return null===e?!0:i(e,"Number")?!1:!e;
},u=e.onerror;
e.onerror=function(n,o,t,a,c){
var p=n;
c&&c.stack&&(p=s(c)),i(p,"Event")&&(p+=p.type?"--"+p.type+"--"+(p.target?p.target.tagName+"::"+p.target.src:""):""),
o&&o.length>0&&0==/^https\:\/\/(mp\.weixin\.qq\.com|res\.wx\.qq\.com)/.test(o),0!=r(p,window.navigator.userAgent)&&(v.push({
msg:"[onerror]"+p,
target:o,
rowNum:t,
colNum:a
}),w(),u&&u.apply(e,arguments));
};
var p=function(e){
try{
if(e.stack){
var n=e.stack.match("https?://[^\n]+");
n=n?n[0]:"";
var o=n.match(":(\\d+):(\\d+)");
if(n&&n.lenth>0&&0==/^https?\:\/\/(mp\.weixin\.qq\.com|res\.wx\.qq\.com)/.test(n))return null;
o||(o=[0,0,0]);
var t=s(e).replace(/https?\:\/\/.*?\.js\:/g,"");
return 0==r(t,window.navigator.userAgent)?null:{
msg:t,
rowNum:o[1],
colNum:o[2],
target:n.replace(o[0],"")
};
}
return e;
}catch(i){
return e;
}
},s=function(e){
var n=e.stack.replace(/\n/gi,"").split(/\bat\b/).slice(0,5).join("@").replace(/\?[^:]+/gi,""),r=e.toString();
return n.indexOf(r)<0&&(n=r+"@"+n),n;
},l=function(e,n){
var r=[],o=[],i=[];
if(a(e)){
e.level=e.level||t.level;
for(var u in e){
var p=e[u];
if(!c(p)){
if(a(p))try{
p=JSON.stringify(p);
}catch(s){
p="[BJ_REPORT detect value stringify error] "+s.toString();
}
i.push(u+":"+p),r.push(u+"="+encodeURIComponent(p)),o.push(u+"["+n+"]="+encodeURIComponent(p));
}
}
}
return[o.join("&"),i.join(","),r.join("&")];
},m=[],f=[],d=function(e){
var n=e.replace(/\&_t=\d*/,"");
for(var r in f)if(f[r]==n)return;
if(f.push(n),t.submit)t.submit(e);else{
var o=new Image;
m.push(o),o.src=e;
}
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=65723_0_1&r="+Math.random(),
t.key&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=65723_"+t.key+"_1&r="+Math.random());
},g=[],h=0,w=function(e){
if(t.report){
for(;o.length;){
var n=!1,r=o.shift(),a=l(r,g.length);
if(i(t.ignore,"Array"))for(var c=0,u=t.ignore.length;u>c;c++){
var p=t.ignore[c];
if(i(p,"RegExp")&&p.test(a[1])||i(p,"Function")&&p(r,a[1])){
n=!0;
break;
}
}
n||(t.combo?g.push(a[0]):d(t.report+a[2]+"&_t="+ +new Date),t.onReport&&t.onReport(t.id,r));
}
var s=g.length;
if(s){
var m=function(){
clearTimeout(h),d(t.report+g.join("&")+"&count="+s+"&_t="+ +new Date),h=0,g=[];
var e=new Image;
e.src="https://mp.weixin.qq.com/mp/jsmonitor?id_key=65723_20_"+s+"&t="+Math.random();
};
e?m():h||(h=setTimeout(m,t.delay));
}
}
},v={
KEY:3,
IDS:{
DEFAULT:"62",
LOADERROR:"61"
},
destory:function(){
w=function(){};
},
push:function(e){
if(Math.random()>=t.random)return v;
var n;
return a(e)?(n=p(e),n&&o.push(n)):o.push({
msg:e
}),w(),v;
},
report:function(e){
return e&&v.push(e),w(!0),v;
},
info:function(e){
return e?(a(e)?e.level=2:e={
msg:e,
level:2
},v.push(e),v):v;
},
debug:function(e){
return e?(a(e)?e.level=1:e={
msg:e,
level:1
},v.push(e),v):v;
},
init:function(e){
for(var n in e)t[n]=e[n];
var r=parseInt(t.id,10),n=parseInt(t.key,10);
return r&&(t.report=t.url+"?id="+r+"&uin="+(wx&&wx.uin)+"&from="+encodeURIComponent(location.href)+"&"),
v;
},
monitor:function(e,n,r){
if(e){
n="monitor",r=r||t.id;
var o=new Image;
o.src=t.url+"?id="+r+"&key="+e+"&msg="+encodeURIComponent(n)+"&uin="+(wx&&wx.uin)+"&from="+encodeURIComponent(location.href)+"&level=4";
}
},
getConfig:function(){
return t;
},
__onerror__:e.onerror
};
return"undefined"!=typeof console&&console.error&&setTimeout(function(){
var e=((location.hash||"").match(/([#&])BJ_ERROR=([^&$]+)/)||[])[2];
e&&console.error("BJ_ERROR",decodeURIComponent(e).replace(/(:\d+:\d+)\s*/g,"$1\n"));
},0),t.id=v.IDS.DEFAULT,t.key=v.KEY,n(),v.init(),v;
}(window);
window.wx_loaderror=function(e){
var n=new Image,r=1;
if(e&&e.tagName&&"script"==e.tagName.toLowerCase()){
var r=2;
BJ_REPORT.destory();
}
n.src="https://badjs.weixinbridge.com/badjs?id="+BJ_REPORT.IDS.LOADERROR+"&uin="+(wx&&wx.uin)+"&msg="+encodeURIComponent("link_error:"+(e&&(e.href||e.src)))+"|link&from="+encodeURIComponent(location.href)+"&level=4&_t="+ +new Date,
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=65723_"+r+"_1&r="+Math.random();
};
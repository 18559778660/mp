!function(e){
if(e.BJ_REPORT){
var t,n=function(t,n){
t&&t.stack&&(t.stack="[tryCatch]["+n+"]"+t.stack),e.BJ_REPORT.report(t);
},o=e.BJ_REPORT.tryJs=function(e){
return e&&(n=e),o;
},r=function(e,t){
var n;
for(n in t)e[n]=t[n];
},i=function(e){
return"function"==typeof e;
},s=function(o,r,i){
return function(){
try{
return o.apply(this,r||arguments);
}catch(s){
if(n(s,i||""),s.stack&&console&&console.error&&console.error("[BJ-REPORT]",s.stack),
!t){
var a=e.onerror;
e.onerror=function(){},t=setTimeout(function(){
e.onerror=a,t=null;
},50);
}
throw s;
}
};
},a=function(e){
return function(){
for(var t,n=[],o=0,r=arguments.length;r>o;o++)t=arguments[o],i(t)&&(t=s(t,null,"catArgs")),
n.push(t);
return e.apply(this,n);
};
},u=function(e){
return function(t,n){
if("string"==typeof t)try{
t=new Function(t);
}catch(o){
throw o;
}
var r=[].slice.call(arguments,2);
return t=s(t,r.length&&r,"timeout"),e(t,n);
};
},c=function(e,t){
return function(){
for(var n,o,r=[],a=0,u=arguments.length;u>a;a++)n=arguments[a],i(n)&&(o=s(n,null,"argsTry"))&&(n.tryWrap=o)&&(n=o),
r.push(n);
return e.apply(t||this,r);
};
},l=function(e){
var t,n;
for(t in e)n=e[t],i(n)&&(e[t]=s(n,null,"objTry"));
return e;
};
o.spyJquery=function(){
var t=e.$;
if(!t||!t.event)return o;
var n=t.event.add,r=t.ajax,s=t.event.remove;
if(n&&(t.event.add=c(n),t.event.remove=function(){
for(var e,t=[],n=0,o=arguments.length;o>n;n++)e=arguments[n],i(e)&&(e=e.tryWrap),
t.push(e);
return s.apply(this,t);
}),r&&(t.ajax=function(e,n){
return n||(n=e,e=void 0),l(n),e?r.call(t,e,n):r.call(t,n);
}),$.zepto){
var a=t.fn.on,u=t.fn.off;
t.fn.on=c(a),t.fn.off=function(){
for(var e,t=[],n=0,o=arguments.length;o>n;n++)e=arguments[n],i(e)&&(e=e.tryWrap),
t.push(e);
return u.apply(this,t);
};
}
return o;
},o.spyModules=function(){
var t=e.require,n=e.define;
return n&&n.amd&&t&&(e.require=a(t),r(e.require,t),e.define=a(n),r(e.define,n)),
e.seajs&&n&&(e.define=function(){
for(var e,t=[],o=0,r=arguments.length;r>o;o++)e=arguments[o],i(e)&&(e=s(e,null,"defineTry"),
e.toString=function(e){
return function(){
return e.toString();
};
}(arguments[o])),t.push(e);
return n.apply(this,t);
},e.seajs.use=a(e.seajs.use),r(e.define,n)),o;
},o.spySystem=function(){
return e.setTimeout=u(e.setTimeout),e.setInterval=u(e.setInterval),o;
},o.spyCustom=function(e){
return i(e)?s(e):l(e);
},o.spyAll=function(){
return o.spyJquery().spyModules().spySystem(),o;
},o.spyAll();
}
}(window),function(e){
return/msie 6/i.test(navigator.userAgent)?void(window.location="/cgi-bin/readtemplate?t=err/noie6_tmpl"):(window.console||(window.console={
log:function(){},
error:function(){},
info:function(){}
}),e.wx=e.wx||{},wx.T=function(e,t){
return template.compile(e)(t);
},wx.url=function(e){
if(e.startsWith("javasript:"))return e;
var t=wx.data.param;
return-1!=e.indexOf("?")?e+t:e+"?1=1"+t;
},wx.getUrl=function(e){
var t=(window.location+"&").match(new RegExp("(?:\\?|\\&)"+e+"=(.*?)\\&"));
return t&&t[1]?String(t[1]).html(!0):void 0;
},$.fn.setClass=function(e){
this.attr("class",e);
},$("img").error(function(){
BJ_REPORT&&BJ_REPORT.monitor(1,"img_err");
}),wx.jslog=function(e,t,n){
n=n||3;
var o=new Image,r=[];
t&&jQuery.each(["message","stack","lineNumber"],function(e,n){
r.push(n+":"+(t[n]||""));
}),r.push("level:2"),o.src="https://badjs.weixinbridge.com/badjs?id=61&uin="+wx.data.uin+"&msg="+encodeURIComponent(r.join(";").replace(/\s/g," "))+"&from="+encodeURIComponent(location.href)+"&_t="+ +new Date,
console&&console.error&&t&&console.error(t);
},setTimeout(function(){},5e3),wx.resPath="mp.weixin.qq.com"==location.hostname?"https://res.wx.qq.com":"",
jQuery(function(){
var e=['<div class="scale_tips" id="zoom_tips" style="display:none;">','<div class="scale_tips_inner">','<i class="icon_scale_tips"></i>','<p class="scale_tips_content"><span id="zoom_msg"></span><a href="javascript:;" id="zoom_prompt">不再提示</a></p>',"</div>","</div>"].join("\n");
jQuery("body").append(e);
var t='<object type="application/x-shockwave-flash" data="{swfpath}" width="10" height="10" id="{id}">{param}</object>',n={
swfpath:wx.path.zoom,
id:"ZoomFlash",
param:""
},o={
movie:n.swfpath,
allowscriptaccess:"always",
wmode:"transparent",
scale:"noScale"
};
jQuery.each(o,function(e,t){
n.param+='<param name="'+e+'" value="'+t+'">';
}),$('<div style="position: absolute; right: 0px; bottom: 0px; visibility: visible;"></div>').html(t.format(n)).appendTo("body"),
seajs.use("biz_web/lib/store.js",function(e){
jQuery(window).on("load resize",function(){
if(!e.get("__zoom_tips__")){
var t=document.getElementById("ZoomFlash").height,n=t,o=1;
try{
n=document.getElementById("ZoomFlash").getFlashStageRect().height,o=~window.navigator.userAgent.toLowerCase().indexOf("msie")&&screen.deviceXDPI&&screen.logicalXDPI?screen.deviceXDPI/screen.logicalXDPI:n/t,
.9>o?(jQuery("#zoom_msg").text("您的浏览器目前处于缩小状态，会导致公众平台网页显示不正常，您可以键盘按“ctrl+数字0”组合键恢复初始状态。"),
jQuery("#zoom_tips").show(),jQuery("body").addClass("scaled")):o>1.1?(jQuery("#zoom_msg").text("您的浏览器目前处于放大状态，会导致公众平台网页显示不正常，您可以键盘按“ctrl+数字0”组合键恢复初始状态。"),
jQuery("#zoom_tips").show(),jQuery("body").addClass("scaled")):(jQuery("#zoom_tips").hide(),
jQuery("body").removeClass("scaled"));
}catch(r){}
}
});
}),jQuery(window).on("keyup",function(e){
e.ctrlKey&&(96==e.keyCode||48==e.keyCode)&&(jQuery("#zoom_tips").hide(),jQuery("body").removeClass("scaled"));
}),jQuery("#zoom_prompt").on("click",function(){
seajs.use("biz_web/lib/store.js",function(e){
e.set("__zoom_tips__",!0);
}),jQuery("#zoom_tips").hide(),jQuery("body").removeClass("scaled");
}),location.href.indexOf("devtools=1")>-1||seajs.use("common/wx/noticeBox.js",function(e){
var t=$(".js_head_box .js_account_notice_box");
if(t.hide(),$(".js_head_box .js_notice_box_switch").click(function(){
return $(this).find(".js_has_unread_notice").length&&e?t.show():location.href=wx.url("/wxopen/wasysnotify?action=list"),
!1;
}),e){
var n;
!function(){
var o=function(e,t){
for(var n=e;n&&n!=document.body;){
if(n==t)return!0;
n=n.parentNode;
}
return!1;
};
n=e({
container:t
}),$(document).on("click",function(e){
return e.target&&"A"==e.target.tagName?void 0:o(e.target,t.get(0))?!1:void t.hide();
}),location.href.indexOf("/wxopen/home")>=0&&t.show();
}();
}
});
}),function(){
try{
var e=jQuery(window).height();
750>e&&jQuery(document.body).addClass("screen_small");
}catch(t){}
}(),void(wx.getSeq=function(){
return(new Date).getTime();
}));
}(window);;$.fn.disable=function(t){
t=t||"btn_disabled";
var s=this.hasClass("btn_input")?this.find("button"):this;
return s.attr("disabled","disabled"),this.parent().hasClass("btn_input")?this.parent().addClass(t):this.addClass(t),
this;
},$.fn.enable=function(t){
t=t||"btn_disabled";
var s=this.hasClass("btn_input")?this.find("button"):this;
return s.attr("disabled",!1),this.parent().hasClass("btn_input")?this.parent().removeClass(t):this.removeClass(t),
this;
},function(){
var t=function(t,s){
if(t=t||"btn_loading",!s||$.support.leadingWhitespace){
var i=this.hasClass("btn_input")?this.find("button"):this;
i.prepend("<i></i>");
}
return this.disable(t),this;
},s=function(t,s){
if(t=t||"btn_loading",!s||$.support.leadingWhitespace){
var i=this.hasClass("btn_input")?this.find("button"):this;
i.find("i:first-child").remove();
}
return this.enable(t),this;
};
$.fn.btn=function(i,n,a){
return i?s.call(this,n,a):t.call(this,n,a);
};
}();;$.fn.extend({
serializeObject:function(){
var e=this.serializeArray(),n={};
return $(e).each(function(e,i){
n[i.name]=i.value;
}),n;
}
}),define("common/jquery.plugin/serializeObject.js",[],function(){});;!function(){
function t(t,n){
for(var r in n)t[r]=n[r];
return t;
}
function n(n,r){
if(r===!0){
var e;
if(Object.isArray(n)){
e=[];
for(var i in n)n.hasOwnProperty(i)&&e.push(Object.isObject(n[i])?Object.clone(n[i],!0):n[i]);
}else{
e={};
for(var i in n)n.hasOwnProperty(i)&&(e[i]=Object.isObject(n[i])?Object.clone(n[i],!0):n[i]);
}
return e;
}
return t({},n);
}
function r(t){
return!(!this||1!=t.nodeType);
}
function e(t){
return Object.prototype.toString.call(t)===m;
}
function i(t){
return Object.prototype.toString.call(t)===b;
}
function o(t){
return Object.prototype.toString.call(t)===h;
}
function c(t){
return Object.prototype.toString.call(t)===g;
}
function u(t){
return Object.prototype.toString.call(t)===l;
}
function a(t){
return Object.prototype.toString.call(t)===y;
}
function s(t){
return"undefined"==typeof t;
}
function p(t,n){
var r=[];
for(var e in t)t.hasOwnProperty(e)&&r.push(n===!0?[encodeURIComponent(e),"=",encodeURIComponent(t[e]),"&"].join(""):[e,"=",t[e],"&"].join(""));
return r.join("").slice(0,-1);
}
function f(t,n){
if("undefined"!=typeof n)for(var r in t)if(t.hasOwnProperty(r)&&n(t[r],r)===!1)break;
}
var h="[object Function]",l="[object Number]",g="[object String]",b="[object Array]",m="[object Object]",y="[object Date]";
t(Object,{
extend:t,
clone:n,
isObject:e,
isElement:r,
isArray:i,
isFunction:o,
isString:c,
isNumber:u,
isDate:a,
isUndefined:s,
param:p,
each:f
});
}(),Object.extend(String.prototype,function(){
function t(t){
return this.replace(/\{(\w+)\}/g,function(n,r){
return void 0!==t[r]?t[r]:n;
});
}
function n(){
return this.replace(/[^\x00-\xff]/g,"**").length;
}
function r(t,n){
return t=t||30,n=Object.isUndefined(n)?"...":n,this.length>t?this.slice(0,t-n.length)+n:String(this);
}
function e(t){
return t===!0?this.replace(/^\s+/,""):t===!1?this.replace(/\s+$/,""):this.replace(/^\s+/,"").replace(/\s+$/,"");
}
function i(t){
var n=["&","&amp;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;"];
t===!1&&n.reverse();
for(var r=0,e=this;r<n.length;r+=2)e=e.replace(new RegExp(n[r],"g"),n[1+r]);
return e;
}
function o(t){
return this.indexOf(t)>-1;
}
function c(t){
return 0===this.lastIndexOf(t,0);
}
function u(t){
var n=this.length-t.length;
return n>=0&&this.indexOf(t,n)===n;
}
function a(){
return""==this;
}
function s(){
return this.replace(/<\/?[^>]*\/?>/g,"");
}
function p(){
return/^\s*$/.test(this);
}
function f(){
var t,n,r,e=this,i=arguments.length;
if(1>i)return s;
for(t=0;i>t;)e=e.replace(/%s/,"{#"+t++ +"#}");
for(e.replace("%s",""),t=0;void 0!==(n=arguments[t]);)r=new RegExp("{#"+t+"#}","g"),
e=e.replace(r,n),t++;
return e;
}
function h(){
for(var t,n=this,r=0,e=0;t=n.charAt(r++);)e+=t.charCodeAt().toString(16).length/2;
return e;
}
function l(t,n){
if("function"==typeof this.split){
var r=this.split(n||"&"),e={};
return r.each(function(n){
arr=n.split("="),2==arr.length&&arr[0]&&arr[1]&&(t===!0?e[decodeURIComponent(arr[0])]=decodeURIComponent(arr[1]):e[arr[0]]=arr[1]);
}),e;
}
}
document.createElement("div");
return{
format:t,
sprintf:f,
text:s,
len:n,
truncate:r,
trim:String.prototype.trim||e,
https2http:function(){
return this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
},
http2https:function(){
return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/");
},
html:i,
has:o,
startsWith:c,
endsWith:u,
param:l,
empty:a,
blank:p,
bytes:h
};
}()),Object.extend(Function.prototype,function(){
function t(t,n){
for(var r=t.length,e=n.length;e--;)t[r+e]=n[e];
return t;
}
function n(n,r){
return n=a.call(n,0),t(n,r);
}
function r(t){
if(arguments.length<2&&Object.isUndefined(arguments[0]))return this;
var r=this,e=a.call(arguments,1);
return function(){
var i=n(e,arguments);
return r.apply(t,i);
};
}
function e(t,n){
var r=this;
return args=a.call(arguments,2),t=1e3*t,window.setTimeout(function(){
return r.apply(n||r,args);
},t);
}
function i(){
var n=t([.01,null],arguments);
return this.delay.apply(this,n);
}
function o(t){
var n=this;
return function(){
return t.apply(this,arguments)===!1?!1:n.apply(this,arguments);
};
}
function c(n){
var r=this;
return function(){
var e=r.apply(this,arguments),i=t([e],arguments);
return n.apply(this,i),e;
};
}
function u(n){
var r=this;
return function(){
var e=t([r.bind(this)],arguments);
return n.apply(this,e);
};
}
var a=Array.prototype.slice;
return{
bind:r,
delay:e,
defer:i,
before:o,
after:c,
wrap:u
};
}()),function(){
function t(t,n){
for(var r=0,e=this.length>>>0;e>r;r++)r in this&&t.call(n,this[r],r,this);
}
function n(){
return this[this.length-1];
}
function r(t){
return t===!0?Object.clone.apply(this,arguments):c.call(this,0);
}
function e(t){
var n=[];
return this.each(function(r,e){
n.push(t(r,e));
}),n;
}
function i(t){
var n=-1;
return this.each(function(r,e){
return t==r?(n=e,!1):void 0;
}),n;
}
var o=Array.prototype,c=o.slice;
Object.extend(o,{
each:Array.prototype.forEach||t,
indexOf:Array.prototype.indexOf||i,
last:n,
clone:r,
map:e
});
}();;define("common/utils/Class.js",[],function(t,n){
"use strict";
n.create=function(t){
var n=function(){
this.construct&&this.construct.apply(this,arguments);
};
return t.apply(n.prototype,arguments),n;
},function(){
function t(t){
for(var n=1,r=arguments.length;r>n;n++)for(var e in arguments[n])Object.prototype.hasOwnProperty.call(arguments[n],e)&&(t[e]=arguments[n][e]);
return t;
}
function r(){
return this.__instance__||(this.__instance__=new this(arguments[0],arguments[1],arguments[2]));
}
function e(t){
var n=i.call(this,t);
return n.prototype.parent=this,n;
}
function i(n){
var i="function"==typeof this?this:function(){},o=function(){
function t(n,e){
n.Super&&t(n.Super,e),n.init&&n.init.apply(e,r);
}
var n=this,r=arguments;
n.Root=i.__base__,n.Super=i.prototype,t(n,n);
};
return t(o.prototype,i.prototype||{},n),o.__base__=i.__base__||o.prototype,o.GetStaticInstance=r,
o.Inherit=o.inherit=e,o;
}
n.declare=i;
}();
});;!function(e){
function t(e){
return e>=49&&90>=e;
}
function n(e){
return(e||"").toLowerCase().split("+").sort().join("").replace(/\s/gi,"");
}
function o(e){
var t=e.type;
return"mousewheel"==t||"DOMMouseScroll"==t;
}
function r(e){
return e.wheelDelta>0||e.detail<0?"mousewheelup":"mousewheeldown";
}
function u(e){
var n=e.keyCode,u=f[n],s=!u&&t(n)&&String.fromCharCode(n).toLowerCase()||o(e)&&r(e),a=e.ctrlKey,c=e.shiftKey,i=e.altKey,p=c&&(l[s]||l[u]),h=[];
return a||i||!p||(u=p,c=s=null),a&&h.push("ctrl"),c&&h.push("shift"),i&&h.push("alt"),
u&&h.push(u),s&&h.push(s),h.join("+");
}
function s(e,t){
return n(u(e))==n(t);
}
var f={
27:"esc",
9:"tab",
32:"space",
13:"enter",
8:"backspace",
145:"scroll",
20:"capslock",
144:"numlock",
19:"pause",
45:"insert",
36:"home",
46:"del",
35:"end",
33:"pageup",
34:"pagedown",
37:"left",
38:"up",
39:"right",
40:"down",
107:"=",
109:"-",
112:"f1",
113:"f2",
114:"f3",
115:"f4",
116:"f5",
117:"f6",
118:"f7",
119:"f8",
120:"f9",
121:"f10",
122:"f11",
123:"f12",
188:"<",
190:">",
191:"/",
192:"`",
219:"[",
220:"\\",
221:"]",
222:"'"
},l={
"`":"~",
1:"!",
2:"@",
3:"#",
4:"$",
5:"%",
6:"^",
7:"&",
8:"*",
9:"(",
0:")",
"-":"_",
"=":"+",
";":":",
"'":'"',
",":"<",
".":">",
"/":"?",
"\\":"|"
};
e.wx=e.wx||{},e.wx.hotkeyStr=u,e.wx.isHotkey=s;
}(window);;define("common/wx/Tips.js",[],function(e,r){
"use strict";
function n(e,r,n){
$(".JS_TIPS").remove(),s=$(template.compile('<div class="JS_TIPS page_tips {type}" id="wxTips_'+(new Date).getTime()+'"><div class="inner">{=msg}</div></div>')({
type:e||"error",
msg:r
})).appendTo("body").fadeIn(),t.delay(n||l.delay,null,s);
}
function t(e){
e&&e.length>0&&e.fadeOut({
complete:function(){
e.remove();
}
});
}
function c(e){
if("string"!=typeof e)return e;
var r="";
return 0==e.length?"":(r=e.replace(/&/g,"&gt;"),r=r.replace(/</g,"&lt;"),r=r.replace(/>/g,"&gt;"),
r=r.replace(/ /g,"&nbsp;"),r=r.replace(/\'/g,"&#39;"),r=r.replace(/\"/g,"&quot;"),
r=r.replace(/\n/g,"<br>"));
}
var s,i=r,l={
errMsg:"系统发生错误，请稍后重试",
sucMsg:"操作成功",
delay:2
};
i.err=function(e,r){
n("error",c(e)||l.errMsg,r);
},i.suc=function(e,r){
n("success",c(e)||l.sucMsg,r);
},i.remove=function(){
s&&(s.remove(),s=null);
};
});;function _typeof(o){
return o&&"undefined"!=typeof Symbol&&o.constructor===Symbol?"symbol":typeof o;
}
define("common/wx/Cgi.js",["common/qq/mask.js","common/wx/dialog.js","common/wx/Tips.js","common/wx/cgiReport.js","common/lib/MockJax.js","common/qq/events.js"],function(o,e){
"use strict";
function n(o,e,n){
var r,a;
n&&"object"==("undefined"==typeof n?"undefined":_typeof(n))?(r=n.done,a=n.fail):r=n,
"string"==typeof e&&e.length>0&&(e={
url:e
}),e=$.extend(!0,{},c,{
type:o,
data:{
random:Math.random().toString()
}
},e),e.mock&&(e.mock===!0?e.mock={
responseText:{
ret:0,
data:{},
url:e.url,
param:e.data
}
}:!e.mock||e.mock.responseText||e.mock.response||(e.mock={
responseText:e.mock
}),e.mock.url=e.mock.url||e.url,$.mockjax(e.mock)),e.mask&&($.isPlainObject(e.mask)?t.show(e.mask):t.show());
var i=$.ajax(e);
return i.callback=i.done,i.done(function(o){
window.__moonsafe_must_transform_var&&window.wx&&wx.moonsafe_report_var&&"object"===("undefined"==typeof o?"undefined":_typeof(o))&&"json"==e.dataType&&(o.__url__=e.url.indexOf("action=")<0&&e.data&&e.data.action?e.url+(e.url.indexOf("?")>=0?"&":"?")+"action="+e.data.action:e.url,
wx.moonsafe_report_var(o)),r&&r(o);
}).fail(function(o,n,t){
a&&a(n),s.error(n,e),m.trigger("xhrError",o,n,t,e);
}).always(function(){
e.mask&&t.hide();
}),i;
}
var t=o("common/qq/mask.js"),r=o("common/wx/dialog.js"),a=o("common/wx/Tips.js"),s=o("common/wx/cgiReport.js");
o("common/lib/MockJax.js");
var m=o("common/qq/events.js")(!0),c={
dataType:"json",
mask:!1,
timeout:45e3,
error:$.noop,
mock:!1,
data:{
token:wx.data.t,
lang:wx.data.lang,
f:"json",
ajax:"1"
}
};
e.get=function(o,e){
return n("get",o,e);
},e.post=function(o,e){
return n("post",o,e);
};
var i={
0:"恭喜你，操作成功！",
"-1":"系统错误，请稍后尝试。",
200002:"参数错误，请核对参数后重试。",
200003:"登录超时，请重新登录。",
200004:"请求页面的域名没有授权。",
200005:"请求方式错误，请确认请求方式后重试。",
200006:"表单名称验证出错，请核对表单名称后重试。",
200007:"对不起，你没有权限访问目标请求。",
200035:"扫码已过期，请重新扫码"
};
e.show=function(o,e){
var n=i[o.base_resp.ret]||"系统繁忙，请稍后尝试！";
return 0==o.base_resp.ret?void(e?r.show({
type:"succ",
msg:"系统提示|"+n
}):a.suc(n)):void(e?r.show("系统错误|"+n):a.err(n));
},e.handleRet=function(o,e){
o=o||{},e=$.extend(!0,{},{
id:"64430",
key:"30",
showMsg:!0,
msg:"系统繁忙，请稍后尝试"
},e);
var n=o.base_resp?o.base_resp.ret:"undefined",t=i[n];
if(t)e.showMsg&&a.err(t);else{
var r=new Image;
r.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+e.id+"_"+e.key+"&lc=1&log0=handleRet_"+n,
e.showMsg&&a.err(e.msg);
}
};
});;
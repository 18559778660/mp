!function(n){
var r=window.WX_BJ_REPORT||{};
!function(n){
function r(n){
return"function"==typeof n;
}
function e(n){
return function(){
for(var e,t=[],i=0,o=arguments.length;o>i;i++)e=arguments[i],r(e)&&(e=d(e)),t.push(e);
return n.apply(this,t);
};
}
function t(n,e){
return function(){
for(var t,i,o=[],a=0,s=arguments.length;s>a;a++)t=arguments[a],r(t)&&(i=d(t))&&(t.tryWrap=i)&&(t=i),
o.push(t);
return n.apply(e||this,o);
};
}
function i(n){
var e,t;
for(e in n)t=n[e],r(t)&&(n[e]=d(t));
return n;
}
function o(){
if(n.TryJs.isCatchJquery)return n.TryJs;
var e=l.jQuery;
if(e&&e.event){
var o=e.event.add,a=e.ajax,s=e.event.remove;
if(o&&(e.event.add=t(o),e.event.remove=function(){
for(var n,e=[],t=0,i=arguments.length;i>t;t++)n=arguments[t],r(n)&&(n=n.tryWrap),
e.push(n);
return s.apply(this,e);
}),a&&(e.ajax=function(n,r){
return r||(r=n,n=void 0),i(r),n?a.call(e,n,r):a.call(e,r);
}),jQuery.zepto){
var c=e.fn.on,f=e.fn.off;
e.fn.on=t(c),e.fn.off=function(){
for(var n,e=[],t=0,i=arguments.length;i>t;t++)n=arguments[t],r(n)&&(n=n.tryWrap),
e.push(n);
return f.apply(this,e);
};
}
return n.TryJs.isCatchJquery=!0,n.TryJs;
}
}
function a(){
if(n.TryJs.isCatchTimeout)return n.TryJs;
var r=function(n){
return function(r,e){
if("string"==typeof r)try{
r=new Function(r);
}catch(t){
throw t;
}
var i=[].slice.call(arguments,2);
return r=d(r,i.length&&i),n(r,e);
};
};
return l.setTimeout=r(l.setTimeout),l.setInterval=r(l.setInterval),n.TryJs.isCatchTimeout=!0,
n.TryJs;
}
function s(n,r){
var e;
for(e in r)n[e]=r[e];
return n;
}
function c(){
if(n.TryJs.isCatchCmd)return n.TryJs;
var t=(l.require,l.define);
return l.seajs&&t&&(l.define=function(){
for(var n,e=[],i=0,o=arguments.length;o>i;i++)n=arguments[i],r(n)&&(n=h(n,arguments[0]),
n.toString=function(n){
return function(){
return n.toString();
};
}(arguments[i])),e.push(n);
return t.apply(this,e);
},l.seajs.use=e(l.seajs.use),s(l.define,t),n.TryJs.isCatchCmd=!0),n.TryJs;
}
function f(){
o(),c(),a();
}
function u(r){
r&&(n.TryJs._onThrow=r),f();
}
if(!n.TryJs){
var l=window;
n.TryJs={
isCatchTimeout:!1,
isCatchJquery:!1,
isCatchCmd:!1,
isTryed:!1,
_onThrow:function(n){
n.stack&&console&&console.error&&console.error(n.stack);
}
};
var d=function(r,e){
return function(){
try{
return r.apply(this,e||arguments);
}catch(t){
n.TryJs._onThrow(t);
}
};
},h=function(r,e){
return function(){
try{
return r.apply(this,arguments);
}catch(t){
n.TryJs._onThrow(t,{
cid:e
});
}
};
};
return n.TryJs=s(n.TryJs,{
init:u,
catchJquery:o,
catchCmd:c,
run:f
});
}
}(r),function(n){
function r(n,r,e,t,i,o){
return{
name:n||"",
message:r||"",
file:e||"",
line:t||"",
col:i||"",
stack:o&&o.stack||""
};
}
function e(n){
n._info=n.info||{};
var r=t(n);
return{
name:n.name,
key:n.message,
msg:n.message,
_info:n._info,
stack:r.info,
file:r.file,
line:r.line,
col:r.col,
client_version:""
};
}
function t(r){
var e=r.stack||"",t={
info:e,
file:r.file||"",
line:r.line||"",
col:r.col||""
};
if(""==t.file){
var i=e.split(/\bat\b/);
if(i&&i[1]){
var o=/(https?:\/\/[^\n]+)\:(\d+)\:(\d+)/.exec(i[1]);
o&&(o[1]&&o[1]!=t.file&&(t.file&&(r._info.file=t.file),t.file=o[1]),o[2]&&o[2]!=t.line&&(t.line&&(r._info.line=t.line),
t.line=o[2]),o[3]&&o[3]!=t.col&&(t.col&&(r._info.col=t.col),t.col=o[3]));
}
}
return t&&t.file&&t.file.length>0&&(t.info=t.info.replace(new RegExp(t.file.split("?")[0],"gi"),"__FILE__")),
n.BadJs.ignorePath&&(t.info=t.info.replace(/http(s)?\:[^:\n]*\//gi,"").replace(/\n/gi,"")),
t;
}
if(!n.BadJs){
var i="BadjsWindowError",o=function(n,r){
for(var e in r)n[e]=r[e];
return n;
};
return n.BadJs={
uin:0,
mid:"",
_cache:{},
_info:{},
_hookCallback:null,
ignorePath:!0,
"throw":function(n,r){
throw this.onError(n,r),n;
},
onError:function(r,t){
try{
if(1==r.BADJS_EXCUTED)return;
r.BADJS_EXCUTED=!0;
var i=e(r);
if(i.uin=this.uin,i.mid=this.mid,i.view=this.view,t&&(t._info=t.info,i=o(i,t)),i.cid&&(i.key="["+i.cid+"]:"+i.key),
i._info=o(i._info,this._info),i._info&&(i.msg+="[object Object]"==Object.prototype.toString.call(i._info)?" || info:"+JSON.stringify(i._info):"[object String]"==Object.prototype.toString.call(i._info)?" || info:"+i._info:" || info:"+i._info),
"function"==typeof this._hookCallback&&this._hookCallback(i)===!1)return;
return this._send(i),n.BadJs;
}catch(r){
console.error(r);
}
},
winErr:function(e){
if("unhandledrejection"===e.type)n.BadJs.onError(r(e.type,e.reason,"","","",e.reason));else{
if(e.error&&e.error.BADJS_EXCUTED)return;
n.BadJs.onError(r(i,e.message,e.filename,e.lineno,e.colno,e.error));
}
},
init:function(r,e,t,i){
return this.uin=r||this.uin,this.mid=e||this.mid,this.view=t||this.view,i!==!1&&(n.TryJs.init(function(r,e){
n.BadJs.throw.call(n.BadJs,r,e);
}),window.addEventListener&&window.addEventListener("error",n.BadJs.winErr),window.addEventListener&&window.addEventListener("unhandledrejection",n.BadJs.winErr)),
n.BadJs;
},
hook:function(r){
return this._hookCallback=r,n.BadJs;
},
_send:function(r){
if(r.mid){
var e=[r.mid,r.name,r.key].join("|");
if(!this._cache||!this._cache[e])return this._cache&&(this._cache[e]=!0),this._xhr(r),
n.BadJs;
}
},
_xhr:function(n){
var r;
if(window.ActiveXObject)try{
r=new ActiveXObject("Msxml2.XMLHTTP");
}catch(e){
try{
r=new ActiveXObject("Microsoft.XMLHTTP");
}catch(t){
r=!1;
}
}else window.XMLHttpRequest&&(r=new XMLHttpRequest);
var i="";
for(var o in n)o&&n[o]&&(i+=[o,"=",encodeURIComponent(n[o]),"&"].join(""));
if(r&&r.open)r.open("POST","https://badjs.weixinbridge.com/report",!0),r.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),
r.onreadystatechange=function(){},r.send(i.slice(0,-1));else{
var a=new Image;
a.src="https://badjs.weixinbridge.com/report?"+i;
}
},
report:function(n,e,t){
return this.onError(r(n,e),t),this;
},
mark:function(n){
this._info=o(this._info,n);
},
nocache:function(){
return this._cache=!1,n.BadJs;
}
},n.BadJs;
}
}(r),n.WX_BJ_REPORT=r;
}(window),WX_BJ_REPORT.BadJs.init(window.wx&&window.wx.uin||"","mmbizwxampnodelogicsvr","weapp");
var orgError=window.onerror;
window.onerror=function(n,r,e,t,i){
var o=navigator.userAgent;
if(-1==o.indexOf("IE")&&-1==o.indexOf("Trident")&&-1==o.indexOf("Edge")&&-1==o.indexOf("Googlebot"))return WX_BJ_REPORT.BadJs&&"function"==typeof WX_BJ_REPORT.BadJs.onError&&(i?WX_BJ_REPORT.BadJs.onError(i):WX_BJ_REPORT.BadJs.mark(n)),
orgError&&orgError.apply(window,arguments),!0;
},window.addEventListener("error",function(n){
var r=n.target||n.srcElement,e=r instanceof HTMLScriptElement||r instanceof HTMLLinkElement||r instanceof HTMLImageElement;
if(!e)return!1;
var t=r.src||r.href;
WX_BJ_REPORT.BadJs&&"function"==typeof WX_BJ_REPORT.BadJs.onError&&WX_BJ_REPORT.BadJs.report("ResourceLoadingFailed","资源加载失败"+t);
},!0);
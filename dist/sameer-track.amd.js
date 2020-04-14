define("sameerTrack",["axios"],(function(t){return function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(t,e){t.exports=require("axios")},function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return l}));var n=r(0);function i(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?i(Object(r),!0).forEach((function(e){o(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}var u=r.n(n).a.create({mode:"cors",headers:{"Access-Control-Allow-Headers":"Content-Type","Content-Type":"application/json"}}),l=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};c(this,t),this.config=e,this.trackList=[],this.timer=null,this.page=null,this.referrer="",this.location=""}var e,r,n;return e=t,(r=[{key:"init",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.config=a({},this.config,{},t),this.domEvent(),this.unload()}},{key:"unload",value:function(){var t=this;window.addEventListener("pagehide",(function(){t.setTimer({name:t.page,extra:{},type:"view"})})),window.addEventListener("error",(function(e){t.tcFnc({name:"".concat(t.config.project||"","-error"),extra:{event:e},type:"click"})}))}},{key:"domEvent",value:function(){var t=this;this.isBrower()&&document.getElementsByTagName("body")[0].addEventListener("click",(function(e){var r=e.target,n=r.dataset,i=n.extra,a=void 0===i?"{}":i,o=n.track;r&&1===r.nodeType&&"function"==typeof r.onclick&&o&&(a&&(a=JSON.parse(a)),a.btn_text=r.innerText,t.tcFnc({name:o,extra:a,type:"click"}))}))}},{key:"tcFnc",value:function(t){t="string"==typeof t?{name:t,extra:{},type:"click"}:a({},{name:"",extra:{},type:"click"},{},t),this.setTimer(t),this.saveStrackData(t)}},{key:"setTimer",value:function(t){if("view"===t.type){var e=this.isBrower();if(this.referrer=this.location,this.location=e?document.location.pathname:"",this.timer){var r=JSON.parse(JSON.stringify(t)),n=+new Date-this.timer;r.name=this.page,r.type="count",r.extra.count=n,this.saveStrackData(r),this.timer=null,this.page=null}else this.timer=+new Date,this.page=t.name}}},{key:"saveStrackData",value:function(t){var e=this.config,r=e.extraEvent,n=void 0===r?{}:r,i=e.threshold,o=e.preFix,c=e.log,s=e.urlData,u=this.isBrower(),l=s?this.getUrlParams():{};t.extra=a({},t.extra,{},l,{},n);var f=u?document.referrer:"";f&&(f="/"+(f=f.replace(/http:\/\/\S+?\//g,"").split("?"))[0]);var p={event_id:"".concat(o||"","-").concat(t.name),client_time:+new Date,event_category:t.type,referrer:this.referrer,location:u?document.location.pathname:"",extra:t.extra||{}};this.trackList.push(p),c&&console.log(this.trackList),(this.trackList.length>=i||!0===t.immediate)&&this.postTrackData(t)}},{key:"postTrackData",value:function(t){var e=this,r=this.config,n=r.trackUrl,i=r.initBasic,o=void 0===i?{}:i,c=r.version,s=r.project,l=r.cookieData,f={project:s},p={},v=!0===l?this.getCookieParams():{};p.basic_info=a({},f,{},v,{},o),p.event_list=this.trackList,p.version=c,u({method:"post",url:n,data:p}).then((function(t){if(200===t.status&&0===t.data.code)e.trackList=[];else{e.postTrackDataAgain(n,p);var r=a({},p);r.event_id="".concat(e.connfig.project,"_error_track_data"),e.postTrackDataAgain(n,r)}})).catch((function(){e.trackList=[]})).finally((function(){t.cb&&t.cb()}))}},{key:"postTrackDataAgain",value:function(t){var e=this,r=this.config.trackUrl;u({method:"post",url:r,data:t}).then((function(){e.trackList=[]}))}},{key:"isBrower",value:function(){return"undefined"!=typeof document}},{key:"getUrlParams",value:function(){var t="";this.isBrower()&&(t=(t=document.location.search).length>0?t.substring(1):"");for(var e=t.length>0?t.split("&"):[],r={},n={},i=0,o=e.length;i<o;i+=1){var c=e[i].split("="),s=c[0],u=c[1];r[s]=u}return n=a({},n,{},r)}},{key:"getCookieParams",value:function(){var t="";this.isBrower()&&(t=document.cookie);var e={},r={};if(!t||""===t)return e;for(var n=0,i=(t=t.split("; ")).length;n<i;n+=1){var o=t[n].split("="),c=o[0],s=o[1];r[c]=s}return e=a({},e,{},r)}}])&&s(e.prototype,r),n&&s(e,n),t}()}]).default}));
//# sourceMappingURL=sameer-track.amd.js.map
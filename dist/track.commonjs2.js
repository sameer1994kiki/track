module.exports=function(t){var e={};function r(a){if(e[a])return e[a].exports;var n=e[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(t,e){t.exports=require("axios")},function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return u}));var a=r(0);function n(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?n(Object(r),!0).forEach((function(e){o(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}var l=r.n(a).a.create({mode:"cors",headers:{"Access-Control-Allow-Headers":"Content-Type","Content-Type":"application/json"}}),u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};c(this,t),this.config=e,this.trackList=[],this.timer="",this.page="",this.referrer="",this.location=""}var e,r,a;return e=t,(r=[{key:"init",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.config=i({},this.config,{},t),this.domEvent(),this.unload()}},{key:"unload",value:function(){var t=this;window.addEventListener("pagehide",(function(){t.setTimer({name:t.page,extra:{},type:"view"})})),window.addEventListener("error",(function(e){t.tcFnc({name:"".concat(t.config.project||"","-error"),extra:{event:e},type:"click"})}))}},{key:"domEvent",value:function(){var t=this;this.isBrower()&&document.getElementsByTagName("body")[0].addEventListener("click",(function(e){var r=e.target,a=r.dataset,n=a.extra,i=void 0===n?"{}":n,o=a.track;r&&1===r.nodeType&&"function"==typeof r.onclick&&o&&(i&&(i=JSON.parse(i)),i.btn_text=r.innerText,t.tcFnc({name:o,extra:i,type:"click"}))}))}},{key:"tcFnc",value:function(t){t="string"==typeof t?{name:t,extra:{},type:"click"}:i({},{name:"",extra:{},type:"click"},{},t),this.initData(),this.setTimer(t),this.saveStrackData(t)}},{key:"initData",value:function(){try{var t=localStorage.getItem("track_data")||"[]";this.trackList=JSON.parse(t);var e=localStorage.getItem("track_timer")||"";this.timer=e;var r=localStorage.getItem("track_page")||"";this.page=r;var a=localStorage.getItem("track_referrer")||"";this.referrer=a;var n=localStorage.getItem("track_location")||"";this.location=n}catch(t){this.clearTrackData()}}},{key:"setTimer",value:function(t){if("view"===t.type){var e=this.isBrower();if(this.referrer=this.location,this.location=e?document.location.pathname:"",this.timer){var r=JSON.parse(JSON.stringify(t)),a=+new Date-Number(this.timer);r.name=this.page,r.type="count",r.extra.count=a,this.saveStrackData(r),this.timer="",this.page=""}else this.timer=+new Date,this.page=t.name;localStorage.setItem("track_location",this.location),localStorage.setItem("track_referrer",this.referrer),localStorage.setItem("track_timer",this.timer),localStorage.setItem("track_page",this.page)}}},{key:"saveStrackData",value:function(t){var e=this.config,r=e.extraEvent,a=void 0===r?{}:r,n=e.threshold,o=e.preFix,c=e.log,s=e.urlData,l=this.isBrower(),u=s?this.getUrlParams():{};t.extra=i({},t.extra,{},u,{},a);var f=l?document.referrer:"";f&&(f="/"+(f=f.replace(/http:\/\/\S+?\//g,"").split("?"))[0]);var p={event_id:"".concat(o||"","-").concat(t.name),client_time:+new Date,event_category:t.type,referrer:this.referrer,location:l?document.location.pathname:"",extra:t.extra||{}};this.trackList.push(p),localStorage.setItem("track_data",JSON.stringify(this.trackList)),c&&console.log(this.trackList),(this.trackList.length>=n||!0===t.immediate)&&this.postTrackData(t)}},{key:"postTrackData",value:function(t){var e=this,r=this.config,a=r.trackUrl,n=r.initBasic,o=void 0===n?{}:n,c=r.version,s=r.project,u=r.cookieData,f={project:s},p={},h=!0===u?this.getCookieParams():{};p.basic_info=i({},f,{},h,{},o),p.event_list=this.trackList,p.version=c,l({method:"post",url:a,data:p}).then((function(t){if(200===t.status&&0===t.data.code)e.clearTrackData();else{e.postTrackDataAgain(a,p);var r=i({},p);r.event_id="".concat(e.connfig.project,"_error_track_data"),e.postTrackDataAgain(a,r)}})).catch((function(){e.clearTrackData()})).finally((function(){t.cb&&t.cb()}))}},{key:"postTrackDataAgain",value:function(t){var e=this,r=this.config.trackUrl;l({method:"post",url:r,data:t}).finally((function(){e.clearTrackData()}))}},{key:"clearTrackData",value:function(){this.trackList=[],localStorage.setItem("track_data",this.trackList)}},{key:"isBrower",value:function(){return"undefined"!=typeof document}},{key:"getUrlParams",value:function(){var t="";this.isBrower()&&(t=(t=document.location.search).length>0?t.substring(1):"");for(var e=t.length>0?t.split("&"):[],r={},a={},n=0,o=e.length;n<o;n+=1){var c=e[n].split("="),s=c[0],l=c[1];r[s]=l}return a=i({},a,{},r)}},{key:"getCookieParams",value:function(){var t="";this.isBrower()&&(t=document.cookie);var e={},r={};if(!t||""===t)return e;for(var a=0,n=(t=t.split("; ")).length;a<n;a+=1){var o=t[a].split("="),c=o[0],s=o[1];r[c]=s}return e=i({},e,{},r)}}])&&s(e.prototype,r),a&&s(e,a),t}()}]).default;
//# sourceMappingURL=track.commonjs2.js.map
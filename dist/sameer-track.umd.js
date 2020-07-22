!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.sameerTrack=e():t.sameerTrack=e()}(global,(function(){return function(t){var e={};function r(a){if(e[a])return e[a].exports;var o=e[a]={i:a,l:!1,exports:{}};return t[a].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=t,r.c=e,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(a,o,function(e){return t[e]}.bind(null,o));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([function(t,e){t.exports=require("axios")},function(t,e,r){"use strict";r.r(e),r.d(e,"default",(function(){return f}));var a=r(0);function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function n(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){i(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function i(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var r=0;r<e.length;r++){var a=e[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}var u=r.n(a).a.create({mode:"cors",headers:{"Access-Control-Allow-Headers":"Content-Type","Content-Type":"application/json"}}),f=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};s(this,t),this.config=e,this.trackList=[],this.timer="",this.page="",this.referrer="",this.location=""}var e,r,a;return e=t,(r=[{key:"init",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.config=this.deepObjectMerge(this.config,t),this.initLocationData(),this.domEvent(),this.unload()}},{key:"initLocationData",value:function(){"object"===("undefined"==typeof localStorage?"undefined":c(localStorage))&&(localStorage.setItem("track_location",""),localStorage.setItem("track_referrer",""),localStorage.setItem("track_timer",""),localStorage.setItem("track_page",""))}},{key:"unload",value:function(){var t=this;this.isBrower()&&window.addEventListener("pagehide",(function(){t.setTimer({name:t.page,extra:{},type:"view"})}))}},{key:"domEvent",value:function(){var t=this;this.isBrower()&&document.getElementsByTagName("body")[0].addEventListener("click",(function(e){var r=e.target,a=r.dataset,o=a.extra,n=void 0===o?"{}":o,i=a.track;r&&1===r.nodeType&&"function"==typeof r.onclick&&i&&(n&&(n=JSON.parse(n)),n.btn_text=r.innerText,t.tcFnc({name:i,extra:n,type:"click"}))}))}},{key:"tcFnc",value:function(t){t="string"==typeof t?{name:t,extra:{},type:"click"}:n(n({},{name:"",extra:{},type:"click"}),t),this.initData(),this.setTimer(t),this.saveStrackData(t)}},{key:"initData",value:function(){try{if("object"===("undefined"==typeof localStorage?"undefined":c(localStorage))){var t=localStorage.getItem("track_data")||"[]",e=localStorage.getItem("track_timer")||"",r=localStorage.getItem("track_page")||"",a=localStorage.getItem("track_referrer")||"",o=localStorage.getItem("track_location")||"";this.trackList=JSON.parse(t),this.timer=e,this.page=r,this.referrer=a,this.location=o}}catch(t){this.clearTrackData()}}},{key:"setTimer",value:function(t){if("view"===t.type){var e=this.isBrower();if(this.referrer=this.location,this.location=e?document.location.pathname:"",this.timer){var r=JSON.parse(JSON.stringify(t)),a=+new Date-Number(this.timer);r.name=this.page,r.type="count",r.extra.count=a,r.name&&this.saveStrackData(r),this.timer="",this.page=""}else this.timer=+new Date,this.page=t.name;"object"===("undefined"==typeof localStorage?"undefined":c(localStorage))&&(localStorage.setItem("track_location",this.location),localStorage.setItem("track_referrer",this.referrer),localStorage.setItem("track_timer",this.timer),localStorage.setItem("track_page",this.page))}}},{key:"saveStrackData",value:function(t){var e=this.config,r=e.extraEvent,a=void 0===r?{}:r,o=e.threshold,i=e.preFix,s=e.log,l=e.urlData,u=this.isBrower(),f=l?this.getUrlParams():{};t.extra=n(n(n({},t.extra),f),a);var p=u?document.referrer:"";p&&(p="/"+(p=p.replace(/http:\/\/\S+?\//g,"").split("?"))[0]);var d={event_id:"".concat(i||"","-").concat(t.name),client_time:+new Date,event_category:t.type,referrer:this.referrer,location:u?document.location.pathname:"",extra:t.extra||{}};this.trackList.push(d),"object"===("undefined"==typeof localStorage?"undefined":c(localStorage))&&localStorage.setItem("track_data",JSON.stringify(this.trackList)),s&&console.log(this.trackList),(this.trackList.length>=o||!0===t.immediate)&&(this.trackListData=n({},this.trackList),this.clearTrackData(),this.postTrackData(t))}},{key:"postTrackData",value:function(t){var e=this,r=this.config,a=r.trackUrl,o=r.initBasic,i=void 0===o?{}:o,c=r.version,s=r.project,l=r.cookieData,f={project:s},p={},d=!0===l?this.getCookieParams():{};p.basic_info=n(n(n(n({},{user_agent:"undefined"!=typeof navigator?navigator.userAgent:""}),f),d),i),p.event_list=this.trackListData,p.version=c,u({method:"post",url:a,data:p}).then((function(r){if(200!==r.status||0!==r.data.code){e.postTrackDataAgain(a,p);var o=n({},p);o.event_list=[{event_id:"".concat(e.connfig.project,"_error_track_data"),client_time:+new Date,event_category:"type",referrer:e.referrer,location:e.isBrower()?document.location.pathname:""}],e.postTrackDataAgain(a,o)}t.cb&&t.cb()})).catch((function(){e.clearTrackData(),t.cb&&t.cb()}))}},{key:"postTrackDataAgain",value:function(t){var e=this.config.trackUrl;u({method:"post",url:e,data:t})}},{key:"clearTrackData",value:function(){this.trackList=[],"object"===("undefined"==typeof localStorage?"undefined":c(localStorage))&&localStorage.setItem("track_data",this.trackList)}},{key:"isBrower",value:function(){return"undefined"!=typeof document}},{key:"getUrlParams",value:function(){var t="";this.isBrower()&&(t=(t=document.location.search).length>0?t.substring(1):"");for(var e=t.length>0?t.split("&"):[],r={},a={},o=0,i=e.length;o<i;o+=1){var c=e[o].split("="),s=c[0],l=c[1];r[s]=l}return a=n(n({},a),r)}},{key:"getCookieParams",value:function(){var t="";this.isBrower()&&(t=document.cookie);var e={},r={};if(!t||""===t)return e;for(var a=0,o=(t=t.split("; ")).length;a<o;a+=1){var i=t[a].split("="),c=i[0],s=i[1];r[c]=s}return e=n(n({},e),r)}},{key:"deepObjectMerge",value:function(t,e){for(var r in e)t[r]=t[r]&&"[object Object]"===t[r].toString()?this.deepObjectMerge(t[r],e[r]):t[r]=e[r];return t}}])&&l(e.prototype,r),a&&l(e,a),t}()}]).default}));
//# sourceMappingURL=sameer-track.umd.js.map
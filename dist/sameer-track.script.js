window.sameerTrack=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=10)}([function(e,t,r){"use strict";function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var o=r(1),i=Object.prototype.toString;function a(e){return"[object Array]"===i.call(e)}function s(e){return void 0===e}function c(e){return null!==e&&"object"===n(e)}function u(e){return"[object Function]"===i.call(e)}function f(e,t){if(null!=e)if("object"!==n(e)&&(e=[e]),a(e))for(var r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}e.exports={isArray:a,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:function(e){return null!==e&&!s(e)&&null!==e.constructor&&!s(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:c,isUndefined:s,isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:u,isStream:function(e){return c(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:f,merge:function e(){var t={};function r(r,o){"object"===n(t[o])&&"object"===n(r)?t[o]=e(t[o],r):t[o]=r}for(var o=0,i=arguments.length;o<i;o++)f(arguments[o],r);return t},deepMerge:function e(){var t={};function r(r,o){"object"===n(t[o])&&"object"===n(r)?t[o]=e(t[o],r):"object"===n(r)?t[o]=e({},r):t[o]=r}for(var o=0,i=arguments.length;o<i;o++)f(arguments[o],r);return t},extend:function(e,t,r){return f(t,(function(t,n){e[n]=r&&"function"==typeof t?o(t,r):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,r){"use strict";e.exports=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}}},function(e,t,r){"use strict";var n=r(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,r){if(!t)return e;var i;if(r)i=r(t);else if(n.isURLSearchParams(t))i=t.toString();else{var a=[];n.forEach(t,(function(e,t){null!=e&&(n.isArray(e)?t+="[]":e=[e],n.forEach(e,(function(e){n.isDate(e)?e=e.toISOString():n.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+"="+o(e))})))})),i=a.join("&")}if(i){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},function(e,t,r){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,r){"use strict";(function(t){var n=r(0),o=r(17),i={"Content-Type":"application/x-www-form-urlencoded"};function a(e,t){!n.isUndefined(e)&&n.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var s,c={adapter:(("undefined"!=typeof XMLHttpRequest||void 0!==t&&"[object process]"===Object.prototype.toString.call(t))&&(s=r(5)),s),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),n.isFormData(e)||n.isArrayBuffer(e)||n.isBuffer(e)||n.isStream(e)||n.isFile(e)||n.isBlob(e)?e:n.isArrayBufferView(e)?e.buffer:n.isURLSearchParams(e)?(a(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):n.isObject(e)?(a(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300}};c.headers={common:{Accept:"application/json, text/plain, */*"}},n.forEach(["delete","get","head"],(function(e){c.headers[e]={}})),n.forEach(["post","put","patch"],(function(e){c.headers[e]=n.merge(i)})),e.exports=c}).call(this,r(16))},function(e,t,r){"use strict";var n=r(0),o=r(18),i=r(2),a=r(20),s=r(23),c=r(24),u=r(6);e.exports=function(e){return new Promise((function(t,f){var l=e.data,p=e.headers;n.isFormData(l)&&delete p["Content-Type"];var d=new XMLHttpRequest;if(e.auth){var h=e.auth.username||"",m=e.auth.password||"";p.Authorization="Basic "+btoa(h+":"+m)}var y=a(e.baseURL,e.url);if(d.open(e.method.toUpperCase(),i(y,e.params,e.paramsSerializer),!0),d.timeout=e.timeout,d.onreadystatechange=function(){if(d&&4===d.readyState&&(0!==d.status||d.responseURL&&0===d.responseURL.indexOf("file:"))){var r="getAllResponseHeaders"in d?s(d.getAllResponseHeaders()):null,n={data:e.responseType&&"text"!==e.responseType?d.response:d.responseText,status:d.status,statusText:d.statusText,headers:r,config:e,request:d};o(t,f,n),d=null}},d.onabort=function(){d&&(f(u("Request aborted",e,"ECONNABORTED",d)),d=null)},d.onerror=function(){f(u("Network Error",e,null,d)),d=null},d.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),f(u(t,e,"ECONNABORTED",d)),d=null},n.isStandardBrowserEnv()){var g=r(25),v=(e.withCredentials||c(y))&&e.xsrfCookieName?g.read(e.xsrfCookieName):void 0;v&&(p[e.xsrfHeaderName]=v)}if("setRequestHeader"in d&&n.forEach(p,(function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete p[t]:d.setRequestHeader(t,e)})),n.isUndefined(e.withCredentials)||(d.withCredentials=!!e.withCredentials),e.responseType)try{d.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&d.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&d.upload&&d.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){d&&(d.abort(),f(e),d=null)})),void 0===l&&(l=null),d.send(l)}))}},function(e,t,r){"use strict";var n=r(19);e.exports=function(e,t,r,o,i){var a=new Error(e);return n(a,t,r,o,i)}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t){t=t||{};var r={},o=["url","method","params","data"],i=["headers","auth","proxy"],a=["baseURL","url","transformRequest","transformResponse","paramsSerializer","timeout","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","maxContentLength","validateStatus","maxRedirects","httpAgent","httpsAgent","cancelToken","socketPath"];n.forEach(o,(function(e){void 0!==t[e]&&(r[e]=t[e])})),n.forEach(i,(function(o){n.isObject(t[o])?r[o]=n.deepMerge(e[o],t[o]):void 0!==t[o]?r[o]=t[o]:n.isObject(e[o])?r[o]=n.deepMerge(e[o]):void 0!==e[o]&&(r[o]=e[o])})),n.forEach(a,(function(n){void 0!==t[n]?r[n]=t[n]:void 0!==e[n]&&(r[n]=e[n])}));var s=o.concat(i).concat(a),c=Object.keys(t).filter((function(e){return-1===s.indexOf(e)}));return n.forEach(c,(function(n){void 0!==t[n]?r[n]=t[n]:void 0!==e[n]&&(r[n]=e[n])})),r}},function(e,t,r){"use strict";function n(e){this.message=e}n.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},n.prototype.__CANCEL__=!0,e.exports=n},function(e,t,r){e.exports=r(11)},function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return l}));var n=r(9);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var f=r.n(n).a.create({mode:"cors",headers:{"Access-Control-Allow-Headers":"Content-Type","Content-Type":"application/json"}}),l=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};c(this,e),this.config=t,this.trackList=[],this.timer="",this.page="",this.referrer="",this.location=""}var t,r,n;return t=e,(r=[{key:"init",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.config=a({},this.config,{},e),this.domEvent(),this.unload()}},{key:"unload",value:function(){var e=this;this.isBrower()&&(window.addEventListener("pagehide",(function(){e.setTimer({name:e.page,extra:{},type:"view"})})),window.addEventListener("error",(function(t){e.tcFnc({name:"".concat(e.config.project||"","-error"),extra:{event:t},type:"click"})})))}},{key:"domEvent",value:function(){var e=this;this.isBrower()&&document.getElementsByTagName("body")[0].addEventListener("click",(function(t){var r=t.target,n=r.dataset,o=n.extra,i=void 0===o?"{}":o,a=n.track;r&&1===r.nodeType&&"function"==typeof r.onclick&&a&&(i&&(i=JSON.parse(i)),i.btn_text=r.innerText,e.tcFnc({name:a,extra:i,type:"click"}))}))}},{key:"tcFnc",value:function(e){e="string"==typeof e?{name:e,extra:{},type:"click"}:a({},{name:"",extra:{},type:"click"},{},e),this.initData(),this.setTimer(e),this.saveStrackData(e)}},{key:"initData",value:function(){try{if("object"===("undefined"==typeof localStorage?"undefined":o(localStorage))){var e=localStorage.getItem("track_data")||"[]",t=localStorage.getItem("track_timer")||"",r=localStorage.getItem("track_page")||"",n=localStorage.getItem("track_referrer")||"",i=localStorage.getItem("track_location")||"";this.trackList=JSON.parse(e),this.timer=t,this.page=r,this.referrer=n,this.location=i}}catch(e){this.clearTrackData()}}},{key:"setTimer",value:function(e){if("view"===e.type){var t=this.isBrower();if(this.referrer=this.location,this.location=t?document.location.pathname:"",this.timer){var r=JSON.parse(JSON.stringify(e)),n=+new Date-Number(this.timer);r.name=this.page,r.type="count",r.extra.count=n,this.saveStrackData(r),this.timer="",this.page=""}else this.timer=+new Date,this.page=e.name;"object"===("undefined"==typeof localStorage?"undefined":o(localStorage))&&(localStorage.setItem("track_location",this.location),localStorage.setItem("track_referrer",this.referrer),localStorage.setItem("track_timer",this.timer),localStorage.setItem("track_page",this.page))}}},{key:"saveStrackData",value:function(e){var t=this.config,r=t.extraEvent,n=void 0===r?{}:r,i=t.threshold,s=t.preFix,c=t.log,u=t.urlData,f=this.isBrower(),l=u?this.getUrlParams():{};e.extra=a({},e.extra,{},l,{},n);var p=f?document.referrer:"";p&&(p="/"+(p=p.replace(/http:\/\/\S+?\//g,"").split("?"))[0]);var d={event_id:"".concat(s||"","-").concat(e.name),client_time:+new Date,event_category:e.type,referrer:this.referrer,location:f?document.location.pathname:"",extra:e.extra||{}};this.trackList.push(d),"object"===("undefined"==typeof localStorage?"undefined":o(localStorage))&&localStorage.setItem("track_data",JSON.stringify(this.trackList)),c&&console.log(this.trackList),(this.trackList.length>=i||!0===e.immediate)&&this.postTrackData(e)}},{key:"postTrackData",value:function(e){var t=this,r=this.config,n=r.trackUrl,o=r.initBasic,i=void 0===o?{}:o,s=r.version,c=r.project,u=r.cookieData,l={project:c},p={},d=!0===u?this.getCookieParams():{};p.basic_info=a({},l,{},d,{},i),p.event_list=this.trackList,p.version=s,f({method:"post",url:n,data:p}).then((function(e){if(200===e.status&&0===e.data.code)t.clearTrackData();else{t.postTrackDataAgain(n,p);var r=a({},p);r.event_id="".concat(t.connfig.project,"_error_track_data"),t.postTrackDataAgain(n,r)}})).catch((function(){t.clearTrackData()})).finally((function(){e.cb&&e.cb()}))}},{key:"postTrackDataAgain",value:function(e){var t=this,r=this.config.trackUrl;f({method:"post",url:r,data:e}).finally((function(){t.clearTrackData()}))}},{key:"clearTrackData",value:function(){this.trackList=[],"object"===("undefined"==typeof localStorage?"undefined":o(localStorage))&&localStorage.setItem("track_data",this.trackList)}},{key:"isBrower",value:function(){return"undefined"!=typeof document}},{key:"getUrlParams",value:function(){var e="";this.isBrower()&&(e=(e=document.location.search).length>0?e.substring(1):"");for(var t=e.length>0?e.split("&"):[],r={},n={},o=0,i=t.length;o<i;o+=1){var s=t[o].split("="),c=s[0],u=s[1];r[c]=u}return n=a({},n,{},r)}},{key:"getCookieParams",value:function(){var e="";this.isBrower()&&(e=document.cookie);var t={},r={};if(!e||""===e)return t;for(var n=0,o=(e=e.split("; ")).length;n<o;n+=1){var i=e[n].split("="),s=i[0],c=i[1];r[s]=c}return t=a({},t,{},r)}}])&&u(t.prototype,r),n&&u(t,n),e}()},function(e,t,r){"use strict";var n=r(0),o=r(1),i=r(12),a=r(7);function s(e){var t=new i(e),r=o(i.prototype.request,t);return n.extend(r,i.prototype,t),n.extend(r,t),r}var c=s(r(4));c.Axios=i,c.create=function(e){return s(a(c.defaults,e))},c.Cancel=r(8),c.CancelToken=r(26),c.isCancel=r(3),c.all=function(e){return Promise.all(e)},c.spread=r(27),e.exports=c,e.exports.default=c},function(e,t,r){"use strict";var n=r(0),o=r(2),i=r(13),a=r(14),s=r(7);function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[a,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},c.prototype.getUri=function(e){return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},n.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,r){return this.request(n.merge(r||{},{method:e,url:t}))}})),n.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,r,o){return this.request(n.merge(o||{},{method:e,url:t,data:r}))}})),e.exports=c},function(e,t,r){"use strict";var n=r(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){n.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},function(e,t,r){"use strict";var n=r(0),o=r(15),i=r(3),a=r(4);function s(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return s(e),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=n.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),n.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return s(e),t.data=o(t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(s(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t,r){return n.forEach(r,(function(r){e=r(e,t)})),e}},function(e,t){var r,n,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(e){if(r===setTimeout)return setTimeout(e,0);if((r===i||!r)&&setTimeout)return r=setTimeout,setTimeout(e,0);try{return r(e,0)}catch(t){try{return r.call(null,e,0)}catch(t){return r.call(this,e,0)}}}!function(){try{r="function"==typeof setTimeout?setTimeout:i}catch(e){r=i}try{n="function"==typeof clearTimeout?clearTimeout:a}catch(e){n=a}}();var c,u=[],f=!1,l=-1;function p(){f&&c&&(f=!1,c.length?u=c.concat(u):l=-1,u.length&&d())}function d(){if(!f){var e=s(p);f=!0;for(var t=u.length;t;){for(c=u,u=[];++l<t;)c&&c[l].run();l=-1,t=u.length}c=null,f=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===a||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];u.push(new h(e,t)),1!==u.length||f||s(d)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,r){"use strict";var n=r(0);e.exports=function(e,t){n.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))}},function(e,t,r){"use strict";var n=r(6);e.exports=function(e,t,r){var o=r.config.validateStatus;!o||o(r.status)?e(r):t(n("Request failed with status code "+r.status,r.config,null,r.request,r))}},function(e,t,r){"use strict";e.exports=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e}},function(e,t,r){"use strict";var n=r(21),o=r(22);e.exports=function(e,t){return e&&!n(t)?o(e,t):t}},function(e,t,r){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,r){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,r){"use strict";var n=r(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,r,i,a={};return e?(n.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=n.trim(e.substr(0,i)).toLowerCase(),r=n.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([r]):a[t]?a[t]+", "+r:r}})),a):a}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=o(window.location.href),function(t){var r=n.isString(t)?o(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0}},function(e,t,r){"use strict";var n=r(0);e.exports=n.isStandardBrowserEnv()?{write:function(e,t,r,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),n.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),n.isString(o)&&s.push("path="+o),n.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,r){"use strict";var n=r(8);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new n(e),t(r.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},function(e,t,r){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}}]).default;
//# sourceMappingURL=sameer-track.script.js.map
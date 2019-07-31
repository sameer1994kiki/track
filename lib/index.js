(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Track = __webpack_require__(1);

var _Track2 = _interopRequireDefault(_Track);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Track2.default;

if (typeof window !== 'undefined') {
	window.Track = _Track2.default;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Track = function () {
	function Track() {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Track);

		// super()
		this.config = params;
		this.trackData = [];
	}

	_createClass(Track, [{
		key: "init",
		value: function init() {
			this.domEvent();
		}
	}, {
		key: "domEvent",
		value: function domEvent() {
			var _this = this;

			document.getElementsByTagName("body")[0].addEventListener("click", function (e) {
				var node = e.target;
				var dataset = node.dataset;
				var track = dataset.track,
				    _dataset$extra = dataset.extra,
				    extra = _dataset$extra === undefined ? {} : _dataset$extra;

				if (node && node.nodeType === 1 && typeof node.onclick === "function" && track) {
					var event_id = _this.config.mapData[track]['event_id'];
					// 默认额外参数_text
					if (extra) {
						extra = JSON.parse(extra);
					}
					extra.extra_text = node.innerText;
					var event = {
						extra: extra,
						event_id: event_id,
						client_time: new Date().getTime()
					};
					if (event_id) {
						_this.tcFnc(event);
					}
				}
			});
		}
	}, {
		key: "pageTrack",
		value: function pageTrack() {
			// 页面pv统计逻辑
			var pathname = typeof location !== 'undefined' ? location.pathname : '';
			var event_id = this.config.mapData[pathname]['event_id'];

			// 默认额外参数_title
			extra.extra_title = document.title;
			var event = {
				extra: extra,
				event_id: event_id,
				client_time: new Date().getTime()
			};
			this.tcFnc(event);
		}
	}, {
		key: "tcFnc",
		value: function tcFnc(event) {
			var extra = this.getUrlParams();
			event.extra = Object.assign(event.extra, extra);
			this.trackData.push(event);
			// 如果大于限定次数，提交数据
			console.log(this.trackData);
			if (this.trackData.length >= this.config.threshold) {
				this.postTrackData();
				// 大于2倍说明提交异常，丢掉
				if (this.trackData.length >= this.config.threshold * 1.5) {
					this.cleanData();
				}
			}
		}
	}, {
		key: "postTrackData",
		value: function postTrackData() {
			var _this2 = this;

			var basic_info = this.getBasicInfo();
			// basic_info.project = trackConfig.project;
			var postData = {};
			postData["basic_info"] = basic_info;
			postData["event_list"] = this.trackData;
			// postData["version"] = trackConfig.version;
			// 请求数据是否可以压缩一下
			this.ajax(this.config.url, postData, function () {
				_this2.cleanData();
			});
		}
		// 清除收集到的信息

	}, {
		key: "cleanData",
		value: function cleanData() {
			this.trackData = [];
		}
		// 获取基础信息

	}, {
		key: "getBasicInfo",
		value: function getBasicInfo() {
			var basicArry = this.config.basicInfoKeys ? this.config.basicInfoKeys : [];
			var cookieParams = this.getCookieParams();
			var urlParams = this.getUrlParams();
			var basicInfo = void 0;
			if (this.config.priority === "cookie") {
				basicInfo = Object.assign(urlParams, cookieParams);
			} else {
				basicInfo = Object.assign(cookieParams, urlParams);
			}
			var newbBasicInfo = {};
			for (var item in basicInfo) {
				if (basicArry.includes(item) && basicInfo[item] !== "undefined") {
					newbBasicInfo = Object.assign(newbBasicInfo, _defineProperty({}, item, basicInfo[item]));
				}
			}
			return newbBasicInfo;
		}

		// 获取url上的参数

	}, {
		key: "getUrlParams",
		value: function getUrlParams() {
			var search = typeof location !== 'undefined' && location.search.length > 0 ? location.search.substring(1) : "";
			var searchArray = search.length > 0 ? search.split("&") : []; // 获取链接上已有的参数
			var searchObject = {};
			var obj = {};
			var i, l;
			for (i = 0, l = searchArray.length; i < l; i++) {
				var item = searchArray[i].split("=");
				searchObject[item[0]] = item[1];
			}
			obj = Object.assign(obj, searchObject);
			return obj;
		}

		// 获取cookie中的参数

	}, {
		key: "getCookieParams",
		value: function getCookieParams(params) {
			var cookie = typeof document !== 'undefined' && document.cookie;
			var obj = {};
			var cookieObject = {};
			var i, l;
			if (!cookie || cookie === "") {
				return obj;
			}
			cookie = cookie.split("; ");
			for (i = 0, l = cookie.length; i < l; i++) {
				var item = cookie[i].split("=");
				cookieObject[item[0]] = item[1];
			}
			obj = Object.assign(obj, cookieObject);
			return obj;
		}
		// ajax请求

	}, {
		key: "ajax",
		value: function ajax(url, data, callback) {
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var msg = ajax.responseText;
					console.log(msg);
					callback();
				}
			};
			ajax.open("post", url);
			ajax.setRequestHeader("content-type", "application/json");
			ajax.send(JSON.stringify(data));
		}
	}]);

	return Track;
}();

exports.default = Track;

/***/ })
/******/ ]);
});
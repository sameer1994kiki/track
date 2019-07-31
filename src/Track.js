'use strict'
export default class Track {
	constructor(params = {}) {
		this.config = params;
		this.trackData = [];
	}
	init() {
		this.domEvent()
	}
	domEvent() {
		document.getElementsByTagName("body")[0].addEventListener("click", e => {
			const node = e.target;
			const { dataset } = node;

			let { track, extra = {} } = dataset;
			if (node && node.nodeType === 1 && typeof node.onclick === "function" && track) {
				const event_id = this.config.mapData[track]['event_id'];
				// 默认额外参数_text
				if (extra) {
					extra = JSON.parse(extra);
				}
				extra.extra_text = node.innerText;
				const event = {
					extra,
					event_id,
					client_time: new Date().getTime()
				}
				if (event_id) { this.tcFnc(event) }
			}
		});
	}
	pageTrack() {
		// 页面pv统计逻辑
		const pathname = typeof location !== 'undefined' ? location.pathname : '';
		const event_id = this.config.mapData[pathname]['event_id'];

		// 默认额外参数_title
		const extra = {}
		extra.extra_title = document.title;
		const event = {
			extra,
			event_id,
			client_time: new Date().getTime()
		}
		this.tcFnc(event);
	}
	tcFnc(event) {
		const extra = this.getUrlParams();
		event.extra = Object.assign(event.extra, extra)
		this.trackData.push(event);
		// 如果大于限定次数，提交数据
		console.log(this.trackData)
		if (this.trackData.length >= this.config.threshold) {
			this.postTrackData()
			// 大于2倍说明提交异常，丢掉
			if (this.trackData.length >= this.config.threshold * 1.5) {
				this.cleanData()
			}
		}
	}
	postTrackData() {
		const basic_info = this.getBasicInfo()
		// basic_info.project = trackConfig.project;
		var postData = {};
		postData["basic_info"] = basic_info;
		postData["event_list"] = this.trackData;
		// postData["version"] = trackConfig.version;
		// 请求数据是否可以压缩一下
		this.ajax(this.config.url, postData, () => {
			this.cleanData();
		});
	}
	// 清除收集到的信息
	cleanData() {
		this.trackData = [];
	}
	// 获取基础信息
	getBasicInfo() {
		let basicArry = this.config.basicInfoKeys ? this.config.basicInfoKeys : [];
		const cookieParams = this.getCookieParams();
		const urlParams = this.getUrlParams();
		let basicInfo;
		if (this.config.priority === "cookie") {
			basicInfo = Object.assign(urlParams, cookieParams);
		} else {
			basicInfo = Object.assign(cookieParams, urlParams);
		}
		let newbBasicInfo = {};
		for (const item in basicInfo) {
			if (basicArry.includes(item) && basicInfo[item] !== "undefined") {
				newbBasicInfo = Object.assign(newbBasicInfo, { [item]: basicInfo[item] });
			}
		}
		return newbBasicInfo;
	}

	// 获取url上的参数
	getUrlParams() {
		var search = (typeof location !== 'undefined' && location.search.length > 0) ? location.search.substring(1) : "";
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
	getCookieParams(params) {
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
	ajax(url, data, callback) {
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

}
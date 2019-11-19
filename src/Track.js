// "use strict";
// const config = {
//   trackUrl: "https://collector.wmzy.com/log-collect/app-behavior-upload",
//   version: "1.0",
//   threshold: 4, //最大存储数量
//   project: "wmzy-pc" //项目名称,

//   extraBasic: { aaa: 666 },额外的基础数据
//   extraEvent: { bbb: 9999 },
//   cookieData:true,
//   urlData:true,
// };
const axios = require("axios");
const instance = axios.create({
  mode: "cors",
  headers: {
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  }
});
export default class Track {
  constructor(params = {}) {
    this.config = params;
    this.trackList = [];
  }
  init() {
    console.log(999);
    this.domEvent();
  }
  domEvent() {
    const isBrower = this.isBrower();
    if (isBrower) {
      document.getElementsByTagName("body")[0].addEventListener("click", e => {
        const node = e.target;
        const { dataset } = node;
        let { track, extra = "{}" } = dataset;
        if (
          node &&
          node.nodeType === 1 &&
          typeof node.onclick === "function" &&
          track
        ) {
          console.log(track);
          if (extra) {
            extra = JSON.parse(extra);
          }
          extra.btn_text = node.innerText;
          this.tcFnc({
            name: track,
            extra,
            type: "click"
          });
        }
      });
    }
  }
  tcFnc(track) {
    track =
      typeof track === "string"
        ? {
            name: track,
            extra: {},
            type: "click"
          }
        : Object.assign(
            {
              name: "",
              extra: {},
              type: "click"
            },
            track
          );
    this.saveStrackData(track);
  }

  saveStrackData(track) {
    const { extraEvent, threshold } = this.config;
    const isBrower = this.isBrower();

    const urlData = this.getUrlParams();
    const cookieData = this.getCookieParams();
    track.extra = Object.assign({ extraEvent }, { urlData }, { cookieData });
    const event_list = {
      client_time: +new Date(),
      event_category: track.type,
      referer: isBrower ? document.referrer : "",
      location: isBrower ? document.location.pathname : "",
      target: track.name,
      extra: track.extra || {}
    };
    this.trackList.push(event_list);
    console.log(this.trackList);
    if (this.trackList.length >= threshold) this.postTrackData();
  }
  // 获取url上的参数
  getUrlParams() {
    const isBrower = this.isBrower();
    let search = "";
    if (isBrower) {
      search = document.location.search.length > 0 ? search.substring(1) : "";
    }
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
  // 获取cookie中参数
  getCookieParams() {
    let cookie = "";
    const isBrower = this.isBrower();
    if (isBrower) {
      cookie = document.cookie;
    }
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
  // 上传数据
  postTrackData() {
    const { trackUrl: url, extraBasic, version, project } = this.config;
    const basic_info = {
      project
    };
    const data = {};
    data["basic_info"] = Object.assign(basic_info, extraBasic);
    data["event_list"] = this.trackList;
    data["version"] = version;
    // 请求数据是否可以压缩一下
    instance({
      method: "post",
      url,
      data
    })
      .then(response => {
        if (response.status === 200 && response.data.code === 0) {
          console.log("Success:", response);
          this.trackList = [];
        } else {
          //上报失败重新上报，并统计失败数量
          this.postTrackDataAgain(url, data);
          const newData = { ...data };
          newData.name = `${this.connfig.project}_error_track_data`;
          this.postTrackDataAgain(url, newData);
        }
      })
      .catch(error => {
        console.error("Error:", error);
        this.trackList = [];
      });
  }

  postTrackDataAgain(url, data) {
    // 请求数据是否可以压缩一下
    instance({
      method: "post",
      url,
      data
    })
      .then(function(response) {
        if (response.status === 200 && response.data.code === 0) {
          console.log("Success:", response);
          this.trackList = [];
        } else {
          //上报失败重新上报，并统计失败数量
          this.postTrackDataAgain(url, data);
          const newData = { ...data };
          newData.name = `${this.connfig.project}_error_track_data`;
          this.postTrackDataAgain(url, newData);
        }
      })
      .catch(function(error) {
        console.error("Error:", error);
        this.trackList = [];
      });
  }

  // 判断环境
  isBrower() {
    return typeof document !== "undefined";
  }
}

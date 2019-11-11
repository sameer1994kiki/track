(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.track = factory());
}(this, (function () { 'use strict';

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
  class Track {
    constructor(params = {}) {
      this.config = params;
      this.trackList = [];
    }
    init() {
      console.log(1);
      console.log(999);
      this.domEvent();
    }
    domEvent() {
      console.log(555);
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
      const {
        project,
        extraBasic,
        version,
        extraEvent,
        threshold,
        trackUrl
      } = this.config;
      const basic_info = {
        project
      };
      const urlData = this.getUrlParams();
      const cookieData = this.getCookieParams();
      track.extra = Object.assign({ extraEvent }, { urlData }, { cookieData });
      const event_list = {
        client_time: +new Date(),
        event_category: track.type,
        referer: document.referrer || "",
        location: document.location.pathname,
        target: track.name,
        extra: track.extra || {}
      };
      const trackData = {};
      trackData["basic_info"] = Object.assign(basic_info, extraBasic);
      this.trackList.push(event_list);
      trackData["event_list"] = this.trackList;
      trackData["version"] = version;
      if (this.trackList.length >= threshold && fetch)
        this.postTrackData(trackUrl, trackData);
    }
    // 获取url上的参数
    getUrlParams() {
      var search =
        typeof document !== "undefined" && document.location.search.length > 0
          ? document.location.search.substring(1)
          : "";
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
      var cookie = typeof document !== "undefined" && document.cookie;
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
    postTrackData(url, data) {
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
  }

  return Track;

})));

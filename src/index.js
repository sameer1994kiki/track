import axios from "axios";

const instance = axios.create({
  mode: "cors",
  headers: {
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  },
});
export default class Track {
  constructor(params = {}) {
    this.config = params;
    this.trackList = [];
    this.timer = "";
    this.page = "";
    this.referrer = "";
    this.location = "";
  }

  init(params = {}) {
    this.config = { ...this.config, ...params };
    this.domEvent();
    this.unload();
  }
  unload() {
    const isBrower = this.isBrower();
    if (isBrower) {
      window.addEventListener("pagehide", () => {
        this.setTimer({
          name: this.page,
          extra: {},
          type: "view",
        });
      });

      // window.addEventListener("error", (event) => {
      //   this.tcFnc({
      //     name: `${this.config.project || ""}-error`,
      //     extra: { event },
      //     type: "click",
      //   });
      // });
    }
  }

  domEvent() {
    const isBrower = this.isBrower();
    if (isBrower) {
      document
        .getElementsByTagName("body")[0]
        .addEventListener("click", (e) => {
          const node = e.target;
          const { dataset } = node;
          let { extra = "{}" } = dataset;
          const { track } = dataset;
          // 判断是元素节点，且元素节点上绑定了click事件，且有自定义属性data-track
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
              type: "click",
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
            type: "click",
          }
        : {
            ...{
              name: "",
              extra: {},
              type: "click",
            },
            ...track,
          };
    this.initData();
    this.setTimer(track);
    this.saveStrackData(track);
  }
  initData() {
    try {
      if (typeof localStorage === "object") {
        const track_data = localStorage.getItem("track_data") || "[]";
        const track_timer = localStorage.getItem("track_timer") || "";
        const track_page = localStorage.getItem("track_page") || "";
        const track_referrer = localStorage.getItem("track_referrer") || "";
        const track_location = localStorage.getItem("track_location") || "";
        this.trackList = JSON.parse(track_data);
        this.timer = track_timer;
        this.page = track_page;
        this.referrer = track_referrer;
        this.location = track_location;
      }
    } catch {
      this.clearTrackData();
    }
  }

  setTimer(track) {
    if (track.type === "view") {
      const isBrower = this.isBrower();
      this.referrer = this.location;
      this.location = isBrower ? document.location.pathname : "";
      if (this.timer) {
        // 这里做一个简单的深拷贝
        const countTrack = JSON.parse(JSON.stringify(track));
        const tp = +new Date() - Number(this.timer);
        countTrack.name = this.page;
        countTrack.type = "count";
        countTrack.extra.count = tp;
        if (countTrack.name) {
          this.saveStrackData(countTrack);
        }
        this.timer = "";
        this.page = "";
      } else {
        this.timer = +new Date();
        this.page = track.name;
      }
      if (typeof localStorage === "object") {
        localStorage.setItem("track_location", this.location);
        localStorage.setItem("track_referrer", this.referrer);
        localStorage.setItem("track_timer", this.timer);
        localStorage.setItem("track_page", this.page);
      }
    }
  }

  saveStrackData(track) {
    const { extraEvent = {}, threshold, preFix, log, urlData } = this.config;
    const isBrower = this.isBrower();
    const urlParams = urlData ? this.getUrlParams() : {};
    track.extra = { ...track.extra, ...urlParams, ...extraEvent };
    let referrer = isBrower ? document.referrer : "";
    if (referrer) {
      referrer = referrer.replace(/http:\/\/\S+?\//g, "").split("?");
      referrer = "/" + referrer[0];
    }

    const event_list = {
      event_id: `${preFix || ""}-${track.name}`,
      client_time: +new Date(),
      event_category: track.type,
      referrer: this.referrer,
      location: isBrower ? document.location.pathname : "",
      extra: track.extra || {},
    };
    this.trackList.push(event_list);
    if (typeof localStorage === "object") {
      localStorage.setItem("track_data", JSON.stringify(this.trackList));
    }

    if (log) {
      console.log(this.trackList);
    }
    if (this.trackList.length >= threshold || track.immediate === true)
      this.postTrackData(track);
  }

  // 上传数据
  postTrackData(track) {
    const {
      trackUrl: url,
      initBasic = {},
      version,
      project,
      cookieData,
    } = this.config;
    const basic_info = {
      project,
    };
    const data = {};
    const cookieParams = cookieData === true ? this.getCookieParams() : {};
    data.basic_info = {
      ...{
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      },
      ...basic_info,
      ...cookieParams,
      ...initBasic,
    };
    data.event_list = this.trackList;
    data.version = version;
    // 请求数据是否可以压缩一下
    instance({
      method: "post",
      url,
      data,
    })
      .then((response) => {
        if (response.status === 200 && response.data.code === 0) {
          this.clearTrackData();
        } else {
          //  上报失败重新上报，并统计失败数量
          this.postTrackDataAgain(url, data);
          const newData = { ...data };
          newData.event_id = `${this.connfig.project}_error_track_data`;
          this.postTrackDataAgain(url, newData);
        }
      })
      .catch(() => {
        this.clearTrackData();
      })
      .finally(() => {
        if (track.cb) {
          track.cb();
        }
      });
  }

  postTrackDataAgain(data) {
    const { trackUrl: url } = this.config;
    instance({
      method: "post",
      url,
      data,
    }).finally(() => {
      this.clearTrackData();
    });
  }
  clearTrackData() {
    this.trackList = [];
    if (typeof localStorage === "object") {
      localStorage.setItem("track_data", this.trackList);
    }
  }

  // 判断环境
  isBrower() {
    return typeof document !== "undefined";
  }

  // 获取url上的参数
  getUrlParams() {
    const isBrower = this.isBrower();
    let search = "";
    if (isBrower) {
      search = document.location.search;
      search = search.length > 0 ? search.substring(1) : "";
    }
    const searchArray = search.length > 0 ? search.split("&") : []; // 获取链接上已有的参数
    const searchObject = {};
    let obj = {};
    for (let i = 0, l = searchArray.length; i < l; i += 1) {
      const item = searchArray[i].split("=");
      const a = item[0];
      const b = item[1];
      searchObject[a] = b;
    }
    obj = { ...obj, ...searchObject };
    return obj;
  }

  // 获取cookie中参数
  getCookieParams() {
    let cookie = "";
    const isBrower = this.isBrower();
    if (isBrower) {
      ({ cookie } = document);
    }
    let obj = {};
    const cookieObject = {};
    if (!cookie || cookie === "") {
      return obj;
    }
    cookie = cookie.split("; ");
    for (let i = 0, l = cookie.length; i < l; i += 1) {
      const item = cookie[i].split("=");
      const a = item[0];
      const b = item[1];
      cookieObject[a] = b;
    }
    obj = { ...obj, ...cookieObject };
    return obj;
  }
}

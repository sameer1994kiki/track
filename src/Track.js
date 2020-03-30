// {
//   trackUrl: 'https://collector.wmzy.com/log-collect/app-behavior-upload',
//   version: '1.0.0',
//   threshold: 4,
//   project: 'MECE',
//   preFix: 'MECE-H5',
//   cookieData: true,
//   urlData: true,
//   log: true,
//   initBasic: {
//     // platform: 'android', // 平台 ，ios ， android，baidu_miniprogram,wechat_miniprogram，tt_miniprogram，pc：必填：枚举，小写
//     is_h5: '1111', // 是否为 H5 页面：原生选填，仅为h5必填字段，默认不是，原生会缺省，缺省不是，1 表示为 H5
//     is_outside_app: '1', // 是否在 APP 外：原生选填，H5必填：缺省不是，1 表示 app 外
//     // third_channel_id: '10001', //三级渠道id
//     // second_channel_id: '66666', //二级渠道id
//   }, //额外的基础数据
//   extraEvent: { bbb: 9999 },
// }
import axios from "axios";

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
    this.timer = null;
    this.page = null;
  }

  init(params = {}) {
    this.config = { ...this.config, ...params };
    this.domEvent();
    this.unload();
  }
  unload() {
    // window.addEventListener('beforeunload', function(event) {
    //   this.setTimer({
    //     name: this.page,
    //     extra: {},
    //     type: 'view',
    //   });
    // });
    // window.addEventListener('hashchange', function(event) {
    //   debugger;
    // });

    // window.addEventListener('popstate', function(event) {
    //   debugger;
    // });

    window.addEventListener("pagehide", function(event) {
      this.setTimer({
        name: this.page,
        extra: {},
        type: "view"
      });
    });
    // window.addEventListener('pageshow', function(event) {
    //   debugger;
    // });
    // window.addEventListener('onunload', function(event) {
    //   debugger;
    // });
    // window.addEventListener('error', function(event) {
    //   debugger;
    //   console.log(event);
    // });
  }

  domEvent() {
    const isBrower = this.isBrower();
    if (isBrower) {
      document.getElementsByTagName("body")[0].addEventListener("click", e => {
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
        : {
            ...{
              name: "",
              extra: {},
              type: "click"
            },
            ...track
          };
    this.setTimer(track);
    this.saveStrackData(track);
  }

  setTimer(track) {
    if (track.type === "view") {
      if (this.timer) {
        // 这里做一个简单的深拷贝
        const countTrack = JSON.parse(JSON.stringify(track));
        const tp = +new Date() - this.timer;
        countTrack.name = this.page;
        countTrack.type = "count";
        countTrack.extra.count = tp;
        this.saveStrackData(countTrack);
        this.timer = null;
        this.page = null;
      } else {
        this.timer = +new Date();
        this.page = track.name;
      }
    }
  }

  saveStrackData(track) {
    const { extraEvent, threshold, preFix } = this.config;
    const isBrower = this.isBrower();
    const urlData = this.getUrlParams();

    track.extra = { ...track.extra, ...urlData, ...extraEvent };
    const event_list = {
      event_id: `${preFix || ""}-${track.name}`,
      client_time: +new Date(),
      event_category: track.type,
      referer: isBrower ? document.referrer : "",
      location: isBrower ? document.location.pathname : "",
      extra: track.extra || {}
    };
    this.trackList.push(event_list);

    if (this.trackList.length >= threshold) this.postTrackData();
  }

  // 上传数据
  postTrackData() {
    const { trackUrl: url, initBasic, version, project } = this.config;
    const basic_info = {
      project
    };
    const data = {};
    const cookieData = this.getCookieParams();
    data.basic_info = { ...basic_info, ...cookieData, ...initBasic };
    data.event_list = this.trackList;
    data.version = version;
    // 请求数据是否可以压缩一下
    instance({
      method: "post",
      url,
      data
    })
      .then(response => {
        if (response.status === 200 && response.data.code === 0) {
          this.trackList = [];
        } else {
          //  上报失败重新上报，并统计失败数量
          this.postTrackDataAgain(url, data);
          const newData = { ...data };
          newData.event_id = `${this.connfig.project}_error_track_data`;
          this.postTrackDataAgain(url, newData);
        }
      })
      .catch(() => {
        this.trackList = [];
      });
  }

  postTrackDataAgain(data) {
    const { trackUrl: url } = this.config;
    instance({
      method: "post",
      url,
      data
    }).then(() => {
      this.trackList = [];
    });
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
      search = document.location.search.length > 0 ? search.substring(1) : "";
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

const data = {
  version: "1.0", // 数据格式版本

  // 事件列表
  event_list: [
    {
      event_id: "1000", // 事件id，系统分配：必填：
      location: "", //统一使用路由
      referer: "/school/detail", // 上一个页面的url，如果缺失传空字符串，如果是首次启动传字符串"first"
      client_time: 1558448123697, // 事件时间：必填：毫秒
      event_category: "", // click,view（根据业务的侵袭性判断是否需要上传）事件分类，方案还在讨论中，LogCollector 做数据分流
      extra: {} // 事件独有的部分
    }
  ],
  basic_info: {
    project: "MECE", //项目名称，和埋点上报系统保持一致
    platform: "android", // 平台 ，ios ， android，baidu_miniprogram,wechat_miniprogram，tt_miniprogram，pc：必填：枚举，小写
    is_h5: "1", // 是否为 H5 页面：原生选填，仅为h5必填字段，默认不是，原生会缺省，缺省不是，1 表示为 H5
    is_outside_app: "1", // 是否在 APP 外：原生选填，H5必填：缺省不是，1 表示 app 外
    third_channel_id: "10001", //三级渠道id
    second_channel_id: "66666", //二级渠道id

    // vcode: "88", // 原生-客户端版本号-h5使用-程序使用：必填：人为维护：
    app_version: "6.7.1", // 线上用户看到的版本：必填：人为维护
    app_name: "", //app应用name：wmzy，linkto：必填：
    net_type: "MOBILE", // 网络类型，wifi，移动网络：必填
    net_operators: "", // 运营商，移动，联通，电信：必填
    sys_version: "6.0", //系统版本，ios，android：必填
    brand: "vivo vivo Y67A", //具体机型：必填
    download_source: "vivo", // 应用下载的渠道：人为维护：必填：
    device_id: "11b96fccb663091c16f9d74e39b30da1", // 唯一设备：只要用户不清除缓存和重新安装，就可以用来定位同一个用户（游客），也可以定位用户是否卸载过APP，app外没有：必填：
    user_agent:
      "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
    // user-agent H5独有，可以解析：浏览器软件，版本号，platform：必填

    uid: "23889975", // 用户id：登录就有，游客没有
    // diploma_id: "5", //目前的业务逻辑：游客不能改，注册用户可以改（锁分前）// 学历本科7，专科5，不分13：必填：
    stu_province_id: "410000000000", // 高考省份：必填：
    wenli: "1", // 用户文理：必填：
    score: "330", // 用户分数：必填：
    score_rank: "190021", // 排名：必填：
    score_type: "score", // 用户是否输入排名:有输入 rank,没有输入 score
    opt_course_ids: "[]", // 选考科目，浙江上海用

    k12_sch_id: "5a9f63d9b97bd21ce3255ac5", // 高中学校id：必填：
    city_id: "410200000000", // 高中学校城市：必填：
    province_id: "410000000000", // 高中省份：必填：
    region_id: "410221000000", // 高中学校的地区id：必填：

    // 以下字段确定用户批次
    diploma_id: "13", //本专科
    batch: "0", //批次
    batch_ex: "0", //扩展批次
    enroll_stage: "1" //段位
  }
};

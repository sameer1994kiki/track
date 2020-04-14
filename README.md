### 使用方法

```
<!-- 首先进行实例化 -->

const config = {
    trackUrl: 'https://collector.wmzy.com/log-collect/app-behavior-upload',//埋点上报接口
    version: '1.0.0',//埋点版本号
    threshold: 2, //上报阈值
    project: 'MECE',//项目名称
    preFix: 'MECE-H5',//埋点字段前缀
    cookieData: true,//是否获取 cookie 中的字段
    urlData: true,//是否获取 url 中的字段
    log: true,//是否要打印 log 到控制台进行调试
    initBasic: {//基础字段初始化
    // platform: 'android', // 平台 ，ios ， android，baidu_miniprogram,wechat_miniprogram，tt_miniprogram，pc：必填：枚举，小写
    // uid: '',
    is_h5: '1', // 是否为 H5 页面：原生选填，仅为 h5 必填字段，默认不是，原生会缺省，缺省不是，1 表示为 H5
    is_outside_app: '1', // 是否在 APP 外：原生选填，H5 必填：缺省不是，1 表示 app 外
    // third_channel_id: '10001', //三级渠道 id
    // second_channel_id: '66666', //二级渠道 id
    },
    extraEvent: {},//额外的 extar 字段
}
const track = new Track(config)
track.init(config);//埋点初始化，可以对字段再次进行初始化，已经初始化的字段会被覆盖，未初始化的字段会新增
```

### 使用场景

##### 标记式收集

==优点==：使用简单，不需要引入埋点函数,可以自动传入目标元素内的文字。

==缺点==：只能支持 click 类型的埋点，额外字段需要使用 JSON.stringify 转换

```

在需要埋点的元素上添加 data-track(且需要埋点元素上有 onClick 事件)，使用 data-extra 传递额外数据（没有可不写）

<div data-track='10002' data-extra={JSON.stringify({test:123})} onClick={this.test}>
test
</div>
```

##### 命令式收集

==优点==：可应对复杂场景埋点需求

==缺点==：需要引用埋点函数

```
track.tcFnc({
name:"10024",
type:'click',
extra:{}
})
Tips：当 type 类型为 click，且 extra 中没有额外参数时，可简写成

track.tcFnc('10024')
```

### 初始化 config 参数：

| 参数       | 说明                                     | 类型    | 默认值 | 是否必填 | 备注                                                                          |
| ---------- | ---------------------------------------- | ------- | ------ | -------- | ----------------------------------------------------------------------------- |
| trackUrl   | 埋点上报接口                             | string  | 无     | 是       | 目前所有项目均为:"https://collector.wmzy.com/log-collect/app-behavior-upload" |
| version    | 埋点组件版本号                           | string  | 无     | 是       |
| threshold  | 上报阈值                                 | number  | 无     | 是       |
| project    | 项目名称                                 | string  | 无     | 是       |
| preFix     | 上报前缀                                 | string  | 无     | 是       |
| cookieData | 是否添加 cookie 中的所有内容到基础参数中 | boolean | false  | 否       |
| urlData    | 是否添加 url 种的参数到 extra 中         | boolean | false  | 是       |
| log        | 是否打印埋点数据到控制台                 | boolean | false  | 是       |
| extraEvent | 统一添加额外的 extar 字段                | object  | {}     | 否       | 尽量不要使用该字段，如果有通用的额外字段，应首先考虑放入基础字段中            |

### initBasic

初始化基础字段 object {} 否 用于接受外界传入的初始化字段，比如渠道 id，用户信息，是否 h5 等字段

### track.tcFnc()参数：

```
1.参数为字符串时  track.tcFnc("10002"),此时默认为click类型，extra为{}

2.参数为对象时
```

| 参数  | 说明         | 类型   | 默认值 | 是否必填 | 备注                                                                    |
| ----- | ------------ | ------ | ------ | -------- | ----------------------------------------------------------------------- |
| name  | 埋点名称     | string | 无     | 是       | 在http://192.168.150.19:9999/index/buried_point/buriedpoint/add/处生成  |
| type  | 埋点类       | string | click  | 否       | 可选:click ｜ view ｜ count                                             |
| extra | 额外说明字段 | object | {}     | 否       | url 中的参数会默认放到 extra 中，如有必要，在埋点文档中解释说明字段含义 |

## ==Tips==：

1.H5 每个页面必须埋点，否则获取不到 referrer，页面统计时间无需关注，每个埋点的页面会自行统计页面停留时间，(各个业务可以根据情况在路由跳转时统一处理，如果有个别无法处理，需要通过命令式埋点自行处理)  
2.基础字段类型全部为 string

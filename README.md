# track
track data


##  使用方法
```
import Track from 'sameer-track'
<!-- 首先进行初始化 -->
const track = new Track({
     trackUrl: "https://collector.wmzy.com/log-collect/app-behavior-upload",
     version: "1.0",
     threshold: 4, //最大存储数量
     project: "wmzy-pc" //项目名称,

     extraBasic: { aaa: 666 },额外的基础数据
     extraEvent: { bbb: 9999 },
     cookieData:true,
     urlData:true,
})
track.init();
```
```
<!-- 命令式收集 -->
track.tcFnc({
  name:"track-name",
  type:'view',
  extra:{}
})

or

track.tcFnc({
  name:"track-name",
  type:'click',
  extra:{}
})
等同于
track.tcFnc('track-name')
```
```

<!-- 标记式 -->
或者在需要埋点的元素上添加data-track,
使用data-extra传递额外数据（备注：需要埋点元素上有onClick事件）
<div data-track='track-test' data-extra='{a:1}' onClick={this.test}>test</div>

```

| 参数              | 说明         | 类型             | 默认值 | 备注                                              |
| ----------------- | ------------ | ---------------- | ------ | ------------------------------------------------- |
| track.tcFnc()参数 | 字符串或对象 | number or object | 必填   | 若为字符串，则会被转换成埋点名称，tyoe默认为click |
| name              | 埋点名称     | string           | 必填   | 语义化的埋点名称                                  |
| type              | 埋点类型     | string           | click  | 目前支持click和view                               |
| extra             | 额外参数     | object           | {}     | 补充说明字段                                      |
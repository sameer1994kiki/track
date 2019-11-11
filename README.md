# track
track data


##  使用方法
```
import Track from 'sameer-track'
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
track.tcFnc({
  name:"track-name",
  type:'view',
  extra:{}
})
或者在需要埋点的元素上添加data-track,使用data-extra传递额外数据（备注：需要埋点元素上有onClick事件）

```
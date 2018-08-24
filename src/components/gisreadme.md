# HMap

  &nbsp;&nbsp;&nbsp;&nbsp;`HMap`是以一个用于开发WebGIS客户端的**JavaScript**包。底图数据来源于Google Maps, 与其他的图层在HMap中进行叠加, 目前对点要素的支持比较友好, 可以通过HMap直接在地图上增加点类要素或者通过geojson文件批量添加点类要素( geojson文件格式见文末), 且每一个要素图层都支持聚合功能并可以自定义每个图层聚合时候的样式。
  &nbsp;&nbsp;&nbsp;&nbsp;`HMap` 除了可以在浏览器中帮助开发者实现地图浏览的基本效果, 比如放大( Zoom In)、缩小( Zoom Out)、平移( Pan)等常用操作之外, 还可以进行要素选择、图层叠加、图层显隐性、长度测量、面积测量、弹框、鼠标点击事件、鼠标移动事件等不同的操作。

---

## 开始HMap项目

导入该js包到你的项目:

```js
<script src="http://192.168.130.99:9090/hgis.js"></script>
```

<!-- ## 支持的浏览器 -->

<!-- OpenLayers runs on all modern browsers that support [HTML5](https://html.spec.whatwg.org/multipage/) and [ECMAScript 5](http://www.ecma-international.org/ecma-262/5.1/). This includes Chrome, Firefox, Safari and Edge. For older browsers and platforms like Internet Explorer (down to version 9) and Android 4.x, [polyfills](http://polyfill.io) for `requestAnimationFrame` and `Element.prototype.classList` are required, and using the KML format requires a polyfill for `URL`. -->

---
## 文档



### 1.初始化地图
```
new Hmap(options)
```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | target| string, 必填| 地图容器div的Id|
    | tileSize| integer, 可选| 瓦片大小|
    | measureTool| boolean, 可选| 是否显示地图的测量工具|
    | center| array, 必填| 地图初始化的时候的中心点|
    | zoom| Integer, 可选| 地图初始化的时候的缩放等级, 1~19|
    | minZoom| Integer, 可选| 地图可以缩放到的最小的等级, 1~19|
    | maxZoom| Integer, 可选| 图可以缩放到的最大的等级, 1~19|
    | scaleline| boolean, 可选| 是否显示比例尺控件|
    | onMouseClick| function, 可选| 添加地图的鼠标点击事件, 参数e表示鼠标点击位置的经纬度坐标, 具体方法请自定义|
 

* 返回：

    | 返回类型 | 说明 |
    | :--------| :------ |
    | map| 返回一个map对象|
 

* 示例：

    ```js
    const map = new HMap({
        target: 'mymap',
        center: [106.5330213116639, 29.573542949153037],
        zoom: 16,
        minZoom: 6,
        maxZoom: 19,
        scaleline: false,
        // onMouseClick: (e) => {console.log(e)},
      })
    ```

---

### 2.增加图层( 含聚合功能)


##### `新建一个空的矢量图层`
```
map.addLayer(layername, distance, clusterimg)
```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | layername| string, 必填| 图层名称|
    | distance| Integer, 必填| 聚合的距离(像素单位)|
    | clusterimg| string, 必填| 该图层聚合时候的聚合样式图片地址|
 

* 返回：

    | 返回类型 | 说明 |
    | :--------| :------ |
    | layer| 返回一个layer矢量图层|
  

* 示例：

```js
const layer = map.addLayer('layer1', 80, './sources/ttt.jpg')
```

##### `添加一个通过拖曳文件的方式添加图层的方法, 目前支持的可拖曳添加的文件格式有geojson\topojson\kml\GPX\IGC`
```
map.batchAddDrag(layername, distance, clusterimg)
```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | layername| string, 必填| 图层名称|
    | distance| Integer, 必填| 聚合的距离(像素单位)|
    | clusterimg| string, 必填| 该图层聚合时候的聚合样式图片地址|
 

* 返回：

    | 返回类型 | 说明 |
    | :--------| :------ |
    | layer| 返回通过拖动文件到地图的方法而添加到地图上的图层|
  

* 示例：

```js
const draglayer = map.batchAddDrag('draglayer', 40, './sources/ttt.jpg')
```
##### `通过url地址的方式, 添加geojson文件`
  通过一个给定文件的geojson文件的url地址, 来添加该文件到地图
```
map.batchAddUrl(layername, url, distance, clusterimg)
```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | layername| string, 必填| 图层名称|
    | url| string, 必填| geojson文件的url|
    | distance| Integer, 必填| 聚合的距离(像素单位)|
    | clusterimg| string, 必填| 该图层聚合时候的聚合样式图片地址|
 

* 返回：

    | 返回类型 | 说明 |
    | :--------| :------ |
    | layer| 返回该文件在地图上所形成的图层|
  

* 示例：

```js
const testgeojsonlayer = map.batchAddUrl('testgeojsonlayer','./sources/map.geojson', 40, './sources/yyy.jpg')
```
 ---

### 3.图层事件

##### `添加一个简单的点要素`
  在某个存在的图层上添加点要素
 
```
layer.addPoint(options)
```
 * 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | coor| array, 必填| 需要添加的点要素的经纬度坐标|
    | img| string,可选|需要添加的点的图片地址|
    | imgrealwidth| number,可选| 图片真实的宽度, 如果与imgtargetwidth宽度相同或者不设置该参数, 则图片1:1显示|
    | imgtargetwidth| number,可选| 想要的图片宽度, 如果与imgrealwidth宽度相同或者不设置该参数, 则图片1:1显示|
    | onClick| function,可选| 可以设置该点的点击事件|
    | onHover| function,可选| 可以设置该点的鼠标悬停方法|
    | onMouseOut| function,可选| 可以设置鼠标移出该点的时候的方法|
    | extraArgs| object, 可选| 可以添加该要素的一些额外的信息, 比如地名等|
   
 * 返回：

    | 返回类型 | 说明 |
    | :--------| :------ |
    | point| 返回新建的点要素|
 

 * 示例1：添加一个不带事件的点

  ```js
  const point = layer.addPoint({
    coor: [107.12, 29.4],
    img: './sources/ttt.jpg',
    imgsize: [10, 10],
    extraArgs: {
      aaa: 1,
      bbb: 2,
      ccc: 3,
    }
  })
  ```

 * 示例2：添加一个带有鼠标点击事件的点要素
```js
const point = layer.addPoint({
  coor: [107.12, 29.4], 
  img: './sources/ttt.jpg',
  imgsize: [10, 10],
  onClick: function(e, extraArgs) {
    map.unPopUpWindow(popup1)
    const popup = map.popUpWindow(point, "<div>click</div>")
    point.setStyle({img: './sources/yyy.jpg'})
    setTimeout(() => {
      map.unPopUpWindow(popup)
    }, 1000)
  },
  extraArgs: {
    aaa: 1,
    bbb: 2,
    ccc: 3,
  }
})
```

* 示例3：添加一个带有鼠标悬停和鼠标移除要素功能的点要素

```js
let popup1
const point = layer.addPoint({
  coor: [107.12, 29.4], 
  img: './sources/ttt.jpg',
  imgsize: [10, 10],
  onHover: function(e, extraArgs) {
    popup1 = map.popUpWindow(point, "<div>move</div>")
    console.log(123132)
  },
  onMouseOut: function(extraArgs){
    map.unPopUpWindow(popup1)
    console.log(11)
  },
  extraArgs: {
    aaa: 1,
    bbb: 2,
    ccc: 3,
  }
})
```

##### `删除某个图层上的点`
```
layer.deletePoint(point)
```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | point| point, 必填| 需要删除的某个点|
  

* 返回：

    | 返回类型 | 说明 |
    | :--------| :------ |
    | point| 返回删除的点要素|
  

* 示例：

```js
const deletedpoint = layer.deletePoint(point)
```

##### `设置图层的显示/隐藏`
```
layer.setVisible(isVisible)
```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | isVisible| boolean, 可选| true:显示；false:隐藏|
 

* 返回： null

* 示例：
 ```js
 layer.setVisible(true)
 ```
 ---

### 4.地图事件

##### `添加地图弹窗事件`
```
map.popUpWindow(point, popupdiv)
```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | point| point, 必填| 需要弹窗的点要素|
    | popupdiv| string, 可选| 弹窗上要展示的div信息|
 

* 返回：

    | 返回类型 | 说明 |
    | :--------| :------ |
    | popup| 返回该弹窗|
 

* 示例：
```js
const popup = map.popUpWindow(point, "<div>hello</div>")
```
##### `关闭地图弹窗事件`
```
map.unPopUpWindow(popup)
```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | popup| popup, 必填| 需要关闭的某个弹窗|
  

* 返回：null

* 示例：
```js
map.unPopUpWindow(popup)
```
##### `删除图层`
```
map.clearLayer(layername)
```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | layername| string, 必填| 需要删除的图层名称|
 

* 返回：null

* 示例：
```js
map.clearLayer('drawLayer')
```

##### `设置地图的中心点(带动画效果)`
  非地图初始化的时候可用该方法设置地图的中心位置(带动画效果)

```
map.setMapCenter(coordinate, time)
```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | coordinate| array, 必填| 中心点坐标|
    | time| integer, 可选| 动画持续时间, 默认为200|
  

* 返回：null

* 示例：

```js
map.setMapCenter([106.90580139160156, 29.321567709155204], 1500)
```

##### `设置地图的中心点(不带动画效果)`
  非地图初始化的时候可用该方法设置地图的中心位置( 不带动画效果)
```
map.setMapCenterWioutAnimation(coordinate)
```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | coordinate| array, 必填| 中心点坐标|
  

* 返回：null

* 示例：

 ```js
 map.setMapCenterWioutAnimation([107.90580139160156, 29.321567709155204])
 ```

 ##### `多边形选择要素功能`
  地图的多边形选择功能, 绘制在图层名为'drawLayer'的图层上
 ```
 map.selectedFeatures(styleoptions,callback)
 ```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | styleoptions| object, 可选| completeStyle: 绘制完成时多边形的样式, drawingStyle: 绘制时候的多边形的样式|
    | callback| function, 必填| 多边形选择结束时返回的选中要素( points)的处理方法, 可自定义|
   

* 返回：null

* 示例：

```js
map.selectedFeatures(
  {
    // completeStyle: {
    //   strokeStyle: {
    //     color: '#ffcc33',
    //     width: 2,
    //   },
    //   fillStyle: {
    //     color: 'rgba(255, 255, 255, 0.2)',
    //   },
    // },
    // drawingStyle: {
    //   strokeStyle: {
    //     color: 'rgba(0, 0, 0, 0.5)',
    //     lineDash: [10, 10],
    //     width: 2,
    //   },
    //   fillStyle: {
    //     color: 'rgba(255, 255, 255, 0.2)',
    //   },
    // }
  },
  (points) => {
    console.log(points)
    // 清除绘制的多边形图层
    // map.clearLayer('drawLayer')
  }
)
```
---


### 5.点(point)要素事件

##### `设置点要素的样式图片`
```
point.setStyle(options)
```
* 方法参数：

    | 参数 | 参数类型 | 参数说明 |
    | :-------- | :--------| :------ |
    | imgurl| string,必填| 要素的样式图片地址|
    | imgrealwidth| number,可选| 图片真实的宽度, 如果与imgtargetwidth宽度相同或者不设置该参数, 则图片1:1显示|
    | imgtargetwidth| number,可选| 想要的图片宽度, 如果与imgrealwidth宽度相同或者不设置该参数, 则图片1:1显示|
 

* 返回：null

* 示例：

```js
point.setStyle({img: './sources/yyy.jpg',imgrealwidth:40, imgtargetwidth:60})
```
---
### 附：geojson格式文件示例和说明
```json
{
	"type":"FeatureCollection",
	"features":[
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [106.49936292651289, 29.616354580389725]
			},
			"properties": {
				"name": "光电园",
				"imgsrc": "./sources/yyy.jpg",
				"imgrealwidth": 20,
				"imgtargetwidth":60,
				"clickpopucontent": "<div>12</div>",
				"hoverpopucontent": "光电园"
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [106.53303966924105, 29.573545300570714]
			},
			"properties": {
				"name": "观音桥",
				"imgsrc": "./sources/lll.jpg",
				"hoverpopucontent": "观音桥"
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [106.64164877851145, 29.719161524341843]
			},
			"properties": {
				"name": "江北国际机场",
				"hoverpopucontent": "江北国际机场"
			}
		}
	]
}
```
**说明**：geojson文件以.geojson为后缀。每个点要素主要含有3个属性：`type、geometry、properties`.
&nbsp;&nbsp;&nbsp;&nbsp;`geometry`含有坐标信息;
&nbsp;&nbsp;&nbsp;&nbsp;`properties`里面定义各种属性信息, 当含有“`name`”属性时, 会在多边形选择后返回该对象的所有的属性信息; 当含有“`hoverpopucontent`”属性时,当鼠标移动到该点要素上的时候, 会弹框显示hoverpopucontent属性的值; 当需要给点设置对应的样式时, 请将img的url设置为`imgsrc`属性；如需重新指定图片的大小, 请将图片的真实宽度设置为`imgrealwidth`属性, 将需要改变成的宽度设置为`imgtargetwidth`属性；如需设置鼠标点击时弹窗展示的信息, 请设置在`clickpopucontent`属性。如上面的示例所示。

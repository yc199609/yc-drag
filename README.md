# yc-drag

[`React.js`](https://facebook.github.io/react/) 支持多行无固定轴的列表拖放库

[![npm](https://img.shields.io/npm/v/yc-drag.svg)](https://www.npmjs.com/package/yc-drag)[![SemVer](https://img.shields.io/badge/SemVer-2.0.0-brightgreen.svg)](http://semver.org/spec/v2.0.0.html)



## 样例

![](http://great_yc.gitee.io/image/example.gif)

## 安装

```bash
# yarn
yarn add yc-drag

#npm
npm install yc-drag --save
```

## API

那么你如何使用库？

## `Drag`

yc-drag暴露一个组件供你进行拖拽



### Props

| 属性名     | 描述                                                | 类型               | 默认值     |
| ---------- | --------------------------------------------------- | ------------------ | ---------- |
| lists      | 数据数组，用于生成拖拽项                            | Array(required)    | []         |
| dragKey    | 数组项中作为key的属性的名称                         | String(required)   | 'id'       |
| itemRender | 被拖拽元素的渲染函数                                | Function(required) | () => null |
| dragEnd    | 拖拽结束时的回调函数,入参是拖拽完成更改后的数据数组 | Function(required) | () => null |
| extra      | 在容器元素中的额外渲染元素                          | ReactNode          | null       |
| className  | 容器元素的类名                                      | String             | null       |

### 基本用法

```jsx
import React, { useState } from 'react';
import { render } from 'react-dom';
import { list } from './datas';

const App = () => {
	const [_lists, setLists] = useState(list);
    
    const itemRender = (item)=> {
        return (<div
          style={{
            width: '50px',
            height: '30px',
            backgroundColor: 'pink'
          }}
        >{item.container}</div>);
  	}
   

  render() {
    return (
        <Drag
          style={{
            backgroundColor: 'skyblue',
            minHeight: '300px'
          }}
          lists={_lists}
          dragKey='id'
          itemRender={itemRender}
          dragEnd={setLists}
        />
      )
  }
}

render(<App />, document.getElementById('root'))
```



```js
// datas.js
export const list = [
  {
    id: 'y',
    container: 'y'
  },
  {
    id: 'c',
    container: 'c'
  },
  {
    id: 'd',
    container: 'd'
  },
  {
    id: 'u',
    container: 'u'
  },
  {
    id: 'k',
    container: 'k'
  },
  {
    id: 'o',
    container: 'o'
  },
  {
    id: 'j',
    container: 'j'
  },
  {
    id: 'b',
    container: 'b'
  },
  {
    id: 'a',
    container: 'a'
  },
  {
    id: 's',
    container: 's'
  },
]
```


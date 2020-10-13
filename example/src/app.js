import React, { useState } from 'react';
import { render } from 'react-dom';
import { list } from './datas';
import Drag from 'yc-drag'; // 引入组件
import 'yc-drag/lib/main.min.css';

const App = () => {
  const [_lists, setLists] = useState(list);

  const itemRender = (item)=> {
    return <div
      style={{
        width: '50px',
        height: '30px',
        backgroundColor: 'pink'
      }}
    >{item.container}</div>;
  }

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
render(<App />, document.getElementById('root'))
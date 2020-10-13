import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

const Drag = (props) => {
  const {
    lists,
    dragKey,
    itemRender,
    dragEnd,
    extra,
    className,
    ...args
  } = props;
  const container = useRef();
  const [itemWidth, setItemWidth] = useState(50);
  const [itemHeight, setItemHeight] = useState(50);
  const [_lists, setLists] = useState(lists);
  const [isdrag, setIsdrag] = useState(false);
  const [dragData, setDragData] = useState({});
  const [preDragList, setPreDragList] = useState();

  useEffect(() => {
    const _itemWidth = document.getElementsByClassName(styles.dragItem)[0].scrollWidth;
    const _itemHeight = document.getElementsByClassName(styles.dragItem)[0].scrollHeight;
    setItemWidth(_itemWidth);
    setItemHeight(_itemHeight);
    container.current.style.setProperty('--width', _itemWidth + 'px');
    container.current.style.setProperty('--height', _itemHeight + 'px');
  },[])

  useEffect(() => {
    setLists(lists);
  }, [lists])

  const onDragStart = (e, item, index) => {
    setIsdrag(true);
    setPreDragList(lists.filter((c,i)=> i !== index));
    setDragData(item);
  }

  const onDrag = (e) => {
    e.target.style.opacity = 0;
  }

  const onMove = (e) => {
    if(!isdrag) return;
    const containerW = container.current.scrollWidth;
    const wSize = Math.floor(containerW / itemWidth);
    const columnNum = Math.abs(Math.floor(e.clientY / itemHeight));
    let cur = columnNum * wSize + Math.floor(e.clientX / itemWidth);
    cur = cur > _lists.length - 1 ? _lists.length - 1 : cur;
    setLists([...preDragList.slice(0, cur), { isBlank: true }, ...preDragList.slice(cur)])
    e.preventDefault();
  }

  const onDragEnd = (e) => {
    setIsdrag(false);
    const cur = _lists.findIndex(item => item.isBlank);
    dragEnd([...preDragList.slice(0, cur), dragData, ...preDragList.slice(cur)]);
  }

  return (
    <div
      ref={container}
      className={`${styles.root} ${className}`}
      onDragOver={onMove}
      onDrop={onDragEnd}
      {...args}
    >
      {
        _lists.map((item, index) => {
          if(item.isBlank){
            return (
              <div key={index} className={styles.blank}>
                <div className={styles.blankson}></div>
              </div>
            )
          }
          return (
            <div
              className={styles.dragItem}
              key={item[dragKey]}
              draggable
              onDragStart={(e)=>onDragStart(e, item, index)}
              onDrag={(e)=>onDrag(e)}
            >
              {
                itemRender(item)
              }
            </div>
          )
        })
      }
      {extra}
    </div>
  )
}

Drag.propTypes = {
  lists: PropTypes.array.isRequired, // 数据数组
  dragKey: PropTypes.string.isRequired, // 数组项中作为key的属性的名称
  itemRender: PropTypes.func.isRequired, // 被拖拽元素的渲染函数
  dragEnd: PropTypes.func.isRequired, // 拖拽结束时的回调函数
  extra: PropTypes.node, // 在容器元素中的额外渲染元素
  className: PropTypes.string, // 容器元素的类名
}

Drag.defaultProps = {
  lists: [],
  dragKey: 'id',
  itemRender: () => null,
  dragEnd: () => null,
  extra: null,
}

export default Drag;
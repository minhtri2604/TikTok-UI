import { useState } from "react";
import "tippy.js/dist/tippy.css"; // optional
import TippyHeadless from "@tippyjs/react/headless";
import { Wrapper as PorperWrapper } from "~/components/Poper";
import PropTypes from 'prop-types';
import styles from "./MenuItem.module.scss";
import classNames from "classnames/bind";
import Header from "./Header";
import Menu from "./Menu";
const cx = classNames.bind(styles);

function MenuItem({ children, items = [], hideOnClick=false}) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const clickOutSide = () => {
    setHistory((prev) => prev.slice(0,1));

  }
  const renderItem = () => {
    return current.data.map((item, index) => {
      const isParent = !!item.children;

      return (
        <Menu
          key={index}
          data={item}
          onClick={()=>{
            if(isParent){
                setHistory(prev => [...prev , item.children])
            }
          }}

        />
      );
    });
  };

  

  return (
    <TippyHeadless

      delay={[0, 500]}
      offset={[0, 5]}
      interactive
      hideOnClick={hideOnClick}
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <PorperWrapper>
            {history.length > 1 && <Header title={current.title} onBack={()=>{
                setHistory(prev => prev.slice(0,history.length-1));
            }}/>}
            <div className={cx("menu-scroll")}>{renderItem()}</div>
          </PorperWrapper>
        </div>
      )}
      onHide={clickOutSide}
    >
      {children}
    </TippyHeadless>
  );
}
MenuItem.propTypes = 
{ 
  children : PropTypes.node,
  items : PropTypes.array,
  hideOnClick : PropTypes.bool,


}

export default MenuItem;

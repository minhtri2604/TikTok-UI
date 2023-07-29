import Header from "~/layouts/components/Header";
import SideBar from "./SideBar";
import PropTypes from 'prop-types';
import styles from './DefaultLayout.module.scss'
import classNames from 'classnames/bind';
import Content from '~/layouts/components/Content/Content'
import { createContext, useState } from "react";
const cx = classNames.bind(styles)
export const themeContext = createContext()
function DefaultLayout() {
    const [theme,setTheme] = useState('light')
    const handleTheme = () =>{
        setTheme(theme === 'light' ? "dark" : "light")
    }
    return (
       <themeContext.Provider value={{theme,handleTheme}}>
            <div className={cx("wrapper",theme)}>
                <Header/>
                <div className={cx("container")}>
                    <SideBar/>
                    <div className={cx("content")}>
                        <Content/>
                    </div>
                </div>
            </div>
       </themeContext.Provider>
      );
}
DefaultLayout.propTypes = {
    children: PropTypes.node,
}


export default DefaultLayout;
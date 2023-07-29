import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./MenuItem.module.scss";
import { themeContext } from "~/layouts/DefaultLayout";
import { useContext } from "react";
import Switch from "react-switch";
const cx = classNames.bind(styles);
function Menu({ data, onClick }) {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const classes = cx("list-item", {
    separate: data.separate,
  });
  const theme = useContext(themeContext);
  return (
    <div className={cx("wrapper")}>
      <button className={classes} onClick={onClick}>
        <span className={cx("icon")}>{data.icon}</span>
        {data.title}
        {data.separate1 && (
            <Switch className={cx('checked')}
              onChange={theme.handleTheme}
              checked={theme.theme === "dark"}
              size="big"
            />
 
        )}
      </button>
    </div>
  );
}

Menu.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
};

export default Menu;

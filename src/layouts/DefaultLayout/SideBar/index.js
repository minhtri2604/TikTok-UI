import styles from "./SideBar.module.scss";
import classNames from "classnames/bind";
import config from "~/config";
import MenuItem from "~/layouts/DefaultLayout/SideBar/Menu/MenuItem.js";

import * as userService from "~/services/userService.js";

import Menu from "~/layouts/DefaultLayout/SideBar/Menu/Menu.js";
import { Home, UserGroup, LiveIcon } from "~/assets/Icons";
import { useEffect, useState } from "react";
import SuggestedAccount from "~/components/SuggestedAccounts";
const cx = classNames.bind(styles);
const isSeeAll = true;
const INIT_PAGE = 1;
const PER_PAGE = 10;
function SideBar() {
  const [page, setPage] = useState(INIT_PAGE);
  const [isSeeALl, setIsSeeALl] = useState(true);

  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const handleChangePage = () => {
    setPage(page + 1);
    setIsSeeALl(false);
  };
  const handleHide = () =>{
    setSuggestedUsers(prev => prev.slice(0,5))
    setIsSeeALl(true)
  }

  useEffect(() => {
    userService
      .getSuggested({ page, perPage: PER_PAGE })
      .then((data) => {
        setSuggestedUsers((prev) => [...prev, ...data]);
      })
      .catch((error) => console.log(error));
  }, [page]);

  return (
    <div className={cx("wrapper")}>
      <Menu>
        <MenuItem title="For you" to={config.routes.home} icon={<Home />} />
        <MenuItem
          title="Folowing"
          to={config.routes.following}
          icon={<UserGroup />}
        />
        <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} />
      </Menu>

      <SuggestedAccount
        onViewChange={handleChangePage}
        onHideChange={handleHide}
        isSeeAll={isSeeALl}
        data={suggestedUsers}
        label="Các tài khoản đang follow"
      />

    </div>
  );
}

export default SideBar;

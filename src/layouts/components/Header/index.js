import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faHeart,
  faKeyboard,
  faMoon,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightToBracket,
  faCoins,
  faEllipsisVertical,
  faGear,
  faLanguage,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import classNames from "classnames/bind";
import styles from "~/layouts/components/Header.module.scss";
import images from "~/assets/images";
import { MessageIcon, InboxIcon } from "~/assets/Icons";
import MenuItem from "~/components/MenuItem";
import Image from "~/components/Image";
import SubSearch from "../SubSearch";
import config from "~/config";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);
const user = true;
const MENU_LIST = [
  {
    icon: <FontAwesomeIcon icon={faLanguage} />,
    title: "Tiếng Việt ",
    children: {
      title: "Language",
      data: [
        {
          code: "vi",
          title: "Tiếng Viết",
        },
        {
          code: "en",
          title: "English",
        },
        {
          code: "de",
          title: "Deutsh",
        },
        {
          code: "tbn",
          title: "espanol",
        },
        {
          code: "fra",
          title: "Franch",
        },
        {
          code: "bdn",
          title: "Portugal",
        },
        {
          code: "ar",
          title: "Argentina",
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Phản hồi và trợ giúp",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Phím tắt trên bàn phím",
  },
  {
    icon: <FontAwesomeIcon icon={faMoon} />,
    title: "Chế độ tối",
    separate1: true,

  },
];

const USER_LIST = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: "Xem hồ sơ",
  },
  {
    icon: <FontAwesomeIcon icon={faHeart} />,
    title: "Yêu thích",
  },
  {
    icon: <FontAwesomeIcon icon={faCoins} />,
    title: "Nhận xu",
  },
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: "Cài đặt",
  },
  ...MENU_LIST,
  {
    icon: <FontAwesomeIcon icon={faArrowRightToBracket} />,
    title: "Đăng xuất",
    separate: true,
  },
];

function Header({onClick}) {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to={config.routes.home} className={cx("logo")}>
          <img src={images.logo} alt="Tiktok" />
        </Link>

        <SubSearch />

        {/* ACTIONS */}
        <div className={cx("actions")}>
          <div className={cx("upload")}>
            <FontAwesomeIcon className={cx("icon-plus")} icon={faPlus} />
            <span>Tải lên</span>
          </div>
          {!user ? (
            <>
              <div className={cx("login")}>
                <span>Login</span>
              </div>
              <MenuItem onClick={onClick} items={MENU_LIST}>
                <button className={cx("vertical")}>
                  <FontAwesomeIcon
                    className={cx("icon-vertical")}
                    icon={faEllipsisVertical}
                  />
                </button>
              </MenuItem>
            </>
          ) : (
            <>
              <Tippy content="Tin nhắn" placement="bottom" delay={[0, 200]}>
                <button className={cx("icon-message")}>
                  <MessageIcon />
                </button>
              </Tippy>

              <Tippy content="Hộp thư" placement="bottom" delay={[0, 200]}>
                <button className={cx("icon-mailbox")}>
                  <span className={cx("mailbox-quantity")}>24</span>
                  <InboxIcon />
                </button>
              </Tippy>

              <MenuItem items={USER_LIST}>
                <button>
                  <Image
                    className={cx("avatar")}
                    src="https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/8bb6dac18deb47a10059e985f371ffb6~c5_720x720.jpeg?x-expires=1690761600&x-signature=7z6p%2BfoQCJw1R5T0avzdY4G84Z4%3D"
                    alt="Minh Trí"
                  />
                </button>
              </MenuItem>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

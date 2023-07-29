import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./AccountItem.module.scss";
import classNames from "classnames/bind";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Image from "~/components/Image";


const cx = classNames.bind(styles);
function AccountPreview({ data }) {
  return (
    <div className={cx("wrapper")}>
      <header className="header">
        <Image className={cx("avatar")} src={data.avatar} alt="" />
        <button className={cx("btn-follow")}>Follow</button>
      </header>
      <div className={cx("infor")}>
        <p className={cx("nickname")}>
          {data.nickname}

          {!!data.tick && <span>
            <FontAwesomeIcon
              className={cx("icon-check")}
              icon={faCircleCheck}
            />
          </span>}

        </p>
        <p className={cx("name")}>
          {data.first_name} {data.last_name}
        </p>
      </div>
      <div className={cx("follow-like")}>
        <p className={cx("follow")}>
          <span className={cx("quantity")}>{data.followers_count} </span>
          Followers
        </p>
        <p className={cx("follow")}>
          <span className={cx("quantity")}>{data.likes_count} </span>
          Likes
        </p>
      </div>
    </div>
  );
}

export default AccountPreview;

import PropTypes from "prop-types";
import TippyHeadless from "@tippyjs/react/headless";

import styles from "./SuggestedAccount.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Wrapper as PorperWrapper } from "~/components/Poper";
import AccountPreview from "./AccountItem/AccountPreview";
import Image from "~/components/Image";
const cx = classNames.bind(styles);

function AccountItem({ data }) {
  const handleDefault = () =>{
    
  }

  const renderPreview = (props) => {
    return (
      <div tabIndex="-1" {...props}>
        <PorperWrapper>
          <div className={cx("preview")}>
            <AccountPreview data={data} />
          </div>
        </PorperWrapper>
      </div>
    );
  };
  return (
    <TippyHeadless
      interactive
      delay={[500, 0]}
      placement="bottom"
      render={ renderPreview }
    >
      <div className={cx("account-item")}>
        <Image className={cx("avatar")} src={data.avatar} alt="avatar" />
        <div className={cx("infor")}>
          <p className={cx("nickname")}>
            <p>{data.nickname}</p>
            {data.tick && (
              <FontAwesomeIcon
                className={cx("icon-check")}
                icon={faCircleCheck}
              />
            )}
          </p>
          <p className={cx("name")}>
            {data.first_name} {data.last_name}
          </p>
        </div>
      </div>
    </TippyHeadless>
  );
}

export default AccountItem;

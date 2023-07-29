import PropTypes from "prop-types";

import styles from "./SuggestedAccount.module.scss";
import classNames from "classnames/bind";
import AccountItem from "./AccountItem";
const cx = classNames.bind(styles);
function SuggestedAccount({ label, isSeeAll = true, data = [], onViewChange,onHideChange }) {
  return (
    <div className={cx("wrapper")}>
      {label && <p className={cx("label")}>{label}</p>}
      {data.map((account) => (
        <AccountItem key={account.id} data={account} />
      ))}

      {isSeeAll ? (
        <p className={cx("see-more")} onClick={() => onViewChange()}>
          Xem thêm
        </p>
      ) : (
        <p className={cx("see-more")} onClick={() => onHideChange()}>
          Ẩn bớt
        </p>
      )}
    </div>
  );
}
SuggestedAccount.propTypes = {
  label: PropTypes.string,
};

export default SuggestedAccount;

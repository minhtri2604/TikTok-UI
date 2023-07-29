import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './AccountItem.module.scss'
import classNames from 'classnames/bind';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import Image from "~/components/Image";
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)
function AccountItem({data}) {
    return ( 
        <Link to={`/@${data.nickname}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar}/>
            <div className={cx('infor')}>
                <span className={cx('user_name')}>
                    {data.full_name}
                    {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck}/>}
                </span>

                <span className={cx('nickname')}>{data.nickname}</span>
            </div>
        </Link>

     );
}
AccountItem.propTypes = {
    data: PropTypes.object,
}

export default AccountItem;
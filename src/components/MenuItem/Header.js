
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MenuItem.module.scss";
import classNames from "classnames/bind";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);
function Header({title,onBack}) {
    return ( 
            <header className={cx('header')}>
                    <button className={cx('onBack')} onClick={onBack} >
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </button>
                    <h4 className={cx('header-title')}>{title}</h4>
            </header>

        
     );
}
Header.propTypes = {
    tittle : PropTypes.string.isRequired,
    onBack : PropTypes.func.isRequired,
}

export default Header;
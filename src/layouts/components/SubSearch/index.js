import TippyHeadless from "@tippyjs/react/headless";
import { Wrapper as PorperWrapper } from "~/components/Poper";
import AccountItem from "~/components/AccountItem";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as searchServices  from "~/services/searchService";

import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import styles from "~/layouts/components/Header.module.scss";
import classNames from "classnames/bind";
import { useDebounce } from "~/hooks";

const cx = classNames.bind(styles);
function SubSearch() {
  const inputRef = useRef();
  const [resultValue, setResultValue] = useState("");
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const debounce = useDebounce(resultValue, 500);


  useEffect(() => {
    if (!debounce.trim()) {
      setResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const result = await searchServices.search(debounce);

      setResult(result);
      setLoading(false);
    };

    fetchApi();
  }, [debounce]);

  const handleClear = () => {
    setResultValue("");
    setResult([]);
    inputRef.current.focus();
  };
  
  const clickOutside = () => {
    setShow(false);
  };
  const handleFocus = () => {
    setShow(true);
  };

  const handleChange = (e) =>{
    const searchValue = e.target.value
    if(!searchValue.startsWith(" ")){
      setResultValue(searchValue)
      
    }

  }

  return (
    <TippyHeadless
      interactive
     appendTo={()=> document.body} 
      visible={show && result.length > 0}
      render={(attrs) => (
        <div className={cx("search-result")} tabIndex="-1" {...attrs}>
          <PorperWrapper>
            <h4 className={cx("account")}>Accounts</h4>
            {result.map((data) => {
              return <AccountItem key={data.id} data={data} />;
            })}
          </PorperWrapper>
        </div>
      )}
      onClickOutside={clickOutside}
    >
      <div className={cx("search")}>
        <input
          ref={inputRef}
          className={cx("search-input")}
          value={resultValue}
          placeholder="Search accounts and videos"
          spellCheck={false}
          onChange={(e) => handleChange(e)}
          onFocus={handleFocus}
        />

        {!!resultValue && !loading && (
          <button className={cx("clear")} onClick={handleClear}>
            <FontAwesomeIcon
              className={cx("icon-clear")}
              icon={faCircleXmark}
            />
          </button>
        )}

        {loading && (
          <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
        )}

        <button className={cx("search-btn")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </TippyHeadless>
  );
}

export default SubSearch;

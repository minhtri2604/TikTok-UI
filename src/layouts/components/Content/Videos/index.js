import {
  faBookmark,
  faCommentDots,
  faHeart,
  faMusic,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import TippyHeadless from "@tippyjs/react/headless";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import useElementOnScreen from "./useElementOnScreen";
import styles from "./Video.module.scss";
import { Wrapper as PorperWrapper } from "~/components/Poper";

import Image from "~/components/Image";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import AccountPreview from "~/components/SuggestedAccounts/AccountItem/AccountPreview";

const cx = classNames.bind(styles);
const VideoInfor = ({ data }) => {
  const renderPreview = (props) => {
    return (
      <div tabIndex="-1" {...props}>
        <PorperWrapper>
          <div className={cx("preview")}>
            <AccountPreview data={data.user} />
          </div>
        </PorperWrapper>
      </div>
    );
  };
  return (
    <div className={cx("video-infor")}>
      <Image className={cx("avatar")} src={data.user.avatar} alt="Âm nhạc" />

      <div className={cx("container")}>
        <div className={cx("infor")}>
          <TippyHeadless
            interactive
            delay={[500, 0]}
            placement="bottom"
            render={renderPreview}
          >
            <a href={data.user.thumb_url} className={cx("nickname")}>
              {data.user.nickname}
            </a>
          </TippyHeadless>
          <a href={data.user.thumb_url} className={cx("name")}>
            {data.user.first_name} {data.user.last_name}
          </a>
        </div>
        <div className={cx("describe")}>{data.description}</div>
        <div className={cx("mucsic")}>
          <FontAwesomeIcon className={cx("icon-music")} icon={faMusic} />
          {data.meta.mime_type}
        </div>
      </div>

      <div className={cx("btn")}>
        <button className={cx("btn-follow")}>Follow</button>
      </div>
    </div>
  );
};

const VideoContent = ({ data }) => {
  const videoRef = useRef();
  const [playing, SetPlayIng] = useState(false);
  const [like, setLike] = useState(false);
  const [raiseLike, SetRaiseLike] = useState(data.likes_count);

  const [save, setSave] = useState(false);
  const [raiseSave, SetRaiSave] = useState(data.views_count);
  let saveRef = useRef();
  let likeRef = useRef();

  const handleVideo = () => {
    if (playing) {
      videoRef.current.play();
      SetPlayIng(false);
    } else {
      videoRef.current.pause();
      SetPlayIng(true);
    }
  };

  const handleLike = () => {
    setLike(like === false ? true : false);
    if (like) {
      SetRaiseLike(raiseLike - 1);
    } else {
      SetRaiseLike(raiseLike + 1);
    }
  };
  const handleSave = () => {
    setSave(save === false ? true : false);
    if (save) {
      SetRaiSave(raiseSave - 1);
    } else {
      SetRaiSave(raiseSave + 1);
    }
  };
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const isVisibile = useElementOnScreen(options, videoRef);
  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        videoRef.current.play();
        SetPlayIng(true);
      }
    } else {
      if (playing) {
        videoRef.current.pause();
        SetPlayIng(false);
      }
    }
  }, [isVisibile]);

  return (
    <div className={cx("video-content")}>
      <video
        muted="muted"
        ref={videoRef}
        className={cx("video")}
        onClick={handleVideo}
        src={data.file_url}
        loop
      />

      <div className={cx("actions")}>
        <div className={cx("action-item")}>
          <div className={cx("icons")} onClick={handleLike}>
            <FontAwesomeIcon
              className={cx(" ", {
                like: like,
              })}
              icon={faHeart}
            />
          </div>
          <span className={cx("action-item-discibe")}>{raiseLike}</span>
        </div>

        <div className={cx("action-item")}>
          <div className={cx("icons")}>
            <FontAwesomeIcon icon={faCommentDots} />
          </div>
          <span className={cx("action-item-discibe")}>
            {data.comments_count}
          </span>
        </div>
        <div className={cx("action-item")}>
          <div className={cx("icons")} onClick={handleSave}>
            <FontAwesomeIcon
              className={cx("", {
                save: save,
              })}
              icon={faBookmark}
            />
          </div>
          <span className={cx("action-item-discibe")}>{raiseSave}</span>
        </div>
        <div className={cx("action-item")}>
          <div className={cx("icons")}>
            <FontAwesomeIcon icon={faShare} />
          </div>
          <span className={cx("action-item-discibe")}>{data.shares_count}</span>
        </div>
      </div>
    </div>
  );
};

function Video({ data = [] }) {
  return (
    <div className={cx("wrapper")}>
      {data.map((item) => (
        <div className={cx("section")}>
          <VideoInfor data={item} />

          <VideoContent data={item} />
        </div>
      ))}
    </div>
  );
}

export default Video;

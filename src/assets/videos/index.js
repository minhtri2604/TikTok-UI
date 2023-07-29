
import { useState } from "react";
import styles from "./Video.module.scss";
import Video1 from '~/assets/videos/video1.mp4'
import video2 from '~/assets/videos/video2.mp4'

import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function Video() {
  return (
    <div className={cx('wrapper')}>
      <Video1/>
    </div>
  );
}

export default Video;


import styles from "./Content.module.scss";
import Video from "./Videos";
import classNames from "classnames/bind";
import * as userService from "~/services/videoService.js";
import { useEffect,useState } from "react";

const cx = classNames.bind(styles);

function Content() {
  const [videos,setVideos] = useState([])
  useEffect(() => {
    userService.getVideos({page: 1,})
    .then(data => 
      setVideos((prev) => [...prev,...data])
    )
  }, []);
  console.log(videos)
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Video data={videos}/>
      </div>
    </div>
  );
}

export default Content;

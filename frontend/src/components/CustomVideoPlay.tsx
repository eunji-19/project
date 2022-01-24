import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { FindProjectReqType, VideoKeyReqType } from "../types";
import { makeVideoKey } from "../redux/actions/brainActions";
import axios from "axios";
import { APP_URL } from "../configure";
import BrainService from "../services/brainService";
import { VideoKeyState } from "../redux/modules/brain";
import { Space, Spin } from "antd";
import ReactPlayer from "react-player/lazy";

interface CustomVideoPlayProps {
  open: boolean;
  videoKeyType: VideoKeyReqType;
}

const CustomVideoPlay: React.FC<CustomVideoPlayProps> = ({
  open,
  videoKeyType,
}) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getVideo = async () => {
    const videoKey = await BrainService.getMakeVideoKey(videoKeyType);
    console.log("videoKey ", videoKey);
    const reqData: FindProjectReqType = {
      key: videoKey.statusMessage.data.key,
      // key: videoKey!,
      // key: "-Mu4tJhSg2T_5NtMjIkt",
      //   key: "-Mu4rV1kATVjOgJbW-BN",
      token: videoKeyType.token,
    };

    const getFindProject = async () => {
      const result = await BrainService.getFindProject(reqData);

      if (!result.statusMessage.data.video) {
        setTimeout(() => {
          getFindProject();
        }, 5000);
      } else {
        setVideoUrl(result.statusMessage.data.video);
        setIsLoading(false);
        console.log("getFindProject ", result);
      }
    };
    getFindProject();
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <ReactPlayer
            className="react-player"
            url={videoUrl} // 플레이어 url
            width="800px" // 플레이어 크기 (가로)
            height="500px" // 플레이어 크기 (세로)
            playing={true} // 자동 재생 on
            muted={true} // 자동 재생 on
            controls={true} // 플레이어 컨트롤 노출 여부
            light={false} // 플레이어 모드
            pip={true} // pip 모드 설정 여부
            poster={
              "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
            } // 플레이어 초기 포스터 사진
            // onEnded={() => handleVideo()} // 플레이어 끝났을 때 이벤트
          />
        </div>
      )}
    </div>
  );
};

export default CustomVideoPlay;

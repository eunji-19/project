// import React, { useEffect } from "react";
// import { Collapse } from "react-bootstrap";
// import { findProject, makeVideoKey } from "../redux/actions/brainActions";
// import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
// import { VideoKeyState } from "../redux/modules/brain";
// import BrainService from "../services/brainService";
// import { FindProjectReqType, VideoKeyReqType } from "../types";

// interface CustomVideoPlayProps {
//   open: boolean;
//   videoKeyType: VideoKeyReqType;
// }

// const CustomVideoPlay: React.FC<CustomVideoPlayProps> = ({
//   open,
//   videoKeyType,
// }) => {
//   // const videoKey: VideoKeyState = useAppSelector((state) => state.videoKey);
//   const dispatch = useAppDispatch();

//   const makeVideo = async () => {
//     /**
//      * 1. videoKey
//      */
//     const videoKeyFetch = await BrainService.getMakeVideoKey(videoKeyType);
//     const videoKey = videoKeyFetch.statusMessage.data.key;
//     /**
//      * 2. findProject
//      */
//     const reqType: FindProjectReqType = {
//       token: videoKeyType.token,
//       key: videoKey,
//     };
//     const findProjectFecth = await BrainService.getFindProject(reqType);
//     console.log("find ", findProjectFecth);
//   };

//   useEffect(() => {
//     makeVideo();
//   }, []);
//   console.log("video KEY ", videoKeyType);
//   return (
//     <div style={{ margin: "10px", paddingBottom: "10px" }}>
//       <Collapse in={open}>
//         <div id="example-collapse-text">{videoKeyType.text}</div>
//       </Collapse>
//     </div>
//   );
// };

// export default CustomVideoPlay;

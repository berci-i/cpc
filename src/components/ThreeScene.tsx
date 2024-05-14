import React, {useState} from "react";

import styles from "./ThreeScene.module.css";
import {toast} from "react-toastify";
import useScene from "./threeScene/useScene";

const ThreeScene: React.FC = () => {
  const [isCreateEnabled, setIsCreateEnabled] = useState(false);
  // const {containerRef, cameraRef, sceneRef} = useScene2(isCreateEnabled);
  useScene({isCreateEnabled});

  const notifyUserToCreateCuboids = () => toast("Click anywhere on the scene to add a new Cuboid", {position: "bottom-center"});

  return (
    <div id="scene-container" className={isCreateEnabled ? "pointer" : ""} onClick={(e) => e.preventDefault()}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsCreateEnabled((prevIsCreateEnabled) => {
            if (!prevIsCreateEnabled) notifyUserToCreateCuboids();
            return !prevIsCreateEnabled;
          });
        }}
        className={`button ${styles.addNewBoxButton} ${isCreateEnabled ? "active" : ""}`}
        role="button"
      >
        + NEW BOX
      </button>
    </div>
  );
};
export default ThreeScene;

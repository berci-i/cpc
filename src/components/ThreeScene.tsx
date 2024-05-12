import React, {useState} from "react";

import styles from "./ThreeScene.module.css";
import {toast} from "react-toastify";
import useScene from "./threeScene/useScene";
import useSceneActions from "./threeScene/useSceneActions";

const ThreeScene: React.FC = () => {
  const {containerRef, sceneRef} = useScene();
  const {onSceneClick} = useSceneActions({sceneRef});
  const [isCreateEnabled, setIsCreateEnabled] = useState(false);

  const notifyUserToCreateCuboids = () => toast("Click anywhere on the scene to add a new Cuboid", {position: "top-center"});

  return (
    <div className={isCreateEnabled ? "pointer" : ""}>
      <div ref={containerRef} onClick={onSceneClick} />
      <button
        onClick={() => {
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

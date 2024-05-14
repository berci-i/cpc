import * as THREE from "three";

import React, {createContext, useState} from "react";

import SceneActions from "./threeScene/SceneActions";
import styles from "./ThreeScene.module.css";
import {toast} from "react-toastify";
import useScene from "./threeScene/useScene";

export type Nullable<T> = T | null;
export interface ISceneContext {
  renderer: Nullable<THREE.WebGLRenderer>;
  scene: Nullable<THREE.Scene>;
  camera: Nullable<THREE.PerspectiveCamera>;
}

export const SceneContext = createContext<ISceneContext>({
  renderer: null,
  scene: null,
  camera: null,
});

const ThreeScene: React.FC = () => {
  const [isCreateEnabled, setIsCreateEnabled] = useState(false);
  const {renderer = null, scene = null, camera = null} = useScene();

  const notifyUserToCreateCuboids = () =>
    toast("Click anywhere on the scene to add a new Cuboid", {position: "bottom-center"});

  return (
    <SceneContext.Provider value={{renderer, scene, camera}}>
      <div
        id="scene-container"
        className={isCreateEnabled ? "pointer" : ""}
        onClick={(e) => e.preventDefault()}
      >
        <SceneActions isCreateEnabled={isCreateEnabled} />
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
    </SceneContext.Provider>
  );
};
export default ThreeScene;

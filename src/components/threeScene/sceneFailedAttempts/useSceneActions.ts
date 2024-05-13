import * as THREE from "three";

import {MutableRefObject} from "react";

export type Nullable<T> = T | null | undefined;

interface IuseSceneActions {
  sceneRef: MutableRefObject<Nullable<THREE.Scene>>;
  cameraRef: MutableRefObject<Nullable<THREE.Camera>>;
  rendererRef?: MutableRefObject<THREE.WebGLRenderer>;
  containerRef?: MutableRefObject<HTMLDivElement>;
}

const useSceneActions = ({sceneRef, rendererRef, cameraRef}: IuseSceneActions) => {
  const onSceneClick = (e: any) => {
    console.log(sceneRef, cameraRef);
    if (!sceneRef.current || !cameraRef.current) return;
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    const res = sceneRef.current.add(cube);
    console.log(sceneRef.current, res);
    rendererRef?.current.render(sceneRef.current, cameraRef.current);
  };

  return {onSceneClick};
};

export default useSceneActions;

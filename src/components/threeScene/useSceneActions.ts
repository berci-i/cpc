import * as THREE from "three";

import {MutableRefObject} from "react";

export type Nullable<T> = T | null | undefined;

interface IuseSceneActions {
  sceneRef: MutableRefObject<Nullable<THREE.Scene>>;
  rendererRef?: MutableRefObject<THREE.WebGLRenderer>;
  containerRef?: MutableRefObject<HTMLDivElement>;
}

const useSceneActions = ({sceneRef, rendererRef}: IuseSceneActions) => {
  const onSceneClick = (e: any) => {
    console.log(sceneRef);
    if (!sceneRef.current) return;
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    const res = sceneRef.current.add(cube);
    console.log(sceneRef.current, res);
    // rendererRef?.current.render(sceneRef.current);
  };

  return {onSceneClick};
};

export default useSceneActions;

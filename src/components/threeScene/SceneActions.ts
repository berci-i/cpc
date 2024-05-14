import * as THREE from "three";

import {addCuboidControls, getNewCubePosition, getRandomColor} from "./useSceneActions/helpers";
import {useEffect, useRef} from "react";

import {GUI} from "three/addons/libs/lil-gui.module.min.js";
import {SceneContext} from "../ThreeScene";
import {useContext} from "react";

const SceneActions: React.FC<{isCreateEnabled: boolean}> = ({isCreateEnabled}) => {
  const isCreateEnabledRef = useRef<boolean>();
  const {renderer, scene, camera} = useContext(SceneContext);

  isCreateEnabledRef.current = isCreateEnabled;

  useEffect(() => {
    if (renderer && scene && camera) {
      const render = () => {
        renderer.render(scene, camera);
      };

      const gui = new GUI();
      const folder = gui.addFolder("Edit cubes (expand any cube to edit it)");
      folder.hide();

      const getShouldCreateCuboid = (e: MouseEvent) => {
        const isCreationAvailable = isCreateEnabledRef.current && scene;
        const targetTagName = e.target && "tagName" in e.target ? (e.target.tagName as string) : "";
        const isSceneClicked = !e.defaultPrevented && targetTagName.toUpperCase() === "CANVAS";
        return isCreationAvailable && isSceneClicked;
      };

      const onClickScene = (e: MouseEvent) => {
        if (!getShouldCreateCuboid(e)) return;

        const mousePosition = getNewCubePosition(e);

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({color: getRandomColor()});
        const cube = new THREE.Mesh(geometry, material);

        cube.position.x = mousePosition.x;
        cube.position.y = mousePosition.y;
        cube.name = `Cuboid ${folder.folders.length}`;

        scene.add(cube);
        folder.show();

        addCuboidControls(folder, cube, render);
        render();
      };

      renderer.domElement.addEventListener("click", onClickScene);
      render();
    }
  }, [renderer, scene, camera]);
  return null;
};

export default SceneActions;

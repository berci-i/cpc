import * as THREE from "three";

import {addCuboidControls, getRandomColor} from "./helpers";

import {GUI} from "three/addons/libs/lil-gui.module.min.js";
import {MutableRefObject} from "react";

const getCreateCuboid = (
  isCreateEnabledRef: MutableRefObject<boolean | undefined>,
  scene: THREE.Scene,
  render: () => void
) => {
  const mousePosition = new THREE.Vector2();
  const gui = new GUI();
  const folder = gui.addFolder("Edit cubes (expand any cube to edit it)");
  folder.hide();
  const createCuboid = (e: MouseEvent) => {
    const targetTagName = e.target && "tagName" in e.target ? (e.target.tagName as string) : "";
    const isCreationAvailable = isCreateEnabledRef.current && scene;

    const isSceneClicked = !e.defaultPrevented && targetTagName.toUpperCase() === "CANVAS";
    if (!isCreationAvailable || !isSceneClicked) return;
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: getRandomColor()});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = mousePosition.x * 5;
    cube.position.y = mousePosition.y * 5;
    cube.name = `Cuboid ${folder.folders.length}`;

    scene.add(cube);
    folder.show();
    addCuboidControls(folder, cube, render);
    render();
  };
  return createCuboid;
};

export default getCreateCuboid;

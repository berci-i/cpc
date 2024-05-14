import * as THREE from "three";

import GUI from "three/examples/jsm/libs/lil-gui.module.min.js";

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const addCuboidControls = (folder: GUI, cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial, THREE.Object3DEventMap>, render: () => void) => {
  const editCuboidFolder = folder.addFolder(cube.name);

  const updateGeometry = (newGeometrySizes: {width?: number; height?: number; depth?: number}) => {
    const {width, height, depth} = {...cube.geometry.parameters, ...newGeometrySizes};
    cube.geometry = new THREE.BoxGeometry(width, height, depth);
    render();
  };

  const updatePosition = (newPosition: {x?: number; y?: number; z?: number}) => {
    const newPositionArr = Object.values({...cube.position, ...newPosition}).map((pos) => Number(pos));
    cube.position.set(newPositionArr[0], newPositionArr[1], newPositionArr[2]);
    render();
  };

  const updateRotation = (rotation: Partial<THREE.Euler>) => {
    Object.entries(rotation).forEach((entry) => {
      const key = entry[0] as "x" | "y" | "z";
      const value = Number(entry[1]);
      cube.rotation[key] = value; //THREE.MathUtils.degToRad(value);
    });
    render();
  };

  editCuboidFolder.addColor(cube.material, "color").onChange(render);

  const editCuboidSizes = editCuboidFolder.addFolder("Edit Sizes");
  editCuboidSizes
    .add(cube.geometry.parameters, "width", 0, 10, 0.1)
    .onChange((width) => updateGeometry({width}));
  editCuboidSizes
    .add(cube.geometry.parameters, "height", 0, 10, 0.1)
    .onChange((height) => updateGeometry({height}));
  editCuboidSizes
    .add(cube.geometry.parameters, "depth", 0, 10, 0.1)
    .onChange((depth) => updateGeometry({depth}));

  const editCuboidPosition = editCuboidFolder.addFolder("Edit Position");
  editCuboidPosition.add(cube.position, "x", -5, 5, 0.1).onChange((x) => updatePosition({x}));
  editCuboidPosition.add(cube.position, "y", -5, 5, 0.1).onChange((y) => updatePosition({y}));
  editCuboidPosition.add(cube.position, "z", -5, 5, 0.1).onChange((z) => updatePosition({z}));

  const editCuboidRotation = editCuboidFolder.addFolder("Edit Rotation");
  editCuboidRotation
    .add(cube.rotation, "x", -6.2831853072, 6.2831853072, 0.01)
    .onChange((x) => updateRotation({x}));
  editCuboidRotation
    .add(cube.rotation, "y", -6.2831853072, 6.2831853072, 0.01)
    .onChange((y) => updateRotation({y}));
  editCuboidRotation
    .add(cube.rotation, "z", -6.2831853072, 6.2831853072, 0.01)
    .onChange((z) => updateRotation({z}));

  editCuboidFolder.close();
};

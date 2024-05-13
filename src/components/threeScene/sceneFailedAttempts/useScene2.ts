import * as THREE from "three";

import {useEffect, useRef} from "react";

import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

const useScene2 = (isCreateEnabled: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.Camera>();
  const sceneRef = useRef<THREE.Scene>();
  useEffect(() => {
    if (containerRef.current && cameraRef.current) return;
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 15000);
    const loader = new GLTFLoader();
    let controls = new OrbitControls(camera, renderer.domElement);
    let light3 = new THREE.PointLight("white", 250, 10, 5);
    cameraRef.current = camera;
    sceneRef.current = scene;

    let raycaster = new THREE.Raycaster();

    const mousePosition = new THREE.Vector2();
    let cube: any;
    let plane: any;

    const onInit = () => {
      if (!containerRef.current) return;
      helpers();

      scene.add(light3);
      camera.position.set(3, 1.5, 0);
      //this.renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setSize(sizes.width, sizes.height);
      renderer.setClearColor(0xffffff, 0);
      containerRef.current.appendChild(renderer.domElement);

      var sceneMeshes = new THREE.Object3D();

      loader.load(
        "https://raw.githubusercontent.com/forerunrun/extends/main/game/game.gltf",
        (gltf) => {
          gltf.scene.matrixAutoUpdate = false;
          gltf.scene.position.x = -0.5;

          scene.add(gltf.scene);

          animate();

          cube = scene.getObjectByName("Cube");
          plane = scene.getObjectByName("Plane");
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

      window.addEventListener("click", (e) => {
        if (isCreateEnabled) return;
        mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
        // console.log("X = "+mousePosition.x);
        // console.log("Y = "+mousePosition.y);

        raycaster.setFromCamera(mousePosition, camera);

        const intersects = raycaster.intersectObject(plane);
        // if(intersects){
        //        console.log( intersects[0].point);
        // }

        if (intersects.length > 0) {
          cube.position.copy(intersects[0].point);
          cube.position.y = 0.125;
        }
      });

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();

        controls.update();
        light3.position.set(camera.position.x, camera.position.y, camera.position.z);
      };
    };

    const helpers = () => {
      const axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper); // this.scene.add( arrowHelper );
      const helper = new THREE.PointLightHelper(light3, 5);
      scene.add(helper);
      const size = 10;
      const divisions = 10;

      const gridHelper = new THREE.GridHelper(size, divisions);
      scene.add(gridHelper);
      const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      const helper2 = new THREE.HemisphereLightHelper(light, 5);
      scene.add(helper2);
    };

    onInit();
  }, [containerRef.current]);

  return {containerRef, cameraRef, sceneRef};
};

export default useScene2;

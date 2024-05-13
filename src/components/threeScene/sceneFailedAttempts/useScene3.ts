import * as THREE from "three";

import {useEffect, useRef} from "react";

import {OrbitControls} from "three/examples/jsm/Addons.js";
import {PCDLoader} from "three/addons/loaders/PCDLoader.js";

const useScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.Camera>();

  // instantiate a loader
  const loader = new PCDLoader();

  useEffect(() => {
    if (typeof window == "undefined") return;
    sceneRef.current = new THREE.Scene();
    rendererRef.current = new THREE.WebGLRenderer({antialias: true, alpha: true});
    cameraRef.current = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 15000);
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    containerRef.current?.appendChild(rendererRef.current.domElement);
    cameraRef.current.position.z = 5;

    let controls = new OrbitControls(cameraRef.current, rendererRef.current.domElement);
    let light3 = new THREE.PointLight("white", 250, 10, 5);

    let raycaster = new THREE.Raycaster();

    const mousePosition = new THREE.Vector2();
    let cube: any;
    let plane: any;

    const onInit = () => {
      console.log(1);
      if (!(containerRef.current && sceneRef.current && cameraRef.current && rendererRef.current)) return;
      helpers();
      sceneRef.current.add(light3);
      cameraRef.current.position.set(3, 1.5, 0);

      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setClearColor(0xffffff, 0);
      containerRef.current.appendChild(rendererRef.current.domElement);

      var sceneMeshes = new THREE.Object3D();

      console.log(2);
      // load a resource
      loader.load(
        // resource URL
        "https://segmentsai-prod.s3.eu-west-2.amazonaws.com/assets/admin-tobias/41089c53-efca-4634-a92a-0c4143092374.pcd",
        // called when the resource is loaded
        (points) => {
          if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;

          sceneRef.current.clear();
          sceneRef.current.add(points);
          rendererRef.current.render(sceneRef.current, cameraRef.current);

          console.log(3);
        },
        // called when loading is in progresses
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        (_err) => {
          console.log("An error happened");
        }
      );
    };

    window.addEventListener("click", (e) => {
      if (!(containerRef.current && sceneRef.current && cameraRef.current && rendererRef.current)) return;

      mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
      // console.log("X = "+mousePosition.x);
      // console.log("Y = "+mousePosition.y);

      raycaster.setFromCamera(mousePosition, cameraRef.current);

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
      if (!(containerRef.current && sceneRef.current && cameraRef.current && rendererRef.current)) return;

      requestAnimationFrame(animate);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      controls.update();

      controls.update();
      light3.position.set(cameraRef.current.position.x, cameraRef.current.position.y, cameraRef.current.position.z);
    };

    const helpers = () => {
      if (!(containerRef.current && sceneRef.current && cameraRef.current && rendererRef.current)) return;

      const axesHelper = new THREE.AxesHelper(5);
      sceneRef.current.add(axesHelper); // this.sceneRef.current.add( arrowHelper );
      const helper = new THREE.PointLightHelper(light3, 5);
      sceneRef.current.add(helper);
      const size = 10;
      const divisions = 10;

      const gridHelper = new THREE.GridHelper(size, divisions);
      sceneRef.current.add(gridHelper);
      const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
      const helper2 = new THREE.HemisphereLightHelper(light, 5);
      sceneRef.current.add(helper2);
    };

    onInit();
  }, []);
  return {containerRef, sceneRef, rendererRef, cameraRef};
};

export default useScene;

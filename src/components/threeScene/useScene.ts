import * as THREE from "three";

import {useEffect, useRef} from "react";

import {GUI} from "three/addons/libs/lil-gui.module.min.js";
import {OrbitControls} from "three/examples/jsm/Addons.js";
import {PCDLoader} from "three/addons/loaders/PCDLoader.js";

const useScene = () => {
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  useEffect(() => {
    // instantiate a loader
    const loader = new PCDLoader();
    if (typeof window !== "undefined" && !sceneRef.current) {
      let camera: THREE.PerspectiveCamera, scene: THREE.Scene, renderer: THREE.WebGLRenderer;

      const gui = new GUI();
      const folder = gui.addFolder("Edit cubes (expand any cube to edit id)");
      folder.hide();
      const init = () => {
        renderer = new THREE.WebGLRenderer({antialias: true});
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000);
        rendererRef.current = renderer;
        sceneRef.current = scene;
        cameraRef.current = camera;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        const sceneContainer = document.getElementById("scene-container") || document.body;
        sceneContainer.appendChild(renderer.domElement);

        camera.position.set(0, 0, 10);
        scene.add(camera);

        const controls = new OrbitControls(camera, renderer.domElement);

        // DISABLE ZOOM HERE (BUT IT MESSES WITH THE CLICK POSITION)
        controls.enableZoom = false;
        // Disable rotation (for first version)
        controls.enableRotate = false;
        controls.addEventListener("change", render); // use if there is no animation loop
        controls.minDistance = 0.5;
        controls.maxDistance = 10;

        loader.load(
          // "segmentsai.pcd",
          // "Zaghetto.pcd",
          "https://segmentsai-prod.s3.eu-west-2.amazonaws.com/assets/admin-tobias/41089c53-efca-4634-a92a-0c4143092374.pcd",
          function (points) {
            scene.add(points);
            gui.open();

            render();
          }
        );

        window.addEventListener("resize", onWindowResize);
      };

      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

        render();
      };

      const render = () => {
        renderer.render(scene, camera);
      };

      init();
      render();
    }
  }, []);

  return {scene: sceneRef.current, camera: cameraRef.current, renderer: rendererRef.current};
};

export default useScene;

import * as THREE from "three";

import {useEffect, useRef} from "react";

import {GUI} from "three/addons/libs/lil-gui.module.min.js";
import {OrbitControls} from "three/examples/jsm/Addons.js";
import {PCDLoader} from "three/addons/loaders/PCDLoader.js";

const useScene = ({isCreateEnabled}: {isCreateEnabled: boolean}) => {
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.Camera>();
  const isCreateEnabledRef = useRef<boolean>();
  isCreateEnabledRef.current = isCreateEnabled;

  // instantiate a loader
  const loader = new PCDLoader();

  useEffect(() => {
    if (typeof window !== "undefined" && !sceneRef.current) {
      let camera: any, scene: any, renderer: any;

      const mousePosition = new THREE.Vector2();

      let cube: any;

      const init = () => {
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        const sceneContainer = document.getElementById("scene-container") || document.body;
        sceneContainer.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000);

        sceneRef.current = scene;
        cameraRef.current = camera;

        camera.position.set(0, 0, 10);
        scene.add(camera);

        const controls = new OrbitControls(camera, renderer.domElement);

        // DISABLE ZOOM HERE (BUT IT MESSES WITH THE CLICK POSITION)
        controls.enableZoom = false;
        controls.addEventListener("change", render); // use if there is no animation loop
        controls.minDistance = 0.5;
        controls.maxDistance = 10;

        loader.load(
          "segmentsai.pcd",
          // "Zaghetto.pcd",
          // "https://segmentsai-prod.s3.eu-west-2.amazonaws.com/assets/admin-tobias/41089c53-efca-4634-a92a-0c4143092374.pcd",
          function (points) {
            scene.add(points);

            const gui = new GUI();

            gui.add(points.material, "size", 0.001, 0.01).onChange(render);
            gui.addColor(points.material, "color").onChange(render);
            gui.open();

            render();
          }
        );

        window.addEventListener("resize", onWindowResize);
        renderer.domElement.addEventListener("click", onRendererClick);
      };

      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

        render();
        console.log("resizing");
      };

      const onRendererClick = (e: MouseEvent) => {
        const targetTagName = e.target && "tagName" in e.target ? (e.target.tagName as string) : "";
        if (!isCreateEnabledRef.current || !scene || e.defaultPrevented || targetTagName.toLowerCase() === "button") return;

        mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;

        const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = mousePosition.x;
        cube.position.y = mousePosition.y;

        cube.raycast = (...args) => {
          console.log(args);
        };
        scene.add(cube);
        render();
      };

      const render = () => {
        renderer.render(scene, camera);
      };

      init();
      render();
    }
  }, []);
};

export default useScene;

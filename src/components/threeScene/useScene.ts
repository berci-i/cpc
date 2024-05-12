import * as THREE from "three";

import {useEffect, useRef} from "react";

import {PCDLoader} from "three/addons/loaders/PCDLoader.js";

const useScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();

  // instantiate a loader
  const loader = new PCDLoader();

  const renderRandomGeometry = () => {
    if (!sceneRef.current) return;
    // redering a random geometry
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    const cube = new THREE.Mesh(geometry, material);
    sceneRef.current.add(cube);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      sceneRef.current = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;

      // load a resource
      loader.load(
        // resource URL
        "https://segmentsai-prod.s3.eu-west-2.amazonaws.com/assets/admin-tobias/41089c53-efca-4634-a92a-0c4143092374.pcd",
        // called when the resource is loaded
        (points) => {
          if (!sceneRef.current) return;
          console.log("rendering! ");
          sceneRef.current.add(points);
          renderer.render(sceneRef.current, camera);
          renderRandomGeometry();
        },
        // called when loading is in progresses
        function (xhr) {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        // called when loading has errors
        function (error) {
          console.log("An error happened");
        }
      );
    }
  }, []);
  return containerRef;
};

export default useScene;

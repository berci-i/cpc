import * as THREE from "three";

import {useEffect, useRef} from "react";

import {PCDLoader} from "three/addons/loaders/PCDLoader.js";

const useScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();

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
    if (typeof window !== "undefined" && !sceneRef.current) {
      sceneRef.current = new THREE.Scene();
      rendererRef.current = new THREE.WebGLRenderer();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(rendererRef.current.domElement);
      camera.position.z = 5;

      // load a resource
      loader.load(
        // resource URL
        "https://segmentsai-prod.s3.eu-west-2.amazonaws.com/assets/admin-tobias/41089c53-efca-4634-a92a-0c4143092374.pcd",
        // called when the resource is loaded
        (points) => {
          if (!sceneRef.current || !rendererRef.current) return;

          sceneRef.current.clear();
          sceneRef.current.add(points);
          renderRandomGeometry();
          rendererRef.current.render(sceneRef.current, camera);
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
    }
  }, []);
  return {containerRef, sceneRef, rendererRef};
};

export default useScene;

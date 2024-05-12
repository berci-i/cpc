"use client";

import React from "react";
import useScene from "./threeScene/useScene";

const ThreeScene: React.FC = () => {
  const {containerRef} = useScene();

  return <div ref={containerRef} />;
};
export default ThreeScene;

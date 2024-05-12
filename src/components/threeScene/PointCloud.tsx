import {Mesh, MeshPhysicalMaterial} from "three";

import {PCDLoader} from "three/addons/loaders/PCDLoader.js";
import {STLLoader} from "three/examples/jsm/Addons.js";

const pointCloudModel =
  () =>
  async ({url}: {url: string}) => {
    let loader;
    loader = new PCDLoader();
    const geometry = await loader.loadAsync(url);
    return geometry;
  };

export default pointCloudModel;

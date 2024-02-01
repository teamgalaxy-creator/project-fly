import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { modelConfiguration } from './utility/resource.config';
import { CarModels, PlaneModels, Models } from './utility/enums';

interface ModelConfigProps {
  name: string;
  path: string;
  UIname: string;
  loadedModel?: THREE.Object3D | null; // New property for storing loaded model
}

class ResourceLoader {
  private static instance: ResourceLoader | null = null;
  private modelConfigMap: Map<string, ModelConfigProps>;

  private constructor() {
    this.modelConfigMap = new Map<string, ModelConfigProps>();
    this.loadModelConfigurations();
  }

  public static getInstance(): ResourceLoader {
    if (!this.instance) {
      this.instance = new ResourceLoader();
    }
    return this.instance;
  }

  private loadModelConfigurations() {
    Object.entries(modelConfiguration).forEach(([key, value]) => {
      const modelInfo: ModelConfigProps = {
        ...value,
        loadedModel: null,
      };
      this.modelConfigMap.set(key as any, modelInfo);
    });
  }

  public async loadModels(
    options: any,
    onLoad: (model: THREE.Object3D) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void,
  ) {
    const loader = new GLTFLoader();
    const parentGroup = new THREE.Group();

    const modelInfo = this.modelConfigMap.get(options.modelEnum);

    if (modelInfo) {
      if (modelInfo.loadedModel) {
        // If the model is already loaded, use the stored model

        parentGroup.add(modelInfo.loadedModel);
        if (onLoad) {
          onLoad(parentGroup);
        }
      } else {
        // If the model is not loaded, load it and store the loaded model
        const modelPath = modelInfo.path;

        loader.load(
          modelPath,
          (gltf) => {
            const clonedModel = gltf.scene.clone();
            modelInfo.loadedModel = clonedModel;

            if (options.scale) {
              clonedModel.scale.set(
                options.scale.x,
                options.scale.y,
                options.scale.z,
              );
            }
            parentGroup.add(clonedModel);
            if (onLoad) {
              onLoad(parentGroup);
            }
          },
          onProgress,
          (error) => {
            if (onError) {
              onError(error);
            }
          },
        );
      }
    }
  }
}

export default ResourceLoader;

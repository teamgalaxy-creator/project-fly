import { ModelConfigProps } from '~/utility/models';
import { CarModels, PlaneModels, Models } from './enums';

export const modelConfiguration: ModelConfigProps = {
  [PlaneModels.EgyptPlane]: {
    name: 'egypt_plane.glb',
    path: './airbus318_colors-mono/egypt plane.glb',
    UIname: ' Default Plane',
  },
  // [PlaneModels.AirbusA318Aqua]: {
  //   name: 'airbus318_aqua.glb',
  //   path: './airbus318_colors-mono/airbus318_aqua.glb',
  //   UIname: 'Aqua Plane',
  // },
  // [PlaneModels.AirbusA318Blue]: {
  //   name: 'airbus318_blue.glb',
  //   path: './airbus318_colors-mono/airbus318_blue.glb',
  //   UIname: 'Blue Plane',
  // },
  // [PlaneModels.AirbusA318Cyan]: {
  //   name: 'airbus318_cyan.glb',
  //   path: './airbus318_colors-mono/airbus318_cyan.glb',
  //   UIname: 'Cyan Plane',
  // },
  // [PlaneModels.AirbusA318Lemon]: {
  //   name: 'airbus318_lemon.glb',
  //   path: './airbus318_colors-mono/airbus318_lemon.glb',
  //   UIname: 'Lemon Plane',
  // },
  // [PlaneModels.AirbusA318Orange]: {
  //   name: 'airbus318_orange.glb',
  //   path: './airbus318_colors-mono/airbus318_orange.glb',
  //   UIname: ' Orange Plane',
  // },
  // [PlaneModels.AirbusA318Pink]: {
  //   name: 'airbus318_pink.glb',
  //   path: './airbus318_colors-mono/airbus318_pink.glb',
  //   UIname: 'Pink Plane',
  // },
  // [PlaneModels.AirbusA318Purple]: {
  //   name: 'airbus318_purple.glb',
  //   path: './airbus318_colors-mono/airbus318_purple.glb',
  //   UIname: 'Purple Plane',
  // },
  // [PlaneModels.AirbusA318Red]: {
  //   name: 'airbus318_red.glb',
  //   path: './airbus318_colors-mono/airbus318_red.glb',
  //   UIname: 'Red Plane',
  // },
  // [PlaneModels.AirbusA318White]: {
  //   name: 'airbus318_white.glb',
  //   path: './airbus318_colors-mono/airbus318_white.glb',
  //   UIname: ' White Plane',
  // },
  // [PlaneModels.AirbusA318Yellow]: {
  //   name: 'airbus318_yellow.glb',
  //   path: './airbus318_colors-mono/airbus318_yellow.glb',
  //   UIname: ' Yellow Plane',
  // },

  [PlaneModels.MiladPlane]: {
    name: 'milad plane.glb',
    path: './airbus318_colors-mono/milad plane.glb',
    UIname: 'Classic Plane',
  },
  [PlaneModels.PrivateJet]: {
    name: 'private_jet.glb',
    path: './airbus318_colors-mono/private_jet.glb',
    UIname: 'Private Jet',
  },
  [CarModels.Car]: {
    name: 'car.glb',
    path: './car.glb',
    UIname: 'Default Car',
  },
  // [CarModels.Suv]: {
  //   name: 'suvCar.glb',
  //   path: './suvCar.glb',
  //   UIname: 'SUV Car',
  // },
  // [CarModels.SuvWhite]: {
  //   name: 'suvWhite.glb',
  //   path: './suvWhite.glb',
  //   UIname: 'SUV White',
  // },
  // [CarModels.BigSUV]: {
  //   name: 'bigsuv.glb',
  //   path: './bigsuv.glb',
  //   UIname: 'Big SUV',
  // },
  // [CarModels.LuxurySUV]: {
  //   name: 'luxury_suv.glb',
  //   path: './luxury_suv.glb',
  //   UIname: 'Luxury SUV',
  // },
  // [CarModels.LuxuryCar]: {
  //   name: 'luxury_car.glb',
  //   path: './luxury_car.glb',
  //   UIname: 'Luxury Car',
  // },
  [Models.Marker3d]: {
    name: '3dmarker.glb',
    path: './3dmarker.glb',
    UIname: 'Marker 3d',
  },
  [Models.Marker3D]: {
    name: 'marker3D.glb',
    path: './marker3D.glb',
    UIname: 'Marker 3D',
  },
  [Models.MapPointer]: {
    name: 'map_pointer.glb',
    path: './map_pointer.glb',
    UIname: 'Map Pointer',
  },
};

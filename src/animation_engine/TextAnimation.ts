// @ts-nocheck
import { Text } from 'troika-three-text';
import * as THREE from 'three';
import { gsap, Power2, CSSPlugin } from 'gsap';
import { Easing, EasingFunctions } from './easing';

class TextAnimation {
    text: string;
  // coordinates: THREE.Vector3;
  // animationTimeline: any;
  // startTime: any;
  // textContainer: THREE.Group;
  tb: any;
  
  // tempScaleVector: THREE.Vector3;
  // tempLerpVec: THREE.Vector3 = new THREE.Vector3();

  constructor( text: string, tb: any) {
    // this.markerModel = markerModel;
   
    this.text = text;
    // this.coordinates = coordinates;
    // this.tempScaleVector = new THREE.Vector3();
    // this.duration = duration;
    this.tb = tb;

    // this.animationTimeline = gsap.timeline({
    //   repeatDelay: 0,
    //   repeat: 0,
    //   paused: true,
    // });
    // this.startTime = 0;
    // this.update();
  }
   loadText() {

    const geometry = new THREE.PlaneGeometry(1000000, 1000000)

      // let geometry = new THREE.ShapeBufferGeometry(shape);
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });

      const planeMesh = new THREE.Mesh(geometry, planeMaterial);
      // planeMesh.position.z = -800;
   

      const myText = new Text();
      myText.text = this.text;
      myText.fontSize = 40000;
      // myText.position.z = -820;
      myText.color = 0x000000;
      myText.anchorX = '50%';
      myText.anchorY = '50%';
      myText.rotation.x = Math.PI;
      myText.rotation.y = Math.PI;

      // Make text bottom left pivoted respect to its parent
      const subContainer = new THREE.Group();
      // subContainer.position.z = -820; 
      subContainer.add(myText);
      planeMesh.add(subContainer); // Set planeMesh as the parent of subContainer


    //   myText.sync(() => {
    //   const textBoundingBox = new THREE.Box3();
    //   textBoundingBox.copy(myText.geometry.boundingBox);
    //   // console.log('Bounding Box', textBoundingBox);

    //   let height = textBoundingBox.max.y - textBoundingBox.min.y;
    //   let width = textBoundingBox.max.x - textBoundingBox.min.x;
    //   let adjustment = width * 0.15;
    //   width = width + adjustment;
    //   height = height + adjustment;

    //   let radius = 1000;
    //   // let shape = new THREE.Shape();
    //   // shape.moveTo(-width / 2 + radius, -height / 2);
    //   // shape.lineTo(width / 2 - radius, -height / 2);
    //   // shape.quadraticCurveTo(
    //   //   width / 2,
    //   //   -height / 2,
    //   //   width / 2,
    //   //   -height / 2 + radius,
    //   // );
    //   // shape.lineTo(width / 2, height / 2 - radius);
    //   // shape.quadraticCurveTo(
    //   //   width / 2,
    //   //   height / 2,
    //   //   width / 2 - radius,
    //   //   height / 2,
    //   // );
    //   // shape.lineTo(-width / 2 + radius, height / 2);
    //   // shape.quadraticCurveTo(
    //   //   -width / 2,
    //   //   height / 2,
    //   //   -width / 2,
    //   //   height / 2 - radius,
    //   // );
    //   // shape.lineTo(-width / 2, -height / 2 + radius);
    //   // shape.quadraticCurveTo(
    //   //   -width / 2,
    //   //   -height / 2,
    //   //   -width / 2 + radius,
    //   //   -height / 2,
    //   // );
     
    // });

    return planeMesh;
  }
}
export{TextAnimation}
// @ts-nocheck

import { Text } from 'troika-three-text';
import { preloadFont } from 'troika-three-text';

import * as THREE from 'three';
import { gsap, Power2, CSSPlugin, Linear } from 'gsap';
import { Easing, EasingFunctions } from './easing';
import { Group } from '@mui/icons-material';
import { CustomEase } from 'gsap/all';
import { scrypt } from 'crypto';
import { sector } from '@turf/turf';
import { getScaleFromZoom } from './utility/utils';
import { Map } from 'maplibre-gl';

class MarkerAnimation {
  text: string;
  coordinates: THREE.Vector3;
  animationTimeline: any;
  startTime: any;
  textContainer: THREE.Group;
  tb: any;
  map: Map;
  static renderOrder: number = 0; // ASSUMPTION: Render order is kept according to the order in which a marker was created i.e. a marker created before should show behind the marker created afterwards
  markerContainer: THREE.Group;
  tempScaleVector: THREE.Vector3;
  tempLerpVec: THREE.Vector3 = new THREE.Vector3();
  myRenderOrder: number;
  loadedFont!: any;
  childrenWithOpacity: any;

  constructor(
    map: any,
    text: string,
    type: string,
    dateTime: any,

    coordinates: THREE.Vector3,
    tb: any,
    index: number,
  ) {
    // this.markerModel = markerModel;

    this.map = map;
    this.text = text;
    this.type = type;
    this.coordinates = coordinates;
    this.dateTime = dateTime;
    this.tempScaleVector = new THREE.Vector3();
    // this.duration = duration;
    this.tb = tb;

    this.startTime = 0;
    MarkerAnimation.renderOrder += 1;
    this.myRenderOrder = MarkerAnimation.renderOrder;
    this.index = index;
    this.animationTimeline = gsap.timeline();
    this.childrenWithOpacity = [];

    // this.map.on('zoom', ()=>{
    //   this.adjustScale(true);
    // })

    // preloadFont(
    //   {
    //     font: 'figtree.ttf',
    //     characters: 'abcdefghijklmnopqrstuvwxyz',
    //   },
    //   (font) => {
    //     console.log('loaded', font);
    //     this.loadedFont = 'figtree.ttf';
    //   },
    // );
  }

  async setup(showOriginMarker: boolean): Promise<Object3D<Event>> {
    return new Promise((resolve, reject) => {
      const options = {
        obj: './map_pointer.glb',
        type: 'gltf',
        scale: { x: 3000, y: 3000, z: 3000 },
        anchor: 'auto',
      };

      this.tb.loadObj(
        options,
        (model: Object3D<Event>) => {
          const group = new THREE.Group();
          group.add(model);
          group.rotateZ(Math.PI);
          group.up.set(0, 0, 1);
          group.position.set(this.coordinates.x, this.coordinates.y, 0);

          const box = new THREE.Box3().setFromObject(model);

          const height = box.max.y - box.min.y;
          const width = box.max.x - box.min.x;

          model.position.y += height / 2;
          if (!showOriginMarker) {
            model.visible = false;
          }
          this.loadText()
            .then((textContainer) => {
              this.textContainer = textContainer;

              this.markerContainer = group.clone();
              this.markerContainer.add(this.textContainer);
              // this.textContainer.position.copy(this.markerContainer.position);

              const radians = this.map.getPitch() * (Math.PI / 180);
              this.markerContainer.rotateX(radians);

              this.textContainer.position.x += width;
              this.textContainer.position.y -= height;

              // this.textContainer.renderOrder = MarkerAnimation.renderOrder;

              this.markerContainer.visible = false;

              const resolvedValues = { group, model };
              resolve(resolvedValues);
            })
            .catch((error) => {
              console.error('Error loading text:', error);
              reject(error);
            });
        },
        (error: any) => {
          console.log(error);
          reject(error);
        },
      );
    });
  }

  formatDate(dateTime) {
    const date = new Date(dateTime);
    const day = date.getDate();
    const suffix = this.getDaySuffix(day);
    const options = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    };
    return `${new Date(dateTime).toLocaleDateString(
      'en-US',
      options,
    )}${suffix}`;
  }

  getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  formatTime(dateTime) {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return `${new Date(dateTime).toLocaleTimeString('en-US', options)}`;
  }

  createText(content, iconText) {
    const myText = new Text();
    // const formattedDate = this.formatDate(this.dateTime);
    // const formattedTime = this.formatTime(this.dateTime);

    const font = iconText ? './Figtree-Regular.ttf' : './Figtree-Bold.ttf';
    const fontSize = iconText ? 3200 : 3800;

    myText.text = content;
    myText.fontSize = fontSize;
    // myText.color = 0xffffff;
    myText.depthOffset = -0.1;
    myText.renderOrder = this.myRenderOrder;
    myText.font = font;
    myText.anchorX = '50%';
    myText.anchorY = '50%';
    myText.maxWidth = 40000;

    return myText;
  }

  createIcon(iconName) {
    const iconText = new Text();
    iconText.text = iconName; // Replace with your icon or load an image
    iconText.fontSize = 4800;
    // iconText.color = 0xffffff;
    iconText.depthOffset = -0.1;
    iconText.renderOrder = this.myRenderOrder;
    iconText.font =
      'https://fonts.gstatic.com/s/materialicons/v70/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.woff';
    iconText.maxWidth = 40000;
    iconText.anchorX = '50%';
    iconText.anchorY = '50%';

    return iconText;
  }

  createRoundedPlane(width, height, radius, color, opacity) {
    let shape = new THREE.Shape();
    shape.moveTo(-width / 2 + radius, -height / 2);
    shape.lineTo(width / 2 - radius, -height / 2);
    shape.quadraticCurveTo(
      width / 2,
      -height / 2,
      width / 2,
      -height / 2 + radius,
    );
    shape.lineTo(width / 2, height / 2 - radius);
    shape.quadraticCurveTo(
      width / 2,
      height / 2,
      width / 2 - radius,
      height / 2,
    );
    shape.lineTo(-width / 2 + radius, height / 2);
    shape.quadraticCurveTo(
      -width / 2,
      height / 2,
      -width / 2,
      height / 2 - radius,
    );
    shape.lineTo(-width / 2, -height / 2 + radius);
    shape.quadraticCurveTo(
      -width / 2,
      -height / 2,
      -width / 2 + radius,
      -height / 2,
    );

    let geometry = new THREE.ShapeBufferGeometry(shape);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 'black',
      transparent: true,
      opacity: opacity,
    });

    const planeMesh = new THREE.Mesh(geometry, planeMaterial);

    return planeMesh;
  }

  calculateAdjustedSize(geometry) {
    const boundingBox = new THREE.Box3();
    boundingBox.copy(geometry.boundingBox);

    let height = boundingBox.max.y - boundingBox.min.y;
    let width = boundingBox.max.x - boundingBox.min.x;

    return { width, height };
  }

  async createIconGroup(iconName, additionalText) {
    const iconGroup = new THREE.Group();

    //ICON.SYNC CALL, GET BOUNDING BOX AND FIND WIDTH AND HEIGHT. RETURNS A GROUP WITH THE PIVOT BOTTOM LEFT.

    //GET WIDTH OF THE ICON GROUP  AND SET THE VALUE OF X FOR THE TEXT GROUP.

    const iconPromise = new Promise((resolve) => {
      const icon = this.createIcon(iconName);
      const group = new THREE.Group();

      icon.sync(() => {
        const { width, height } = this.calculateAdjustedSize(icon.geometry);

        icon.position.set(width / 2, height / 2, 0);
        group.add(icon);

        resolve({ group, width, height }); // Pass any relevant width and height values
      });
    });

    const textPromise = new Promise((resolve) => {
      const text = this.createText(additionalText, true);
      const group = new THREE.Group();
      text.sync(() => {
        const { width, height } = this.calculateAdjustedSize(text.geometry);
        text.position.set(width / 2, height / 2, 0);
        group.add(text);
        // Resolve the promise with the text group
        resolve({ group, width, height }); // Pass any relevant width and height values
      });
    });

    const [iconResult, textResult] = await Promise.all([
      iconPromise,
      textPromise,
    ]);

    textResult.group.position.setX(iconResult.width + 2000);
    const verticalOffset = (iconResult.height - textResult.height) / 2;

    textResult.group.position.setY(verticalOffset);

    iconGroup.add(iconResult.group);
    iconGroup.add(textResult.group);

    return {
      group: iconGroup,
      icon: { width: iconResult.width, height: iconResult.height },
      text: { width: textResult.width, height: textResult.height },
    };
  }

  async createAsyncTextGroup(text) {
    const group = new THREE.Group();

    const textPromise = new Promise((resolve) => {
      const textObject = this.createText(text, false);

      textObject.sync(() => {
        const { width, height } = this.calculateAdjustedSize(
          textObject.geometry,
        );

        textObject.position.set(width / 2, height / 2, 0);

        resolve({ textObject, width, height }); // Pass any relevant width and height values
      });
    });

    const textResult = await textPromise;
    group.add(textResult.textObject);
    return {
      group,
      text: { width: textResult.width, height: textResult.height },
    };
  }
  async loadText() {
    // const myText = new Text();

    const formattedDate = this.formatDate(this.dateTime);
    const formattedTime = this.formatTime(this.dateTime);
    // const concatenatedText = `${this.text}\n`;

    const locationText = await this.createAsyncTextGroup(this.text);
    const calendarGroup = await this.createIconGroup('event', formattedDate);
    const clockGroup = await this.createIconGroup(
      'query_builder',
      `${this.type} at ${formattedTime}`,
    );

    //find height of the last line group:

    const clockGroupBoundingBox = new THREE.Box3().setFromObject(
      clockGroup.group,
    );

    // Get the dimensions of the bounding box
    const clockGroupWidth =
      clockGroupBoundingBox.max.x - clockGroupBoundingBox.min.x;
    const clockGroupHeight =
      clockGroupBoundingBox.max.y - clockGroupBoundingBox.min.y;

    const calendarGroupBoundingBox = new THREE.Box3().setFromObject(
      calendarGroup.group,
    );

    // Get the dimensions of the bounding box
    const calendarGroupWidth =
      calendarGroupBoundingBox.max.x - calendarGroupBoundingBox.min.x;
    const calendarGroupHeight =
      calendarGroupBoundingBox.max.y - calendarGroupBoundingBox.min.y;
    // const maxWidth = Math.max(
    //   locationText.text.width,
    //   calendarGroup.icon.width + calendarGroup.text.width,
    //   clockGroup.icon.width + clockGroup.text.width,
    // );

    // // Calculate the cumulative height
    // const cumulativeHeight =
    //   locationText.text.height +
    //   calendarGroup.text.height +
    //   clockGroup.text.height;

    // let adjustment = 2000;
    // const planeMesh = this.createRoundedPlane(
    //   maxWidth + adjustment,
    //   cumulativeHeight + adjustment,
    //   1000,
    //   'black',
    //   0.7,
    // );

    //CREATE BOUNDING BOX OF THE GROUP

    locationText.group.position.setY(
      calendarGroupHeight + clockGroupHeight + 2000,
    );
    calendarGroup.group.position.setY(clockGroupHeight + 500);

    const struct = new THREE.Group();
    struct.position.z += 10 * this.myRenderOrder;

    const parent = new THREE.Group();
    parent.renderOrder = this.myRenderOrder;
    struct.add(locationText.group, calendarGroup.group, clockGroup.group);

    const structBoundingBox = new THREE.Box3().setFromObject(struct);

    // Get the dimensions of the bounding box
    const structWidth = structBoundingBox.max.x - structBoundingBox.min.x;
    const structHeight = structBoundingBox.max.y - structBoundingBox.min.y;
    const paddingX = structWidth * 0.06; // adjust as needed
    const paddingY = structHeight * 0.07; // adjust as needed

    const structWidthWithPadding = structWidth + 2 * paddingX;
    const structHeightWithPadding = structHeight + 2 * paddingY;
    const planeMesh = this.createRoundedPlane(
      structWidthWithPadding,
      structHeightWithPadding,
      1000,
      'black',
      0,
    );

    planeMesh.position.set(structWidth / 2, structHeight / 2, 0);

    planeMesh.add(struct);

    struct.position.setX(-structWidth / 2);
    struct.position.setY(-structHeight / 2);
    parent.add(planeMesh);
    return parent;
  }

  setupGSAPTimeline(
    textPosition: THREE.Vector3 | null,
    textScale: THREE.Vector3 | null,
    selectedTransport: string | null,

    onCompleteCallback: () => void,
  ) {
    const totalFrames = 15; // Total frames for the animation
    const frameRate = 24; // Frames per second
    const frameDuration = 1 / frameRate;
    const totalDuration = totalFrames * frameDuration;

    // Marker animation timeline
    const markerAnimation = gsap
      .timeline()
      .from(this.markerContainer.position, {
        y: this.markerContainer.position.y - 4000,
        duration: frameDuration * 3,
        ease: 'power2.out',
      })
      .fromTo(
        this.markerContainer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: frameDuration * 3,
        },
        '<',
      )
      .to(
        this.markerContainer.scale,
        {
          x: this.markerContainer.scale.x * 0.9,
          y: this.markerContainer.scale.y * 1.1,
          duration: frameDuration * 1,
        },
        '>',
      )
      .to(
        this.markerContainer.scale,
        {
          x: this.markerContainer.scale.x * 1.1,
          y: this.markerContainer.scale.y * 0.9,
          duration: frameDuration * 2,
        },
        '>',
      )
      .to(
        this.markerContainer.scale,
        {
          x: this.markerContainer.scale.x * 0.95,
          y: this.markerContainer.scale.y * 1.05,
          duration: frameDuration * 3,
        },
        '>',
      )
      .to(
        this.markerContainer.scale,
        {
          x: this.markerContainer.scale.x * 1.025,
          y: this.markerContainer.scale.y * 0.975,
          duration: frameDuration * 5,
        },
        '>',
      )
      .to(
        this.markerContainer.scale,
        {
          x: this.markerContainer.scale.x * 1,
          y: this.markerContainer.scale.y * 1,
          duration: frameDuration * 4,
        },
        '>',
      );

    // Text animation timeline
    const textAnimation = gsap.timeline().to(
      this.textContainer.position,
      {
        duration: frameDuration * 16,
        x: textPosition.x,

        onStart: () => {
          this.textContainer.visible = true;
        },
      },
      '<',
    );
    if (selectedTransport === 'Car') {
      textAnimation.to({}, { delay: 2 });
    }
    // 3 seconds of dead space
    // this.childrenWithOpacity.forEach(({ mesh, identifier }) => {
    //   textAnimation.to(
    //     mesh.material,
    //     {
    //       duration: frameDuration * 12,
    //       opacity: identifier === 'plane' ? 1 : 1,

    //       onStart: () => {
    //         if (identifier === 'plane') {
    //           mesh.visible = true;
    //         }
    //       },
    //       onComplete: () => {
    //         if (identifier === 'plane') {
    //           mesh.material.transparent = false;
    //         }
    //       },
    //     },
    //     '<',
    //   );
    // });

    // Combined animation timeline
    this.animationTimeline.add(markerAnimation).add(textAnimation);

    // Add a 2-second delay before calling the onCompleteCallback

    // Call onCompleteCallback after the delay

    this.animationTimeline.call(onCompleteCallback);
  }

  playAnimation(selectedTransport: string, onComplete: () => void) {
    this.adjustScale(false);

    let textPosition;
    let textScale;
    if (this.markerContainer && this.textContainer) {
      textScale = this.textContainer.scale.clone();
      textPosition = this.textContainer.position.clone(); //ADDED WIDTH

      this.textContainer.position.setX((textPosition.x * 1) / 2);

      // this.textContainer.visible = false;

      this.markerContainer.position.set(
        this.coordinates.x,
        this.coordinates.y,
        0,
      );

      const meshIdentifiers = [
        'plane',
        'location',
        'dateIcon',
        'date',
        'timeIcon',
        'time',
      ];
      let index = 0;

      this.textContainer.traverse((child) => {
        if (child.material && child.material.opacity !== undefined) {
          child.material.opacity = 1;
          child.material.transparent = true;

          this.childrenWithOpacity.push({
            mesh: child,
            identifier: meshIdentifiers[index],
          });
          index++;
        }
      });

      const targetElement = this.childrenWithOpacity.find(
        (element) => element.identifier === 'plane',
      );
      // targetElement.mesh.visible = false;
      targetElement.mesh.material.opacity = 1;
      targetElement.mesh.material.transparent = false;

      this.markerContainer.visible = true;
      this.textContainer.visible = false;

      this.tb.add(this.markerContainer);

      this.setupGSAPTimeline(
        textPosition ? textPosition : null,
        textScale ? textScale : null,
        selectedTransport ? selectedTransport : null,
        onComplete,
      );

      const now = Date.now();
      this.startTime = now;
    }
  }

  removeTextAnimation(onCompleteCallback: () => void) {
    const totalFrames = 15; // Total frames for the animation
    const frameRate = 24; // Frames per second
    const frameDuration = 1 / frameRate;
    const totalDuration = totalFrames * frameDuration;
    const textRemoveAnimation = gsap.timeline();

    // Comment out the movement animation
    // textRemoveAnimation.to(
    //   this.textContainer.position,
    //   {
    //     duration: frameDuration * 12,
    //     x: (this.textContainer.position.x * 2) / 3, // Set the target x position for removal
    //     onComplete: () => {
    //       this.textContainer.visible = false;
    //     },
    //   },
    //   '<',
    // );

    this.childrenWithOpacity.forEach(({ mesh, identifier }) => {
      gsap.timeline().to(
        mesh.material,
        {
          duration: frameDuration * 12,
          opacity: 0,

          onStart: () => {
            if (identifier === 'plane') {
              mesh.material.transparent = true;
            }
          },

          onComplete: () => {
            this.textContainer.visible = false;
          },
        },
        '<',
      );
    });

    // Callback when the animation is complete
    textRemoveAnimation.call(onCompleteCallback);
  }

  getMarker3D() {
    if (this.markerContainer) return this.markerContainer;
  }

  getText3D() {
    if (this.textContainer) return this.textContainer;
  }

  adjustScale(shouldLerp: boolean) {
    const zoom = this.map.getZoom();
    const desiredScale = getScaleFromZoom(zoom);
    const lerpFactor = 0.1;
    if (this.markerContainer && this.textContainer) {
      this.tempLerpVec.set(desiredScale, desiredScale, desiredScale);

      if (shouldLerp) {
        this.tempScaleVector.lerp(this.tempLerpVec, lerpFactor);
      } else {
        this.tempScaleVector.copy(this.tempLerpVec);
      }

      this.markerContainer.scale.copy(this.tempScaleVector);
    }
  }

  update() {
    this.adjustScale(true);

    // if (this.startTime !== 0) {
    //   const now = Date.now();
    //   const timeElapsed = now - this.startTime;
    //   let timeProgress = timeElapsed / 1200;
    //   if (timeProgress > 1) {
    //     this.startTime = 0;
    //   }
    //   // this.animationTimeline.progress(timeProgress);
    // }
  }

  pauseAnimation() {
    this.animationTimeline.pause();
  }

  cleanup() {
    // Pause the animation timeline
    this.pauseAnimation();

    // Remove the markerContainer and textContainer from the scene
    if (this.tb && this.markerContainer) {
      this.tb.remove(this.markerContainer);
    }

    // Reset properties to their initial values
    this.startTime = 0;

    // // Reset scale and visibility
    // if (this.markerContainer && this.textContainer) {
    //   this.markerContainer.scale.set(1, 1, 1);
    //   this.textContainer.scale.set(1, 1, 1);
    //   this.markerContainer.visible = false;
    // }

    // // Dispose of any resources (geometry, material, textures, etc.)
    // if (this.textContainer) {
    //   this.textContainer.traverse((obj) => {
    //     if (obj instanceof THREE.Mesh) {
    //       // Dispose of geometry and material
    //       obj.geometry.dispose();
    //       if (obj.material instanceof THREE.Material) {
    //         obj.material.dispose();
    //       } else if (obj.material instanceof THREE.MeshFaceMaterial) {
    //         obj.material.materials.forEach((material) => material.dispose());
    //       }
    //     }
    //   });
    // }

    // Optionally, perform additional cleanup steps based on your requirements

    // Set any flags or booleans to indicate that the instance has been cleaned up
  }
}
export { MarkerAnimation };

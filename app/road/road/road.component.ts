import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import 'aframe';
import * as THREE from 'three';


@Component({
  selector: 'app-road',
  templateUrl: './road.component.html'
})
export class RoadComponent implements AfterViewInit {
  private readonly resetDistance = 2;
  private readonly resetPosition = new THREE.Vector3(12, 2, 10);
  private readonly boundaryBox = new THREE.Box3(
    new THREE.Vector3(-10, -10, -10), // Minimum boundary point
    new THREE.Vector3(10, 10, 10) // Maximum boundary point
  );

  private wPressCount = 0;
  private maxPressCount = 28;
  private isWKeyPressed = false;
  private pressStartTime: number | null = null;
  private pressTimer: any = null;

  ngAfterViewInit(): void {
    const scene = document.querySelector('a-scene');

    if (scene) {
      const camera = scene.querySelector('#camera') as any;

      window.addEventListener('keydown', (event) => {
        if (event.key === 'w' || event.key === 'W' || event.key === 'a' || event.key === 'A') {
          if (!this.isWKeyPressed) {
            this.isWKeyPressed = true;
            this.pressStartTime = Date.now();

            // Start the timer to increment the wPressCount
            this.pressTimer = setInterval(() => {
              this.wPressCount++;
              console.log(this.wPressCount);
              

              if (this.wPressCount >= this.maxPressCount) {
                this.wPressCount = 0;
                camera.object3D.position.copy(this.resetPosition);
                console.log('Camera reset');
              }
            }, 100); // Adjust the interval as desired (e.g., increase or decrease the count frequency)
          }
        }
      });

      window.addEventListener('keyup', (event) => {
        if (event.key === 'w' || event.key === 'W') {
          if (this.isWKeyPressed) {
            this.isWKeyPressed = false;
            this.pressStartTime = null;

            // Clear the pressTimer interval
            clearInterval(this.pressTimer);
            this.pressTimer = null;
          }
        }
      });

      // Listen for the 'tick' event, which is fired on every frame
      camera.addEventListener('tick', () => {
        const currentPosition = new THREE.Vector3();
        camera.object3D.getWorldPosition(currentPosition);

        // Check if the camera's position is outside the boundary
        if (!this.boundaryBox.containsPoint(currentPosition)) {
          // Reset the camera position to the desired reset position
          camera.object3D.position.copy(this.resetPosition);
          console.log('Camera reset');
        }
      });
    }
  }
}

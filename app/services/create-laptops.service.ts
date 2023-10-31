import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateLaptopsService {

  private rows = 5;

  constructor() { }

  createLaptops(totalCount: number, productNames: string[], productPrice: number[], productID: string[], productQuantity: number[], productImages: string [][]): void {

    const scene = document.querySelector('#lapContainer');

    console.log(scene);
    
    if (scene) {
      let itemCount = totalCount;
      const entityWidth = 10; // Set the distance between entities in a row
      const entityHeight = 10; // Set the distance between rows
      const totalEntities = itemCount;
      const productIdByRow = productNames.toString();

        
      const entitiesPerRow = 4;
      const numberOfRows = Math.floor(totalEntities/entitiesPerRow);
      const remainder = totalEntities % entitiesPerRow;

      let entityCount = 0;
      let rowCount = 0;
      for (let row = 1; row <= numberOfRows; row++) {
        for (let column = 1; column <= entitiesPerRow; column++) {
          
          const positionX = column * entityWidth * -2;
          const positionY = this.rows * 10.2 - row * 23 ; 
          const positionZ = -70; // Set the common Z position for all entities 

          const entity = document.createElement('a-entity');
          entity.setAttribute('gltf-model', '../../assets/Laptops/Macbook Silver.glb');
          entity.setAttribute('id' , `${productIdByRow}` );
          entity.setAttribute('data-product-id', `${productID[entityCount]}`);
          entity.setAttribute('data-product-quantity', `${productQuantity[entityCount]}`);
          entity.setAttribute('data-product-image', `${productImages[entityCount]}`);
          entity.setAttribute('data-product-name', `${productNames[entityCount]}`);
          entity.setAttribute('data-product-price', `${productPrice[entityCount]}`);
          entity.setAttribute('position', `${positionX} ${positionY} ${positionZ}`);
          entity.setAttribute('color', '#4CC3D9');
          entity.setAttribute('rotation', '360 0 0');
          entity.setAttribute('scale', '4000 4000 4000');
          entity.setAttribute('handle-events', '');
          scene.appendChild(entity); 
          entityCount++;
        }
        rowCount ++;
      }

      console.log(rowCount);
    
    } else {
      console.error('a-scene element not found in the document.');
    }
  }
}

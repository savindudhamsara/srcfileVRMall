import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Shop2BoxModelsService {

  private rows = 5;

  constructor() { }

  createEntities(totalCount: number, productNames: string[], productPrice: number[], productID: string[], productQuantity: number[], productImages: string [][]): void {
    console.log(totalCount, productNames, productPrice, productID, productQuantity);
    
    const scene = document.querySelector('#boxContainer');
    console.log(scene);
    
    
    if (scene) {
      let itemCount = totalCount;
      const entityWidth = 10; // Set the distance between entities in a row
      const entityHeight = 10; // Set the distance between rows
      const totalEntities = itemCount;
      const productIdByRow = productNames.toString();

        
      const entitiesPerRow = 5;
      const numberOfRows = Math.floor(totalEntities/entitiesPerRow);
      const remainder = totalEntities % entitiesPerRow;

      let entityCount = 0;
      let rowCount = 0;
      for (let row = 1; row <= numberOfRows; row++) {
        for (let column = 1; column <= entitiesPerRow; column++) {
          
          const positionX = column * entityWidth;
          const positionY = this.rows * 13 - row * 20 - 6 ; 
          const positionZ = -70; // Set the common Z position for all entities 

          const entity = document.createElement('a-entity');
          if(productNames[entityCount].toString() === "I Phone 14 Pro") {
            entity.setAttribute('gltf-model', '../../assets/buildings/iPhone14.glb');
          } else if (productNames[entityCount].toString() === "I Phone 11 Pro") {
            entity.setAttribute('gltf-model', '../../assets/buildings/iPhone11.glb');
          }
          else if (productNames[entityCount].toString() === "I Phone 12 Pro") {
            entity.setAttribute('gltf-model', '../../assets/buildings/iPhone12.glb');
          }
          else if (productNames[entityCount].toString() === "I Phone 15 Pro") {
            entity.setAttribute('gltf-model', '../../assets/buildings/iPhone13.glb');
          }
          else {
            entity.setAttribute('gltf-model', '../../assets/buildings/iPhone13.glb');
          }
          entity.setAttribute('id' , `${productIdByRow}` );
          entity.setAttribute('data-product-id', `${productID[entityCount]}`);
          entity.setAttribute('data-product-quantity', `${productQuantity[entityCount]}`);
          entity.setAttribute('data-product-image', `${productImages[entityCount]}`);
          entity.setAttribute('data-product-name', `${productNames[entityCount]}`);
          entity.setAttribute('data-product-price', `${productPrice[entityCount]}`);
          entity.setAttribute('position', `${positionX} ${positionY} ${positionZ}`);
          entity.setAttribute('color', '#4CC3D9');
          entity.setAttribute('rotation', '-90 0 0');
          entity.setAttribute('scale', '100 100 100');
          entity.setAttribute('handle-events', '');
          scene.appendChild(entity); 
          entityCount++;
        }
        rowCount ++;
      }

      console.log(remainder);
      
      
      for (let i = 0; i < remainder; i++) {

          const positionX = (i + 1) * entityWidth;
          const positionY = this.rows * 12 - (rowCount + 1) * 22 ; 
          const positionZ = -70; // Set the common Z position for all entities 

          const entity = document.createElement('a-entity');
          if(productNames[entityCount].toString() === "I Phone 14 Pro") {
            entity.setAttribute('gltf-model', '../../assets/buildings/iPhone14.glb');
          } else if (productNames[entityCount].toString() === "I Phone 11 Pro") {
            entity.setAttribute('gltf-model', '../../assets/buildings/iPhone11.glb');
          }
          else if (productNames[entityCount].toString() === "I Phone 12 Pro") {
            entity.setAttribute('gltf-model', '../../assets/buildings/iPhone12.glb');
          }
          else if (productNames[entityCount].toString() === "I Phone 15 Pro") {
            entity.setAttribute('gltf-model', '../../assets/buildings/iPhone13.glb');
          }
          else {
            entity.setAttribute('gltf-model', '../../assets/buildings/Phone.glb');
          }
           
          entity.setAttribute('data-product-id', `${productID[entityCount]}`);
          entity.setAttribute('data-product-quantity', `${productQuantity[entityCount]}`);
          entity.setAttribute('data-product-name', `${productNames[entityCount]}`);
          entity.setAttribute('data-product-image', `${productImages[entityCount]}`);
          entity.setAttribute('data-product-price', `${productPrice[entityCount]}`);
          entity.setAttribute('position', `${positionX} ${positionY} ${positionZ}`);
          entity.setAttribute('color', '#4CC3D9');
          entity.setAttribute('rotation', '-90 0 0');
          entity.setAttribute('scale', '100 100 100');
          entity.setAttribute('handle-events', '');
          scene.appendChild(entity);
      }
    
    } else {
      console.error(console.error());
      
    }
  }
}

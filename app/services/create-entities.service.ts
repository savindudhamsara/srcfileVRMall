import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CreateEntitiesService {

  constructor(
   public crud: CrudService
  ) { }

  createCarts (cartCount: number, cartNames: string[], cartPrices: number[], cartImages: string [][]) {
    const scene = document.querySelector('#scrollContainer');
    const price = document.querySelector("#priceDisplay");
    var totalPrice = 0;

    
        for (let row = 0; row < cartCount; row ++) {
  
          const positionX = -30;
          const positionY = row * 15 - 20; 
          const positionZ = 45.1; // Set the common Z position for all entities 
    
          const entity = document.createElement('a-image');
    
          entity.setAttribute('id', 'priceList')
          entity.setAttribute('src', '../../assets/textures/button.png')
          entity.setAttribute('position',  `${positionX} ${positionY} ${positionZ}`);
          entity.setAttribute('height', '10');
          entity.setAttribute('width', '12');
          entity.setAttribute('color', 'gray');
          entity.setAttribute('handle-events', '');
          scene.appendChild(entity); 
        }
    
        for (let row = 0; row < cartCount; row ++) {
    
          const positionX = -20;
          const positionY = row * 15 - 15; 
          const positionZ = 45.1;
    
          const positionx = -12;
          const positiony = row * 15 - 13;
          const positionz = 45.1;
    
          const entity = document.createElement('a-text');
          const box = document.createElement ('a-box');
    
          entity.setAttribute('id','itemList');
          entity.setAttribute('position',  `${positionX} ${positionY} ${positionZ}`);
          entity.setAttribute('value', `${cartNames[row]}`);
          entity.setAttribute('color', 'black');
          entity.setAttribute('scale', '8 8 8');
          entity.setAttribute('handle-events', '');
    
          box.setAttribute('height', '0.05');
          box.setAttribute('width', '50');
          box.setAttribute('depth', '0.01');
          box.setAttribute('color', 'grey');
          box.setAttribute('position',  `${positionx} ${positiony} ${positionz}`)
    
          scene.appendChild(box);
          scene.appendChild(entity); 
        }
    
        for (let row = 0; row < cartCount; row ++) {
          
         
          const positionX = 10;
          const positionY = row * 15 - 15; 
          const positionZ = 45.1; // Set the common Z position for all entities 
    
          const entity = document.createElement('a-image');
    
          entity.setAttribute('id', 'priceList')
          entity.setAttribute('src',  `${cartImages[row]}`)
          entity.setAttribute('position',  `${positionX} ${positionY} ${positionZ}`);
          entity.setAttribute('scale', '2 2 2');
          entity.setAttribute('handle-events', '');
          scene.appendChild(entity); 
        }
        
        for (let row = 0; row < cartCount; row ++) {
    
          const positionX = -20;
          const positionY = row * 15 - 18; 
          const positionZ = 45.1; // Set the common Z position for all entities 
    
          const entity = document.createElement('a-text');
   
          entity.setAttribute('id', 'priceList')
          entity.setAttribute('position',  `${positionX} ${positionY} ${positionZ}`);
          entity.setAttribute('value',  `${cartPrices[row]}`);
          totalPrice += cartPrices[row];
          
          entity.setAttribute('color', 'black');
          entity.setAttribute('scale', '7 7 7');
          entity.setAttribute('handle-events', '');
          scene.appendChild(entity); 
        }

        const prices = document.createElement('a-text');
        prices.setAttribute('color', 'black');
        prices.setAttribute('scale', '7 7 7');
        prices.setAttribute('position',  '-20 20 45.1');

        prices.setAttribute('value',  `${totalPrice}`);
        // scene.appendChild(prices);

        for (let row = 0; row < cartCount; row ++) {
    
          const positionX = -20;
          const positionY = row * 15 - 25; 
          const positionZ = 45.1; // Set the common Z position for all entities 
    
          const entity = document.createElement('a-text');
    
          entity.setAttribute('id', 'priceList')
          entity.setAttribute('position',  `${positionX} ${positionY} ${positionZ}`);
          entity.setAttribute('value',  `In Stock`);
          entity.setAttribute('color', 'black');
          entity.setAttribute('scale', '7 7 7');
          entity.setAttribute('handle-events', '');
          scene.appendChild(entity); 
        }
    
        for (let row = 0; row < cartCount; row ++) {
    
          const positionX = 10;
          const positionY = row * 15 - 15; 
          const positionZ = 45.1; // Set the common Z position for all entities 
    
          const entity = document.createElement('a-image');
    
          entity.setAttribute('id', 'closeeButton')
          entity.setAttribute('src', '../../assets/textures/cancel.png')
          entity.setAttribute('position',  `${positionX} ${positionY} ${positionZ}`);
          entity.setAttribute('scale', '2 2 2');
          entity.setAttribute('handle-events', '');
          scene.appendChild(entity); 
        }
      }
    }

function deleteCartItems (productId: string, crud: CrudService) {
  crud.deleteProductFromCartById(productId);
}

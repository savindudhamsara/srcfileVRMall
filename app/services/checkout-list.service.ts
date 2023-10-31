import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutListService {

  constructor(
    public crud: CrudService
  ) { }

  createProduct(productNames: any, productPrices: any){
    const scene = document.querySelector('#boughtList');
    if(scene){
      const image = document.createElement('a-image');
      const productName = document.createElement('a-text');
      const productPrice = document.createElement('a-text');
      const totalAmount = document.createElement('a-text');

      image.setAttribute('position', '-10 2 0.1');
      image.setAttribute('src', '../../assets/textures/button.png');
      image.setAttribute('height', '7.5');
      image.setAttribute('width', '7.5');
      image.setAttribute('color', 'gray');

      productName.setAttribute('value', `${productNames}`);
      productName.setAttribute('scale', '7 7 7');
      productName.setAttribute('color', 'white');
      productName.setAttribute('position', '-5 4 0.1');

      productPrice.setAttribute('value', `${productPrices}`);
      productPrice.setAttribute('scale', '6 6 6');
      productPrice.setAttribute('color', 'white');
      productPrice.setAttribute('position', '-5 0 0.1');

      totalAmount.setAttribute('value', `${productPrices}`);
      totalAmount.setAttribute('scale', '7 7 7');
      totalAmount.setAttribute('color', 'white');
      totalAmount.setAttribute('position', '7 -4.5 0.1');

      scene.appendChild(image);
      scene.appendChild(productName);
      scene.appendChild(productPrice);
      scene.appendChild(totalAmount);
    }
  }
}

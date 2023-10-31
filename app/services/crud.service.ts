import { Injectable } from "@angular/core";
import { Product } from "./product";
import { Cart } from "./productcart";
import { Payment } from "./payments";
import { finalize } from "rxjs";

import {
    AngularFireDatabase,
    AngularFireList,
    AngularFireObject,
  
  } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Result } from 'postcss';
import { Observable, empty, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { PMREMGenerator } from "three";

@Injectable({
    providedIn: 'root'
})

export class CrudService {
    productRef: AngularFirestoreCollection;
    cartRef: AngularFirestoreCollection;
    paymentRef: AngularFirestoreCollection;

    constructor(
        private db: AngularFireDatabase,
        private firestore: AngularFirestore,
        private storage: AngularFireStorage
        ) {
        this.productRef = firestore.collection('product');
        this.cartRef = firestore.collection('cart');
        this.paymentRef = firestore.collection('payment');
      }

  AddProductToCart (Cart: Cart) {
    this.cartRef.doc(Cart.Id).set(Cart)
      .then((Cart) => {
        console.log("Item Added to Cart", Cart);
        this.getTotalCountOfCart();
      })
      .catch((error) => {
        console.log("Error occured", error);
      })
  }

  AddOneProductToCart (Cart: Cart) {
    this.cartRef.doc(Cart.Id).set(Cart)
      .then((Cart) => {
        console.log("Item Added to Cart", Cart);
        this.getTotalCountOfCart();
      })
      .catch((error) => {
        console.log("Error occured", error);
      })
  }

  PaymentProcedure (Payment: Payment) {
    this.paymentRef.doc(Payment.Id).set(Payment)
      .then((Payment) => {
        this.getTotalCountOfCart();
      })
      .catch((error) => {
        console.log("Error occured", error);
      })
    return 1
  }

  async getTotalCountOfCart () {
    try{ 
      const cartItems = await this.getCartList();
      return cartItems.length;
    }catch (error) {
      console.log('Error while getting cart items:', error);
      return 0;
    }
  }

  async getTotalCountOfShop2Cart () {
    try{ 
      const cartItems = await this.getShop2CartList();
      return cartItems.length;
    }catch (error) {
      console.log('Error while getting cart items:', error);
      return 0;
    }
  }

  getCartList() {
    return new Promise<Cart[]>((resolve, reject) => {
      this.firestore
        .collection('cart')
        .get()
        .subscribe((result) => {
          if(!result.empty) {
            const cartItems = result.docs.map((doc) => doc.data()) as Cart[];
            resolve(cartItems);
          }
          else reject('Could not find result.');
        });
    })
  }

  getShop2CartList() {
    return new Promise<Cart[]>((resolve, reject) => {
      this.firestore
        .collection('shop2Cart')
        .get()
        .subscribe((result) => {
          if(!result.empty) {
            const cartItems = result.docs.map((doc) => doc.data()) as Cart[];
            resolve(cartItems);
          }
          else reject('Could not find result.');
        });
    })
  }



     //Get Products
  getProductsList() {
    return new Promise<Product[]>((resolve, reject) => {
      this.firestore
        .collection('product')
        .get()
        .subscribe((result) => {
          if(!result.empty) {
            const products = result.docs.map((doc) => doc.data()) as Product[];
            resolve(products);
          }
          else reject('Could not find result.');
        });
    })
  }

  getShop2ProductsList() {
    return new Promise<Product[]>((resolve, reject) => {
      this.firestore
        .collection('shop2Products')
        .get()
        .subscribe((result) => {
          if(!result.empty) {
            const products = result.docs.map((doc) => doc.data()) as Product[];
            resolve(products);
          }
          else reject('Could not find result.');
        });
    })
  }

  getProductIDs () {
    return new Promise <Product[]>((resolve, reject) => {
      this.firestore 
        .collection ('product')
        .get()
        .subscribe((result) => {
          if(!result.empty) {
            const products = result.docs.map((doc) => doc.data()) as Product[];
            resolve(products);
          }
          else reject ('could not find result');
        })
    })
  }

  getProductsListByName(productName: string) {
    return new Promise<Product[]>((resolve, reject) => {
      this.firestore
        .collection('product')
        .get()
        .subscribe((result) => {
          if(!result.empty) {
            const products = result.docs.map((doc) => doc.data()) as Product[];
            resolve(products);
          }
          else reject('Could not find result.');
        });
    })
  }

  getProductByID(productId: string) {
    return new Promise<Product[]>((resolve, reject) => {
      this.firestore
          .collection('product')
          .doc(productId)
          .get()
          .subscribe((result) => {
            if(result.exists) {
              const productData = result.data() as Product;
              const product: Product = {...productData};
              resolve([product]);
            }
            else reject('Could not find result');
          });
    })
  }

  deleteProductFromCartById(productId: string) {
    this.firestore.collection('cart').doc(productId).delete();
  }

}



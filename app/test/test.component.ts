import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '../services/crud.service';
import { Product } from '../services/product';
import { OpenPopupComponent } from '../open-popup/open-popup.component';
import { Cart } from '../services/productcart';
import { Payment } from '../services/payments';
import { CheckoutListService } from '../services/checkout-list.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEntitiesService } from '../services/create-entities.service';
import { CreateBoxModelsService } from '../services/create-box-models.service';
import { Shop2BoxModelsService } from '../services/shop2-box-models.service';
import { CreateComputersService } from '../services/create-computers.service';
import { AudioServiceService } from '../services/audio-service.service';
import { ListenAudioService } from '../services/listen-audio.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateLaptopsService } from '../services/create-laptops.service';
import * as RecordRTC from 'recordrtc';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppComponent } from '../app.component';
import { CartBoughtListService } from '../services/cart-bought-list.service';
declare const AFRAME: any;
declare const Leap: any;


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements AfterViewInit {

  public viewProductForm!: FormGroup;
  products!: Product[];
  productID!: string;
  newCart!: Cart[];
  public payment!: Payment[]

  responseMessage: string = '';

  URLs: string = 'blob:http://localhost:4200/a4699b3d-ac6c-4144-9c0d-fe5aab8a3262';
  constructor(
    public _recordRTC: AudioServiceService,
    private dialogRef: MatDialog,
    public crudAPI: CrudService,
    private buyService: CheckoutListService,
    private cartBuyService: CartBoughtListService,
    private boxModels: CreateBoxModelsService,
    private laptops: CreateLaptopsService,
    private cartsCrud: CreateEntitiesService,
    private shop2Boxes: Shop2BoxModelsService,
    private computerCrud: CreateComputersService,
    private audio: ListenAudioService,
    private ngZone: NgZone,
    public http: HttpClient,
    private firestore: AngularFirestore,

  ) {
    this.initLeapMotion();
  }

  async ngAfterViewInit(): Promise<void> {

    const crudApi = this.crudAPI;
    const boxes = this.boxModels;
    const record = this._recordRTC;
    const computers = this.computerCrud;
    const carts = this.cartsCrud;
    const payment = this.payment;
    const shop2Boxes = this.shop2Boxes;
    const audio = this.audio;
    const laptops = this.laptops;
    const URls = this.URLs;
    const http = this.http;
    const firestore = this.firestore;
    const buyService = this.buyService;
    const cartBuyService = this.cartBuyService;
    let responseMessage = this.responseMessage;


    let cartCount: number = await this.crudAPI.getTotalCountOfCart();
    // let shop2cartcount: number = await this.crudAPI.getTotalCountOfShop2Cart();

    const productList: Product[] = (await this.crudAPI.getProductsList());
    const shop2ProductList: Product[] = (await this.crudAPI.getShop2ProductsList());

    const cartList: Cart[] = (await this.crudAPI.getCartList());
    // const shop2cartList: Cart[] = (await this.crudAPI.getShop2CartList());

    const productIDs: string[] = productList.map((product) => product.Id);
    const productNames: string[] = productList.map((product) => product.name);
    const productPrices: number[] = productList.map((product) => product.price);
    const productImages: string[][] = productList.map((product) => product.imageSet);
    const productQuantities: number[] = productList.map((product) => product.quantity);

    const shop2productIDs: string[] = shop2ProductList.map((product) => product.Id);
    const shop2productNames: string[] = shop2ProductList.map((product) => product.name);
    const shop2productPrices: number[] = shop2ProductList.map((product) => product.price);
    const shop2productImages: string[][] = shop2ProductList.map((product) => product.imageSet);
    const shop2productQuantities: number[] = shop2ProductList.map((product) => product.quantity);

    const cartNames: string[] = cartList.map((cart) => cart.name);
    const cartPrices: number[] = cartList.map((cart) => cart.price);
    const cartImages: string[][] = cartList.map((cart) => cart.imageSet);

    const totalCount: number = productList.length;
    const shop2totalCount: number = shop2ProductList.length;

    const vrMallScene = document.getElementById('vrMallScene');
    const vrStoreScene = document.getElementById('vrStoreScene');
    const firstshopSelect = document.getElementById('shopSelector1');
    const secondshopSelect = document.getElementById('shopSelector2');
    const buyButton = document.getElementById('buyButton');
    const backButton = document.getElementById('backtoButton');
    const name = document.getElementById('FullName');

    const email = document.getElementById('Email');
    const cardName = document.getElementById('cardName');
    const cardNumber = document.getElementById('cardNumber');
    const Month = document.getElementById('Month');
    const Year = document.getElementById('Year');
    const Cvv = document.getElementById('CVV');

    const thumbstick = document.getElementById('thumbstick');

    thumbstick?.addEventListener('thumbstickmoved', function () {
      console.log("sadsa");

    })

    name?.addEventListener('click', function () {
      const username = document.getElementById('username');
      addEventListersWithAudioRecording(username, http, record, audio);
    })

    email?.addEventListener('click', function () {
      const userEmail = document.getElementById('useremail');
      addEventListersWithAudioRecording(userEmail, http, record, audio);
    })

    cardName?.addEventListener('click', function () {
      const cardname = document.getElementById('cardname');
      addEventListersWithAudioRecording(cardname, http, record, audio);
    })

    cardNumber?.addEventListener('click', function () {
      const cardnumber = document.getElementById('cardnumber');
      addEventListersWithAudioRecording(cardnumber, http, record, audio);
    })

    Month?.addEventListener('click', function () {
      const month = document.getElementById('month');
      addEventListersWithAudioRecording(month, http, record, audio);
    })

    Year?.addEventListener('click', function () {
      const year = document.getElementById('year');
      addEventListersWithAudioRecording(year, http, record, audio);
    })

    Cvv?.addEventListener('click', function () {
      const cvv = document.getElementById('cvv');
      addEventListersWithAudioRecording(cvv, http, record, audio);
    })
    const confirmPayment = document.getElementById('ConfirmButton');

    confirmPayment?.addEventListener('click', function () {

      const username = document.getElementById('username');
      var customername = username;
      const userEmail = document.getElementById('useremail');
      var customeremail = userEmail;
      const entityName = document.getElementById('text')
      const entityPrice = document.getElementById('price')
      var name = entityName?.getAttribute('value');
      var price = entityPrice?.getAttribute('value');
      const successMessage = document.getElementById('successMessage');

      const checkoutPlane = document.getElementById('checkoutPlane');
      const specificationPlane = document.getElementById('specificationPopup');
      const settings = document.getElementById('addCartPlane');



      const payments: Payment = {
        Id: generateKey(firestore),
        ItemName: name,
        ItemPrice: price,
        ItemQuantity: 1,
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
        shopName: "VR Store",
        CustomerName: username?.getAttribute('value'),
        CustomerEmail: userEmail?.getAttribute('value')
      }

      const value = crudApi.PaymentProcedure(payments);
      if (value == 1) {
        username?.setAttribute('value', '');
        userEmail?.setAttribute('value', '');
        cardName?.setAttribute('value', '');
        cardNumber?.setAttribute('value', '');
        Month?.setAttribute('value', '');

        specificationPlane?.setAttribute('position', '10 2 -90');
        specificationPlane?.setAttribute('visible', 'false');
        settings?.setAttribute('visible', 'false')
        checkoutPlane?.setAttribute('position', '5 2 -90');
        checkoutPlane?.setAttribute('visible', 'false');

        successMessage?.setAttribute('visible', 'true');
        successMessage?.setAttribute('position', '10 2 -45');
      }

      const gobackButton = document.getElementById('goBackButton');
      gobackButton?.addEventListener('click', function () {
        successMessage?.setAttribute('visible', 'true');
        successMessage?.setAttribute('position', '10 2 -45');
      })


    })



    buyButton?.addEventListener('click', function () {
      // let gesture = handleValues.gestureValue.toString();
      // if(gesture != "") {
      //   let gesture = handleValues.gestureValue.toString();
      //   if (gesture === "keyTap") {
          const entityName = document.getElementById('text')
          const entityPrice = document.getElementById('price')
          var name = entityName?.getAttribute('value');
          var price = entityPrice?.getAttribute('value');
  
          const checkoutPlane = document.getElementById('checkoutPlane');
          const specificationPlane = document.getElementById('specificationPopup');
          const settings = document.getElementById('addCartPlane');
  
          specificationPlane?.setAttribute('position', '10 2 -90');
          specificationPlane?.setAttribute('visible', 'false');
          settings?.setAttribute('visible', 'false')
          checkoutPlane?.setAttribute('visible', 'true');
          checkoutPlane?.setAttribute('position', '5 2 -45')
  
          buyService.createProduct(name, price);
        // }
      // }
      

      // const entityName = document.getElementById('text')
      // const entityPrice = document.getElementById('price')
      // var name = entityName?.getAttribute('value');
      // var price = entityPrice?.getAttribute('value');

      // const checkoutPlane = document.getElementById('checkoutPlane');
      // const specificationPlane = document.getElementById('specificationPopup');
      // const settings = document.getElementById('addCartPlane');

      // specificationPlane?.setAttribute('position', '10 2 -90');
      // specificationPlane?.setAttribute('visible', 'false');
      // settings?.setAttribute('visible', 'false')
      // checkoutPlane?.setAttribute('visible', 'true');
      // checkoutPlane?.setAttribute('position', '5 2 -45')

      // buyService.createProduct(name, price);
    })

    backButton?.addEventListener('mouseenter', function () {
      let gesture = handleValues.gestureValue.toString();
      if(gesture != "") {
        let gesture = handleValues.gestureValue.toString();
        if (gesture === "keyTap") {
          const checkoutPlane = document.getElementById('checkoutPlane');
          const specificationPlane = document.getElementById('specificationPopup');
          const settings = document.getElementById('addCartPlane');
  
          specificationPlane?.setAttribute('position', '10 2 -45');
          specificationPlane?.setAttribute('visible', 'true');
          settings?.setAttribute('visible', 'true')
          checkoutPlane?.setAttribute('visible', 'false');
          checkoutPlane?.setAttribute('position', '5 2 -90')
        }
      }
 
      // const checkoutPlane = document.getElementById('checkoutPlane');
      // const specificationPlane = document.getElementById('specificationPopup');
      // const settings = document.getElementById('addCartPlane');

      // specificationPlane?.setAttribute('position', '10 2 -45');
      // specificationPlane?.setAttribute('visible', 'true');
      // settings?.setAttribute('visible', 'true')
      // checkoutPlane?.setAttribute('visible', 'false');
      // checkoutPlane?.setAttribute('position', '5 2 -90')
    })

    firstshopSelect?.addEventListener('click', function () {
      let gesture = handleValues.gestureValue.toString();
      const text = document.getElementById('gesture');
      text?.setAttribute?.('value', gesture);
      // if (gesture === "keyTap") {
        const vrMallScene = document.getElementById('vrMallScene');
        const vrStoreScene = document.getElementById('vrStoreScene1');
        vrMallScene?.setAttribute('visible', 'false');
        vrMallScene?.setAttribute('position', '0 -100 0')
        vrStoreScene?.setAttribute('visible', 'true');
        vrStoreScene?.setAttribute('position', '0 0 0')
        text?.setAttribute?.('value', "none");
        laptops.createLaptops(totalCount, productNames, productPrices, productIDs, productQuantities, productImages);
        shop2Boxes.createEntities(shop2totalCount, shop2productNames, shop2productPrices, shop2productIDs, shop2productQuantities, shop2productImages);
      // }
    })

    secondshopSelect?.addEventListener('click', function () {
      let gesture = handleValues.gestureValue.toString();
      const text = document.getElementById('gesture');
      // text?.setAttribute?.('value', gesture);
      // if (gesture === "keyTap") {
        const vrMallScene = document.getElementById('vrMallScene');
        const vrStoreScene = document.getElementById('vrStoreScene1');
        vrMallScene?.setAttribute('visible', 'false');
        vrMallScene?.setAttribute('position', '0 -100 0')
        vrStoreScene?.setAttribute('visible', 'true');
        vrStoreScene?.setAttribute('position', '0 0 0')
        text?.setAttribute?.('value', "none");
        boxes.createEntities(totalCount, productNames, productPrices, productIDs, productQuantities, productImages);
        laptops.createLaptops(totalCount, productNames, productPrices, productIDs, productQuantities, productImages);

      // }
    })

    secondshopSelect?.addEventListener('mouseenter', function () {
      console.log("entered");

    })

    const mircoPhoneButton = document.getElementById('micButton');

    mircoPhoneButton?.addEventListener('click', async function () {
      
      record.toggleRecord().then(async (res: any) => {

        const response = await fetch(res);
        const blob = await response.blob();
        const file =  new File([blob], "hello", { type: blob.type });

        const formData = new FormData();
        formData.append('audio', file); 

        
        fetch('http://127.0.0.1:8000/gapi', {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
          headers: new Headers(),
        })
          .then((response: any) => {
            if (response.ok) {
              return response.json();
            } else {
              console.error('HTTP Status:', response.status);
              console.error('HTTP Status Text:', response.statusText);
            }
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error('Fetch error:', error);
          });

        // audio.resolveBlobFromBlobUrl(res).then((blob: any) => {
        //   console.log("sadw", blob);
          
        //   const formData = new FormData();
        //   formData.append('audio', blob); // 'audio.wav' is the desired filename on the server
        //   console.log(formData);

        //   http.post('http://127.0.0.1:8000/gapi', {
        //     body: formData,
        //     mode: 'no-cors',
        //     Headers: new Headers({})
        //   })
        //     .subscribe((response) => {
        //       console.log(response);
              
        //     })
        // });
      });

    });


    AFRAME.registerComponent('handle-events', {
      init: function () {
        var el = this.el;

        var originalScale = el.getAttribute('scale');
        var productId = el.getAttribute('data-product-id');
        var productName = el.getAttribute('data-product-name');
        var productImage = el.getAttribute('data-product-image');
        var productPrice = el.getAttribute('data-product-price');
        var heightIncrease = 0.2;

        const addButton = document.getElementById('addButton');
        const addCartButton = document.getElementById('cartButtonMenu');
        const checkoutButton = document.getElementById('checkoutButton')
        const backButton = document.getElementById('backButton');
        const closeButton = document.getElementById('closeButton');
        const goHomeButton = document.getElementById('gohomeButton');
        const checkoutBackButton = document.getElementById('backCheckButton');
        const checkoutPlane = document.getElementById('checkoutPlane')

        goHomeButton?.addEventListener('mouseenter', function () {
          let gesture = handleValues.gestureValue.toString();
          if (gesture === "keyTap") {
            const emptyPlane = document.getElementById('emptyPlane');
            const popupPlane = document.getElementById('popupPlane');
            popupPlane?.setAttribute('visible', 'true');
            emptyPlane?.setAttribute('visible', 'false');
          }

          goHomeButton.addEventListener('click', function () {
            const emptyPlane = document.getElementById('emptyPlane');
            const popupPlane = document.getElementById('popupPlane');
            popupPlane?.setAttribute('visible', 'true');
            emptyPlane?.setAttribute('visible', 'false');
          })
        })

        backButton?.addEventListener('mouseenter', function () {
          let gesture = handleValues.gestureValue.toString();
          if (gesture === "keyTap") {
            const cart = document.getElementById('cartViewPlane');
            const specificationPlane = document.getElementById('specificationPopup');
            const popupPlane = document.getElementById('popupPlane');
            const cartPlane = document.getElementById('addCartPlane');

            cart?.setAttribute('position', '10 2 -90');
            cart?.setAttribute('visible', 'false');
            specificationPlane?.setAttribute('position', '10 2 -45');
            specificationPlane?.setAttribute('visible', 'true');
            popupPlane?.setAttribute('visible', 'true');
            cartPlane?.setAttribute('visible', 'true');
          }

          backButton.addEventListener('click', function () {
            const cart = document.getElementById('cartViewPlane');
            const specificationPlane = document.getElementById('specificationPopup');
            const popupPlane = document.getElementById('popupPlane');
            const cartPlane = document.getElementById('addCartPlane');

            cart?.setAttribute('position', '10 2 -90');
            cart?.setAttribute('visible', 'false');
            specificationPlane?.setAttribute('position', '10 2 -45');
            specificationPlane?.setAttribute('visible', 'true');
            popupPlane?.setAttribute('visible', 'true');
            cartPlane?.setAttribute('visible', 'true');
          })
        })

        checkoutBackButton?.addEventListener('mouseenter', function () {
          let gesture = handleValues.gestureValue.toString();
          if (gesture === "keyTap") {
            const cart = document.getElementById('cartViewPlane');
            checkoutPlane?.setAttribute('visible', 'false');
            checkoutPlane?.setAttribute('position', '10 2 -95');
            cart?.setAttribute('visible', 'true');
            cart?.setAttribute('position', '10 2 -45');
          }
        })

        // checkoutBackButton?.addEventListener('click', function() {
        //   const cart = document.getElementById('cartViewPlane');
        //   checkoutPlane?.setAttribute('visible', 'false');
        //   checkoutPlane?.setAttribute('position', '10 2 -95');
        //   cart?.setAttribute('visible', 'true');
        //   cart?.setAttribute('position', '10 2 -45');
        // })

        let closeButtonClickCount = 0;


        closeButton?.addEventListener('mouseenter', function () {
          let gesture = handleValues.gestureValue.toString();
          if (gesture === "keyTap") {
            const specificationPlane = document.getElementById('specificationPopup');
            const cartPlane = document.getElementById('addCartPlane');
            cartPlane?.setAttribute('visible', 'false');
            specificationPlane?.setAttribute('position', '10 2 -90');
            specificationPlane?.setAttribute('visible', 'false');
          }
        });

        // closeButton?.addEventListener('click', function () {
        //   console.log(`close button clicked ${++closeButtonClickCount}`);
        //   const specificationPlane = document.getElementById('specificationPopup');
        //   const cartPlane = document.getElementById('addCartPlane');
        //   cartPlane?.setAttribute('visible', 'false');
        //   specificationPlane?.setAttribute('position', '10 2 -90');
        //   specificationPlane?.setAttribute('visible', 'false');
        // });



        el.addEventListener('mouseenter', function () {
          let gesture = handleValues.gestureValue.toString();
          if (gesture === "keyTap") {
            const popupPlane = document.getElementById('popupPlane');
            const specificationPlane = document.getElementById('specificationPopup');
            const cartPlane = document.getElementById('addCartPlane');
            const checkoutPlane = document.getElementById('cartcheckoutPlane')
            const text = document.getElementById('text');
            const price = document.getElementById('price');
            const image = document.getElementById('productImage');

            const Id = document.getElementById('IdName');
            Id?.setAttribute('value', productId);
            image?.setAttribute('src', productImage);

            cartPlane?.setAttribute('visible', 'true');
        
              specificationPlane?.setAttribute('visible', 'true');
              specificationPlane?.setAttribute('position', '0.7 1.4 -2');
              popupPlane?.setAttribute('visible', 'true');
              text?.setAttribute('value', productName)
              price?.setAttribute('value', productPrice)
          }


          el.addEventListener('click', function () {
            const popupPlane = document.getElementById('popupPlane');
            const specificationPlane = document.getElementById('specificationPopup');
            const cartPlane = document.getElementById('addCartPlane');
            const checkoutPlane = document.getElementById('cartcheckoutPlane')
            const sidePopup = document.getElementById('imagePopup');
            const text = document.getElementById('text');
            const price = document.getElementById('price');
            const image = document.getElementById('productImage');

            const Id = document.getElementById('IdName');
            Id?.setAttribute('value', productId);
            image?.setAttribute('src', productImage);

            cartPlane?.setAttribute('visible', 'true');
            let gestures = handleValues.gestureValue.toString();
            addCartButton?.addEventListener('mouseenter', function () {
              if (gestures === "keyTap") {
                const cart = document.getElementById('cartViewPlane');
                const cartPlane = document.getElementById('addCartPlane');
                const itemList = document.getElementById('scrollContainer');
                const emptyCart = document.getElementById('emptyPlane');
                const cartValue = document.getElementById('cartValue');
                const box = document.getElementById('box');

                if (cart) {
                  if (cartCount != 0) {
                    cart.setAttribute('visible', 'true')
                    cart.setAttribute('position', '10 2 -45')
                    itemList?.setAttribute('visible', 'true')
                    cartValue?.setAttribute('value', cartCount.toString() + ' Items')
                    carts.createCarts(cartCount, cartNames, cartPrices, cartImages)

                    popupPlane?.setAttribute('visible', 'false');
                    emptyCart?.setAttribute('visible', 'false');
                    cartPlane?.setAttribute('visible', 'false');
                  }
                  else {
                    emptyCart?.setAttribute('visible', 'true')
                  }
                  box?.setAttribute('visible', 'false');
                }
              }

              addCartButton?.addEventListener('click', function () {
                const cart = document.getElementById('cartViewPlane');
                const cartPlane = document.getElementById('addCartPlane');
                const itemList = document.getElementById('scrollContainer');
                const emptyCart = document.getElementById('emptyPlane');
                const cartValue = document.getElementById('cartValue');
                const box = document.getElementById('box');

                if (cart) {
                  if (cartCount != 0) {
                    cart.setAttribute('visible', 'true')
                    cart.setAttribute('position', '10 2 -45')
                    itemList?.setAttribute('visible', 'true')
                    cartValue?.setAttribute('value', cartCount.toString() + ' Items')
                    carts.createCarts(cartCount, cartNames, cartPrices, cartImages)

                    popupPlane?.setAttribute('visible', 'false');
                    emptyCart?.setAttribute('visible', 'false');
                    cartPlane?.setAttribute('visible', 'false');
                  }
                  else {
                    emptyCart?.setAttribute('visible', 'true')
                  }
                  box?.setAttribute('visible', 'false');
                }
              })
            })

            checkoutButton?.addEventListener('mouseenter', function () {
              if (gesture === "keyTap") {
                const cart = document.getElementById('cartViewPlane');
                cart?.setAttribute('visible', 'false')
                checkoutPlane?.setAttribute('position', '10 2 -45');
                checkoutPlane?.setAttribute('visible', 'true');
              }

              checkoutButton.addEventListener('click', function () {
                const cart = document.getElementById('cartViewPlane');
                cart?.setAttribute('visible', 'false');
                checkoutPlane?.setAttribute('position', '10 2 -45');
                checkoutPlane?.setAttribute('visible', 'true');
                cartBuyService.createCartProduct(name, price);
              })
            })

            addButton?.addEventListener('mouseenter', function () {
              if (gesture === "keyTap") {
                addButton.setAttribute('color', '#6366F1');
                addButton.addEventListener('click', function () {
                  const popupPlane = document.getElementById('popupPlane');
                  const classcart: Cart = {
                    Id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: productPrice,
                    imageSet: productImage
                  }

                  addToCart(productId, classcart, crudApi);

                })
              }
              addButton.setAttribute('color', '#6366F1');
              addButton.addEventListener('click', function () {
                const popupPlane = document.getElementById('popupPlane');
                const classcart: Cart = {
                  Id: productId,
                  name: productName,
                  price: productPrice,
                  quantity: productPrice,
                  imageSet: productImage
                }

                addToCart(productId, classcart, crudApi);

              })
            })

            addButton?.addEventListener('mouseleave', function () {
              addButton.setAttribute('color', 'blue');
            })

            if (popupPlane && sidePopup && text) {
              specificationPlane?.setAttribute('visible', 'true');
              specificationPlane?.setAttribute('position', '10 2 -45');
              popupPlane.setAttribute('visible', 'true');
              text.setAttribute('value', productName)
              price?.setAttribute('value', productPrice)
            }
          });

          el.setAttribute('scale', {
            x: originalScale.x,
            y: originalScale.y,
            z: originalScale.z + heightIncrease
          });

        });

        el.addEventListener('mouseleave', function () {
          el.setAttribute('scale', {
            x: originalScale.x,
            y: originalScale.y,
            z: originalScale.z - heightIncrease
          });
        });
      }


    });

  
    // computers.createEntities(totalCount, productNames, productPrices, productIDs, productQuantities, productImages);
    // laptops.createLaptops(totalCount, productNames, productPrices, productIDs, productQuantities, productImages);
    // this.createEntities(totalCount, productNames, productPrices, productIDs, productQuantities, productImages);


  }

  public q = "0 -38 -86";
  public w: number = -38;
  public e: number = -86;

  // leap controller
  private controller = new Leap.Controller();
  public gesture: string = "No";
  public leftHand: boolean = false;
  public rightHand: boolean = false;

  // dot controllers
  public dotLeft: number = 0;
  public dotTop: number = 0;
  public dotLeftP: number = 0;
  public dotTopP: number = 0;
  public dotColor: string = "blueviolet";
  public dotVisible: boolean = false;

  //variables 
  private grabLock: boolean = false;
  public stageCounts: number[] = [0, 0, 0, 0];

  mapValue(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) {
    // Calculate the percentage of the value within the original range
    const percentage = (value - fromMin) / (fromMax - fromMin);

    // Map the percentage to the new range and return the result
    return (percentage * (toMax - toMin)) + toMin;
  }

  private initLeapMotion() {
    this.controller.connect({
      enableGestures: true,
    });
    this.controller.on('connect', function () {
      console.log("connect");
    });

    this.controller.on('frame', (frame: any) => {
      var appWidth = 1920;
      var appHeight = 1080;
      // detecting hands
      this.leftHand = false;
      this.rightHand = false;
      if (frame.pointables[0]) {
        this.dotVisible = true;
        for (var h = 0; h < frame.hands.length; h++) {
          if (frame.hands[h].type === "left")
            this.leftHand = true;
          if (frame.hands[h].type === "right")
            this.rightHand = true;
        }
        var hand = frame.hands[0];
        var finger = hand.fingers[0];
        // var iBox = frame.interactionBox;
        // var pointable = frame.pointables[0];
        // var leapPoint = pointable.stabilizedTipPosition;
        // var normalizedPoint = iBox.normalizePoint(leapPoint, true);
        // var appX = normalizedPoint[0] * appWidth;
        // var appY = (1 - normalizedPoint[1]) * appHeight;

        var sensitivity = 1.5;
        var iBox = frame.interactionBox;
        var pointable = frame.hands[0];
        var leapPoint = pointable.stabilizedPalmPosition;
        // var normalizedPoint = iBox.normalizePoint(leapPoint, true);
        // Leap.vec3.scale(normalizedPoint, normalizedPoint, sensitivity); //scale
        // var center = sensitivity * .5 - .5;
        // Leap.vec3.subtract(normalizedPoint, normalizedPoint, [center, center, center]); // re-center

        // var appX = normalizedPoint[0] * appWidth;
        // var appY = (1 - normalizedPoint[1]) * appHeight;
        // var appZ =  normalizedPoint[2] * appHeight;
        // this.dotLeft = appX
        // this.dotTop = appZ
        // this.dotLeftP = Math.round(appX);
        // this.dotTopP = Math.round(appY);




        var normalized = iBox.normalizePoint(leapPoint, false);
        var z = normalized[2] * 0.4;
        // if changing from right-hand to left-hand rule, use:
        //var z = normalized[2] * -1.0;
        //recenter origin
        var x = normalized[0] + 0.5;
        z += 0.5;
        //scale
        x *= 100;
        var y = normalized[1] * 100;
        z *= 100;
        this.dotLeft = x
        this.dotTop = z * 2;
        this.dotLeftP = Math.round(x);
        this.dotTopP = Math.round(z);

        var newX = this.mapValue(this.dotLeftP, 0, 170, -100, 100);
        var newY = this.mapValue(this.dotTopP, 20, 130, -70, 70);

        const specificationPlane = document.getElementById('specificationPopupHand');
        //85r
        //  specificationPlane?.setAttribute('position', this.dotLeftP + ' ' + this.dotTopP + ' -90');
        // specificationPlane?.setAttribute('position', -newX + ' ' + -newY + ' -90');
        specificationPlane?.setAttribute('rotation', pointable.yaw() * (180 / Math.PI) + ' ' + ((pointable.roll() * (180 / Math.PI)) + 0) + ' ' + pointable.pitch() * -100);

        // specificationPlane1?.setAttribute('position', '0 0 0');

        // calculating extended fingers
        var extendedFingers = 0;
        for (var f = 0; f < hand.fingers.length; f++) {
          var finger = hand.fingers[f];
          if (finger.extended) extendedFingers++;
        }

        if (this.grabLock) {
          this.changeDotColor(AppComponent.DOT_MODE_GRAB);
          //*************** */
          // this.grabObject.moveObject(appX - 100, appY - 50);
        }

        if ((extendedFingers === 0) && (this.grabLock === false)) {
          // this.touch(appX, appY);
        }
        else if (extendedFingers === 5) {
          this.grabLock = false;
          //  / this.changeDotColor(AppComponent.DOT_MODE_NORMAL);
          try {
            //*************** */
            //  this.grabObject.locateBlock();
            this.stageCounts = [0, 0, 0, 0,];
            // this.blockSet.forEach(element => {
            //   this.stageCounts[element.instance.blockData.stage]++
            // });
            //*************** */
          } catch (e) { }
        }

        // this.scanPage(appX, appY);
      } else {
        this.dotLeft = 0;
        this.dotTop = 0;
        this.dotLeftP = 0;
        this.dotTopP = 0;
        this.gesture = "No";
        this.dotVisible = false
      }



      if (!this.grabLock)
        if (frame.valid && frame.gestures.length > 0) {
          frame.gestures.forEach((gesture: any) => {
            handleValues._gestureName = gesture.type;
            switch (gesture.type) {
              case "circle":
                this.gesture = "Circle";
                break;
              case "keyTap":
                this.gesture = "Key Tap";
                break;
              case "screenTap":
                this.gesture = "Screen Tap";
                break;
              case "swipe":
                this.gesture = "Swipe";
                break;
              default:
                this.gesture = "No";
                break;
            }
          });
        }
    })


  }

  scanPage(appX: number, appY: number) {
  }

  private touch(positionX: number, positionY: number) {
  }

  changeDotColor(dotSituation: number) {
    switch (dotSituation) {
      case AppComponent.DOT_MODE_HOVER:
        this.dotColor = AppComponent.DOT_COLOR_HOVER;
        break;
      case AppComponent.DOT_MODE_NORMAL:
        this.dotColor = AppComponent.DOT_COLOR_NORMAL;
        break;
      case AppComponent.DOT_MODE_GRAB:
        this.dotColor = AppComponent.DOT_COLOR_GRAB;
        break;
      default:
        this.dotColor = AppComponent.DOT_COLOR_NORMAL;
        break;
    }
  }

}

let handleValues = {
  _gestureName: String,

  get gestureValue() {
    return this._gestureName;
  }
}

function addToCart(productId: string, cart: Cart, crudAPI: CrudService) {
  crudAPI.AddProductToCart(cart);
}

async function fetchBlobData(blobURL: any): Promise<Blob> {
  const response = await fetch(blobURL);
  return await response.blob();
}

function getFileNameFromBlobURL(blobURL: string): string {
  // Extract the file name from the Blob URL
  const parts = blobURL.split('/');
  return parts[parts.length - 1];
}


function FirstShopSelectfunction(event: Event) {
  event.stopPropagation();
  var gestureValue = handleValues.gestureValue

  const vrMallScene = document.getElementById('vrMallScene');
  const vrStoreScene = document.getElementById('vrStoreScene1');
  vrMallScene?.setAttribute('visible', 'false');
  vrMallScene?.setAttribute('position', '0 100 0')
  vrStoreScene?.setAttribute('visible', 'true');
}

function SecondShopSelectfunction(event: Event) {
  event.stopPropagation();
  var gestureValue = handleValues.gestureValue
  const vrMallScene = document.getElementById('vrMallScene');
  const vrStoreScene = document.getElementById('vrStoreScene2');

  vrMallScene?.setAttribute('visible', 'false');
  vrMallScene?.setAttribute('position', '0 100 0')
  vrStoreScene?.setAttribute('visible', 'true');
}

function addEventListersWithAudioRecording(targetElementId: any, http: HttpClient, record: AudioServiceService, audio: ListenAudioService) {
  record.toggleRecord().then((res: any) => {
    audio.resolveBlobFromBlobUrl(res).then((blob: Blob) => {
      const formData = new FormData();
      formData.append('audio', blob, 'audio.wav'); // 'audio.wav' is the desired filename on the server

      // Send the FormData containing the Blob to the FastAPI server
      const url = 'http://127.0.0.1:8000/gapi'; // Replace with your server URL
      http.post(url, formData, {
        headers: new HttpHeaders({}),
      }).subscribe(
        (response: any) => {
          let responseMessage = response.command;
          var result = responseMessage.toString();
          targetElementId?.setAttribute('value', `${result}`);
        },
        (error) => {
          // Handle errors if the request fails
          console.error('Error:', error);
        }
      );
    });
  });
}

function generateKey(firestore: AngularFirestore) {
  return firestore.createId();
}


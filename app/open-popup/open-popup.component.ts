import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../services/product';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Cart } from '../services/productcart';


@Component({
  selector: 'app-open-popup',
  templateUrl: './open-popup.component.html',
  styleUrls: ['./open-popup.component.css']
})

export class OpenPopupComponent implements OnInit {

  public viewProductForm!: FormGroup;
  products!: Product[];
  productID!: string;
  newCart: Cart[] = [];

  constructor(    
    public crudApi: CrudService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: {productId: string},
    private dialogRef: MatDialogRef<OpenPopupComponent>,
    ) { }

  ngOnInit() {
    this.productID = this.data.productId;
    this.crudApi.getProductByID(this.data.productId).then (res => {
      this.products = res
    });


  }

  AddtoCart(productId: string) {
    const productToAdd: Cart | undefined = this.products.find((product) => product.Id === productId);

   if (productToAdd) {
    // Create a new Cart object with the product details
    const newCart: Cart = {
      Id: productToAdd.Id,
      name: productToAdd.name,
      imageSet: productToAdd.imageSet,
      price: productToAdd.price,
      quantity: productToAdd.quantity
    };
    console.log(newCart);
    
    this.crudApi.AddProductToCart(newCart);
    this.dialogRef.close();
  } else {
    console.log("Product not found.");
    this.dialogRef.close();
    }

  }

  getIconUrl(option: string): string {
    const iconUrls: { [key: string]: string } = {
      Camera: '../../assets/specification/camera.svg',
      Ram: '../../assets/specification/ram.svg',
      Display: '../../assets/specification/phone.svg',
      Battery: '../../assets/specification/battery.svg',
      Color: '../../assets/specification/color.svg',
      Weight: '../../assets/specification/weight.svg',
      Network: '../../assets/specification/network.svg',
      Phone: '../../assets/specification/phone.svg',
    };

    if (option in iconUrls) {
      return iconUrls[option];
    } else {
      return 'path-to-default-icon.svg';
    }
  }
}

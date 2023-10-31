import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CheckoutComponent } from '../checkout/checkout.component';
import { Cart } from '../services/productcart';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public Cartlist!: Cart[];

  constructor(
    public crudAPI: CrudService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.crudAPI.getCartList().then(res => {
      this.Cartlist = res;
    })
  }

  openCheckout() {
    this.dialog.open(CheckoutComponent)
  }

}

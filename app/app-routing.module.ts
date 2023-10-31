import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LeapViewerComponent } from './leap-viewer/leap-viewer.component';
import { TestComponent } from './test/test.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  { path: '', component: TestComponent},
  { path: 'vr-mall', component: HomeComponent },
  { path: 'leap-viewer', component: LeapViewerComponent },
  { path: 'my-cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

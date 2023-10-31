import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LeapViewerComponent } from './leap-viewer/leap-viewer.component';
import { HomeComponent } from './home/home.component';
import { RoadComponent } from './road/road/road.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TestComponent } from './test/test.component';
import { OpenPopupComponent } from './open-popup/open-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { SelectShopComponent } from './select-shop/select-shop.component';

@NgModule({
  declarations: [
    AppComponent,
    LeapViewerComponent,
    HomeComponent,
    RoadComponent,
    TestComponent,
    OpenPopupComponent,
    CheckoutComponent,
    CartComponent,
    SelectShopComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    MatSelectModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }

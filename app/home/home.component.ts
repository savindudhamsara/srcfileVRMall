
import * as THREE from 'three';
import { MatDialog } from '@angular/material/dialog';
import { OpenPopupComponent } from '../open-popup/open-popup.component';

import { Directive, HostListener } from '@angular/core';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import 'aframe';
import { Router } from '@angular/router';
import { Vector3 } from 'three';

declare const AFRAME: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements AfterViewInit{

  constructor(
    public router: Router
  ){}

  async ngAfterViewInit(): Promise<void> {

    const router = this.router;

    AFRAME.registerComponent('handle-select-events', {
      init: function() {
        var el = this.el 
        el.addEventListener('mouseenter', function() {
          el.addEventListener('click', function () {
            router.navigate(['vr-mall']);
          })
        })
      }
    })
    
  }
}

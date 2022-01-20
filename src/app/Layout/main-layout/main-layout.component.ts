import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AddScript } from 'src/app/Utilities/AddScript';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit, AfterViewInit {

  constructor() {    
  }
  ngAfterViewInit(): void {
    AddScript.prototype.addFirst('./assets/js/app.min.js');
  }
  ngOnInit(): void {
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AddScript } from 'src/app/Utilities/AddScript';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor() {
    
  }
  ngAfterViewInit(): void {
    let parent = document.getElementById('scripts');
    AddScript.prototype.addFirst('./assets/vendors/chartjs/Chart.min.js');
    let script2 = AddScript.prototype.addAfterChild('./assets/js/pages/dashboard-default.js', parent);
  }
  ngOnInit(): void {
  }

}

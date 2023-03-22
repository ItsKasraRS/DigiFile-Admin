import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { OrderChartDTO } from 'src/app/DTOs/OrderDTO';
import { OrderService } from 'src/app/Services/Order/order.service';
import { AddScript } from 'src/app/Utilities/AddScript';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  orderChart: OrderChartDTO[];
  lineChartData: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartOptions<'line'>;
  lineChartLegend;

  constructor(private orderService: OrderService, public datepipe: DatePipe) {
    
  }
  ngAfterViewInit(): void {
    let parent = document.getElementById('scripts');
    let script2 = AddScript.prototype.addAfterChild('./assets/js/pages/dashboard-default.js', parent);
  }
  ngOnInit(): void {
    this.getOrderChart();
  }

  getOrderChart() {
    this.orderService.getOrderChart().subscribe(res=> {
      if(res.status === 'Success') {
        this.orderChart = res.data;
        console.log(this.orderChart);
        //#region GENERATE DATES
        let aDate = new Date();
        let bDate = new Date();
        let cDate = new Date();
        let dDate = new Date();
        let eDate = new Date();
        let fDate = new Date();
        let gDate = new Date();
        let hDate = new Date();
        //#endregion

        //#region GENERATE CHART

        this.lineChartData = {
          labels: [
            this.datepipe.transform(aDate.setDate(aDate.getDate() - 7), 'MMMM, dd'),
            this.datepipe.transform(aDate.setDate(bDate.getDate() - 6), 'MMMM, dd'),
            this.datepipe.transform(aDate.setDate(cDate.getDate() - 5), 'MMMM, dd'),
            this.datepipe.transform(aDate.setDate(dDate.getDate() - 4), 'MMMM, dd'),
            this.datepipe.transform(aDate.setDate(eDate.getDate() - 3), 'MMMM, dd'),
            this.datepipe.transform(aDate.setDate(fDate.getDate() - 2), 'MMMM, dd'),
            this.datepipe.transform(aDate.setDate(gDate.getDate() - 1), 'MMMM, dd'),
            this.datepipe.transform(aDate.setDate(hDate.getDate()), 'MMMM, dd'),
          ],
          datasets: [
            {
              data: [ 
                this.orderChart.filter(o=> new Date(o.date).getDate() === aDate.getDate() - 7).length,
                this.orderChart.filter(o=> new Date(o.date).getDate() === bDate.getDate() - 6).length,
                this.orderChart.filter(o=> new Date(o.date).getDate() === cDate.getDate() - 5).length,
                this.orderChart.filter(o=> new Date(o.date).getDate() === dDate.getDate() - 4).length,
                this.orderChart.filter(o=> new Date(o.date).getDate() === eDate.getDate() - 3).length,
                this.orderChart.filter(o=> new Date(o.date).getDate() === fDate.getDate() - 2).length,
                this.orderChart.filter(o=> new Date(o.date).getDate() === gDate.getDate() - 1).length,
                this.orderChart.filter(o=> new Date(o.date).getDate() === hDate.getDate()).length,
              ],
              label: 'Number of orders',
              fill: true,
              tension: 0.5,
              borderColor: 'black',
              backgroundColor: 'rgba(255,0,0,0.3)'
            }
          ]
        };
      
        this.lineChartOptions = {
          responsive: false
        };
      
        this.lineChartLegend = true;

        //#endregion
      }
    });
  }
}

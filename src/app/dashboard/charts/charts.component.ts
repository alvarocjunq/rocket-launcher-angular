import { Component } from '@angular/core';
import { AbstractRocketComponent } from '../../rocket/rocket.abstract-component';


@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class DashboardChartsComponent extends AbstractRocketComponent {
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

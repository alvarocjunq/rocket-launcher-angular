import { Component } from '@angular/core';
import { AbstractRocketComponent } from '../rocket/rocket.abstract-component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends AbstractRocketComponent {
}

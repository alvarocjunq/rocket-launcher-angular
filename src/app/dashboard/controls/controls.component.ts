import { Component, HostListener } from '@angular/core';
import { AbstractRocketComponent } from '../../rocket/rocket.abstract-component';


@Component({
  selector: 'app-dashboard-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class DashboardControlsComponent extends AbstractRocketComponent {
  launchRocket() {
    this.rocketService.launchRocket().subscribe();
  }

  @HostListener('document:keydown', ['$event'])
  private controlRocket($event) {
    const keyCode = $event.which || $event.keyCode;

    if (this.rocket && this.rocket.status === this.RocketStatus.LAUNCHED) {
      switch (keyCode) {
        case 38:  // UP
          this.rocket.increaseThrust();
          break;
        case 40:  // Down
          this.rocket.decreaseThrust();
          break;
        case 37:  // Left
          this.rocket.rotateLeft();
          break;
        case 39:  // Right
          this.rocket.rotateRight();
          break;
        case 32:  // Space
        case 13:  // Enter
          this.rocket.deploySatellite();
          break;
        case 27:  // Esc
          this.rocket.selfDestroy();
          break;
      }
    } else if (keyCode === 32 || keyCode === 13) {
      this.launchRocket();
    }
  }
}

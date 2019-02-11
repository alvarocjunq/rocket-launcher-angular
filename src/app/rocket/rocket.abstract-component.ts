import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rocket, RocketStatus } from './rocket';
import { RocketService } from './rocket.service';
import { RocketModule } from './rocket.module';


export abstract class AbstractRocketComponent implements OnInit, OnDestroy {
  RocketStatus = RocketStatus;
  rocket: Rocket;
  rocketService: RocketService;
  rocketSubscription: Subscription;

  ngOnInit() {
    this.rocketService = RocketModule.injector.get(RocketService);
    this.rocketSubscription = this.rocketService.getRocket$.subscribe(rocket => {
      this.rocket = rocket;
    });
  }

  ngOnDestroy() {
    this.rocketSubscription.unsubscribe();
  }
}

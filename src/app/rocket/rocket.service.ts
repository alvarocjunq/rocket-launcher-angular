import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Rocket } from './rocket';
import { WebSocketService, AppWebSocket } from '../app.websocket';



@Injectable()
export class RocketService implements OnDestroy {
  private websocket: AppWebSocket;
  private rocketSource: BehaviorSubject<Rocket> = new BehaviorSubject<Rocket>(null);
  getRocket$: Observable<Rocket> = this.rocketSource.asObservable();

  constructor(
    private http: HttpClient,
    private websocketService: WebSocketService,
  ) {}

  launchRocket(): Observable<Rocket> {
    this.disconnect();
    return this.http.post<any>('/rockets/launch/', {}).pipe(
      map(response => {
        const rocket: Rocket = new Rocket(this, response.uuid);
        this.rocketSource.next(rocket);

        /* Connect with websocket until rocket change status */
        this.websocket = this.websocketService.connect(`/rocket/${rocket.uuid}/`);
        this.websocket.messages.subscribe(message => {
          rocket.update(message);

          if (![Rocket.STATUSES.READY, Rocket.STATUSES.LAUNCHED].includes(rocket.status)) {
            this.disconnect();
          }
        });

        return rocket;
      }),
    );
  }

  deploySatellite(rocket: Rocket): Observable<string> {
    return this.http.post<any>(`/rockets/${rocket.uuid}/deploy/`, {});
  }

  increaseThrust(rocket: Rocket): Observable<string> {
    return this.http.post<any>(`/rockets/${rocket.uuid}/increase-thrust/`, {});
  }

  decreaseThrust(rocket: Rocket): Observable<string> {
    return this.http.post<any>(`/rockets/${rocket.uuid}/decrease-thrust/`, {});
  }

  rotateLeft(rocket: Rocket): Observable<string> {
    return this.http.post<any>(`/rockets/${rocket.uuid}/rotate-left/`, {});
  }

  rotateRight(rocket: Rocket): Observable<string> {
    return this.http.post<any>(`/rockets/${rocket.uuid}/rotate-right/`, {});
  }

  selfDestroyRocket(rocket: Rocket): Observable<string> {
    return this.http.post<any>(`/rockets/${rocket.uuid}/self-destroy/`, {});
  }

  /** Disconnect from websocket */
  disconnect(): void {
    if (this.websocket) {
      this.websocket.disconnect();
      this.websocket = null;
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}

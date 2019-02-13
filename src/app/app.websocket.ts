import { OnDestroy } from '@angular/core';

import { Subscription, Subject } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { environment } from '../environments/environment';


export class AppWebSocket {
  messages: Subject<any> = new Subject<any>();

  private websocket: WebSocketSubject<any>;
  private subscription: Subscription;

  constructor(private service: WebSocketService, public url: string) {
    service.webSockets[url] = this;
    this.connect();
  }

  connect() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.websocket = webSocket(`${environment.api.websocket}${this.url}`);
    this.subscription = this.websocket.subscribe(
      response => {
        this.messages.next(response);
      },
      error => {
        setTimeout(() => this.connect(), 3000);
      }
    );
  }

  emit(message) {
    this.websocket.next(message);
  }

  disconnect() {
    delete this.service[this.url];
    this.subscription.unsubscribe();
    this.messages.complete();
    this.messages.unsubscribe();
  }
}


/**
 * WebSocket service that enables us to connect to multiple webSockets
 * and re-use the ones that have been already created.
 */
export class WebSocketService implements OnDestroy {
  webSockets: {[url: string]: AppWebSocket} = {};

  /**
   * Connect user to websocket.
   * :param url: Relative url of the socket we would like to connect.
   */
  connect(url: string): AppWebSocket {
    return this.webSockets[url] || new AppWebSocket(this, url);
  }

  /**
   * On disconnect, close all subscriptions for both messages and websocket.
   */
  disconnect(url: string): void {
    const appWebSocket: AppWebSocket = this.webSockets[url];
    appWebSocket.disconnect();
  }

  /**
   * On destroy, make sure we disconnect from all webSockets.
   */
  ngOnDestroy(): void {
    Object.entries(this.webSockets).forEach(([_, websocket]) => websocket.disconnect());
  }
}

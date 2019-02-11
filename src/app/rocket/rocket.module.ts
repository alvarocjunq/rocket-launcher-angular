import { NgModule, Injector } from '@angular/core';


@NgModule()
export class RocketModule {
  static injector: Injector;

  constructor(injector: Injector) {
    RocketModule.injector = injector;
  }
}

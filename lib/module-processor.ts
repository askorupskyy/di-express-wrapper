import { Registry } from './Registry';
import { Application } from 'express';

class Module<T> {
  private app: Application;
  private route_prefix: string;
  private injected: any[];

  constructor(app: Application, route_prefix: string) {
    this.app = app;
    this.route_prefix = route_prefix;
    this.injected = [];
  }

  register(service: new (...args: any[]) => T) {
    this.injected.forEach((i) => {
      if (new Registry().get(i.name) === undefined) {
        new Registry().register(i.name, new i())
      }
    })

    const injected = this.injected.map(i => Registry.getInstance().get(i.name))
    const serviceInstance = new service(...injected);

    const serviceName = Object.getPrototypeOf(serviceInstance.constructor).name

    new Registry().getServiceEndpoints(serviceName).forEach(endpoint => {
      this.app[endpoint.method](`${this.route_prefix}${endpoint.path}`, endpoint.handler.bind(serviceInstance))
    })
  }

  inject(service: any) {
    this.injected.push(service);
  }
}

export class ModuleFactory<T> {
  private app: Application;
  private route_prefix: string;

  constructor(app: Application, route_prefix: string) {
    this.app = app;
    this.route_prefix = route_prefix;
  }

  create(services: {
    new(...args: any[]): T
  }[], injectables: any[]) {
    const module = new Module(this.app, this.route_prefix);

    injectables.forEach(injectable => {
      module.inject(injectable);
    });

    services.forEach(service => {
      module.register(service);
    });

    return module;
  }
}

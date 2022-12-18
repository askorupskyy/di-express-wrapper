import { Registry } from './registry/Registry';
import { EndpointRegistry } from './registry/EndpointRegistry';
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

    const serviceInstance = new service(...this.injected);

    const serviceName = Object.getPrototypeOf(serviceInstance.constructor).name

    new EndpointRegistry().getEndpoints(serviceName).forEach(endpoint => {
      for (const handler of endpoint.middlewareHandlers) {
        this.app.use(`${this.route_prefix}${endpoint.path}`, handler);
      }
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

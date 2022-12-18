import { Endpoint } from './types/Endpoint';

export class Registry {
  private services: { [key: string]: any };
  private static instance: Registry;

  constructor() {
    if (Registry.instance) {
      return Registry.instance;
    }
    else {
      this.services = {};
      Registry.instance = this;
    }
  }

  register(name: string, service: any) {
    this.services[name] = service;
  }

  get(name: string) {
    return this.services[name];
  }

  getServices() {
    return this.services;
  }

  getServiceEndpoints(serviceName: string): Endpoint[] {
    const service_endpoints_names = Object.keys(this.services)
      .filter(key => key.startsWith(`${serviceName}__route__`))

    return service_endpoints_names.map(key => {
      const [_, __, path, method] = key.split('__');
      return {
        method: method as any,
        path,
        handler: this.services[key]
      }
    })
  }

  static getInstance() {
    return Registry.instance;
  }
}

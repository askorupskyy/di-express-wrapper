export class Registry {
  private services: { [key: string]: any };
  private static instance: Registry;

  constructor() {
    if (Registry.instance)
      return Registry.instance;

    this.services = {};
    Registry.instance = this;
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

  static getInstance() {
    return Registry.instance;
  }
}

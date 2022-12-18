import { Handler } from "express";
import { Endpoint } from "../types/Endpoint";

export class EndpointRegistry {
  private endpoints: { [key: string]: Endpoint[] };
  private static instance: EndpointRegistry;

  constructor() {
    if (EndpointRegistry.instance) {
      return EndpointRegistry.instance
    }
    this.endpoints = {};
    EndpointRegistry.instance = this;
  }

  register(name: string, service: any) {
    this.endpoints[name] = service;
  }

  get(name: string) {
    return this.endpoints[name];
  }

  registerEndpoint(name: string, entry: Endpoint) {
    const currentServiceEndpoints = this.get(name) ?? [];
    this.register(name, [entry, ...currentServiceEndpoints])
  }

  addEnpointMiddleware(name: string, endpointName: string, entry: Handler) {
    const currentServiceEndpoints = this.getEndpoints(name) ?? [];
    const currentEndpoint = currentServiceEndpoints.find((s: Endpoint) => s.handler.name === endpointName);

    if (!currentEndpoint)
      return false;

    currentEndpoint.middlewareHandlers = [...currentEndpoint.middlewareHandlers, entry]

    this.register(name, [...currentServiceEndpoints.filter((s: Endpoint) => s.handler.name !== endpointName), currentEndpoint]);
  }

  getEndpoints(name: string): Endpoint[] {
    return this.get(name) ?? [];
  }
}

import { EndpointRegistry } from "../registry/EndpointRegistry";
import { HTTPMethod } from "../types/HTTPMethod";

export function Route(method: HTTPMethod, path: string) {
  return function(target: any, _: string, descriptor: PropertyDescriptor) {
    new EndpointRegistry().registerEndpoint(target.constructor.name, {
      path,
      method,
      handler: descriptor.value,
      middlewareHandlers: [],
    });
  }
}

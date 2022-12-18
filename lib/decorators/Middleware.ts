import { Handler } from "express";
import { EndpointRegistry } from "../registry/EndpointRegistry";

export function Middleware(handler: Handler) {
  return function(target: any, _propertyKey: string, descriptor: PropertyDescriptor) {

    new EndpointRegistry().addEnpointMiddleware(target.constructor.name, descriptor.value.name, handler)
  }
}

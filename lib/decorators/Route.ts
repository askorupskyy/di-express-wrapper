import { Registry } from "../Registry";
import { HTTPMethod } from "../types/HTTPMethod";

export function Route(method: HTTPMethod, path: string) {
  return function(target: any, _: string, descriptor: PropertyDescriptor) {
    new Registry().register(`${target.constructor.name}__route__${path}__${method}`, descriptor.value);
  }
}

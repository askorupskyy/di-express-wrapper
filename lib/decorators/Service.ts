import { Registry } from '../Registry';

export function Service() {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        const injected = args.map(arg => Registry.getInstance().get(arg.name) ?? arg);
        super(...injected);
        Registry.getInstance().register(constructor.name, this);
      }
    }
  }
}

import { Registry } from '../Registry';

export function Injectable() {
  return function <T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        const registry = Registry.getInstance();
        const injected = args.map(arg => {
          registry.register(arg.toString(), new arg());
          return registry.get(arg.toString());
        })
        super(injected);
      }
    }
  }
}


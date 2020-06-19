import { IDatabaseConfiguration } from "./configuration.interface.ts";

export interface IContext {
  init: (config: IDatabaseConfiguration) => Promise<any>;
}

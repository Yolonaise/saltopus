import { IContext } from "../interfaces/context.interface.ts";
import { IDatabaseConfiguration } from "../interfaces/configuration.interface.ts";

export class DatabaseBuilder {
  private config?: IDatabaseConfiguration;
  private contextCtor?: new () => IContext;

  constructor() {
  }

  withType(contextType: new () => IContext): DatabaseBuilder {
    this.contextCtor = contextType;
    return this;
  }

  withConfig(config: IDatabaseConfiguration): DatabaseBuilder {
    this.config = config;
    return this;
  }

  async build(): Promise<IContext> {
    const context = new this.contextCtor!();
    await context.init(this.config!);

    return context;
  }
}

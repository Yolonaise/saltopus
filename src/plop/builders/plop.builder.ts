import ApplicationBuilder from "../../alosaur/builders/application.builder.ts";
import { DatabaseBuilder } from "../../diplo/builders/database.builder.ts";
import { IPlopConfiguration } from "../interfaces/plop.configuration.ts";

type AppBuilderHandler = (a: ApplicationBuilder) => ApplicationBuilder;
type DatabaseBuilderHandler = (a: DatabaseBuilder) => DatabaseBuilder;

export class PlopBuilder {
  private appBuilderHandler?: AppBuilderHandler;
  private databaseBuilderHandler?: DatabaseBuilderHandler;
  private plopConfig?: IPlopConfiguration;

  constructor() {}

  withPlopConfig(config: IPlopConfiguration): PlopBuilder {
    this.plopConfig = config;
    return this;
  }
  withApp(appBuilderHandler: AppBuilderHandler): PlopBuilder {
    this.appBuilderHandler = appBuilderHandler;
    return this;
  }

  withDatabase(databaseBuilderHandler: DatabaseBuilderHandler): PlopBuilder {
    this.databaseBuilderHandler = databaseBuilderHandler;
    return this;
  }

  build() {
    if (this.appBuilderHandler) {
      const app = this.appBuilderHandler(new ApplicationBuilder()).build();
      app.listen(`${this.plopConfig?.hostname}:${this.plopConfig?.port}`);
    }

    if (this.databaseBuilderHandler) {
      this.databaseBuilderHandler(new DatabaseBuilder()).build();
    }
  }
}

import ApplicationBuilder from "../../alosaur/builders/application.builder.ts";
import { DatabaseBuilder } from "../../diplo/builders/database.builder.ts";

type AppBuilderHandler = (a: ApplicationBuilder) => ApplicationBuilder;
type DatabaseBuilderHandler = (a: DatabaseBuilder) => DatabaseBuilder;

export class PlopBuilder {
  private appBuilderHandler?: AppBuilderHandler;
  private databaseBuilderHandler?: DatabaseBuilderHandler;

  constructor() {}

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
      this.appBuilderHandler(new ApplicationBuilder()).build();
    }

    if (this.databaseBuilderHandler) {
      this.databaseBuilderHandler(new DatabaseBuilder()).build();
    }
  }
}

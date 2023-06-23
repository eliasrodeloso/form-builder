import { v4 as uuid } from "uuid";

import { makeForm } from "~/core/commands/form/makeForm";
import { CommandBase, CommandType, type Command } from "~/core/commands/types";
import { applicationService } from "~/core/services/application";
import { ViewTypes } from "~/core/services/types";

export class ClearFormCommand
  extends CommandBase<never>
  implements Command<never>
{
  constructor() {
    super(
      CommandType.ClearForm,
      "It clears the form by removing all the elements inside it and the form itself. This should be used whenever you want to create another form.",
      "" as never // TODO: improve this
    );
  }

  public create = async () => {
    this.handler();
    this.registerHistory("" as never);

    return Promise.resolve("Form cleared successfully");
  };

  public handler = () => {
    applicationService.updateApplicationState([]);
  };
}

export class CreateFormCommand
  extends CommandBase<never>
  implements Command<never>
{
  constructor() {
    super(
      CommandType.CreateForm,
      "Creates an HTML form element. This form is going to contain all the elements that you create if you need to create any type of form. The form will have a parameter named <children>. <children> is going to be the inputs you create with the other tools provided",
      "" as never // TODO: improve this
    );
  }

  public create = async () => {
    this.handler();

    return Promise.resolve("Form created successfully");
  };

  public handler = () => {
    const appState = applicationService.getApplicationState();

    applicationService.updateApplicationState([
      {
        id: uuid(),
        viewType: ViewTypes.Form,
        component: makeForm(appState as React.ReactNode), // TODO: Fix this
      },
    ]);
  };
}

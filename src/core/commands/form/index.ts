import { makeForm } from "~/core/commands/form/makeForm";
import { CommandType, type Command } from "~/core/commands/types";
import { applicationService } from "~/core/services/application";
import { ViewTypes } from "~/core/services/types";

export class ClearFormCommand implements Command<void> {
  public type = CommandType.ClearForm;
  public description =
    "It clears the form by removing all the elements inside it";

  public async create() {
    this.handler();

    return Promise.resolve("Form cleared successfully");
  }

  public handler = () => {
    applicationService.updateApplicationState([], {
      type: this.type,
      input: "",
    });
  };
}

export class CreateFormCommand implements Command<void> {
  public type = CommandType.CreateForm;
  public description = "Creates a form element that can contain other elements";

  public create = async () => {
    console.log(this.type);
    // this.handler();

    return Promise.resolve("Form created successfully");
  };

  public handler = () => {
    const appState = applicationService.getApplicationState();

    applicationService.updateApplicationState(
      [
        {
          id: appState.length + 1,
          viewType: ViewTypes.Form,
          component: makeForm(appState as React.ReactNode), // TODO: Fix this
        },
      ],
      {
        type: this.type,
        input: "",
      }
    );
  };
}

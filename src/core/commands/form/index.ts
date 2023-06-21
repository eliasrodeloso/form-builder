import { makeForm } from "~/core/commands/form/makeForm";
import { CommandType, type Command } from "~/core/commands/types";
import { applicationService } from "~/core/services/application";
import { ViewTypes } from "~/core/services/types";

export class ClearFormCommand implements Command<void> {
  public type = CommandType.ClearForm;
  public description =
    "It clears the form by removing all the elements inside it and the form itself. This should be used whenever you want to create another form.";

  public async create() {
    console.log(this.type);

    this.handler();

    applicationService.updateApplicationState([], {
      type: this.type,
      input: "",
    });

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
  public description =
    "Creates an HTML form element. This form is going to contain all the elements that you create if you need to create any type of form. The form will have a parameter named <children>. <children> is going to be the inputs you create with the other tools provided";

  public create = async (input: string) => {
    console.log(this.type, "input:", input);

    this.handler();

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

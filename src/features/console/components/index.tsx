import { type FormEvent } from "react";
import { Box, Button, chakra, Grid, Input } from "@chakra-ui/react";

import { useObservable } from "~/core/hooks/useObservable";
import { applicationService } from "~/core/services/application";

export function Console() {
  const historyStore = useObservable(applicationService.onHistoryState());

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const data = new FormData(form);
    const command = data.get("commands") as string;

    applicationService.addCommand(command);
    form.reset();
  };

  console.log("skjdsad", historyStore);

  return (
    <Grid
      height="100%"
      templateAreas={`"prompt" "input"`}
      gridTemplateRows="1fr 100px"
    >
      <Box p={2}>
        {historyStore?.map((command, index) => (
          <div key={`${command.type}-${command.input ?? ""}-${index}`}>
            <p>{command.input}</p>
          </div>
        ))}
      </Box>
      <Box display="flex" alignItems="flex-end" mx={-4} my={-2}>
        <chakra.form onSubmit={formSubmitHandler} display="flex" width="100%">
          <Input type="text" name="commands" borderRadius="0" />
          <Button
            type="submit"
            backgroundColor="black"
            color="white"
            borderRadius="0"
          >
            Run
          </Button>
        </chakra.form>
      </Box>
    </Grid>
  );
}

import { useSyncExternalStore, type FormEvent } from "react";
import { Box, Button, chakra, Grid, Input } from "@chakra-ui/react";

import { addCommand, commandStore } from "~/core/store/commands";

export function Console() {
  const commands = useSyncExternalStore(
    commandStore.subscribe,
    commandStore.getState,
    commandStore.getState
  );

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const data = new FormData(form);
    const command = data.get("commands") as string;

    addCommand(command);
    form.reset();
  };

  return (
    <Grid
      height="100%"
      templateAreas={`"prompt" "input"`}
      gridTemplateRows="1fr 100px"
    >
      <Box p={2}>
        {commands.map((command) => (
          <div key={command.id}>
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

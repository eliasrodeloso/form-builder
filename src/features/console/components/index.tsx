import { type FormEvent } from "react";
import { Box, Button, chakra, Grid, Input } from "@chakra-ui/react";

import { useObservable } from "~/core/hooks/useObservable";
import { historyService } from "~/core/services/history";

export function Console() {
  const historyStore = useObservable(historyService.onHistoryState());

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const data = new FormData(form);
    const command = data.get("commands") as string;

    console.log("command", command); // to be added to the history store

    form.reset();
  };

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

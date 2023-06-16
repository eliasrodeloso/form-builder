import { Input, SelectField } from "@chakra-ui/react";

export function makeSelect([name, type = "date"]: string[] = []) {
  let Component = () => <SelectField mb={4} />;

  if (type === "date") {
    // eslint-disable-next-line react/display-name
    Component = () => <Input mb={4} type={type} name={name} />;

    return Component;
  }

  return Component;
}

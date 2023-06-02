import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        color: "white",
        backgroundColor: "black",
        borderRadius: "none",
      },
    },
  },
});

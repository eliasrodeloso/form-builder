import { Fragment } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { type NextPage } from "next";
import Head from "next/head";

import { Console } from "~/features/console/components";
import { Viewer } from "~/features/viewer/components";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Form Builder</title>
        <meta name="description" content="Form Builder App" />
      </Head>
      <Grid
        templateAreas={`"console viewer"`}
        gridTemplateRows="1fr"
        gridTemplateColumns="1fr 2fr"
        height="100vh"
        width="100vw"
      >
        <GridItem
          sx={{
            borderRight: "1px solid var(--chakra-colors-gray-700)",
            px: 4,
            py: 2,
          }}
        >
          <Console />
        </GridItem>
        <GridItem sx={{ px: 4, py: 2 }}>
          <Viewer />
        </GridItem>
      </Grid>
    </Fragment>
  );
};

export default Home;

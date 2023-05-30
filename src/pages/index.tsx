import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Form Builder</title>
        <meta name="description" content="Form Builder App" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Form Builder</h1>
      </main>
    </>
  );
};

export default Home;

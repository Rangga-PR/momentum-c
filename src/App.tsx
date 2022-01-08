import type { Component } from "solid-js";
import DigitalClock from "./components/DigitalClock/DigitalClock";
import Focus from "./components/Focus/Focus";
import Layout from "./Layout";
import Search from "./components/Search/Search";
import logo from "./logo.svg";
import styles from "./App.module.css";

const App: Component = () => {
  return (
    <Layout>
      <section class={styles.header}>
        <Search />
      </section>
      <section class={styles.content}>
        <DigitalClock />
        <Focus />
      </section>
      <section></section>
    </Layout>
  );
};

export default App;

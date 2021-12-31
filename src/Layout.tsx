import { Component, children, createSignal, onMount } from "solid-js";

import { getRandomImg } from "./services/unsplash";
import styles from "./Layout.module.css";

const Layout: Component = (props) => {
  const c = children(() => props.children);
  // const [image, setImage] = createSignal<any>(null);

  // onMount(async () => {
  //   const image = await getRandomImg("900x600");
  //   setImage(image);
  // });

  return <div class={styles.container}>{c()}</div>;
};

export default Layout;

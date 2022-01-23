import { Component, children, createSignal, onMount } from "solid-js";
import { getRandomImg, getRandomImgUrl } from "./services/unsplash";

import styles from "./Layout.module.css";

const Layout: Component = (props) => {
  const c = children(() => props.children);
  const [image, setImage] = createSignal<any>(null);

  onMount(async () => {
    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const image = await getRandomImgUrl(`${vw}x${vh}`);
    setImage(image);
  });

  return (
    <div class={styles.container} style={`background-image: url(${image()})`}>
      {c()}
    </div>
  );
};

export default Layout;

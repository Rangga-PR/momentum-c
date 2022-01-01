import { Component, createSignal } from "solid-js";

import searchIcon from "../../assets/search_white_24dp.svg";
import styles from "./Search.module.css";

const Search: Component = () => {
  const [hover, setHover] = createSignal<boolean>(false);
  const [focus, setFocus] = createSignal<boolean>(false);
  const [query, setQuery] = createSignal<string>("");
  const onKeyUp = (e: KeyboardEvent) => {
    e.key == "Enter"
      ? window.open(`https://google.com/search?q=${query()}`)
      : setQuery((e?.currentTarget as HTMLInputElement)?.value);
  };

  return (
    <div
      class={styles.container}
      style={`border-bottom: ${
        hover() || focus() ? "1px solid #fff" : "none"
      } `}
      onmouseover={() => setHover(true)}
      onmouseout={() => setHover(false)}
    >
      <object data={searchIcon} />
      <input
        class={styles.input}
        value={query()}
        onkeyup={(e) => onKeyUp(e)}
        onfocus={() => setFocus(true)}
        onblur={() => setFocus(false)}
      />
    </div>
  );
};

export default Search;

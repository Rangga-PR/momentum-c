import {
  Component,
  Match,
  Show,
  Switch,
  createSignal,
  onMount,
} from "solid-js";

import checkBlankIcon from "../../assets/check_box_outline_blank_white_24dp.svg";
import checkIcon from "../../assets/check_box_white_24dp.svg";
import styles from "./Focus.module.css";

const saveFocus = (str: string): void => {
  window.localStorage.setItem(
    "focus",
    JSON.stringify({ focus: str, created_at: new Date().toISOString() })
  );
};

const getFocus = (): string | undefined => {
  const data = window.localStorage.getItem("focus");
  if (!data) return;
  const parsed = JSON.parse(data);
  new Date(parsed?.created_at).getDate() !== new Date().getDate() &&
    window.localStorage.removeItem("focus");
  return parsed?.focus;
};

const Focus: Component = () => {
  const [focus, setFocus] = createSignal<string>("");
  const [hover, setHover] = createSignal<boolean>(false);
  const [check, setCheck] = createSignal<boolean>(false);

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
    const val = (e?.currentTarget as HTMLInputElement)?.value;
    setFocus(val);
    saveFocus(val);
  };

  const onRemove = () => {
    setCheck(true);
    setTimeout(() => {
      setFocus("");
      window.localStorage.removeItem("focus");
    }, 500);
  };

  onMount(() => {
    setFocus(getFocus() || "");
  });

  return (
    <Switch>
      <Match when={!focus()}>
        <div class={styles.container}>
          <h1 class={styles.text}>What is your main focus for today?</h1>
          <input
            class={styles.input}
            value={focus()}
            onkeyup={(e) => onKeyUp(e)}
          />
        </div>
      </Match>
      <Match when={focus()}>
        <>
          <h1 class={styles.text}>Today</h1>
          <div
            class={styles.wrapper}
            onmouseover={() => setHover(true)}
            onmouseout={() => setHover(false)}
          >
            <img
              class={styles.checkbox}
              style={hover() ? "display: block" : "display: none"}
              src={!check() ? checkBlankIcon : checkIcon}
              onclick={() => onRemove()}
            />
            <h1 class={styles.text}>{focus()}</h1>
          </div>
        </>
      </Match>
    </Switch>
  );
};

export default Focus;

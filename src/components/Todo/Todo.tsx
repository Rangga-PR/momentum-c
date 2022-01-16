import { Component, For, createEffect, createSignal, onMount } from "solid-js";

import checkBlankIcon from "../../assets/check_box_outline_blank_white_24dp.svg";
import checkIcon from "../../assets/check_box_white_24dp.svg";
import { replaceItem } from "../../utilities";
import styles from "./Todo.module.css";

interface TodoObject {
  id: number;
  todo: string;
  done: boolean;
  updated_at: string;
}

const getTodos = (): TodoObject[] | undefined => {
  const data = window.localStorage.getItem("todos");
  if (!data) return;
  const parsed = JSON.parse(data);
  return parsed.filter((todo: TodoObject) => !todo?.done);
};

const Todo: Component = () => {
  const [open, setOpen] = createSignal<boolean>(false);
  const [todos, setTodos] = createSignal<TodoObject[]>([]);
  const [text, setText] = createSignal<string>("");

  onMount(() => {
    setTodos(getTodos() || []);
  });

  createEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  });

  const onKeyUp = (e: KeyboardEvent) => {
    const val = (e?.currentTarget as HTMLInputElement)?.value;
    setText(val);
    if (e.key !== "Enter" || !val) return;
    setTodos([
      ...todos(),
      {
        id: todos().length + 1,
        todo: val,
        done: false,
        updated_at: new Date().toISOString(),
      },
    ]);
    setText("");
  };

  const onCheckboxClick = (val: TodoObject) => {
    const idx = todos().findIndex((todo) => todo?.id === val?.id);
    const newTodos = replaceItem(todos(), idx, { ...val, done: !val?.done });
    setTodos(newTodos);
  };

  return (
    <div class={styles.container}>
      <h3 class={styles.text} onclick={() => setOpen(!open())}>
        Todo
      </h3>
      <div
        class={styles.card}
        style={`visibility: ${open() ? "visible" : "hidden"}`}
      >
        <For each={todos()}>
          {(val) => (
            <div class={styles.wrapper}>
              <img
                class={styles.checkbox}
                src={!val.done ? checkBlankIcon : checkIcon}
                onclick={() => onCheckboxClick(val)}
              />
              <p
                class={styles.todo}
                style={`text-decoration: ${
                  val?.done ? "line-through" : "none"
                }`}
              >
                {val.todo}
              </p>
            </div>
          )}
        </For>
        <input
          class={styles.input}
          value={text()}
          placeholder="New Todo"
          onkeyup={(e) => onKeyUp(e)}
        />
      </div>
    </div>
  );
};

export default Todo;

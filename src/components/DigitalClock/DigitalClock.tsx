import { Component, createSignal, onMount } from "solid-js";

import styles from "./DigitalClock.module.css";

interface TimeObject {
  hours: number;
  minutes: number;
  seconds: number;
}

const getTime = (): TimeObject => {
  const date = new Date();
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};

const getGreeting = (time: TimeObject): string => {
  return time?.hours >= 4 && time?.hours <= 12
    ? "Good Morning"
    : time?.hours <= 19
    ? "Good Afternoon"
    : "Good Evening";
};

const formatNumber = (time: number): string => {
  return (time < 10 ? "0" + time : time).toString();
};

const formatTime = (time: TimeObject): string => {
  const hour = formatNumber(time?.hours);
  const minute = formatNumber(time?.minutes);
  return `${hour}:${minute}`;
};

const DigitalClock: Component = () => {
  const [time, setTime] = createSignal<TimeObject>(getTime());
  const [greeting, setGreeting] = createSignal<string>("");

  onMount(() => {
    setInterval(() => {
      const time = getTime();
      setTime(time);
      setGreeting(getGreeting(time));
    }, 1000);
  });

  return (
    <div class={styles.container}>
      <h1 class={styles.time}>{formatTime(time())}</h1>
      <p class={styles.greeting}>{greeting()}</p>
    </div>
  );
};

export default DigitalClock;

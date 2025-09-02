import { useState } from "react";
import styles from "./Counter.module.scss";

import Button from "../Button";

function Counter() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return <>
    <h1 className={styles.heading}>Counter App</h1>

    <div style={{ color: count > 0 ? "green" : count < 0 ? "red" : "gray" }}>
      <p>Count: {count}</p>
      <div>{count > 0 ? "Dương" : count < 0 ? "Âm" : "Bằng không"}</div>
    </div>

    <div className={styles.wrapper}>
      <Button className={styles.btn} secondary onClick={decrease}>Giảm (-1)</Button>
      <Button className={styles.btn} onClick={reset}>Reset (0)</Button>
      <Button className={styles.btn} primary onClick={increase}>Tăng (+1)</Button>
    </div>
  </>;
}

export default Counter;
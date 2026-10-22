import { useState } from "react";

export default function Counter(props: { initialValue: number }) {
  const [count, setCount] = useState(props.initialValue);
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
    </div>
  );
}

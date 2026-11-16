import { useState } from "react";

export function Counter(props: { initialValue: number }) {
  const [count, setCount] = useState(props.initialValue);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  const handleReset = () => {
    setCount(props.initialValue);
  };

  return (
    <div>
      <span>{count}</span>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

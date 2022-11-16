import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

const Counter = () => {
  const counter = useSelector((state) => state.counter.count); 
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0); 

  const amountNumber = Number(amount) || 0;

  const resetAll = () => { 
    setAmount(0);
    dispatch(reset())
  } 

  return (
    <div>
      <p>{counter}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={resetAll}>Reset</button> 
        <label>
          amount: 
          <input onChange={(e) => setAmount(e.target.value)} value={amount}></input>
        </label> 
        <button onClick={() => dispatch(incrementByAmount(amountNumber))} >Add by amount</button> 
      </div> 
    </div> 
  );
};

export default Counter;

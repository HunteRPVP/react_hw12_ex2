import React, { Component } from "react";
import Store from "./store";

const initialState = { count: 0 };

function updateStatus(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.amount };
    case "DECREMENT":
      return { count: state.count - action.amount };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

const incrementAction = { type: "INCREMENT", amount: 1 };
const decrementAction = { type: "DECREMENT", amount: 1 };
const resetAction = { type: "RESET" };

const store = new Store(updateStatus, initialState);

export class Counter extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  increment() {
    store.update(incrementAction);
  }

  decrement() {
    store.update(decrementAction);
  }

  reset() {
    store.update(resetAction);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.decrement()}>-</button>
        {store.state.count}
        <button onClick={() => this.increment()}>+</button>
        <br />
        <button onClick={() => this.reset()}>R</button>
      </div>
    );
  }
}

export default Counter;

// imports allow us to bring in other files and things like Axios
import './App.css';
// useState is a hook; we're importing the function that 
// we're going to use to keep our variables and the content on our page in sync.
import { useState } from 'react';


function App() {
  // JavaScript goes inside of the function created for the app
  // There will be better ways of setting variables than doing it here in the function component
  // e.g. old version was: let name = 'Lons';
  // hooks/useState is what we're going to use that works better.
  // let counter = 100; also old version

  // new way to declare a variable is in an array
  const [counter, setCounter] = useState(100);

  // functions go here
  const increase = () => {
    // counter += 1;
    //          new value
    setCounter(counter + 1);
    // console logging after calling "set"
    // might be one step behind
    console.log('increase', counter);
  }

  const decrease = () => {
    setCounter(counter - 1);
    console.log('decrease', counter);
  }

  return (
    // This is what's displayed on the page
    <div className="App">
      <header>
        <h1>Smallest Countries!</h1>
      </header>
      <div>
        {/* this is not a template literal! */}
        {/* but this is how we put variables directly in our HTML */}
        <p>{counter}</p>
        {/* in React, do not put () in your onClick function */}
        <button onClick={increase}>Increase</button>
        <br />
        <br />
        <button onClick={decrease}>Decrease</button>
      </div>
    </div>
  );
}

export default App;
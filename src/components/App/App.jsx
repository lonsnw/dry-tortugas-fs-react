// imports allow us to bring in other files and things like Axios
import './App.css';
// useState is a hook; we're importing the function that 
// we're going to use to keep our variables and the content on our page in sync.
import { useState } from 'react';
import axios from 'axios'; 

function App() {
  // JavaScript goes inside of the function created for the app
  // There will be better ways of setting variables than doing it here in the function component
  // e.g. old version was: let name = 'Lons';
  // hooks/useState is what we're going to use that works better.
  // let counter = 100; also old version

  // new way to declare a variable is in an array
  const [counter, setCounter] = useState(100);
  // we can put in test data when we're setting things up to see what's working
  const [name, setName] = useState('');
  const [continent, setContinent] = useState('');
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

  // function called when we submit the form
  const sendToServer = (e) => {
    // prevent the page from refreshing
    e.preventDefault();
    console.log('name', name, 'continent', continent);
    // TODO: Axios POST
    const dataToSend = { name: name, continent: continent };
    // again adding /api because we're using vite as a build tool
    axios.post('/api/countries', dataToSend).then((response) => {
      // TODO: Axios GET

    }).catch((error) => {
      console.error(error);
      alert('Something went wrong!');
    })
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
      <h2>Add new country</h2>
      <form onSubmit={sendToServer}>
        {/*                         getter                         setter */}
        Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        Continent: <input type="text" value={continent} onChange={(e) => setContinent(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>
      <h3>{name}, {continent}</h3>
    </div>
  );
}

export default App;
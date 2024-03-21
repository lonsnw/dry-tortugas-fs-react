import './App.css';
// useState is a hook, it allows us to keep
// variables and the DOM in sync.
import { useState, useEffect } from 'react';
// import axios so that we can use it within our component
import axios from 'axios';

function App() {
  // JavaScript goes here
  // let counter = 100; // old way
  const [counter, setCounter] = useState(100);
  //    getter  setter
  const [name, setName] = useState('Test');
  const [continent, setContinent] = useState('');

  // Country list
  const [countryList, setCountryList] = useState([]);

  // functions go here
  const increase = () => {
    // counter += 1; // old way
    //          new value
    setCounter(counter + 1);
    // console logging after calling "set"
    // might be one step behind.
    console.log('increase', counter);
  }

  const decrease = () => {
    setCounter(counter - 1);
    console.log('decrease');
  }

  const getCountries = () => {
    axios.get('/api/countries').then((response) => {
      console.log('Data:', response.data);
      // Set our country list
      setCountryList(response.data);
    }).catch((error) => {
      console.error(error);
      alert('Something went wrong!');
    });
  }
  // getCountries(); // old way

  // useEffect is called by React when the page loads
  useEffect(() => {
    getCountries();
  }, []); // REMEMBER!!!! , [] to run on page load

  // Function called when we submit the form
  const sendToServer = (e) => {
    // stop page from refreshing
    e.preventDefault();
    console.log('name', name, continent);
    // TODO: Axios POST
    const data = { name: name, continent: continent };
    axios.post('/api/countries', data).then((response) => {
      // TODO: Axios GET
      getCountries();
    }).catch((error) => {
      console.error(error);
      alert('Something went wrong!');
    });
  }

  const deleteCountry = (id) => {
    console.log(id);
  }

  return (
    // This is what is displayed on the page
    <div className="App">
      <header>
        <h1>Smallest Countries!</h1>
      </header>
      <div>
        {/* We can put variables directly in our html */}
        <p>{counter}</p>
        {/* In React, do not put () in your on click function */}
        <button onClick={increase}>Increase</button>
        <br />
        <br />
        <button onClick={decrease}>Decrease</button>
      </div>
      <h2>Add New Country</h2>
      <form onSubmit={sendToServer}>
        Name:
        <input type="text" 
          // getter
          value={name}  
          //                 setter
          onChange={(e) => setName(e.target.value)}
        />
        Continent:
        <input type="text"
          value={continent}
          onChange={(e) => setContinent(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      <h3>{name}</h3>
      <h3>{continent}</h3>
      <h2>List of Countries</h2>
      {
        // Loop over the list of countries and display them
        // on the page.
        countryList.map((country) => {
          return <div key={country.id}>
            {country.name + ', ' + country.continent}
            {/* <button onClick={() => deleteCountry(country.id)}>Delete</button> */}
          </div>
        })
        // Shorthand notation
        // countryList.map((country) => (
        //   <div key={country.id}>
        //     {country.name}, {country.continent}
        //   </div>
        // ))
      }
    </div>
  );
}

export default App;

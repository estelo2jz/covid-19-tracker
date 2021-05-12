import React, {useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import './App.css';

import InfoBox from './components/InfoBox';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  // STATE = How to write a variable in REACT

  // https://disease.sh/v3/covid-19/countries

  // USEEFFECT = RUns a piece of code
  // based on a given condition

  useEffect(() => {
    // The code inside here will run once
    // when the component loads and not again

    // async -> send a request, wait for it, do something with it

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {

          // [item1, item2, item3]
          // ^^^ item 1 ... -> returning an object in a shape
          // ^^^ item 2 ... -> returning an object in a shape
          // ^^^ item 3 ...........

          const countries = data.map((country) => ({
            name: country.country, // United States, United Kingdom, France
            value: country.countryInfo.iso2 // UK, USA, FR
          }));

          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value
    console.log("YOOO >>>>", countryCode);

    setCountry(countryCode);
  }

  return (
    <div className="app">
      <div className="app__header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select 
            variant="outlined" 
            onChange={onCountryChange}
            value={country}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {/* loop throught all the countires and show a drop down list of the options */}
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
            {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option Two</MenuItem>
            <MenuItem value="worldwide">Option Three</MenuItem>
            <MenuItem value="worldwide">Option Four</MenuItem> */}
          </Select>
        </FormControl>
      </div>

      {/* Header */}
      {/* Title + Select input dropdown field */}

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" total={2000} />
        <InfoBox title="Recovered" total={3000} />
        <InfoBox title="Deaths" total={4000} />
        {/* InfoBoxes title="Coronavirus cases" */}
        {/* InfoBoxes title="Coronavirus recoveries" */}
        {/* InfoBoxes */}
      </div>

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;

import React, {useState, useEffect} from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card, 
  CardContent
} from '@material-ui/core';
import './styles/App.scss';

import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useState(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, []);

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
          setTableData(data);
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
    // https://disease.sh/v3/covid-19/all
    // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
    const url = countryCode === 'worldwide' 
      ? 'https://disease.sh/v3/covid-19/all' 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);

        // all of the data from the country response
        setCountryInfo(data);
      })
  };

  console.log("COUNTRY INFO >>>", countryInfo);

  return (
    <div className="app">
      <div className="app__left">
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
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* Map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* passing data from API to Table component "prop-drilling" */}
          {/* countires contains the data */}
          <Table countries={tableData} />
          <h3>World new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;

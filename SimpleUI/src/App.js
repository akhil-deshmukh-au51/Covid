import React, { useEffect, useState } from "react";
import "./App.css"

function App() {
  const [country, setCountry] = useState("");
  const [cases, setCases] = useState("");
  const [recovered, setRecovered] = useState("");
  const [deaths, setDeaths] = useState("");
  const [todayCases, setTodayCases] = useState("");
  const [deathCases, setDeathCases] = useState("");
  const [recoveredCases, setRecoveredCases] = useState("");
  const [userInput, setUserInput] = useState("");
  const [continents, setContinents] = useState([]);
  const [population, setPopulation] = useState("");
  const [test, setTest] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    fetch("https://covid-193.p.rapidapi.com/history", {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        "X-RapidAPI-Key": "fd49ecbb2emsh554050f9957ae68p19946fjsnab213d53e519",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const setData = ({ response }) => {
    console.log(response);
    if (!response || response.length === 0) {
      
      return;
    }
  
    const {
      continent,
      country,
      cases,
      deaths,
      population,
      tests,
      time,
    } = response[0];
  
    setCountry(country);
    setCases(cases.total);
    setRecovered(cases.recovered);
    setDeaths(deaths.total);
    setTodayCases(cases.new);
    setDeathCases(deaths.new);
    setRecoveredCases(cases.recovered);
    setContinents(continent);
    setPopulation(population);
    setTest(tests.total);
    setTime(time);
  };
  

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://covid-193.p.rapidapi.com/history?country=${userInput}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
        "X-RapidAPI-Key": "fd49ecbb2emsh554050f9957ae68p19946fjsnab213d53e519",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  };

  return (
    <div className="covidData">
      <h1>COVID-19 CASES DATA</h1>
      <div className="covidData__input">
        <form onSubmit={handleSubmit}>
          {/* input county name */}
          <input onChange={handleSearch} placeholder="Enter Country Name" />
          <br />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Showing the details of the country */}
      <div className="covidData__country__info">
        <p>Country Name: {country}</p>
        <p>Cases: {cases}</p>
        <p>Deaths: {deaths}</p>
        <p>Recovered: {recovered}</p>
        <p>Cases Today: {todayCases}</p>
        <p>Deaths Today: {deathCases}</p>
        <p>Recovered Today: {recoveredCases}</p>
        <p>Continent:{continents}</p>
        <p>Population:{population}</p>
        <p>Test:{test}</p>
        <p>Time:{time}</p>
      </div>
    </div>
  );
}

export default App;

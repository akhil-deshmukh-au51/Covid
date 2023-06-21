import React, { useEffect, useState } from 'react';

const App = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('https://covid-193.p.rapidapi.com/history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': 'fd49ecbb2emsh554050f9957ae68p19946fjsnab213d53e519',
            'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReports(data.response);
        } else {
          console.error('Error retrieving COVID-19 reports:', response.status);
        }
      } catch (error) {
        console.error('Error retrieving COVID-19 reports:', error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h1>COVID-19 Reports</h1>
      <table>
        <thead>
          <tr>
          <th>Country Name</th>
          <th>Cases</th>
          <th>Deaths</th>
          <th>Recovered</th>
          <th>Cases Today</th>
          <th>Deaths Today</th>
          <th>Recovered Today</th>
          <th>Continent</th>
          <th>Population</th>
          <th>Tests</th>
          <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
          <tr key={report.date}>
         <td>{country}</td>
          <td>{cases}</td>
          <td>{deaths}</td>
          <td>{recovered}</td>
          <td>{todayCases}</td>
          <td>{deathCases}</td>
          <td>{recoveredCases}</td>
          <td>{continents}</td>
          <td>{population}</td>
          <td>{test}</td>
          <td>{time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
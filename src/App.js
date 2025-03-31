import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Card from "./Card";

function App() {
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [cityWeather, setCityWeather] = useState([]);

  async function fetchWeather(city) {
    try {
      setLoading(true);
      const weatherRes = await axios.get(
        `https://api.weatherapi.com/v1/current.json?q=${city}`,
        { headers: { key: "32cf1951f94c4d4eaeb155925252903" } }
      );
      console.log(weatherRes);
      const data = [
        { name: "Temprature", value: weatherRes?.data?.current?.temp_c },
        { name: "Humidity", value: weatherRes?.data?.current?.humidity },
        { name: "Condition", value: weatherRes?.data?.current?.condition.text },
        {
          name: "Wind Speed",
          value: weatherRes?.data?.current?.wind_kph + "kph",
        },
      ];
      setCityWeather([...data]);
      setLoading(false);
    } catch (e) {
      // console.log(e.response);
      alert("Failed to fetch weather data");
      setLoading(false);
    }
  }

  function handleSearch() {
    fetchWeather(cityName);
  }

  return (
    <div className="App">
      <div className="search-box">
        <input
          value={cityName}
          onChange={(e) => {
            setCityName(e.target.value);
          }}
          className="inputBox"
          placeholder="Enter city name"
          type="text"
        ></input>
        <button className="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>
      {loading && <p className="loading">Loading data..</p>}
      {cityWeather.length !== 0 ? (
        <div className="weather-cards">
          {cityWeather.map((val, index) => (
            <Card key={index} name={val.name} value={val.value} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  const capital = country.capital[0];

  useEffect(() => {
    if (!api_key) return;
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };
    fetchWeather();
  }, [capital, api_key]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {capital}</p>
      <p><strong>Area:</strong> {country.area}</p>
      
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        width="200"
      />

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p><strong>Temperature:</strong> {weather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Country;

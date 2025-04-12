import { useState } from 'react';
import useCountry from './hooks/useCountry';

const App = () => {
  const [countryName, setCountryName] = useState('');
  const { country, loading, error } = useCountry(countryName);

  const handleSearch = (event) => {
    event.preventDefault();
    setCountryName(event.target.country.value);
  };

  return (
    <div>
      <h1>Country Search</h1>
      
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          name="country" 
          placeholder="Search for a country" 
        />
        <button type="submit">Search</button>
      </form>
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {country && (
        <div>
          <h2>{country.name ? country.name.common : 'Country Name Unavailable'}</h2>
          <p>Capital: {country.capital ? country.capital : 'No Capital'}</p>
          <p>Population: {country.population ? country.population : 'Unknown'}</p>
          <img 
            src={country.flags.svg} 
            alt={`Flag of ${country.name.common}`} 
            style={{ width: '100px', height: 'auto' }} 
          />
        </div>
      )}
    </div>
  );
};

export default App;

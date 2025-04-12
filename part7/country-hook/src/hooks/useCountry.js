import { useState, useEffect } from 'react';

const useCountry = (countryName) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryName) return;
    
    const fetchCountryDetails = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName.trim().toLowerCase()}`);
        if (!response.ok) {
          throw new Error('Country not found');
        }

        const data = await response.json();
        setCountry(data[0]);
      } 
      catch (error) {
        setError(error.message);
      } 
      finally {
        setLoading(false);
      }
    };
    
    fetchCountryDetails();
  }, [countryName]);

  return { country, loading, error };
};

export default useCountry;

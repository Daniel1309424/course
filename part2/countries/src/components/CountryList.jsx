import { useState } from 'react'
import Country from './Country'

const CountryList = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  if (countries.length > 10) {
    return <p>Too many matches, please specify another filter</p>
  }

  if (selectedCountry) {
    return <Country country={selectedCountry} />
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  return (
    <ul>
      {countries.map(country => (
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </li>
      ))}
    </ul>
  )
}

export default CountryList

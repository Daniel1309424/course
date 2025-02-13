import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    countriesService.getAll().then(data => setCountries(data))
  }, [])

  const handleSearchChange = (event) => setSearch(event.target.value)

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Find countries</h2>
      <input value={search} onChange={handleSearchChange} />
      <CountryList countries={filteredCountries} />
    </div>
  )
}

export default App

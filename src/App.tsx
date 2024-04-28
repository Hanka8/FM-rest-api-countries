import { useState } from 'react'
import Main from './components/Main'
import FilterInput from './components/FilterInput'
import SearchBar from './components/SearchBar';
import DarkmodeBtn from './components/Navbar';

function App(): JSX.Element {

  const [region, setRegion] = useState<string>('');
  const [searchedCountry, setSearchedCountry] = useState<string>('');
  const [darkmode, setDarkmode] = useState<boolean>(false);

  const handleFilterSubmit = (region: string): void => {
    setRegion(region);
  }

  const handleSearchSubmit = (searchedCountry: string): void => {
    setSearchedCountry(searchedCountry);
  }

  const toggleDarkmode = (): void => {
    setDarkmode(!darkmode);
    if (darkmode) {
      document.body.classList.remove('darkmode');
    } else {
      document.body.classList.add('darkmode');
    }
  }

  return (
    <>
      <DarkmodeBtn toggleDarkmode={toggleDarkmode} darkmode={darkmode} />
      <div className='form-flex'>
        <SearchBar handleSearchSubmit={handleSearchSubmit}/>
        <FilterInput handleFilterSubmit={handleFilterSubmit} />
      </div>
      <Main region={region} searchedCountry={searchedCountry}/>
    </>
  )
}

export default App;
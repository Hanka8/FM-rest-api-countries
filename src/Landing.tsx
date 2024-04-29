import { useState } from 'react'
import Main from './components/Main'
import FilterInput from './components/FilterInput'
import SearchBar from './components/SearchBar';
import DarkmodeBtn from './components/Navbar';

interface NavbarProps {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

function Landing({darkmode,toggleDarkmode}: NavbarProps): JSX.Element {

  const [region, setRegion] = useState<string>('');
  const [searchedCountry, setSearchedCountry] = useState<string>('');


  const handleFilterSubmit = (region: string): void => {
    setRegion(region);
  }

  const handleSearchSubmit = (searchedCountry: string): void => {
    setSearchedCountry(searchedCountry);
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

export default Landing;
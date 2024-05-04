import { useState } from 'react'
import CountryList from './CountryList'
import FilterInput from './FilterInput'
import SearchBar from './SearchBar';
import DarkmodeBtn from './Navbar';
import { motion } from 'framer-motion';

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
        <main>
          <DarkmodeBtn toggleDarkmode={toggleDarkmode} darkmode={darkmode} />
          <div className='form-flex'>
              <SearchBar handleSearchSubmit={handleSearchSubmit}/>
              <FilterInput handleFilterSubmit={handleFilterSubmit} />
          </div>
          <motion.div 
            initial={{opacity: 0}} 
            animate={{opacity: 1, transition: {duration: 0.2}}}
            exit={{x: window.innerWidth, transition: {duration: 0.2}}}>
            <CountryList region={region} searchedCountry={searchedCountry}/>
          </motion.div>
        </main>
    )
}

export default Landing;
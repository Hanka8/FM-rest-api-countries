import {useEffect, useState} from 'react'
import Country from './Country'
import axios from 'axios'

interface CountryData {
    cca3: string;
    name: {common: string};
    population: number;
    region: string;
    capital: string;
    flags: {png: string};
}

interface MainProps {
    region: string;
    searchedCountry: string;
}

function Main({region, searchedCountry}: MainProps): JSX.Element  {

    const [countries, setCountries] = useState<CountryData[]>([]);

    useEffect(() => {
      const fetchCountries = async (): Promise<void> => {
        try {
          if (region) {
            if (searchedCountry) {
              const response = await axios.get(`https://restcountries.com/v3.1/name/${searchedCountry}`);
              const filteredCountries = response.data.filter((country: CountryData) => country.region === region);
              setCountries(filteredCountries);
              return;
            } else {
              const response = await axios.get(`https://restcountries.com/v3.1/region/${region.toLowerCase()}`);
              setCountries(response.data);
              return;
            }
          } else {
            if (searchedCountry) {
              console.log(searchedCountry);
              const response = await axios.get(`https://restcountries.com/v3.1/name/${searchedCountry}`);
              setCountries(response.data);
              return;
            } else {
              const response = await axios.get('https://restcountries.com/v3.1/all');
              setCountries(response.data);
              return;
              }
          }
        } catch (error) {
          console.error('Error fetching countries:', error);
        }
    };

    fetchCountries();
  }, [region, searchedCountry]);

    return (
        <div className='main'>
            {countries.map((country: CountryData) => (
                <Country
                    key={country.cca3}
                    flag={country.flags.png}
                    name={country.name.common}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                />
            ))
            }
        </div>
    )
}

export default Main;
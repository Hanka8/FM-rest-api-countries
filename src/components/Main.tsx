import {useEffect, useState} from 'react'
import Country from './Country'
import axios from 'axios'

export default function Main({region}) {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
    const fetchCountries = async () => {
      try {
        if (region) {
            const response = await axios.get(`https://restcountries.com/v3.1/region/${region.toLowerCase()}`);
            setCountries(response.data);
            return;
        } else {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setCountries(response.data);
            return;
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, [region]);

    return (
        <div>
            {countries.map((country) => (
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

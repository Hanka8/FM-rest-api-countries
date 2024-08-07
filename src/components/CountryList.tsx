import { useEffect, useState } from "react";
import Country from "./Country";
import Loading from "./Loading";
import axios from "axios";

type CountryData = {
  cca3: string;
  name: { common: string };
  population: number;
  region: string;
  capital: string;
  flags: { svg: string };
}

type MainProps = {
  region: string;
  searchedCountry: string;
}

function CountryList({ region, searchedCountry }: MainProps): JSX.Element {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountries = async (): Promise<void> => {
      try {
        setLoading(true);

        if (region) {
          if (searchedCountry) {
            const response = await axios.get(
              `https://restcountries.com/v3.1/name/${searchedCountry}`
            );
            const filteredCountries = response.data.filter(
              (country: CountryData) => country.region === region
            );
            setCountries(filteredCountries);
            return;
          } else {
            const response = await axios.get(
              `https://restcountries.com/v3.1/region/${region.toLowerCase()}`
            );
            setCountries(response.data);
            return;
          }
        } else {
          if (searchedCountry) {
            console.log(searchedCountry);
            const response = await axios.get(
              `https://restcountries.com/v3.1/name/${searchedCountry}`
            );
            setCountries(response.data);
            return;
          } else {
            const response = await axios.get(
              "https://restcountries.com/v3.1/all"
            );
            setCountries(response.data);
            return;
          }
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [region, searchedCountry]);

  return (
    <>
      {loading && <Loading />}
      <div className="main">
        {!loading &&
          countries.map((country: CountryData) => (
            <Country
              key={country.cca3}
              flag={country.flags.svg}
              name={country.name.common}
              population={country.population}
              region={country.region}
              capital={country.capital}
            />
          ))}
      </div>
    </>
  );
}

export default CountryList;
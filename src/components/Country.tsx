import { Link } from 'react-router-dom';

interface CountryProps {
    flag: string;
    name: string;
    population: number;
    region: string;
    capital: string;
}

export default function Country({flag, name, population, region, capital}: CountryProps) {
  return (
    <Link to={name} className='country-card'>
        <p>{name}</p>
        <img src={flag} alt={name} />
        <p>Population: {population}</p>
        <p>Region: {region}</p>
        <p>Capital: {capital}</p>
    </Link>
  )
}

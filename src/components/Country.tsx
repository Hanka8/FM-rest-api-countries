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
    <Link to={`/${name.replace(/\s/g, '_')}`} className='country-card'>
        <div className='card-flag-container'>       
          <img className='card-flag-img' src={flag} alt={name} />
        </div> 
        <p className='card-name'>{name}</p>
        <p className='card-info'><span className='bold'>Population: </span>{population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',' )}</p>
        <p className='card-info'><span className='bold'>Region: </span>{region}</p>
        <p className='card-info'><span className='bold'>Capital: </span>{capital}</p>
    </Link>
  )
}

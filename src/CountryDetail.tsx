import DarkmodeBtn from './components/Navbar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'

interface NavbarProps {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

interface CountryDetailProps {
    name: {
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
        common: string;
        official: string;
    };
    population: number;
    region: string;
    subregion: string;
    capital: Array<string>;
    tld: string[];
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    languages: {
        [key: string]: string;
    };
    borders: Array<string>;
    flags: {
        svg: string;
        alt: string;
    };
}

function CountryDetail({toggleDarkmode, darkmode}: NavbarProps):JSX.Element {
    
    const { name } = useParams<{ name: string }>();

    const [countryDetails, setCountryDetails] = useState<CountryDetailProps | null>(null);
    
    useEffect(() => {
        const fetchCountry = async (): Promise<void> => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${name.replace(/_/g, ' ')}?fullText=true`);
                setCountryDetails(response.data[0]);
            } catch (error) {
                console.error('Error fetching country:', error);
            }
        };
        fetchCountry();
        console.log(countryDetails);
    }, [name]);

    return (
        <div>
            <DarkmodeBtn toggleDarkmode={toggleDarkmode} darkmode={darkmode} />
            <>
                {countryDetails && (
                    <main className='country-details'>
                        <picture className='details-flag-pic'>
                            <img className='details-flag-img' src={countryDetails.flags.svg} alt={countryDetails.flags.alt} />
                        </picture>
                        <div>
                            <h1 className='details-h1'>{name.replace(/_/g, ' ')}</h1>
                            <div className='details-box'>
                                <div className='box-col'>
                                    <p><span className='bold'>Native name: </span> 
                                        {countryDetails.name.nativeName[Object.keys(countryDetails.languages)[0]].official}
                                        {/* {Object.keys(countryDetails.name.nativeName).map((key) => (
                                            <span key={key}> {countryDetails.name.nativeName[key].official}</span>
                                        ))} */}
                                    </p>
                                    <p><span className='bold'>Population: </span> 
                                        {countryDetails.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',' )}
                                    </p>
                                    <p><span className='bold'>Region:</span> {countryDetails.region}</p>
                                    <p><span className='bold'>Sub Region:</span> {countryDetails.subregion}</p>
                                    <p><span className='bold'>Capital:</span> {countryDetails.capital}</p>
                                </div>
                                <div className='box-col'>
                                    <p><span className='bold'>Top Level Domain:</span> {countryDetails.tld}</p>
                                    <p><span className='bold'>Currencies:</span>
                                        {Object.entries(countryDetails.currencies).map(([code, currency]) => (
                                            <span key={code}> {currency.name} ({currency.symbol})</span>
                                        ))}
                                    </p>
                                    <p><span className='bold'>Languages: </span> 
                                        {Object.values(countryDetails.languages).map((language) => (language)).join(", ")}
                                    </p>
                                </div>
                            </div>
                            <div className='border-countries'>
                                <p className='bold'>Border Countries:</p>
                                    {countryDetails.borders ? (
                                        <ul className='border-items'>
                                            {countryDetails.borders.map((border) => (
                                                <li className='border-item' key={border}>{border}</li>
                                            ))}
                                        </ul>
                                        ) : (
                                        <p>None</p>
                                    )}
                            </div>
                        </div>
                    </main>
                )}
            </>
        </div>
    )
}

export default CountryDetail;
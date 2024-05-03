import DarkmodeBtn from './Navbar';
import BackBtn from './BackBtn';
import ImageMagnifier from './ImageMagnifier';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'

interface CountryDetailProps {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

interface CountryDetails {
    nodeRef: React.RefObject<HTMLElement>;
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

function CountryDetail({toggleDarkmode, darkmode}: CountryDetailProps):JSX.Element {
    
    const { name } = useParams<{ name: string }>();

    const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(null);
    
    useEffect(() => {
        const fetchCountry = async (): Promise<void> => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${name?.replace(/_/g, ' ')}?fullText=true`);
                setCountryDetails(response.data[0]);
            } catch (error) {
                console.error('Error fetching country:', error);
            }
        };
        fetchCountry();
    }, [name]);

    return (
        <>
            <DarkmodeBtn toggleDarkmode={toggleDarkmode} darkmode={darkmode} />
            <BackBtn />
            <motion.div
                initial={{width: "100%"}} 
                animate={{width: '100%'}} 
                exit={{opacity: 0, transition: {duration: 0.1}}}>
                {countryDetails && (
                    <main className='country-details'>
                        <picture className='details-flag-pic'>
                            <ImageMagnifier 
                                src={countryDetails.flags.svg} 
                                alt={countryDetails.flags.alt}
                                magnifieWidth={200}
                                magnifierHeight={200}
                                zoomLevel={2}
                            />
                        </picture>
                        <div>
                            <h1 className='details-h1'>{name?.replace(/_/g, ' ')}</h1>
                            <div className='details-box'>
                                <div className='box-col'>
                                    <p><span className='bold'>Native name: </span> 
                                        {countryDetails.name.nativeName[Object.keys(countryDetails.languages)[0]].official}
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
        </motion.div>
        </>
    )
}

export default CountryDetail;
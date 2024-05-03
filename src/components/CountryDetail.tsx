import DarkmodeBtn from './Navbar';
import BackBtn from './BackBtn';
import ImageMagnifier from './ImageMagnifier';
import { useParams, Link } from 'react-router-dom';
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
    const [borderCountries, setBorderCountries] = useState<String[] | null>(null);
    
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

    useEffect(() => {
        const fetchBorderCountries = async () => {
            let countryNames: string[] = [];

            if (countryDetails?.borders) {
                await Promise.all(
                    countryDetails.borders.map(async (border) => {
                        try {
                            const response = await axios.get(`https://restcountries.com/v3.1/alpha/${border}`);
                            countryNames.push(response.data[0].name.common);
                        } catch (error) {
                            console.error('Error fetching border country:', error);
                        }
                    })
                );
            }

            setBorderCountries(countryNames);
        };

        fetchBorderCountries();
    }, [countryDetails]);

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
                                    {borderCountries === null || borderCountries.length === 0 ? (
                                        <p>None</p>
                                    ) : (
                                        <ul className='border-items'>
                                            {borderCountries.map((border) => (
                                                <Link to={`/${border.replace(/\s/g, '_')}`} key={`${border}_${name}`}>
                                                    <li className='border-item'>{border}</li>
                                                </Link>
                                            ))}
                                        </ul>
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
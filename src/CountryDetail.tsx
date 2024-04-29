import DarkmodeBtn from './components/Navbar';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'

interface NavbarProps {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

interface CountryDetailProps {
    name: {nativeName: string, common: string, official: string};
    population: number;
    region: string;
    subregion: string;
    capital: Array<string>;
    tld: [0];
    currencies: {code: string, name: string, symbol: string};
    languages: {ron: string};
    borders: Array<string>;
    flags: {png: string};
}

function CountryDetail({toggleDarkmode, darkmode}: NavbarProps):JSX.Element {
    
    const { name } = useParams<{ name: string }>();
    const [countryDetails, setCountryDetails] = useState<CountryDetailProps[]>([]);
    
    useEffect(() => {
        const fetchCountry = async (): Promise<void> => {
            try {
                const response = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
                setCountryDetails(response.data[0]);
                console.log(countryDetails);
            } catch (error) {
                console.error('Error fetching country:', error);
            }
        };
        fetchCountry();
    }, [name]);

    return (
        <div>
            <DarkmodeBtn toggleDarkmode={toggleDarkmode} darkmode={darkmode} />
            <div>
                <img src={countryDetails.flags?.png} alt={name} />
            </div>
        </div>
    )
}

export default CountryDetail;
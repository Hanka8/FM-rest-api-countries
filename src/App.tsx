import { Route, Routes } from 'react-router-dom';
import Landing from './Landing';
import CountryDetail from './components/CountryDetail';
import { useState } from 'react';
import './index.css'

function App(): JSX.Element {
  const [darkmode, setDarkmode] = useState<boolean>(false);

  const toggleDarkmode = (): void => {
    setDarkmode(!darkmode);
    if (darkmode) {
      document.body.classList.remove('darkmode');
    } else {
      document.body.classList.add('darkmode');
    }
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing darkmode={darkmode} toggleDarkmode={toggleDarkmode} />} />
        <Route path={'/:name'} element={<CountryDetail darkmode={darkmode} toggleDarkmode={toggleDarkmode} />} />
      </Routes>
    </>
  )
}

export default App;
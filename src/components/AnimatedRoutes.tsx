import { Route, Routes, useLocation } from 'react-router-dom';
import Landing from './Landing';
import CountryDetail from './CountryDetail';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
 
 function AnimatedRoutes():JSX.Element {

  const location = useLocation();

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
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
          <Route 
            path='/' 
            element={<Landing darkmode={darkmode} toggleDarkmode={toggleDarkmode} />} />
          <Route 
            path={'/:name'} 
            element={<CountryDetail darkmode={darkmode} toggleDarkmode={toggleDarkmode} />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes;

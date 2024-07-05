import { Route, Routes, useLocation } from "react-router-dom";
import Landing from "./Landing";
import CountryDetail from "./CountryDetail";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "../ThemeContext.tsx";

function AnimatedRoutes(): JSX.Element {
  const location = useLocation();
  const { darkmode } = useTheme();

  darkmode ? document.body.classList.add("darkmode") : document.body.classList.remove("darkmode");

  return (
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path={"/:name"} element={<CountryDetail />} />
        </Routes>
      </AnimatePresence>
  );
}

export default AnimatedRoutes;

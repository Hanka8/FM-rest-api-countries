import AnimatedRoutes from './components/AnimatedRoutes';
import { ThemeProvider } from "./ThemeContext.tsx";
import './index.css'

function App(): JSX.Element {

  return (
      <ThemeProvider>
        <AnimatedRoutes />
      </ThemeProvider>
  )
}

export default App;
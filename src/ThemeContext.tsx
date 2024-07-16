import { useContext, createContext, useState, ReactNode} from "react";

type ThemeContextType = {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [darkmode, setDarkmode] = useState<boolean>(false);

    return (
        <ThemeContext.Provider
            value={{
            darkmode, 
            toggleDarkmode: () => setDarkmode(darkmode ? false : true)
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
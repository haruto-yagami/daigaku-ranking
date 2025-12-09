import React, { createContext, useContext, useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import  Header  from './components/Header';
import { Home } from './pages/Home';
import { ChevronUp } from 'lucide-react';

// Theme Context
type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = window.localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
    }
    // Default to light mode
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 dark:bg-slate-950 text-white py-8 mt-12 transition-colors">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
                <div className="mb-4 md:mb-0">
                    <p className="font-serif">Japanese Academic Credentials</p>
                    <p className="text-gray-400 text-xs mt-1">University Ranking Database</p>
                </div>
                <div className="flex gap-6 text-gray-400">
                    <a href="#" className="hover:text-white transition-colors">Site Map</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
            </div>
            <div className="text-center text-gray-500 text-xs mt-8">
                © 2024 Japanese Academic Credentials Ranking.
            </div>
        </footer>
    );
};

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (!isVisible) return null;

    return (
        <button 
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-yellow-400 hover:bg-yellow-500 text-white p-3 rounded-sm shadow-lg transition-all z-50 opacity-80 hover:opacity-100 dark:bg-indigo-600 dark:hover:bg-indigo-500"
            aria-label="Scroll to top"
        >
            <ChevronUp size={24} />
        </button>
    );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col font-sans text-gray-800 dark:text-slate-100 transition-colors duration-300">
          <Header />
          
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
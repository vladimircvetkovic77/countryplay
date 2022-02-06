import { Routes, Route } from 'react-router-dom';
import './App.scss';
import AppNavigation from './components/AppNavigation';
import CountryDetails from './pages/CountryDetails';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
        <AppNavigation />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:countryCode" element={<CountryDetails />} />
        </Routes>
    </div>
  );
}

export default App;

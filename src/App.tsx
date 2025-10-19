import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';
import PortfolioPage from './pages/PortfolioPage';
import { ROUTES } from './utils/constants';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path={ROUTES.HOME} element={<LandingPage />} />
            <Route path={ROUTES.DEMO} element={<DemoPage />} />
            <Route path={ROUTES.PORTFOLIO} element={<PortfolioPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

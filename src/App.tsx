import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ToolsProvider } from './context/ToolsContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import ToolDetailPage from './pages/ToolDetailPage';
import SubmitToolPage from './pages/SubmitToolPage';
import CategoriesPage from './pages/CategoriesPage';
import TrendingPage from './pages/TrendingPage';

function App() {
  return (
    <ThemeProvider>
      <ToolsProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/tool/:id" element={<ToolDetailPage />} />
                <Route path="/submit" element={<SubmitToolPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ToolsProvider>
    </ThemeProvider>
  );
}

export default App;
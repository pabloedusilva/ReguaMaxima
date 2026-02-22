import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/context/AuthContext';
import { HomePage } from './components/pages/HomePage';
import { RecursosPage } from './components/pages/RecursosPage';
import { ClientePage } from './components/pages/ClientePage';
import { BarbeiroPage } from './components/pages/BarbeiroPage';
import { PricingPage } from './components/pages/PricingPage';
import { ContatoPage } from './components/pages/ContatoPage';
import { TermosPage } from './components/pages/TermosPage';
import { PrivacidadePage } from './components/pages/PrivacidadePage';
import { SobrePage } from './components/pages/SobrePage';
import { Footer } from './components/layout/Footer';
import { LoginPage, RegisterPage } from './auth';
import { ManagePage } from './pages/ManagePage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recursos" element={<RecursosPage />} />
          <Route path="/cliente" element={<ClientePage />} />
          <Route path="/barbeiro" element={<BarbeiroPage />} />
          <Route path="/precos" element={<><PricingPage /><Footer /></>} />
          <Route path="/contato" element={<ContatoPage />} />
          <Route path="/termos" element={<><TermosPage /><Footer /></>} />
          <Route path="/privacidade" element={<><PrivacidadePage /><Footer /></>} />
          <Route path="/sobre" element={<><SobrePage /><Footer /></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/gerenciar" element={<ManagePage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

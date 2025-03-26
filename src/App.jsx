import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Container, Header } from './styles/styles';
import Translator from './components/Translator/Translator';
import { AuthPage } from './components/Auth/AuthPage';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authStatus);
      setLoading(false);
      

      if (authStatus) {
        navigate('/translator', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/translator', { replace: true });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/login', { replace: true });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={
        !isAuthenticated ? (
          <AuthPage onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Navigate to="/translator" replace />
        )
      } />
      
      <Route path="/translator" element={
        isAuthenticated ? (
          <Container>
            <Header>
              🌐 Tradutor de Documentos
              <button 
                onClick={handleLogout}
                style={{
                  position: 'absolute',
                  right: '20px',
                  padding: '5px 10px',
                  background: '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Sair
              </button>
            </Header>
            <Translator />
          </Container>
        ) : (
          <Navigate to="/login" replace />
        )
      } />
      
      <Route path="/" element={
        <Navigate to={isAuthenticated ? "/translator" : "/login"} replace />
      } />
      
      <Route path="*" element={
        <Navigate to={isAuthenticated ? "/translator" : "/login"} replace />
      } />
    </Routes>
  );
}

export default AppWrapper;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormContainer, Input, Button, Title, ToggleForm } from './AuthStyles';

export function LoginForm({ onSwitchToRegister, onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const fakeUsers = [
    { email: 'admin@teste.com', password: 'admin123', role: 'admin' },
    { email: 'usuario@teste.com', password: 'senha123', role: 'user' },
    { email: 'convidado@teste.com', password: '123456', role: 'guest' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {

      if (!formData.email || !formData.password) {
        throw new Error('Por favor, preencha todos os campos');
      }

      const user = fakeUsers.find(
        u => u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        throw new Error('Credenciais inválidas');
      }


      await new Promise(resolve => setTimeout(resolve, 800));
      

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userRole', user.role);
  
      onLoginSuccess();
      
 
      navigate('/translator');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Login</Title>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      
      <Input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        required
      />
      
      <Button type="submit" disabled={loading}>
        {loading ? 'Carregando...' : 'Entrar'}
      </Button>
      
      <ToggleForm type="button" onClick={onSwitchToRegister}>
        Não tem uma conta? Registre-se
      </ToggleForm>
      
      {/* APENAS PARA SALVAR AS CREDENCIAIS DE TESTES */}
      <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#666' }}>
        <p>Credenciais para teste:</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Admin: admin@teste.com / admin123</li>
          <li>Usuário: usuario@teste.com / senha123</li>
          <li>Convidado: convidado@teste.com / 123456</li>
        </ul>
      </div>
    </FormContainer>
  );
}
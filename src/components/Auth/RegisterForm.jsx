/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FormContainer, Input, Button, Title, ToggleForm } from './AuthStyles';

export function RegisterForm({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Por favor, insira um email válido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;

    setLoading(true);

    try {
  
      await new Promise(resolve => setTimeout(resolve, 1500));
      

      setSuccess(true);
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      setError('Ocorreu um erro durante o registro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Registrar</Title>
      
      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
      {success && (
        <div style={{ color: 'green', marginBottom: '10px' }}>
          Registro realizado com sucesso! Redirecionando para login...
        </div>
      )}
      
      <Input
        type="text"
        name="name"
        placeholder="Nome completo"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
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
        placeholder="Senha (mínimo 6 caracteres)"
        value={formData.password}
        onChange={handleChange}
        required
        minLength="6"
      />
      
      <Input
        type="password"
        name="confirmPassword"
        placeholder="Confirmar Senha"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        minLength="6"
      />
      
      <Button type="submit" disabled={loading || success}>
        {loading ? 'Registrando...' : 'Registrar'}
      </Button>
      
      <ToggleForm type="button" onClick={onSwitchToLogin}>
        Já tem uma conta? Faça login
      </ToggleForm>
    </FormContainer>
  );
}
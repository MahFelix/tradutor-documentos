import { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { AuthContainer } from './AuthStyles';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSuccess = () => {

  };

  return (
    <AuthContainer>
      {isLogin ? (
        <LoginForm 
          onSwitchToRegister={() => setIsLogin(false)} 
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </AuthContainer>
  );
}


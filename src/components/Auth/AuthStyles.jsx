import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

export const Button = styled.button`
  padding: 0.75rem;
  background-color: #4a6bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a5bef;
  }
`;

export const Title = styled.h2`
  margin: 0 0 1rem 0;
  text-align: center;
  color: #333;
`;

export const ToggleForm = styled.button`
  background: none;
  border: none;
  color: #4a6bff;
  cursor: pointer;
  font-size: 0.9rem;
  text-align: center;
  padding: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;


export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;
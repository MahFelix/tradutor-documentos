import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 600px;
`;

export const Label = styled.label`
  margin-top: 10px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
`;

export const Select = styled.select`
  width: 90%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f4f4f9;
  cursor: pointer;
`;

export const TextArea = styled.textarea`
  width: 90%;
  height: 100px;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  font-size: 14px;
  background-color: #f9f9f9;
  color: #333;
  outline: none;
  box-shadow: inset 0px 2px 4px rgba(0,0,0,0.1);
`;

export const Button = styled.button`
  margin-top: 15px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

export const LanguageContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  margin-bottom: 20px;
`;

export const SwapButton = styled.button`
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0b7dda;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const StatusMessage = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 5px;
`;

export const ErrorMessage = styled.div`
  color: #d32f2f;
  background-color: #fdecea;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  border-left: 4px solid #d32f2f;
`;
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

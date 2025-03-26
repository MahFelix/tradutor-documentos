import React from 'react';
import { Input } from './styles';

const FileUploader = ({ onFileSelect }) => {
  return (
    <Input 
      type="file" 
      accept=".txt" 
      onChange={(e) => onFileSelect(e.target.files[0])}
    />
  );
};

export default FileUploader;

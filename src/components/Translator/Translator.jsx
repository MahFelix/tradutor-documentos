/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import FileUploader from '../FileUploader/FileUploader';
import {
  Container,
  Label,
  Select,
  TextArea,
  Button,
} from './styles';

const Translator = () => {
  const [file, setFile] = useState(null);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('pt');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleFileSelect = async (file) => {
    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => setOriginalText(e.target.result);
    reader.readAsText(file);
  };

  const translateText = async () => {
    try {
      const response = await axios.post('https://libretranslate.de/translate', {
        q: originalText,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      });

      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Erro na tradução:', error);
    }
  };

  return (
    <Container>
      <FileUploader onFileSelect={handleFileSelect} />

      <Label>Idioma de Origem:</Label>
      <Select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
        <option value="en">Inglês</option>
        <option value="es">Espanhol</option>
        <option value="fr">Francês</option>
        <option value="pt">Português</option>
      </Select>

      <Label>Idioma de Destino:</Label>
      <Select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
        <option value="pt">Português</option>
        <option value="en">Inglês</option>
        <option value="es">Espanhol</option>
        <option value="fr">Francês</option>
      </Select>

      <TextArea placeholder="Texto Original" value={originalText} readOnly />
      <Button onClick={translateText}>Traduzir</Button>
      <TextArea placeholder="Texto Traduzido" value={translatedText} readOnly />
    </Container>
  );
};

export default Translator;

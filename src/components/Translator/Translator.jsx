/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUploader from '../FileUploader/FileUploader';
import {
  Container,
  Label,
  Select,
  TextArea,
  Button,
  LanguageContainer,
  SwapButton,
  StatusMessage,
  ErrorMessage
} from './styles';

// Lista de idiomas suportados com códigos compatíveis com MyMemory
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ar', name: 'Arabic' }
];

// Fallback para detecção de idioma quando a API falhar
const detectLanguageFallback = (text) => {
  const commonWords = {
    pt: ['o', 'a', 'de', 'do', 'da', 'em', 'que', 'não', 'com'],
    en: ['the', 'and', 'to', 'of', 'in', 'that', 'for', 'with', 'this'],
    es: ['el', 'la', 'de', 'que', 'en', 'los', 'las', 'con', 'por'],
    fr: ['le', 'la', 'de', 'et', 'à', 'les', 'des', 'en', 'que'],
    de: ['der', 'die', 'das', 'und', 'in', 'den', 'von', 'mit', 'sich']
  };

  const textLower = text.toLowerCase();
  let maxMatches = 0;
  let detectedLang = 'en';

  Object.entries(commonWords).forEach(([lang, words]) => {
    const matches = words.filter(word => 
      new RegExp(`\\b${word}\\b`).test(textLower)
    ).length;

    if (matches > maxMatches) {
      maxMatches = matches;
      detectedLang = lang;
    }
  });

  return detectedLang;
};

const Translator = () => {
  const [file, setFile] = useState(null);
  const [sourceLang, setSourceLang] = useState('auto');
  const [targetLang, setTargetLang] = useState('pt');
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detectedLanguage, setDetectedLanguage] = useState('');

  const MAX_TEXT_LENGTH = 500;

  const handleFileSelect = async (file) => {
    setFile(file);
    setError(null);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      if (text.length > MAX_TEXT_LENGTH) {
        setError(`Texto muito longo (máximo ${MAX_TEXT_LENGTH} caracteres)`);
        setOriginalText(text.substring(0, MAX_TEXT_LENGTH));
      } else {
        setOriginalText(text);
      }
      
      if (sourceLang === 'auto') {
        detectLanguage(text);
      }
    };
    reader.onerror = () => setError('Erro ao ler o arquivo');
    reader.readAsText(file);
  };

  const detectLanguage = async (text) => {
  if (!text.trim()) return;
  
  try {
    // Usa apenas os primeiros 100 caracteres para detecção
    const sampleText = text.substring(0, 100);
    const response = await axios.get(
      `https://api.mymemory.translated.net/detect`,
      {
        params: { q: sampleText },
        timeout: 3000
      }
    );
    
    if (response.data?.matches?.length > 0) {
      const detectedLang = response.data.matches[0].language;
      const isSupported = SUPPORTED_LANGUAGES.some(lang => lang.code === detectedLang);
      const finalLang = isSupported ? detectedLang : 'en';
      setDetectedLanguage(finalLang);
      
      // Se estava no modo automático, atualiza para o idioma detectado
      if (sourceLang === 'auto') {
        setSourceLang(finalLang);
      }
    } else {
      // Fallback se a API não retornar resultados
      const fallbackLang = detectLanguageFallback(sampleText);
      setDetectedLanguage(fallbackLang);
      if (sourceLang === 'auto') {
        setSourceLang(fallbackLang);
      }
    }
  } catch (err) {
    console.warn('API de detecção falhou, usando fallback:', err);
    // Fallback local quando a API falha
    const fallbackLang = detectLanguageFallback(text);
    setDetectedLanguage(fallbackLang);
    if (sourceLang === 'auto') {
      setSourceLang(fallbackLang);
    }
  }
};

  const translateText = async () => {
    if (!originalText.trim()) {
      setError('Por favor, insira texto para traduzir');
      return;
    }

    if (originalText.length > MAX_TEXT_LENGTH) {
      setError(`Texto muito longo (máximo ${MAX_TEXT_LENGTH} caracteres)`);
      return;
    }

    setLoading(true);
    setError(null);
    setTranslatedText('');

    try {
      // Usa o idioma detectado ou inglês como fallback
      const actualSourceLang = sourceLang === 'auto' 
        ? detectedLanguage || 'en' 
        : sourceLang;

      // Verifica se o par de idiomas é suportado
      const isLangPairSupported = SUPPORTED_LANGUAGES.some(lang => lang.code === actualSourceLang) &&
                                SUPPORTED_LANGUAGES.some(lang => lang.code === targetLang);

      if (!isLangPairSupported) {
        throw new Error('Par de idiomas não suportado');
      }

      const response = await axios.get(
        `https://api.mymemory.translated.net/get`,
        {
          params: {
            q: originalText,
            langpair: `${actualSourceLang}|${targetLang}`,
            mt: '1' // Prioriza traduções oficiais
          },
          timeout: 10000
        }
      );

      if (response.data?.responseData?.translatedText) {
        setTranslatedText(response.data.responseData.translatedText);
      } else if (response.data?.matches?.length > 0) {
        // Usa a melhor sugestão da comunidade
        const bestMatch = response.data.matches.reduce((best, current) => 
          current.quality > best.quality ? current : best
        );
        setTranslatedText(bestMatch.translation);
      } else {
        throw new Error('Nenhuma tradução disponível');
      }
    } catch (err) {
      console.error('Erro na tradução:', err);
      setError(err.message || 'Falha na tradução. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const swapLanguages = () => {
    if (sourceLang !== 'auto') {
      setSourceLang(targetLang);
      setTargetLang(sourceLang);
      setTranslatedText('');
      setDetectedLanguage('');
    }
  };

  // Atualiza a detecção quando o texto ou idioma de origem muda
  useEffect(() => {
    if (sourceLang === 'auto' && originalText.trim()) {
      const debounceTimer = setTimeout(() => {
        detectLanguage(originalText);
      }, 500);
      
      return () => clearTimeout(debounceTimer);
    }
  }, [originalText, sourceLang]);

  return (
    <Container>
      <FileUploader 
        onFileSelect={handleFileSelect} 
        acceptedFormats=".txt,.doc,.docx,.pdf"
      />

      <LanguageContainer>
        <div>
          <Label>Idioma de Origem:</Label>
          <Select 
            value={sourceLang} 
            onChange={(e) => {
              setSourceLang(e.target.value);
              setDetectedLanguage('');
            }}
            disabled={loading}
          >
            <option value="auto">Detectar automaticamente</option>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </Select>
          {sourceLang === 'auto' && detectedLanguage && (
            <StatusMessage>
              Idioma detectado: {SUPPORTED_LANGUAGES.find(l => l.code === detectedLanguage)?.name || detectedLanguage}
            </StatusMessage>
          )}
        </div>

        <SwapButton 
          onClick={swapLanguages} 
          disabled={sourceLang === 'auto' || loading}
          title="Trocar idiomas"
        >
          ⇄
        </SwapButton>

        <div>
          <Label>Idioma de Destino:</Label>
          <Select 
            value={targetLang} 
            onChange={(e) => setTargetLang(e.target.value)}
            disabled={loading}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </Select>
        </div>
      </LanguageContainer>

      <TextArea 
        placeholder={`Texto Original (máximo ${MAX_TEXT_LENGTH} caracteres)`} 
        value={originalText} 
        onChange={(e) => {
          const text = e.target.value;
          if (text.length <= MAX_TEXT_LENGTH) {
            setOriginalText(text);
          }
        }}
        disabled={loading}
      />
      {originalText.length > MAX_TEXT_LENGTH && (
        <ErrorMessage>
          Limite de {MAX_TEXT_LENGTH} caracteres excedido
        </ErrorMessage>
      )}

      <Button 
        onClick={translateText} 
        disabled={loading || !originalText.trim() || originalText.length > MAX_TEXT_LENGTH}
      >
        {loading ? 'Traduzindo...' : 'Traduzir'}
      </Button>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <TextArea 
        placeholder="Texto Traduzido" 
        value={translatedText} 
        readOnly 
      />
    </Container>
  );
};

export default Translator;
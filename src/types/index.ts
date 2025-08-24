export type Language = 'french' | 'spanish' | 'japanese';

export interface LanguageOption {
  value: Language;
  label: string;
  flag: string;
}

export interface TranslationRequest {
  text: string;
  targetLanguage: Language;
}

export interface TranslationResponse {
  originalText: string;
  translatedText: string;
  targetLanguage: Language;
}

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature: number;
  max_tokens: number;
}

export interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}
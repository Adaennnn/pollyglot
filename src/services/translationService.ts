import { Config } from '@/utils/config';
import type { Language, OpenAIRequest, OpenAIResponse, TranslationRequest, TranslationResponse } from '@/types';

export class TranslationService {
  private static instance: TranslationService;
  private config: Config;
  
  private languageMap: Record<Language, string> = {
    'french': 'French',
    'spanish': 'Spanish',
    'japanese': 'Japanese'
  };
  
  private constructor() {
    this.config = Config.getInstance();
  }
  
  static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }
  
  async translate(request: TranslationRequest): Promise<TranslationResponse> {
    try {
      const translatedText = await this.callOpenAI(request.text, request.targetLanguage);
      
      return {
        originalText: request.text,
        translatedText,
        targetLanguage: request.targetLanguage
      };
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error(this.getErrorMessage(error));
    }
  }
  
  private async callOpenAI(text: string, targetLanguage: Language): Promise<string> {
    const apiKey = this.config.openaiApiKey;
    
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured. Please check your .env file.');
    }
    
    const requestBody: OpenAIRequest = {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Translate the following text to ${this.languageMap[targetLanguage]}. Provide only the translation without any explanations or additional text.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 1000
    };
    
    const response = await fetch(this.config.openaiApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenAI API key.');
      }
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data: OpenAIResponse = await response.json();
    return data.choices[0].message.content.trim();
  }
  
  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred during translation.';
  }
}
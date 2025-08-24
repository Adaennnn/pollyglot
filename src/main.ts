import './styles/main.css';
import { TranslationService } from './services/translationService';
import { UIController } from './services/uiController';
import { Config } from './utils/config';
import type { Language } from './types';

class App {
  private translationService: TranslationService;
  private uiController: UIController;
  private selectedLanguage: Language = 'french';
  
  constructor() {
    Config.getInstance();
    this.translationService = TranslationService.getInstance();
    this.uiController = UIController.getInstance();
    this.initialize();
  }
  
  private initialize(): void {
    this.uiController.onTranslateClick(() => this.handleTranslate());
    this.uiController.onLanguageChange((language) => {
      this.selectedLanguage = language;
      console.log('Selected language:', language);
    });
  }
  
  private async handleTranslate(): Promise<void> {
    const text = this.uiController.getInputText();
    
    if (!text) {
      this.uiController.showAlert('Please enter some text to translate');
      return;
    }
    
    this.uiController.showTranslating();
    
    try {
      const response = await this.translationService.translate({
        text,
        targetLanguage: this.selectedLanguage
      });
      
      this.uiController.displayResults(response);
    } catch (error) {
      console.error('Translation failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Translation failed. Please try again.';
      this.uiController.displayError(errorMessage);
      
      if (errorMessage.includes('API key')) {
        this.uiController.showAlert(errorMessage);
      }
    } finally {
      this.uiController.hideTranslating();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
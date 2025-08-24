import type { Language, TranslationResponse } from '@/types';

export class UIController {
  private static instance: UIController;
  
  private inputView!: HTMLElement;
  private resultsView!: HTMLElement;
  private inputText!: HTMLTextAreaElement;
  private translateBtn!: HTMLButtonElement;
  private startOverBtn!: HTMLButtonElement;
  private originalTextDiv!: HTMLElement;
  private translatedTextDiv!: HTMLElement;
  private languageRadios!: NodeListOf<HTMLInputElement>;
  
  private constructor() {
    this.initializeElements();
    this.attachEventListeners();
  }
  
  static getInstance(): UIController {
    if (!UIController.instance) {
      UIController.instance = new UIController();
    }
    return UIController.instance;
  }
  
  private initializeElements(): void {
    const elements = {
      inputView: document.getElementById('input-view'),
      resultsView: document.getElementById('results-view'),
      inputText: document.getElementById('input-text') as HTMLTextAreaElement,
      translateBtn: document.getElementById('translate-btn') as HTMLButtonElement,
      startOverBtn: document.getElementById('start-over-btn') as HTMLButtonElement,
      originalTextDiv: document.getElementById('original-text'),
      translatedTextDiv: document.getElementById('translated-text')
    };
    
    for (const [key, element] of Object.entries(elements)) {
      if (!element) {
        throw new Error(`Required element not found: ${key}`);
      }
    }
    
    this.inputView = elements.inputView!;
    this.resultsView = elements.resultsView!;
    this.inputText = elements.inputText;
    this.translateBtn = elements.translateBtn;
    this.startOverBtn = elements.startOverBtn;
    this.originalTextDiv = elements.originalTextDiv!;
    this.translatedTextDiv = elements.translatedTextDiv!;
    
    this.languageRadios = document.querySelectorAll('input[name="language"]');
    if (this.languageRadios.length === 0) {
      throw new Error('Language radio buttons not found');
    }
  }
  
  private attachEventListeners(): void {
    this.startOverBtn.addEventListener('click', () => this.resetApp());
    
    this.inputText.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && event.ctrlKey) {
        this.translateBtn.click();
      }
    });
  }
  
  getInputText(): string {
    return this.inputText.value.trim();
  }
  
  getSelectedLanguage(): Language {
    const checked = document.querySelector('input[name="language"]:checked') as HTMLInputElement;
    return (checked?.value as Language) || 'french';
  }
  
  showInputView(): void {
    this.inputView.style.display = 'flex';
    this.resultsView.style.display = 'none';
  }
  
  showResultsView(): void {
    this.inputView.style.display = 'none';
    this.resultsView.style.display = 'flex';
  }
  
  showTranslating(): void {
    this.translateBtn.textContent = 'Translating...';
    this.translateBtn.disabled = true;
  }
  
  hideTranslating(): void {
    this.translateBtn.textContent = 'Translate';
    this.translateBtn.disabled = false;
  }
  
  displayResults(response: TranslationResponse): void {
    this.originalTextDiv.textContent = response.originalText;
    this.translatedTextDiv.textContent = response.translatedText;
    this.showResultsView();
  }
  
  displayError(message: string): void {
    this.translatedTextDiv.textContent = message;
    this.showResultsView();
  }
  
  showAlert(message: string): void {
    alert(message);
  }
  
  private resetApp(): void {
    this.inputText.value = '';
    this.originalTextDiv.textContent = '';
    this.translatedTextDiv.textContent = '';
    
    const frenchRadio = document.querySelector('input[name="language"][value="french"]') as HTMLInputElement;
    if (frenchRadio) {
      frenchRadio.checked = true;
    }
    
    this.showInputView();
    this.inputText.focus();
  }
  
  onTranslateClick(handler: () => void): void {
    this.translateBtn.addEventListener('click', handler);
  }
  
  onLanguageChange(handler: (language: Language) => void): void {
    this.languageRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        handler(radio.value as Language);
      });
    });
  }
}
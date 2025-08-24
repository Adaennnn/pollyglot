export class Config {
  private static instance: Config;
  
  private constructor() {
    this.validateEnvironment();
  }
  
  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
  
  private validateEnvironment(): void {
    const requiredVars = ['VITE_OPENAI_API_KEY'];
    const missing: string[] = [];
    
    requiredVars.forEach(varName => {
      if (!import.meta.env[varName]) {
        missing.push(varName);
      }
    });
    
    if (missing.length > 0) {
      console.error(`Missing required environment variables: ${missing.join(', ')}`);
      console.error('Please create a .env file based on .env.example');
    }
  }
  
  get openaiApiKey(): string {
    return import.meta.env.VITE_OPENAI_API_KEY || '';
  }
  
  get openaiApiUrl(): string {
    return import.meta.env.VITE_OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions';
  }
  
  get isDevelopment(): boolean {
    return import.meta.env.DEV;
  }
  
  get isProduction(): boolean {
    return import.meta.env.PROD;
  }
}
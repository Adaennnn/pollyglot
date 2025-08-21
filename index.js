document.addEventListener('DOMContentLoaded', function() {
    // API Configuration
    const OPENAI_API_KEY = 'you_api_key_here'
    const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
    
    // DOM element references
    const inputView = document.getElementById('input-view');
    const resultsView = document.getElementById('results-view');
    const inputText = document.getElementById('input-text');
    const translateBtn = document.getElementById('translate-btn');
    const startOverBtn = document.getElementById('start-over-btn');
    const originalTextDiv = document.getElementById('original-text');
    const translatedTextDiv = document.getElementById('translated-text');
    const languageRadios = document.querySelectorAll('input[name="language"]');

    // State management
    let selectedLanguage = 'french';

    // Language mapping for better prompts
    const languageMap = {
        'french': 'French',
        'spanish': 'Spanish',
        'japanese': 'Japanese'
    };

    // View switching functions
    function showInputView() {
        inputView.style.display = 'flex';
        resultsView.style.display = 'none';
    }

    function showResultsView() {
        inputView.style.display = 'none';
        resultsView.style.display = 'flex';
    }

    // Translation API function
    async function translateText(text, targetLanguage) {
        const response = await fetch(OPENAI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    {
                        role: 'system',
                        content: `You are a professional translator. Translate the following text to ${languageMap[targetLanguage]}. Provide only the translation without any explanations or additional text.`
                    },
                    {
                        role: 'user',
                        content: text
                    }
                ],
                temperature: 0.3,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    }

    // Language selection handler
    languageRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            selectedLanguage = this.value;
            console.log('Selected language:', selectedLanguage);
        });
    });

    // Translation button handler
    translateBtn.addEventListener('click', async function() {
        const textToTranslate = inputText.value.trim();
        
        // Validate input
        if (!textToTranslate) {
            alert('Please enter some text to translate');
            return;
        }

        // Display original text in results view
        originalTextDiv.textContent = textToTranslate;
        
        // Update button state during translation
        translateBtn.textContent = 'Translating...';
        translateBtn.disabled = true;

        try {
            // Call OpenAI API for translation
            const translatedText = await translateText(textToTranslate, selectedLanguage);
            translatedTextDiv.textContent = translatedText;
            
            // Reset button and show results
            translateBtn.textContent = 'Translate';
            translateBtn.disabled = false;
            showResultsView();
            
        } catch (error) {
            console.error('Translation error:', error);
            translatedTextDiv.textContent = 'Translation failed. Please check your API key and try again.';
            translateBtn.textContent = 'Translate';
            translateBtn.disabled = false;
            
            // Show specific error if it's an authentication issue
            if (error.message.includes('401')) {
                alert('Invalid API key. Please check your OpenAI API key.');
            }
        }
    });

    // Start over button handler - resets the app to initial state
    startOverBtn.addEventListener('click', function() {
        // Clear all text fields
        inputText.value = '';
        originalTextDiv.textContent = '';
        translatedTextDiv.textContent = '';
        
        // Reset language selection to default
        document.querySelector('input[name="language"][value="french"]').checked = true;
        selectedLanguage = 'french';
        
        // Return to input view and focus input field
        showInputView();
        inputText.focus();
    });

    // Keyboard shortcut: Ctrl+Enter to translate
    inputText.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.ctrlKey) {
            translateBtn.click();
        }
    });
});

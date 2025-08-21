document.addEventListener('DOMContentLoaded', function() {
    const inputView = document.getElementById('input-view');
    const resultsView = document.getElementById('results-view');
    const inputText = document.getElementById('input-text');
    const translateBtn = document.getElementById('translate-btn');
    const startOverBtn = document.getElementById('start-over-btn');
    const originalTextDiv = document.getElementById('original-text');
    const translatedTextDiv = document.getElementById('translated-text');
    const languageRadios = document.querySelectorAll('input[name="language"]');

    let selectedLanguage = 'french';

    function showInputView() {
        inputView.style.display = 'flex';
        resultsView.style.display = 'none';
    }

    function showResultsView() {
        inputView.style.display = 'none';
        resultsView.style.display = 'flex';
    }

    languageRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            selectedLanguage = this.value;
            console.log('Selected language:', selectedLanguage);
        });
    });

    translateBtn.addEventListener('click', async function() {
        const textToTranslate = inputText.value.trim();
        
        if (!textToTranslate) {
            alert('Please enter some text to translate');
            return;
        }

        originalTextDiv.textContent = textToTranslate;
        
        translateBtn.textContent = 'Translating...';
        translateBtn.disabled = true;

        try {
            translatedTextDiv.textContent = `[Translation to ${selectedLanguage} will appear here]`;
            
            setTimeout(() => {
                translateBtn.textContent = 'Translate';
                translateBtn.disabled = false;
                showResultsView();
            }, 1000);
            
        } catch (error) {
            console.error('Translation error:', error);
            translatedTextDiv.textContent = 'Translation failed. Please try again.';
            translateBtn.textContent = 'Translate';
            translateBtn.disabled = false;
        }
    });

    startOverBtn.addEventListener('click', function() {
        inputText.value = '';
        originalTextDiv.textContent = '';
        translatedTextDiv.textContent = '';
        
        document.querySelector('input[name="language"][value="french"]').checked = true;
        selectedLanguage = 'french';
        
        showInputView();
        inputText.focus();
    });

    inputText.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.ctrlKey) {
            translateBtn.click();
        }
    });
});
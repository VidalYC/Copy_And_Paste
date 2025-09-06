export class UIService {
  constructor() {
    this.elements = {
      resultsDisplay: document.getElementById('resultsDisplay'),
      noResults: document.getElementById('noResults'),
      clearBtn: document.getElementById('clearBtn'),
      statusIndicator: document.getElementById('statusIndicator')
    };
    
    this.buttonConfigs = {
      sales: { icon: '💼', text: 'Generar Reporte' },
      inventory: { icon: '📦', text: 'Generar Reporte' },
      customers: { icon: '👥', text: 'Generar Reporte' },
      financial: { icon: '💰', text: 'Generar Reporte' }
    };
  }

  setLoadingState(reportType, loading) {
    const button = document.getElementById(`${reportType}Btn`);
    if (!button) return;

    if (loading) {
      button.disabled = true;
      button.classList.add('loading');
      button.innerHTML = '<div class="loading-spinner"></div>';
      this.updateStatusIndicator('loading');
    } else {
      button.disabled = false;
      button.classList.remove('loading');
      
      const config = this.buttonConfigs[reportType];
      if (config) {
        button.innerHTML = `<span class="report-icon">${config.icon}</span><span>${config.text}</span>`;
      }
    }
  }

  displayReport(content) {
    this.elements.resultsDisplay.textContent = content;
    this.elements.resultsDisplay.style.display = 'block';
    this.elements.noResults.style.display = 'none';
    this.elements.clearBtn.style.display = 'block';
    this.updateStatusIndicator('active');
  }

  showError(message) {
    this.elements.resultsDisplay.innerHTML = `
      <div class="error-message">
        <strong>❌ Error</strong><br>
        ${message}<br><br>
        Verifica que el servidor esté ejecutándose.
      </div>
    `;
    this.elements.resultsDisplay.style.display = 'block';
    this.elements.noResults.style.display = 'none';
    this.elements.clearBtn.style.display = 'block';
    this.updateStatusIndicator('error');
  }

  clearResults() {
    this.elements.resultsDisplay.style.display = 'none';
    this.elements.noResults.style.display = 'block';
    this.elements.clearBtn.style.display = 'none';
    this.updateStatusIndicator('inactive');
  }

  updateStatusIndicator(status) {
    const indicator = this.elements.statusIndicator;
    indicator.className = `status-indicator status-${status}`;
  }
}

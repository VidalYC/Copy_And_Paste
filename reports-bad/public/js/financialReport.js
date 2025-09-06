class FinancialReportManager {
  constructor() {
    this.apiUrl = 'http://localhost:3001/api';
    this.isLoading = false;
  }

  async connectToAPI() {
    console.log('🔌 Conectando a API financiera...');
    try {
      const response = await fetch(`${this.apiUrl}/health`);
      if (!response.ok) {
        throw new Error('API no disponible');
      }
      console.log('✅ Conexión establecida con API financiera');
      return true;
    } catch (error) {
      console.error('❌ Error conectando API financiera:', error);
      this.showError('Error de conexión con el servidor');
      return false;
    }
  }

  setLoading(loading) {
    this.isLoading = loading;
    const button = document.getElementById('financialBtn');
    
    if (loading) {
      button.disabled = true;
      button.innerHTML = '<div class="loading-spinner"></div>';
      button.classList.add('loading');
    } else {
      button.disabled = false;
      button.innerHTML = '<span class="report-icon">💰</span><span>Generar Reporte</span>';
      button.classList.remove('loading');
    }
  }

  showError(message) {
    const container = document.getElementById('resultsDisplay');
    container.innerHTML = `
      <div class="error-message">
        <strong>❌ Error</strong><br>
        ${message}<br><br>
        Verifica que el servidor esté ejecutándose.
      </div>
    `;
    container.style.display = 'block';
    document.getElementById('noResults').style.display = 'none';
    document.getElementById('clearBtn').style.display = 'block';
  }

  async generateReport() {
    if (!await this.connectToAPI()) return;
    this.setLoading(true);
    
    try {
      const response = await fetch(`${this.apiUrl}/report/financial`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const formatted = this.formatFinancialData(data);
      this.displayResult(formatted);
      
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.setLoading(false);
    }
  }

  displayResult(content) {
    const container = document.getElementById('resultsDisplay');
    const noResults = document.getElementById('noResults');
    const clearBtn = document.getElementById('clearBtn');
    const statusIndicator = document.getElementById('statusIndicator');
    
    container.textContent = content;
    container.style.display = 'block';
    noResults.style.display = 'none';
    clearBtn.style.display = 'block';
    statusIndicator.className = 'status-indicator status-active';
  }

  formatFinancialData(data) {
    return `=== REPORTE FINANCIERO ===\nIngresos: $${data.revenue?.total?.toLocaleString() || '0'}`;
  }
}
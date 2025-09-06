class SalesReportManager {
  constructor() {
    this.apiUrl = 'http://localhost:3001/api';
    this.isLoading = false;
  }

  // DUPLICADO: Misma lógica de conexión en todos los archivos
  async connectToAPI() {
    console.log('🔌 Conectando a API de ventas...');
    try {
      const response = await fetch(`${this.apiUrl}/health`);
      if (!response.ok) {
        throw new Error('API no disponible');
      }
      console.log('✅ Conexión establecida con API de ventas');
      return true;
    } catch (error) {
      console.error('❌ Error conectando API ventas:', error);
      this.showError('Error de conexión con el servidor');
      return false;
    }
  }

  // DUPLICADO: Misma lógica de loading en todos los archivos
  setLoading(loading) {
    this.isLoading = loading;
    const button = document.getElementById('salesBtn');
    
    if (loading) {
      button.disabled = true;
      button.innerHTML = '<div class="loading-spinner"></div>';
      button.classList.add('loading');
    } else {
      button.disabled = false;
      button.innerHTML = '<span class="report-icon">💼</span><span>Generar Reporte</span>';
      button.classList.remove('loading');
    }
  }

  // DUPLICADO: Misma lógica de error en todos los archivos
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

  // DUPLICADO: Misma estructura de generación en todos los archivos
  async generateReport() {
    if (!await this.connectToAPI()) return;
    this.setLoading(true);
    
    try {
      console.log('📊 Generando reporte de ventas...');
      const response = await fetch(`${this.apiUrl}/report/sales`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const formatted = this.formatSalesData(data);
      this.displayResult(formatted);
      
    } catch (error) {
      console.error('❌ Error en reporte ventas:', error);
      this.showError(error.message);
    } finally {
      this.setLoading(false);
    }
  }

  // DUPLICADO: Misma lógica de display en todos los archivos
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

  formatSalesData(data) {
    // Solo esta función es específica
    let result = `╔══════════════════════════════════════════════════════════════════════════════════╗\n`;
    result += `║                                   REPORTE DE VENTAS                                ║\n`;
    result += `╚══════════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    result += `📅 Generado: ${data.generatedAt}\n`;
    result += `📊 Período: ${data.period || 'Q1 2025'}\n\n`;
    
    if (data.summary) {
      result += `💰 RESUMEN DE VENTAS\n`;
      result += `${'─'.repeat(50)}\n`;
      result += `Total de Ventas:        $${data.summary.totalSales?.toLocaleString() || '0'}\n`;
      result += `Total de Órdenes:       ${data.summary.totalOrders?.toLocaleString() || '0'}\n`;
      result += `Valor Promedio:         $${data.summary.averageOrderValue || '0'}\n`;
      result += `Crecimiento:            ${data.summary.growthRate || '0%'}\n\n`;
    }
    
    return result;
  }
}
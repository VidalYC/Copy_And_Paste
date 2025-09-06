class InventoryReportManager {
  constructor() {
    this.apiUrl = 'http://localhost:3001/api';
    this.isLoading = false;
  }

  // DUPLICADO EXACTO: Misma lógica de conexión
  async connectToAPI() {
    console.log('🔌 Conectando a API de inventario...');
    try {
      const response = await fetch(`${this.apiUrl}/health`);
      if (!response.ok) {
        throw new Error('API no disponible');
      }
      console.log('✅ Conexión establecida con API de inventario');
      return true;
    } catch (error) {
      console.error('❌ Error conectando API inventario:', error);
      this.showError('Error de conexión con el servidor');
      return false;
    }
  }

  // DUPLICADO EXACTO: Misma lógica de loading
  setLoading(loading) {
    this.isLoading = loading;
    const button = document.getElementById('inventoryBtn');
    
    if (loading) {
      button.disabled = true;
      button.innerHTML = '<div class="loading-spinner"></div>';
      button.classList.add('loading');
    } else {
      button.disabled = false;
      button.innerHTML = '<span class="report-icon">📦</span><span>Generar Reporte</span>';
      button.classList.remove('loading');
    }
  }

  // DUPLICADO EXACTO: Misma lógica de error
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

  // DUPLICADO EXACTO: Misma estructura de generación
  async generateReport() {
    if (!await this.connectToAPI()) return;
    this.setLoading(true);
    
    try {
      console.log('📊 Generando reporte de inventario...');
      const response = await fetch(`${this.apiUrl}/report/inventory`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const data = await response.json();
      const formatted = this.formatInventoryData(data);
      this.displayResult(formatted);
      
    } catch (error) {
      console.error('❌ Error en reporte inventario:', error);
      this.showError(error.message);
    } finally {
      this.setLoading(false);
    }
  }

  // DUPLICADO EXACTO: Misma lógica de display
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

  formatInventoryData(data) {
    // Solo cambia la función específica
    let result = `╔══════════════════════════════════════════════════════════════════════════════════╗\n`;
    result += `║                                 REPORTE DE INVENTARIO                             ║\n`;
    result += `╚══════════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    result += `📅 Generado: ${data.generatedAt}\n\n`;
    result += `📦 RESUMEN GENERAL\n`;
    result += `Total Productos: ${data.totalProducts?.toLocaleString() || '0'}\n`;
    
    return result;
  }
}
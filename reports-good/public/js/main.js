import { ApiService } from './services/ApiService.js';
import { UIService } from './services/UIService.js';
import { EventBus } from './core/EventBus.js';
import { ReportFactory } from './core/ReportFactory.js';
import { CONFIG } from './config/constants.js';

class ReportsApplication {
  constructor() {
    this.apiService = new ApiService(CONFIG.API_BASE_URL);
    this.uiService = new UIService();
    this.eventBus = new EventBus();
    
    this.config = {
      apiService: this.apiService,
      uiService: this.uiService,
      eventBus: this.eventBus
    };
    
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Event listeners globales
    this.eventBus.on('report:started', this.onReportStarted.bind(this));
    this.eventBus.on('report:completed', this.onReportCompleted.bind(this));
    this.eventBus.on('report:error', this.onReportError.bind(this));
    
    // UI event listeners
    document.addEventListener('click', this.handleGlobalClick.bind(this));
  }

  handleGlobalClick(event) {
    const target = event.target;
    
    // STRATEGY PATTERN para manejar clicks
    if (target.id && target.id.endsWith('Btn')) {
      const reportType = target.id.replace('Btn', '');
      if (ReportFactory.getSupportedTypes().includes(reportType)) {
        this.generateReport(reportType);
      }
    }
    
    if (target.id === 'clearBtn') {
      this.uiService.clearResults();
    }
  }

  async generateReport(reportType) {
    try {
      const report = ReportFactory.createReport(reportType, this.config);
      await report.generateReport();
    } catch (error) {
      console.error(`Error creando reporte ${reportType}:`, error);
      this.uiService.showError(error.message);
    }
  }

  onReportStarted(data) {
    console.log(`📊 Iniciando reporte: ${data.type}`);
  }

  onReportCompleted(data) {
    console.log(`✅ Reporte completado: ${data.type}`);
  }

  onReportError(data) {
    console.error(`❌ Error en reporte ${data.type}:`, data.error);
  }
}

// Funciones globales para compatibilidad con HTML onclick
window.generateSalesReport = () => window.reportsApp.generateReport('sales');
window.generateInventoryReport = () => window.reportsApp.generateReport('inventory');
window.generateCustomerReport = () => window.reportsApp.generateReport('customers');
window.generateFinancialReport = () => window.reportsApp.generateReport('financial');
window.clearResults = () => window.reportsApp.uiService.clearResults();

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  window.reportsApp = new ReportsApplication();
  console.log('✅ Aplicación refactorizada inicializada con patrones de diseño');
});
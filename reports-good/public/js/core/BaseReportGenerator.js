export class BaseReportGenerator {
  constructor(reportType, config) {
    this.reportType = reportType;
    this.config = config;
    this.apiService = config.apiService;
    this.uiService = config.uiService;
    this.eventBus = config.eventBus;
  }

  // TEMPLATE METHOD - Define algoritmo general (NO DUPLICADO)
  async generateReport() {
    try {
      // Paso 1: Validar precondiciones (CENTRALIZADO)
      if (!await this.validatePreconditions()) return;
      
      // Paso 2: Notificar inicio (CENTRALIZADO)
      this.notifyReportStart();
      
      // Paso 3: Obtener datos (ESPECÍFICO - HOOK METHOD)
      const rawData = await this.fetchReportData();
      
      // Paso 4: Procesar datos (ESPECÍFICO - HOOK METHOD)
      const processedData = await this.processData(rawData);
      
      // Paso 5: Formatear resultado (PUEDE SER SOBRESCRITO)
      const formattedResult = this.formatResult(processedData);
      
      // Paso 6: Mostrar resultado (CENTRALIZADO)
      this.displayResult(formattedResult);
      
      // Paso 7: Notificar finalización (CENTRALIZADO)
      this.notifyReportComplete(formattedResult);
      
    } catch (error) {
      this.handleError(error);
    } finally {
      this.cleanup();
    }
  }

  // Métodos comunes CENTRALIZADOS (elimina duplicación)
  async validatePreconditions() {
    const isAPIReady = await this.apiService.checkHealth();
    if (!isAPIReady) {
      this.uiService.showError('Servidor no disponible');
      return false;
    }
    return true;
  }

  notifyReportStart() {
    this.uiService.setLoadingState(this.reportType, true);
    this.eventBus.emit('report:started', { type: this.reportType });
  }

  displayResult(content) {
    this.uiService.displayReport(content);
    this.uiService.setLoadingState(this.reportType, false);
  }

  notifyReportComplete(result) {
    this.eventBus.emit('report:completed', { 
      type: this.reportType, 
      result: result 
    });
  }

  handleError(error) {
    console.error(`Error en reporte ${this.reportType}:`, error);
    this.uiService.showError(`Error generando reporte: ${error.message}`);
    this.eventBus.emit('report:error', { 
      type: this.reportType, 
      error: error.message 
    });
  }

  cleanup() {
    this.uiService.setLoadingState(this.reportType, false);
  }

  // HOOK METHODS - Deben ser implementados por subclases
  async fetchReportData() {
    throw new Error('fetchReportData debe ser implementado por la subclase');
  }

  async processData(rawData) {
    throw new Error('processData debe ser implementado por la subclase');
  }

  formatResult(processedData) {
    return `=== REPORTE ${this.reportType.toUpperCase()} ===\n${processedData}`;
  }
}
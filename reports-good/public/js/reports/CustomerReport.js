import { BaseReportGenerator } from '../core/BaseReportGenerator.js';

export class CustomerReport extends BaseReportGenerator {
  
  async fetchReportData() {
    return await this.apiService.fetchReport('customers');
  }

  async processData(rawData) {
    return {
      totalCustomers: rawData.totalCustomers,
      newCustomers: rawData.newCustomers,
      activeCustomers: rawData.activeCustomers,
      segments: rawData.customerSegments,
      topCustomers: rawData.topCustomers,
      satisfaction: rawData.satisfaction,
      recommendations: rawData.recommendations
    };
  }

  formatResult(processedData) {
    let result = `╔══════════════════════════════════════════════════════════════════════════════════╗\n`;
    result += `║                                 REPORTE DE CLIENTES                              ║\n`;
    result += `╚══════════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    result += `👥 Total Clientes: ${processedData.totalCustomers.toLocaleString()}\n`;
    result += `🆕 Nuevos: ${processedData.newCustomers}\n`;
    result += `✅ Activos: ${processedData.activeCustomers}\n\n`;
    
    result += `🎯 SEGMENTACIÓN:\n`;
    processedData.segments.forEach(seg => {
      result += `• ${seg.segment}: ${seg.count} (${seg.retention} retención)\n`;
    });
    
    result += `\n⭐ SATISFACCIÓN: ${processedData.satisfaction.score}/5.0\n`;
    
    result += `\n💡 RECOMENDACIONES:\n`;
    processedData.recommendations.forEach((rec, i) => {
      result += `${i + 1}. ${rec}\n`;
    });
    
    return result;
  }
}
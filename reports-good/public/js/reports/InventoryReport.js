import { BaseReportGenerator } from '../core/BaseReportGenerator.js';

export class InventoryReport extends BaseReportGenerator {
  
  async fetchReportData() {
    return await this.apiService.fetchReport('inventory');
  }

  async processData(rawData) {
    return {
      totalProducts: rawData.totalProducts,
      totalValue: rawData.totalValue,
      lowStockAlerts: rawData.lowStockAlerts,
      criticalItems: rawData.criticalItems,
      categories: rawData.categories,
      recommendations: rawData.recommendations
    };
  }

  formatResult(processedData) {
    let result = `╔══════════════════════════════════════════════════════════════════════════════════╗\n`;
    result += `║                                 REPORTE DE INVENTARIO                             ║\n`;
    result += `╚══════════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    result += `📦 Total Productos: ${processedData.totalProducts.toLocaleString()}\n`;
    result += `💰 Valor Total: $${processedData.totalValue.toLocaleString()}\n`;
    result += `⚠️ Alertas Stock Bajo: ${processedData.lowStockAlerts}\n\n`;
    
    result += `🚨 ITEMS CRÍTICOS:\n`;
    processedData.criticalItems.forEach(item => {
      result += `• ${item.item}: ${item.currentStock}/${item.minStock}\n`;
    });
    
    result += `\n💡 RECOMENDACIONES:\n`;
    processedData.recommendations.forEach((rec, i) => {
      result += `${i + 1}. ${rec}\n`;
    });
    
    return result;
  }
}
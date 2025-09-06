import { BaseReportGenerator } from '../core/BaseReportGenerator.js';

export class SalesReport extends BaseReportGenerator {
  
  async fetchReportData() {
    return await this.apiService.fetchReport('sales');
  }

  async processData(rawData) {
    const summary = rawData.summary;
    const details = rawData.details;
    
    return {
      totalSales: summary.totalSales,
      totalOrders: summary.totalOrders,
      avgOrder: summary.averageOrderValue,
      growth: summary.growthRate,
      topProducts: details.slice(0, 3),
      recommendations: rawData.recommendations
    };
  }

  formatResult(processedData) {
    let result = `╔══════════════════════════════════════════════════════════════════════════════════╗\n`;
    result += `║                                   REPORTE DE VENTAS                                ║\n`;
    result += `╚══════════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    result += `💰 RESUMEN DE VENTAS\n`;
    result += `Total Ventas: $${processedData.totalSales.toLocaleString()}\n`;
    result += `Total Órdenes: ${processedData.totalOrders}\n`;
    result += `Promedio: $${processedData.avgOrder}\n`;
    result += `Crecimiento: ${processedData.growth}\n\n`;
    
    result += `🏆 TOP PRODUCTOS:\n`;
    processedData.topProducts.forEach((product, i) => {
      result += `${i + 1}. ${product.product} - $${product.revenue.toLocaleString()}\n`;
    });
    
    result += `\n💡 RECOMENDACIONES:\n`;
    processedData.recommendations.forEach((rec, i) => {
      result += `${i + 1}. ${rec}\n`;
    });
    
    return result;
  }
}
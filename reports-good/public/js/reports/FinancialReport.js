import { BaseReportGenerator } from '../core/BaseReportGenerator.js';

export class FinancialReport extends BaseReportGenerator {
  
  async fetchReportData() {
    return await this.apiService.fetchReport('financial');
  }

  async processData(rawData) {
    return {
      period: rawData.period,
      revenue: rawData.revenue,
      expenses: rawData.expenses,
      profit: rawData.profit,
      cashFlow: rawData.cashFlow,
      kpis: rawData.kpis,
      recommendations: rawData.recommendations
    };
  }

  formatResult(processedData) {
    let result = `╔══════════════════════════════════════════════════════════════════════════════════╗\n`;
    result += `║                                REPORTE FINANCIERO                               ║\n`;
    result += `╚══════════════════════════════════════════════════════════════════════════════════╝\n\n`;
    
    result += `📅 Período: ${processedData.period}\n\n`;
    result += `💰 Ingresos: $${processedData.revenue.total.toLocaleString()}\n`;
    result += `💸 Gastos: $${processedData.expenses.total.toLocaleString()}\n`;
    result += `📊 Ganancia Neta: $${processedData.profit.net.toLocaleString()}\n`;
    result += `💵 Balance: $${processedData.cashFlow.balance.toLocaleString()}\n\n`;
    
    result += `📈 KPIs CLAVE:\n`;
    processedData.kpis.forEach(kpi => {
      const trend = kpi.trend === 'up' ? '↑' : kpi.trend === 'down' ? '↓' : '→';
      result += `• ${kpi.metric}: ${kpi.value} ${trend}\n`;
    });
    
    result += `\n💡 RECOMENDACIONES:\n`;
    processedData.recommendations.forEach((rec, i) => {
      result += `${i + 1}. ${rec}\n`;
    });
    
    return result;
  }
}
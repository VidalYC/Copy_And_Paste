import { SalesReport } from '../reports/SalesReport.js';
import { InventoryReport } from '../reports/InventoryReport.js';
import { CustomerReport } from '../reports/CustomerReport.js';
import { FinancialReport } from '../reports/FinancialReport.js';

export class ReportFactory {
  static reportTypes = {
    sales: SalesReport,
    inventory: InventoryReport,
    customers: CustomerReport,
    financial: FinancialReport
  };

  static createReport(reportType, config) {
    const ReportClass = this.reportTypes[reportType];
    
    if (!ReportClass) {
      throw new Error(`Tipo de reporte no soportado: ${reportType}`);
    }
    
    return new ReportClass(reportType, config);
  }

  static getSupportedTypes() {
    return Object.keys(this.reportTypes);
  }

  static registerReportType(type, reportClass) {
    this.reportTypes[type] = reportClass;
  }
}
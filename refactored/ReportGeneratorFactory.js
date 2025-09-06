const SalesReportGenerator = require("./SalesReportGenerator");
const InventoryReportGenerator = require("./InventoryReportGenerator");
const CustomerReportGenerator = require("./CustomerReportGenerator");
const FinancialReportGenerator = require("./FinancialReportGenerator");

class ReportGeneratorFactory {
  static createGenerator(type) {
    switch (type) {
      case "sales": return new SalesReportGenerator();
      case "inventory": return new InventoryReportGenerator();
      case "customers": return new CustomerReportGenerator();
      case "financial": return new FinancialReportGenerator();
      default: throw new Error(`Tipo no soportado: ${type}`);
    }
  }
}

module.exports = ReportGeneratorFactory;

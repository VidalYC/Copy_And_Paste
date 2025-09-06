const ReportGenerator = require("./ReportGenerator");
const mockDatabase = require("./mockDatabase");

class SalesReportGenerator extends ReportGenerator {
  async fetchData() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return mockDatabase.sales.filter(sale => sale.date >= thirtyDaysAgo);
  }

  processData(salesData) {
    const total = salesData.reduce((sum, s) => sum + s.amount, 0);
    return `Total de ventas: $${total}\nNúmero de transacciones: ${salesData.length}`;
  }

  getReportTitle() {
    return "=== REPORTE DE VENTAS ===";
  }
}

module.exports = SalesReportGenerator;

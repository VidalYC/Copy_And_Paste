const ReportGenerator = require("./ReportGenerator");
const mockDatabase = require("./mockDatabase");

class FinancialReportGenerator extends ReportGenerator {
  async fetchData() {
    return { sales: mockDatabase.sales, inventory: mockDatabase.inventory };
  }

  processData(data) {
    const totalRevenue = data.sales.reduce((sum, s) => sum + s.amount, 0);
    const inventoryValue = data.inventory.reduce((sum, i) => sum + i.stock * i.price, 0);
    return `Ingresos totales: $${totalRevenue}\nValor de inventario: $${inventoryValue}`;
  }

  getReportTitle() {
    return "=== REPORTE FINANCIERO ===";
  }
}

module.exports = FinancialReportGenerator;

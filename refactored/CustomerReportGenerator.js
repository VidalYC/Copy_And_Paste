const ReportGenerator = require("./ReportGenerator");
const mockDatabase = require("./mockDatabase");

class CustomerReportGenerator extends ReportGenerator {
  async fetchData() {
    return mockDatabase.customers;
  }

  processData(data) {
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    const inactive = data.filter(c => c.lastPurchase < ninetyDaysAgo);
    return `Clientes inactivos: ${inactive.length}\nClientes activos: ${data.length - inactive.length}`;
  }

  getReportTitle() {
    return "=== REPORTE DE CLIENTES ===";
  }
}

module.exports = CustomerReportGenerator;

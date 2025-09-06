const ReportGenerator = require("./ReportGenerator");
const mockDatabase = require("./mockDatabase");

class InventoryReportGenerator extends ReportGenerator {
  async fetchData() {
    return mockDatabase.inventory.filter(item => item.stock < 10);
  }

  processData(data) {
    return `Items con stock bajo: ${data.length}`;
  }

  getReportTitle() {
    return "=== REPORTE DE INVENTARIO ===";
  }
}

module.exports = InventoryReportGenerator;

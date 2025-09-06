const mockDatabase = require("./mockDatabase");

class ProblematicReportProcessor {
  generateSalesReport() {
    console.log("Conectando a base de datos...");
    let connection = null;
    try {
      connection = { connected: true, config: "localhost:3306/company" };
      if (!connection.connected) throw new Error("No se pudo conectar");

      const salesData = mockDatabase.sales;
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentSales = salesData.filter(sale => sale.date >= thirtyDaysAgo);
      let totalSales = recentSales.reduce((sum, sale) => sum + sale.amount, 0);

      console.log("\n=== REPORTE DE VENTAS ===");
      console.log(`Total de ventas: $${totalSales}`);
      console.log(`Número de transacciones: ${recentSales.length}`);
      console.log(`Promedio por venta: $${totalSales / (recentSales.length || 1)}`);
    } catch (error) {
      console.error("Error en base de datos:", error.message);
    } finally {
      if (connection && connection.connected) connection.connected = false;
    }
  }

  generateInventoryReport() {
    console.log("Conectando a base de datos...");
    let connection = null;
    try {
      connection = { connected: true, config: "localhost:3306/company" };
      if (!connection.connected) throw new Error("No se pudo conectar");

      const inventoryData = mockDatabase.inventory;
      const lowStockItems = inventoryData.filter(item => item.stock < 10);

      console.log("\n=== REPORTE DE INVENTARIO ===");
      console.log(`Items con stock bajo: ${lowStockItems.length}`);
    } catch (error) {
      console.error("Error en base de datos:", error.message);
    } finally {
      if (connection && connection.connected) connection.connected = false;
    }
  }
}

module.exports = ProblematicReportProcessor;

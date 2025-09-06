class ReportGenerator {
  async generateReport() {
    let connection = null;
    try {
      connection = await this.establishConnection();
      const data = await this.fetchData(connection);
      const processedData = this.processData(data);
      this.displayReport(this.formatReport(processedData));
    } catch (error) {
      this.handleError(error);
    } finally {
      this.closeConnection(connection);
    }
  }

  async establishConnection() {
    console.log("Conectando a base de datos...");
    return { connected: true, config: "localhost:3306/company" };
  }

  closeConnection(connection) {
    if (connection && connection.connected) {
      connection.connected = false;
      console.log("Conexión cerrada correctamente");
    }
  }

  handleError(error) {
    console.error("Error en base de datos:", error.message);
  }

  displayReport(report) {
    console.log("\n" + report);
  }

  formatReport(processedData) {
    return `${this.getReportTitle()}\n${processedData}`;
  }

  async fetchData() { throw new Error("Implementar en subclase"); }
  processData() { throw new Error("Implementar en subclase"); }
  getReportTitle() { throw new Error("Implementar en subclase"); }
}

module.exports = ReportGenerator;

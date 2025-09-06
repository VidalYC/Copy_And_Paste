const ReportGeneratorFactory = require("./ReportGeneratorFactory");

class ImprovedReportProcessor {
  async generateReport(type) {
    const generator = ReportGeneratorFactory.createGenerator(type);
    await generator.generateReport();
  }
}

module.exports = ImprovedReportProcessor;

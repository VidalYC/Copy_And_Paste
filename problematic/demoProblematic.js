const ProblematicReportProcessor = require("./ProblematicReportProcessor");

function demonstrateProblematicCode() {
  console.log("🚨 DEMOSTRANDO COPY-AND-PASTE PROGRAMMING");
  console.log("==========================================");

  const processor = new ProblematicReportProcessor();
  processor.generateSalesReport();
  processor.generateInventoryReport();

  console.log("\n🔍 PROBLEMAS IDENTIFICADOS:");
  console.log("• Código de conexión duplicado");
  console.log("• Lógica repetida en múltiples métodos");
  console.log("• Viola el principio DRY");
}

demonstrateProblematicCode();

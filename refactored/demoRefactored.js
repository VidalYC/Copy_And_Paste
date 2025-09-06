const ImprovedReportProcessor = require("./ImprovedReportProcessor");

async function demonstrateRefactoredCode() {
  console.log("✅ DEMOSTRANDO CÓDIGO REFACTORIZADO");
  console.log("===================================");

  const processor = new ImprovedReportProcessor();
  await processor.generateReport("sales");
  await processor.generateReport("inventory");
  await processor.generateReport("customers");
  await processor.generateReport("financial");

  console.log("\n🎯 BENEFICIOS:");
  console.log("• Código de conexión centralizado");
  console.log("• Manejo de errores unificado");
  console.log("• Respeta principio DRY");
  console.log("• Fácil extensión para nuevos reportes");
}

demonstrateRefactoredCode().catch(console.error);

let salesManager, inventoryManager, customerManager, financialManager;

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚨 Iniciando versión PROBLEMÁTICA con Copy-And-Paste Programming');
  
  // DUPLICADO: Inicialización manual de cada manager
  salesManager = new SalesReportManager();
  inventoryManager = new InventoryReportManager();
  customerManager = new CustomerReportManager();
  financialManager = new FinancialReportManager();
  
  console.log('🔄 Todos los managers inicializados (código duplicado 4 veces)');
  testServerConnection();
});

// DUPLICADO: Funciones globales repetitivas
function generateSalesReport() {
  salesManager.generateReport();
}

function generateInventoryReport() {
  inventoryManager.generateReport();
}

function generateCustomerReport() {
  customerManager.generateReport();
}

function generateFinancialReport() {
  financialManager.generateReport();
}

// DUPLICADO: Lógica de clear repetida
function clearResults() {
  const container = document.getElementById('resultsDisplay');
  const noResults = document.getElementById('noResults');
  const clearBtn = document.getElementById('clearBtn');
  const statusIndicator = document.getElementById('statusIndicator');
  
  container.style.display = 'none';
  noResults.style.display = 'block';
  clearBtn.style.display = 'none';
  statusIndicator.className = 'status-indicator status-inactive';
}

async function testServerConnection() {
  try {
    const response = await fetch('http://localhost:3001/api/health');
    if (response.ok) {
      console.log('✅ Servidor disponible');
    }
  } catch (error) {
    console.error('❌ Servidor no disponible:', error.message);
  }
}

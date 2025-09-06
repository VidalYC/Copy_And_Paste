// ==================== CÓDIGO PROBLEMÁTICO ====================
// Este código muestra el antipatrón Copy-And-Paste Programming

// Datos simulados de base de datos
const mockDatabase = {
  sales: [
    { id: 1, amount: 1500, date: new Date('2024-01-15'), customer: 'Juan Pérez' },
    { id: 2, amount: 2300, date: new Date('2024-01-20'), customer: 'María García' },
    { id: 3, amount: 890, date: new Date('2024-01-25'), customer: 'Carlos López' },
    { id: 4, amount: 3200, date: new Date('2024-01-28'), customer: 'Ana Rodríguez' }
  ],
  inventory: [
    { id: 1, product: 'Laptop', stock: 5, price: 800 },
    { id: 2, product: 'Mouse', stock: 2, price: 25 },
    { id: 3, product: 'Keyboard', stock: 15, price: 60 },
    { id: 4, product: 'Monitor', stock: 8, price: 300 }
  ],
  customers: [
    { id: 1, name: 'Juan Pérez', lastPurchase: new Date('2023-10-15'), email: 'juan@email.com' },
    { id: 2, name: 'María García', lastPurchase: new Date('2024-01-10'), email: 'maria@email.com' },
    { id: 3, name: 'Carlos López', lastPurchase: new Date('2023-09-20'), email: 'carlos@email.com' },
    { id: 4, name: 'Ana Rodríguez', lastPurchase: new Date('2024-01-05'), email: 'ana@email.com' }
  ]
};

// Clase con Copy-And-Paste Programming
class ProblematicReportProcessor {
  
  // Método para generar reporte de ventas
  generateSalesReport() {
    // CÓDIGO DUPLICADO #1 - Conectar a base de datos
    console.log('Conectando a base de datos...');
    let connection = null;
    
    try {
      // Simular conexión (DUPLICADO)
      connection = { 
        connected: true, 
        config: 'localhost:3306/company',
        user: 'admin',
        password: 'password123'
      };
      
      if (!connection.connected) {
        throw new Error('No se pudo conectar a la base de datos');
      }
      
      console.log('Conexión establecida exitosamente');
      console.log(`Configuración: ${connection.config}`);
      
      // Obtener datos de ventas (lógica específica)
      const salesData = mockDatabase.sales;
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentSales = salesData.filter(sale => sale.date >= thirtyDaysAgo);
      
      // Procesar datos de ventas
      let totalSales = 0;
      let salesCount = 0;
      for (const sale of recentSales) {
        totalSales += sale.amount;
        salesCount++;
      }
      
      // Generar reporte (estructura repetida)
      console.log('\n=== REPORTE DE VENTAS ===');
      console.log(`Total de ventas: $${totalSales}`);
      console.log(`Número de transacciones: ${salesCount}`);
      console.log(`Promedio por venta: $${totalSales / salesCount || 0}`);
      console.log(`Fecha de generación: ${new Date().toLocaleString()}`);
      console.log('============================');
      
    } catch (error) {
      // Manejo de errores DUPLICADO
      console.error('Error en base de datos:', error.message);
      console.error('Código de error: DB_CONNECTION_FAILED');
      console.error('Reintentando conexión...');
    } finally {
      // Cerrar conexión DUPLICADO
      if (connection && connection.connected) {
        connection.connected = false;
        console.log('Cerrando conexión a base de datos...');
        console.log('Conexión cerrada correctamente');
        console.log('Recursos liberados');
      }
    }
  }
  
  // Método para generar reporte de inventario (CÓDIGO DUPLICADO)
  generateInventoryReport() {
    // CÓDIGO DUPLICADO #2 - Misma lógica de conexión
    console.log('Conectando a base de datos...');
    let connection = null;
    
    try {
      // Simular conexión (DUPLICADO EXACTO)
      connection = { 
        connected: true, 
        config: 'localhost:3306/company',
        user: 'admin',
        password: 'password123'
      };
      
      if (!connection.connected) {
        throw new Error('No se pudo conectar a la base de datos');
      }
      
      console.log('Conexión establecida exitosamente');
      console.log(`Configuración: ${connection.config}`);
      
      // Obtener datos de inventario (lógica específica diferente)
      const inventoryData = mockDatabase.inventory;
      const lowStockThreshold = 10;
      
      const lowStockItems = inventoryData.filter(item => item.stock < lowStockThreshold);
      
      // Procesar datos de inventario
      let lowStockCount = 0;
      let totalValue = 0;
      for (const item of lowStockItems) {
        lowStockCount++;
        totalValue += item.stock * item.price;
      }
      
      // Generar reporte (ESTRUCTURA SIMILAR DUPLICADA)
      console.log('\n=== REPORTE DE INVENTARIO ===');
      console.log(`Items con stock bajo: ${lowStockCount}`);
      console.log(`Umbral de stock: ${lowStockThreshold} unidades`);
      console.log(`Valor total en riesgo: $${totalValue}`);
      console.log(`Fecha de generación: ${new Date().toLocaleString()}`);
      console.log('=================================');
      
    } catch (error) {
      // Manejo de errores DUPLICADO EXACTO
      console.error('Error en base de datos:', error.message);
      console.error('Código de error: DB_CONNECTION_FAILED');
      console.error('Reintentando conexión...');
    } finally {
      // Cerrar conexión DUPLICADO EXACTO
      if (connection && connection.connected) {
        connection.connected = false;
        console.log('Cerrando conexión a base de datos...');
        console.log('Conexión cerrada correctamente');
        console.log('Recursos liberados');
      }
    }
  }
  
  // Método para generar reporte de clientes (MÁS DUPLICACIÓN)
  generateCustomerReport() {
    // CÓDIGO DUPLICADO #3 - Tercera vez la misma lógica
    console.log('Conectando a base de datos...');
    let connection = null;
    
    try {
      // Simular conexión (TRIPLICADO)
      connection = { 
        connected: true, 
        config: 'localhost:3306/company',
        user: 'admin',
        password: 'password123'
      };
      
      if (!connection.connected) {
        throw new Error('No se pudo conectar a la base de datos');
      }
      
      console.log('Conexión establecida exitosamente');
      console.log(`Configuración: ${connection.config}`);
      
      // Obtener datos de clientes (lógica específica diferente)
      const customerData = mockDatabase.customers;
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      
      const inactiveCustomers = customerData.filter(customer => 
        customer.lastPurchase < ninetyDaysAgo
      );
      
      // Procesar datos de clientes
      let inactiveCount = 0;
      let activeCount = 0;
      for (const customer of customerData) {
        if (customer.lastPurchase < ninetyDaysAgo) {
          inactiveCount++;
        } else {
          activeCount++;
        }
      }
      
      // Generar reporte (PATRÓN REPETIDO OTRA VEZ)
      console.log('\n=== REPORTE DE CLIENTES ===');
      console.log(`Clientes inactivos: ${inactiveCount}`);
      console.log(`Clientes activos: ${activeCount}`);
      console.log(`Período evaluado: 90 días`);
      console.log(`Tasa de retención: ${(activeCount / customerData.length * 100).toFixed(2)}%`);
      console.log(`Fecha de generación: ${new Date().toLocaleString()}`);
      console.log('===============================');
      
    } catch (error) {
      // Manejo de errores TRIPLICADO
      console.error('Error en base de datos:', error.message);
      console.error('Código de error: DB_CONNECTION_FAILED');
      console.error('Reintentando conexión...');
    } finally {
      // Cerrar conexión TRIPLICADO
      if (connection && connection.connected) {
        connection.connected = false;
        console.log('Cerrando conexión a base de datos...');
        console.log('Conexión cerrada correctamente');
        console.log('Recursos liberados');
      }
    }
  }
  
  // Método adicional que también duplica código
  generateFinancialReport() {
    // CÓDIGO DUPLICADO #4 - Cuarta vez la misma lógica
    console.log('Conectando a base de datos...');
    let connection = null;
    
    try {
      // Simular conexión (CUARTA DUPLICACIÓN)
      connection = { 
        connected: true, 
        config: 'localhost:3306/company',
        user: 'admin',
        password: 'password123'
      };
      
      if (!connection.connected) {
        throw new Error('No se pudo conectar a la base de datos');
      }
      
      console.log('Conexión establecida exitosamente');
      console.log(`Configuración: ${connection.config}`);
      
      // Combinar datos para reporte financiero
      const salesData = mockDatabase.sales;
      const inventoryData = mockDatabase.inventory;
      
      const totalRevenue = salesData.reduce((sum, sale) => sum + sale.amount, 0);
      const totalInventoryValue = inventoryData.reduce((sum, item) => sum + (item.stock * item.price), 0);
      
      // Generar reporte financiero
      console.log('\n=== REPORTE FINANCIERO ===');
      console.log(`Ingresos totales: $${totalRevenue}`);
      console.log(`Valor de inventario: $${totalInventoryValue}`);
      console.log(`Capital total: $${totalRevenue + totalInventoryValue}`);
      console.log(`Fecha de generación: ${new Date().toLocaleString()}`);
      console.log('============================');
      
    } catch (error) {
      // Manejo de errores CUARTA DUPLICACIÓN
      console.error('Error en base de datos:', error.message);
      console.error('Código de error: DB_CONNECTION_FAILED');
      console.error('Reintentando conexión...');
    } finally {
      // Cerrar conexión CUARTA DUPLICACIÓN
      if (connection && connection.connected) {
        connection.connected = false;
        console.log('Cerrando conexión a base de datos...');
        console.log('Conexión cerrada correctamente');
        console.log('Recursos liberados');
      }
    }
  }
}

// Ejemplo de uso que demuestra el problema
function demonstrateProblematicCode() {
  console.log('🚨 DEMOSTRANDO COPY-AND-PASTE PROGRAMMING');
  console.log('==========================================');
  
  const processor = new ProblematicReportProcessor();
  
  console.log('\n--- Ejecutando reportes con código duplicado ---');
  
  processor.generateSalesReport();
  console.log('\n' + '='.repeat(50) + '\n');
  
  processor.generateInventoryReport();
  console.log('\n' + '='.repeat(50) + '\n');
  
  processor.generateCustomerReport();
  console.log('\n' + '='.repeat(50) + '\n');
  
  processor.generateFinancialReport();
  
  console.log('\n🔍 PROBLEMAS IDENTIFICADOS:');
  console.log('• Código de conexión duplicado 4 veces');
  console.log('• Manejo de errores idéntico en cada método');
  console.log('• Estructura try-catch-finally repetida');
  console.log('• Si cambia configuración BD → 4 lugares a modificar');
  console.log('• Si hay bug en conexión → se replica 4 veces');
  console.log('• Viola principio DRY (Don\'t Repeat Yourself)');
  console.log('• Aumenta complejidad ciclomática');
  console.log('• Dificulta mantenimiento y testing');
}

// Ejecutar demostración
demonstrateProblematicCode();
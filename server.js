const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Mock data for different report types
const generateReportData = (type) => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  switch (type) {
    case 'sales':
      return {
        title: 'Reporte de Ventas',
        generatedAt: currentDate,
        period: 'Enero - Marzo 2025',
        summary: {
          totalSales: 145250.00,
          totalOrders: 1250,
          averageOrderValue: 116.20,
          growthRate: '+15.2%'
        },
        details: [
          { product: 'Laptop HP ProBook', quantity: 45, revenue: 67500.00 },
          { product: 'Mouse Logitech MX', quantity: 120, revenue: 7200.00 },
          { product: 'Teclado Mecánico', quantity: 85, revenue: 8500.00 },
          { product: 'Monitor Samsung 24"', quantity: 60, revenue: 18000.00 },
          { product: 'Webcam HD', quantity: 200, revenue: 10000.00 }
        ],
        topSeller: 'Laptop HP ProBook',
        recommendations: [
          'Aumentar stock de laptops por alta demanda',
          'Promocionar accesorios con menor rotación',
          'Implementar descuentos por volumen'
        ]
      };
    
    case 'inventory':
      return {
        title: 'Reporte de Inventario',
        generatedAt: currentDate,
        totalProducts: 1450,
        totalValue: 2850000.00,
        lowStockAlerts: 25,
        categories: [
          { name: 'Laptops', count: 120, value: 1800000.00, status: 'Normal' },
          { name: 'Accesorios', count: 850, value: 425000.00, status: 'Alto Stock' },
          { name: 'Monitores', count: 180, value: 540000.00, status: 'Normal' },
          { name: 'Componentes', count: 300, value: 85000.00, status: 'Stock Bajo' }
        ],
        criticalItems: [
          { item: 'SSD 1TB Samsung', currentStock: 5, minStock: 20 },
          { item: 'RAM DDR4 16GB', currentStock: 8, minStock: 25 },
          { item: 'Tarjeta Gráfica RTX', currentStock: 2, minStock: 10 }
        ],
        recommendations: [
          'Reordenar items con stock crítico',
          'Revisar política de stock mínimo',
          'Evaluar productos con sobrestock'
        ]
      };
    
    case 'customers':
      return {
        title: 'Reporte de Clientes',
        generatedAt: currentDate,
        totalCustomers: 3250,
        newCustomers: 185,
        activeCustomers: 2100,
        customerSegments: [
          { segment: 'Premium', count: 450, avgPurchase: 850.00, retention: '95%' },
          { segment: 'Regular', count: 1200, avgPurchase: 220.00, retention: '78%' },
          { segment: 'Ocasional', count: 1600, avgPurchase: 95.00, retention: '45%' }
        ],
        topCustomers: [
          { name: 'TechCorp Solutions', purchases: 15, totalSpent: 125000.00 },
          { name: 'Innovate Systems', purchases: 12, totalSpent: 89500.00 },
          { name: 'Digital Enterprises', purchases: 18, totalSpent: 76800.00 }
        ],
        satisfaction: {
          score: 4.2,
          totalReviews: 1250,
          distribution: {
            '5 stars': 550,
            '4 stars': 400,
            '3 stars': 200,
            '2 stars': 75,
            '1 star': 25
          }
        },
        recommendations: [
          'Programa de lealtad para clientes regulares',
          'Campaña de reactivación para clientes inactivos',
          'Encuesta de satisfacción trimestral'
        ]
      };
    
    case 'financial':
      return {
        title: 'Reporte Financiero',
        generatedAt: currentDate,
        period: 'Q1 2025',
        revenue: {
          total: 1450000.00,
          growth: '+18.5%',
          breakdown: {
            sales: 1200000.00,
            services: 180000.00,
            subscriptions: 70000.00
          }
        },
        expenses: {
          total: 890000.00,
          breakdown: {
            inventory: 650000.00,
            operations: 150000.00,
            marketing: 60000.00,
            personnel: 30000.00
          }
        },
        profit: {
          gross: 560000.00,
          net: 480000.00,
          margin: '33.1%'
        },
        cashFlow: {
          incoming: 1350000.00,
          outgoing: 920000.00,
          balance: 430000.00
        },
        kpis: [
          { metric: 'ROI', value: '38.5%', trend: 'up' },
          { metric: 'Gross Margin', value: '33.1%', trend: 'up' },
          { metric: 'Operating Ratio', value: '61.4%', trend: 'down' },
          { metric: 'Current Ratio', value: '2.4', trend: 'stable' }
        ],
        recommendations: [
          'Optimizar costos operativos',
          'Diversificar fuentes de ingresos',
          'Aumentar inversión en marketing digital'
        ]
      };
    
    default:
      return {
        title: 'Reporte No Encontrado',
        error: `Tipo de reporte '${type}' no válido`,
        validTypes: ['sales', 'inventory', 'customers', 'financial']
      };
  }
};

// API Routes
app.get('/api/report/:type', (req, res) => {
  const { type } = req.params;
  const reportData = generateReportData(type);
  
  // Simulate processing time
  setTimeout(() => {
    if (reportData.error) {
      return res.status(400).json(reportData);
    }
    res.json(reportData);
  }, 1000 + Math.random() * 2000); // 1-3 seconds delay
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 API de reportes disponible en /api/report/:type`);
  console.log(`📋 Tipos disponibles: sales, inventory, customers, financial`);
});
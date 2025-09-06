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

module.exports = mockDatabase;

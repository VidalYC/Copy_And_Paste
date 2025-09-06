export const CONFIG = {
  API_BASE_URL: 'http://localhost:3001/api',
  
  TIMEOUTS: {
    API_REQUEST: 10000,
    RETRY_DELAY: 1000,
    LOADING_MIN_TIME: 500
  },
  
  REPORT_TYPES: {
    SALES: 'sales',
    INVENTORY: 'inventory',
    CUSTOMERS: 'customers',
    FINANCIAL: 'financial'
  },
  
  STATUS: {
    INACTIVE: 'inactive',
    LOADING: 'loading',
    ACTIVE: 'active',
    ERROR: 'error'
  },
  
  MESSAGES: {
    SERVER_ERROR: 'Error de conexión con el servidor',
    LOADING: 'Generando reporte...',
    SUCCESS: 'Reporte generado exitosamente'
  }
};
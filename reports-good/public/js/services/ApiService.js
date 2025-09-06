export class ApiService {
  constructor(baseUrl) {
    if (ApiService.instance) {
      return ApiService.instance;
    }
    
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json'
    };
    
    ApiService.instance = this;
  }

  async checkHealth() {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  async fetchReport(reportType) {
    const response = await fetch(`${this.baseUrl}/report/${reportType}`, {
      headers: this.headers
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  }
}
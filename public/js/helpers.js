// utils/helpers.js - Funções auxiliares
export const Utils = {
  parseFlex(val) {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const cleaned = val.replace(/[^\d.,-]/g, '').replace(',', '.');
      const num = parseFloat(cleaned);
      return isNaN(num) ? 0 : num;
    }
    return 0;
  },

  formatDecimal(val, decimals = 2) {
    const num = typeof val === 'number' ? val : this.parseFlex(val);
    return num.toFixed(decimals);
  },

  formatCurrency(val) {
    const num = this.parseFlex(val);
    return num.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
};

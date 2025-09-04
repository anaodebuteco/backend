function calcularMediaAluno(a1, a2, a3) {
    // validações de a1 e a2
    if (a1 === undefined || a2 === undefined) {
      throw new Error("Notas a1 ou a2 não informadas");
    }
    if (a1 < 0 || a2 < 0) {
      throw new Error("Notas a1 ou a2 não podem ser negativas");
    }
  
    // se a3 não for informada → cálculo base
    if (a3 === undefined) {
      return a1 * 0.4 + a2 * 0.6;
    }
  
    // validação de a3
    if (a3 < 0) {
      throw new Error("Nota a3 não pode ser negativa");
    }
  
    // regra final: melhor média possível
    const mediaA1A2 = a1 * 0.4 + a2 * 0.6;
    const mediaA1A3 = (a1 + a3) / 2;
    const mediaA2A3 = (a2 + a3) / 2;
  
    return Math.max(mediaA1A2, mediaA1A3, mediaA2A3);
  }
  
  module.exports = { calcularMediaAluno };
  
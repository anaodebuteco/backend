const { calcularMediaAluno } = require('../src/calcularMediaAluno');

describe('Função calcularMediaAluno', () => {
  test('deve estar definida', () => {
    expect(calcularMediaAluno).toBeDefined();
  });

  test('deve lançar erro se a1 ou a2 não forem informadas', () => {
    expect(() => calcularMediaAluno(undefined, 5)).toThrow("Notas a1 ou a2 não informadas");
    expect(() => calcularMediaAluno(7, undefined)).toThrow("Notas a1 ou a2 não informadas");
  });

  test('deve lançar erro se a1 ou a2 forem negativas', () => {
    expect(() => calcularMediaAluno(-1, 6)).toThrow("Notas a1 ou a2 não podem ser negativas");
    expect(() => calcularMediaAluno(5, -2)).toThrow("Notas a1 ou a2 não podem ser negativas");
  });

  test('deve calcular média base quando a3 não é informada', () => {
    const resultado = calcularMediaAluno(6, 8);
    expect(resultado).toBeCloseTo(7.2);
  });

  test('deve calcular média base corretamente quando a3 é undefined explicitamente', () => {
    const resultado = calcularMediaAluno(7, 9, undefined);
    expect(resultado).toBeCloseTo(8.2);
  });

  test('deve lançar erro se a3 for negativa', () => {
    expect(() => calcularMediaAluno(6, 7, -3)).toThrow("Nota a3 não pode ser negativa");
  });
  test('deve considerar a melhor combinação com a3 (a1 e a3)', () => {
    const resultado = calcularMediaAluno(8, 5, 9);
    expect(resultado).toBeCloseTo((8 + 9) / 2);
  });

  test('deve considerar a melhor combinação com a3 (a2 e a3)', () => {
    const resultado = calcularMediaAluno(3, 7, 10);
    expect(resultado).toBeCloseTo((7 + 10) / 2);
  });
});

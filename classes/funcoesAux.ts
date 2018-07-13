export class FuncoesAux {
  public static EqDouble (num1 : number, num2 : number) : boolean {
    return Math.abs(num1 - num2) <= 0.0001 // precisão de comparação pra considerar dois pontos iguais
  }
}

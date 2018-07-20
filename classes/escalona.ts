import { Linha } from './linha'

export class Escalona {
  public l1 : Linha
  public l2 : Linha
  public l3 : Linha

  constructor (l1 : Linha, l2 : Linha, l3 : Linha) {
    this.l1 = l1
    this.l2 = l2
    this.l3 = l3
  }

  public esc () : number[] {
      this.l1 = Linha.divide(this.l1, this.l1.colA)
      this.l2 = Linha.zeraColA(this.l2, this.l1)
      this.l3 = Linha.zeraColA(this.l3, this.l1)
      this.l2 = Linha.divide(this.l2, this.l2.colB)
      this.l1 = Linha.zeraColB(this.l1, this.l2)
      this.l3 = Linha.zeraColB(this.l3, this.l2)
      this.l3 = Linha.divide(this.l3, this.l3.colC)
      this.l1 = Linha.zeraColC(this.l1, this.l3)
      this.l2 = Linha.zeraColC(this.l2, this.l3)
      return [this.l1.colD, this.l2.colD, this.l3.colD]
  }
}

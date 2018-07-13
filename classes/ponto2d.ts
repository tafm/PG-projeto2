import { FuncoesAux } from './funcoesAux'

export class Ponto2d {

  public static projecao (pontoA : Ponto2d, pontoB : Ponto2d) : Ponto2d {
    return Ponto2d.multE(
      pontoB,
      Ponto2d.produtoInterno(pontoA, pontoB) / Math.pow(pontoB.norma(), 2)
    )
  }

  public static soma (pontoA : Ponto2d, pontoB : Ponto2d) : Ponto2d {
    return new Ponto2d(pontoA.x + pontoB.x, pontoA.y + pontoB.y)
  }

  public static subtracao (pontoA : Ponto2d, pontoB : Ponto2d) : Ponto2d {
    return new Ponto2d(pontoA.x - pontoB.x, pontoA.y - pontoB.y)
  }

  public static multE (ponto : Ponto2d, escalar : number) : Ponto2d {
    return new Ponto2d (ponto.x * escalar, ponto.y * escalar)
  }

  public static produtoInterno (pontoA : Ponto2d, pontoB : Ponto2d) : number {
    return pontoA.x * pontoB.x + pontoA.y * pontoB.y
  }

  public static Eq (pontoA : Ponto2d, pontoB : Ponto2d) : boolean {
    return FuncoesAux.EqDouble(pontoA.x, pontoB.x) && FuncoesAux.EqDouble(pontoA.y, pontoB.y)
  }

  public x : number
  public y : number

  constructor (x : number, y : number) {
    this.x = x
    this.y = y
  }

  public norma (): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }

  public normalizado () : Ponto2d {
    return Ponto2d.multE(this, 1 / this.norma())
  }

  public ortogonal (ponto : Ponto2d) : Ponto2d {
    return Ponto2d.subtracao(this, Ponto2d.projecao(this, ponto))
  }
}

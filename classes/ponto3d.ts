import { FuncoesAux } from './funcoesAux'

export class Ponto3d {

  public static soma (pontoA : Ponto3d, pontoB : Ponto3d) : Ponto3d {
    return new Ponto3d(pontoA.x + pontoB.x, pontoA.y + pontoB.y, pontoA.z + pontoB.z)
  }

  public static subtracao (pontoA : Ponto3d, pontoB : Ponto3d) : Ponto3d {
    return new Ponto3d(pontoA.x - pontoB.x, pontoA.y - pontoB.y, pontoA.z - pontoB.z)
  }

  public static multE (ponto : Ponto3d, escalar : number) : Ponto3d {
    return new Ponto3d (ponto.x * escalar, ponto.y * escalar, ponto.z * escalar)
  }

  public static produtoInterno (pontoA : Ponto3d, pontoB : Ponto3d) : number {
    return pontoA.x * pontoB.x + pontoA.y + pontoB.y + pontoA.z * pontoB.z
  }

  public static produtoVetorial (pontoA : Ponto3d, pontoB : Ponto3d) : Ponto3d {
    return new Ponto3d(
      pontoA.y * pontoB.z - pontoA.z * pontoB.y,
      pontoA.z * pontoB.x - pontoA.x * pontoB.z,
      pontoA.x * pontoB.y - pontoA.y * pontoB.x
    )
  }

  public static Eq (pontoA : Ponto3d, pontoB : Ponto3d) : boolean {
    return FuncoesAux.EqDouble(pontoA.x, pontoB.x)
    && FuncoesAux.EqDouble(pontoA.y, pontoB.y)
    && FuncoesAux.EqDouble(pontoA.z, pontoB.z)
  }

  public x : number
  public y : number
  public z : number

  constructor (x : number, y : number, z : number) {
    this.x = x
    this.y = y
    this.z = z
  }

  public norma () : number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2))
  }

  public normalizado () : void {
    let tam : number = this.norma()
    this.x /= tam
    this.y /= tam
    this.z /= tam
  }

  public produtoVetorial (ponto : Ponto3d) : void {
    this.x = this.y * ponto.z - this.z * ponto.y
    this.y = this.z * ponto.x - this.x * ponto.z
    this.z = this.x * ponto.y - this.y * ponto.x
  }
}

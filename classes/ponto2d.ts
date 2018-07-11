export class ponto2d {
  x : number
  y : number
  constructor (x : number, y : number) {
    this.x = x
    this.y = y
  }
  public soma (ponto : ponto2d) : void {
    this.x += ponto.x
    this.y += ponto.y
  }
  public subtrai (ponto : ponto2d) : void {
    this.x -= ponto.x
    this.y -= ponto.y
  }
  public multE (escalar: number) : void {
    this.x *= escalar
    this.y *= escalar
  }
  public norma () : number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
  }
  public normalizado () : void {
    let tam : number = this.norma()
    this.x /= tam
    this.y /= tam
  }
  public produtoInterno (ponto : ponto2d) : number {
    return this.x * ponto.x + this.y * ponto.y
  }
  public ortogonalizacao (ponto : ponto2d) : void {
    this.subtrai(ponto2d.projecao(this, ponto))
  }

  public static projecao (pontoA : ponto2d, pontoB : ponto2d) : ponto2d {
    pontoB.multE((pontoA.produtoInterno(pontoB) / Math.pow(pontoB.norma(), 2)))
    return pontoB
  }
}
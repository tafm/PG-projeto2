export class Ponto3d {

  public x : number
  public y : number
  public z : number

  constructor (x : number, y : number, z : number) {
    this.x = x
    this.y = y
    this.z = z
  }
  public soma (ponto : Ponto3d) : void {
    this.x += ponto.x
    this.y += ponto.y
    this.z += ponto.z
  }
  public subtrai (ponto : Ponto3d) : void {
    this.x -= ponto.x
    this.y -= ponto.y
    this.z -= ponto.z
  }
  public multE (escalar: number) : void {
    this.x *= escalar
    this.y *= escalar
    this.z *= escalar
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
  public produtoInterno (ponto : Ponto3d) : number {
    return this.x * ponto.x + this.y * ponto.y + this.z * ponto.z
  }
  public produtoVetorial (ponto : Ponto3d) : void {
    this.x = this.y * ponto.z - this.z * ponto.y
    this.y = this.z * ponto.x - this.x * ponto.z
    this.z = this.x * ponto.y - this.y * ponto.x
  }
}
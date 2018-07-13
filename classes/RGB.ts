export class RGB {

  public static soma (cor1 : RGB, cor2 : RGB) : RGB {
    return new RGB(Math.min(cor1.r + cor2.r, 255), Math.min(cor1.g + cor2.g, 255), Math.min(cor1.b + cor2.b, 255))
  }

  public static multiplica (cor : RGB, constante : number) : RGB {
    return new RGB(Math.min(Math.floor(cor.r * constante), 255), Math.min(Math.floor(cor.g * constante), 255), Math.min(Math.floor(cor.b * constante), 255))
  }

  public r : number
  public g : number
  public b : number

  constructor (r : number, g : number, b : number) {
    this.r = r
    this.g = g
    this.b = b
  }
}

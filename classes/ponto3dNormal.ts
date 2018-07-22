import { Ponto3d } from './ponto3d'

export class Ponto3dNormal {
  public p : Ponto3d
  public normal : Ponto3d

  constructor (p : Ponto3d, normal : Ponto3d) {
    this.p = p
    this.normal = normal
  }
}

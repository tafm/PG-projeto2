import { Ponto3d } from './ponto3d'

export class Camera {
  public p : Ponto3d // posição da câmera
  public N : Ponto3d // vetor N
  public V : Ponto3d // vetor V
  public d : number // distância
  public hx : number // largura
  public hy : number // altura

  constructor (p : Ponto3d, N : Ponto3d, V : Ponto3d, d : number, hx : number, hy : number) {
    this.p = p
    this.N = N
    this.V = V
    this.d = d
    this.hx = hx
    this.hy = hy
  }

  public U () : Ponto3d { // vetor ortogonal para formar a base
    return Ponto3d.produtoVetorial(this.N, this.V)
  }
}

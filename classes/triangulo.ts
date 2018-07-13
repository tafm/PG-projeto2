import { Ponto3d } from './ponto3d'
import { Vertice } from './vertice'

export class Triangulo {
  public vA : Vertice
  public vB : Vertice
  public vC : Vertice

  constructor (vA : Vertice, vB : Vertice, vC : Vertice) {
    this.vA = vA
    this.vB = vB
    this.vC = vC
  }

  public normal () : Ponto3d {
    let U : Ponto3d = Ponto3d.subtracao(this.vB.ponto, this.vA.ponto)
    let V : Ponto3d = Ponto3d.subtracao(this.vC.ponto, this.vA.ponto)
    return Ponto3d.produtoVetorial(U, V)
  }

  public hasVertice (vertice : Vertice) : boolean { // usa o endereço de memória do vértice pra comparação
    return this.vA === vertice || this.vB === vertice || this.vC === vertice
  }
}

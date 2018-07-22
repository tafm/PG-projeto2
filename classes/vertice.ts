import RepositorioTriangulos from '../repositorios/repositorioTriangulos'
import { Ponto3d } from './ponto3d'
import { Triangulo } from './triangulo'

export class Vertice {
  public ponto : Ponto3d
  public posicaoRep : number // posição do vértice no repositório de vértices (pra acessar o vértice do triângulo em outras bases)
  public normal : Ponto3d

  constructor (ponto : Ponto3d, posicao : number) {
    this.ponto = ponto
    this.posicaoRep = posicao
  }

  public calculaNormal () : void {
    let triangulosContemVertice : Triangulo[] = RepositorioTriangulos.elementos.filter((t) => t.hasVertice(this)) // filtra todos os triângulos que contém o vértice

    let somaNormais : Ponto3d = triangulosContemVertice.reduce((ponto, a) => { // soma as normais desses triângulos
      return Ponto3d.soma(ponto, a.normal())
    }, new Ponto3d(0, 0, 0))

    this.normal = Ponto3d.multE(somaNormais, 1 / triangulosContemVertice.length)
  }
}

import RepositorioTriangulos from '../repositorios/repositorioTriangulos'
import { Ponto3d } from './ponto3d'
import { Triangulo } from './triangulo'

export class Vertice {
  public ponto : Ponto3d
  public normal : Ponto3d

  constructor (ponto : Ponto3d) {
    this.ponto = ponto
  }

  public calculaNormal () : void {
    let triangulosContemVertice : Triangulo[] = RepositorioTriangulos.elementos.filter((t) => t.hasVertice(this)) // filtra todos os triângulos que contém o vértice

    let somaNormais : Ponto3d = triangulosContemVertice.reduce((ponto, a) => { // soma as normais desses triângulos
      return Ponto3d.soma(ponto, a.normal())
    }, new Ponto3d(0, 0, 0))

    this.normal = Ponto3d.multE(somaNormais, 1 / triangulosContemVertice.length)
  }
}

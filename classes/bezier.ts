import { Ponto3d } from './ponto3d'

export class Bezier {
  private pontos : Ponto3d[]

  constructor (entrada : string) {
    this.pontos = []
    let linhas : string[] = entrada.split('\n')
    let qtdpontos : number = parseInt(linhas[2])
    for (let i = 3; i < qtdpontos + 3; i++) {
      let pontoAux : string[] = linhas[i].split(' ')
      this.pontos.push(new Ponto3d(
        parseFloat(pontoAux[0]),
        parseFloat(pontoAux[1]),
        parseFloat(pontoAux[2])
      ))
    }
  }

  public getPonto (t : number) : Ponto3d {
    let pontos : Ponto3d[] = [...this.pontos]
    while (pontos.length > 1) {
      let ponto : Ponto3d[] = [...pontos]
      pontos = []
      for (let i = 0; i < ponto.length - 1; i ++) {
        let p1 : Ponto3d = Ponto3d.multE(ponto[i], 1 - t)
        let p2 : Ponto3d = Ponto3d.multE(ponto[i + 1], t)
        pontos.push(Ponto3d.soma(p1, p2))
      }
    }
    return pontos[0]
  }
}

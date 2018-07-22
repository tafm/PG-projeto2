import RepositorioTriangulos from '../repositorios/repositorioTriangulos'
import RepositorioVertices from '../repositorios/repositorioVertices'
import { Camera } from './camera'
import { Iluminacao } from './iluminacao'
import { Ponto3d } from './ponto3d'
import { RGB } from './RGB'
import { Triangulo } from './triangulo'
import { Vertice } from './vertice'

export class FuncoesAux {
  public static entrada = {
    loadCamera (arquivo : string) : Camera {
      let linhas : string[] = arquivo.split('\n')
      let p1 : string[] = linhas[0].split(' ')
      let p2 : string[] = linhas[1].split(' ')
      let p3 : string[] = linhas[2].split(' ')
      let p4 : string[] = linhas[3].split(' ') // p4 é na verdade d hx hy

      let p : Ponto3d = new Ponto3d(parseFloat(p1[0]), parseFloat(p1[1]), parseFloat(p1[2])) // posição da câmera
      let n : Ponto3d = new Ponto3d(parseFloat(p2[0]), parseFloat(p2[1]), parseFloat(p2[2])) // vetor N
      let v : Ponto3d = new Ponto3d(parseFloat(p3[0]), parseFloat(p3[1]), parseFloat(p3[2])) // vetor V
      let vl : Ponto3d = FuncoesAux.gramschmidt(v, n).normalizado() // vetor V ortogonalizado com processo de gramschmidt
      let u : Ponto3d = Ponto3d.produtoVetorial(n.normalizado(), vl) // vetor U ortogonal a v e n
      let d : number = parseFloat(p4[0]) // distância para plano de projeção
      let hx : number = parseFloat(p4[1])
      let hy : number = parseFloat(p4[2])

      n = n.normalizado()

      return new Camera(
        p,
        n,
        vl,
        u,
        d,
        hx,
        hy
      )
    },
    loadIluminacao (arquivo : string) : Iluminacao {
      let linhas : string[] = arquivo.split('\n')
      let plAux: string[] = linhas[0].split(' ')
      let pl : Ponto3d = new Ponto3d(parseFloat(plAux[0]), parseFloat(plAux[1]), parseFloat(plAux[2]))
      let ka : number = parseFloat(linhas[1])
      let iaAux : string[] = linhas[2].split(' ')
      let ia : RGB = new RGB(parseInt(iaAux[0]), parseInt(iaAux[1]), parseInt(iaAux[2]))
      let kd : number = parseFloat(linhas[3])
      let odAux : string[] = linhas[4].split(' ')
      let od : RGB = new RGB(parseFloat(odAux[0]), parseFloat(odAux[1]), parseFloat(odAux[2]))
      let ks : number = parseFloat(linhas[5])
      let ilAux : string[] = linhas[6].split(' ')
      let il : RGB = new RGB(parseInt(ilAux[0]), parseInt(ilAux[1]), parseInt(ilAux[2]))
      let n : number = parseFloat(linhas[7])

      return new Iluminacao(pl, ka, kd, ks, n, ia, od, il)
    },
    loadObject (arquivo : string) : void { // carrega o arquivo de objetos (considera quebra de linha como \n)
      // limpa os repositórios
      RepositorioTriangulos.clear()
      RepositorioVertices.clear()

      let linhas : string[] = arquivo.split('\n')
      let numVertices : number = parseInt(linhas[0].split(' ')[0])
      // let numTriangulos : number = parseInt(linhas[0].split(' ')[1]) // desnecessário, considera a leitura de triângulos até o fim do arquivo

      for (let i = 1; i <= numVertices; i++) { // faz a leitura dos vértices
        const v : string[] = linhas[i].split(' ')
        const ponto = new Ponto3d(
          parseFloat(v[0]),
          parseFloat(v[1]),
          parseFloat(v[2])
        )
        const vertice = new Vertice(ponto, RepositorioVertices.elementos.length)
        RepositorioVertices.push(vertice)
      }

      for (let i = numVertices + 1; i < linhas.length; i++) {
        const t : string[] = linhas[i].split(' ')
        RepositorioTriangulos.push(
          new Triangulo(
            RepositorioVertices.elementos[parseInt(t[0]) - 1],
            RepositorioVertices.elementos[parseInt(t[1]) - 1],
            RepositorioVertices.elementos[parseInt(t[2]) - 1]
          )
        )
      }

      RepositorioVertices.elementos.forEach((v) => {
        v.calculaNormal()
      })
    }
  }

  public static EqDouble (num1 : number, num2 : number) : boolean {
    return Math.abs(num1 - num2) <= 0.0001 // precisão de comparação pra considerar dois pontos iguais
  }

  public static gramschmidt (V : Ponto3d, N : Ponto3d) : Ponto3d {
    return Ponto3d.subtracao(V, Ponto3d.multE(N , Ponto3d.produtoEscalar(V, N) / Ponto3d.produtoEscalar(N, N)))
  }

  public static multiplicaMatriz (a, b) {
    if (a[0].length !== b.length) {
      throw new Error('não é possível multiplicar')
    }
    let newmatriz = []
    for (let i = 0; i < a.length; i++) { // número de linhas da nova matriz
      newmatriz.push([])
    }

    for (let i = 0; i < a.length; i++) { // zera a matriz
      for (let j = 0; j < b[0].length; j++) {
        newmatriz[i].push(0)
      }
    }

    for (let i = 0; i < a.length; i++) { // pra cada linha de A
      for (let j = 0; j < b[0].length; j++) { // pra cada coluna de B
        for (let k = 0; k < a[0].length; k++) { // para cada coluna de A
          newmatriz[i][j] += a[i][k] * b[k][j]
        }
      }
    }
    return newmatriz
  }
}

import * as $ from 'jquery'
import { Ponto2d } from './classes/ponto2d'
import { Ponto3d } from './classes/ponto3d'
import { Triangulo } from './classes/triangulo'
import { Vertice } from './classes/vertice'
import RepositorioTriangulos from './repositorios/repositorioTriangulos'
import RepositorioVertices from './repositorios/repositorioVertices'

function loadObject (arquivo : string) { // carrega o arquivo de objetos (considera quebra de linha como \n)
  // limpa os repositórios
  RepositorioTriangulos.clear()
  RepositorioVertices.clear()

  let linhas : string[] = arquivo.split('\n')
  let numVertices : number = parseInt(linhas[0].split(' ')[0])
  // let numTriangulos : number = parseInt(linhas[0].split(' ')[1]) // desnecessário, considera a leitura de triângulos até o fim do arquivo

  for (let i = 1; i <= numVertices; i++) { // faz a leitura dos vértices
    const v : string[] = linhas[i].split(' ')
    const ponto = new Ponto3d(
      parseInt(v[0]),
      parseInt(v[1]),
      parseInt(v[2])
    )
    const vertice = new Vertice(ponto)
    RepositorioVertices.push(vertice)
  }

  console.log(RepositorioVertices)

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

console.log(RepositorioTriangulos)

loadObject('3 1\n50.0000 0.0000 0.000\n0 50 0\n0 0 50\n1 2 3')

// console.log(new Ponto2d(1, 2))
// console.log($('#teste'))

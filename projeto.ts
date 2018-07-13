import * as $ from 'jquery'
import { Camera } from './classes/camera'
import { Iluminacao } from './classes/iluminacao'
import { Ponto2d } from './classes/ponto2d'
import { Ponto3d } from './classes/ponto3d'
import { Triangulo } from './classes/triangulo'
import { Vertice } from './classes/vertice'
import RepositorioTriangulos from './repositorios/repositorioTriangulos'
import RepositorioVertices from './repositorios/repositorioVertices'
import { RGB } from './classes/RGB'

let camera : Camera
let iluminacao : Iluminacao
let size = { width: 800, height: 600 }
let canvas = $('#canvas')

function loadCamera (arquivo : string) {
  let linhas : string[] = arquivo.split('\n')
  let p1 = linhas[0].split(' ')
  let p2 = linhas[1].split(' ')
  let p3 = linhas[2].split(' ')
  let p4 = linhas[3].split(' ')

  camera = new Camera(
    new Ponto3d(parseFloat(p1[0]), parseFloat(p1[1]), parseFloat(p1[2])),
    new Ponto3d(parseFloat(p2[0]), parseFloat(p2[1]), parseFloat(p2[2])),
    new Ponto3d(parseFloat(p3[0]), parseFloat(p3[1]), parseFloat(p3[2])),
    new Ponto3d(parseFloat(p4[0]), parseFloat(p4[1]), parseFloat(p4[2]))
  )

  console.log(camera)
}

function loadIluminacao (arquivo : string) {

}

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
      parseFloat(v[0]),
      parseFloat(v[1]),
      parseFloat(v[2])
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

  console.log(RepositorioTriangulos)
}

loadCamera('-200 -50 300\n0.667 0.172 -1\n0 3 0\n65 0.5 0.6')
loadObject('3 1\n50.0000 0.0000 0.000\n0 50 0\n0 0 50\n1 2 3')

// console.log(new Ponto2d(1, 2))
// console.log($('#teste'))

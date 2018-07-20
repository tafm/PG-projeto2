import * as $ from 'jquery'
import { Bezier } from './classes/bezier'
import { Camera } from './classes/camera'
import { FuncoesAux } from './classes/funcoesAux'
import { Iluminacao } from './classes/iluminacao'
import { Ponto2d } from './classes/ponto2d'
import { Ponto3d } from './classes/ponto3d'
import { RGB } from './classes/RGB'
import { Triangulo } from './classes/triangulo'
import { Vertice } from './classes/vertice'
import RepositorioTriangulos from './repositorios/repositorioTriangulos'
import RepositorioVertices from './repositorios/repositorioVertices'

let camera : Camera
let iluminacao : Iluminacao
let bezier : Bezier
let size = { width: 800, height: 600 }
let canvas = $('#canvas')
let frames = 0
let tempo = 0

function leituraEntradas () {
  camera = FuncoesAux.entrada.loadCamera($('#camera')[0].value)
  iluminacao = FuncoesAux.entrada.loadIluminacao(($('#iluminacao')[0].value))
  FuncoesAux.entrada.loadObject($('#objeto')[0].value)
  frames = parseInt($('#frames')[0].value)
  tempo = parseInt($('#tempo')[0].value)
  bezier = new Bezier($('#bezier')[0].value)
  $('#entradas').css('display', 'none')
  $('#canvas').css( 'width', size.width)
    .css('height', size.height)
    .css('display', 'block')
}

$('#botao').click(() => {
  leituraEntradas()
})

// fake entradas

$('#camera')[0].value = '-200 -50 300\n0.667 0.172 -1\n0 3 0\n65 0.5 0.6'
$('#iluminacao')[0].value = '-200 -50 300\n1\n2 2 2\n1\n1 1 1\n0.5\n0 255 0\n2'
$('#objeto')[0].value = '3 1\n50.0000 0.0000 0.000\n0 50 0\n0 0 50\n1 2 3'
$('#bezier')[0].value = '1\n-200 -50 300'
$('#tempo')[0].value = '1'
$('#frames')[0].value = '1'

leituraEntradas()

// loadCamera('-200 -50 300\n0.667 0.172 -1\n0 3 0\n65 0.5 0.6')
// loadIluminacao('-200 -50 300\n1\n2 2 2\n1\n1 1 1\n0.5\n0 255 0\n2')
// loadObject('3 1\n50.0000 0.0000 0.000\n0 50 0\n0 0 50\n1 2 3')

// console.log(new Ponto2d(1, 2))
// console.log($('#teste'))

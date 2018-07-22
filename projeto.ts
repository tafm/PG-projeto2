import * as $ from 'jquery'
import { Bezier } from './classes/bezier'
import { Camera } from './classes/camera'
import { FuncoesAux } from './classes/funcoesAux'
import { Iluminacao } from './classes/iluminacao'

let camera : Camera
let iluminacao : Iluminacao
let bezier : Bezier
let size = { width: 800, height: 600 }
let canvas = $('#canvas')[0]
let frames = 0
let intervalo = 0

function leituraEntradas () {
  camera = FuncoesAux.entrada.loadCamera($('#camera')[0].value)
  iluminacao = FuncoesAux.entrada.loadIluminacao(($('#iluminacao')[0].value))
  FuncoesAux.entrada.loadObject($('#objeto')[0].value)
  frames = parseInt($('#bezier')[0].value.split('\n')[1])
  intervalo = parseInt($('#bezier')[0].value.split('\n')[0])
  bezier = new Bezier($('#bezier')[0].value)
  $('#entradas').css('display', 'none')
  canvas.width =  size.width
  canvas.height = size.height
  $('#canvas').css('display', 'block')
}

function sleep (ms) {
  return new Promise ((resolve) => setTimeout(resolve, ms))
}

async function iniciaCamera () {
  let t = 0
  let fator = 1.0 / frames
  let ctx = canvas.getContext('2d')
  while (t <= 1) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    camera.p = bezier.getPonto(t)
    t += fator
    let canvasFunc = camera.takeFrame(size, iluminacao)
    ctx.drawImage(canvasFunc, 0, 0)
    await sleep (intervalo)
  }
  // console.log('Taking a break...');
  // await sleep(2000);
  // console.log('Two second later');
}

$('#botao').click(() => {
  leituraEntradas()
  // iniciaCamera()

  let canvasFunc = camera.takeFrame(size, iluminacao) // pega um frame da câmera e desenha na tela
  let ctx = canvas.getContext('2d')
  ctx.drawImage(canvasFunc, 0, 0)
})

// fake entradas

// $('#camera')[0].value = '-200 -50 300\n0.667 0.172 -1\n0 3 0\n65 0.5 0.6'
// $('#iluminacao')[0].value = '-200 -50 300\n1\n2 2 2\n1\n1 1 1\n0.5\n0 255 0\n2'
// $('#objeto')[0].value = '3 1\n50.0000 0.0000 0.000\n0 50 0\n0 0 50\n1 2 3'
// $('#bezier')[0].value = '1\n-200 -50 300'
// $('#tempo')[0].value = '1'
// $('#frames')[0].value = '1'

// leituraEntradas()

// let canvasFunc = camera.takeFrame(size, iluminacao) // pega um frame da câmera e desenha na tela
// let ctx = canvas.getContext('2d')
// ctx.drawImage(canvasFunc, 0, 0)

// loadCamera('-200 -50 300\n0.667 0.172 -1\n0 3 0\n65 0.5 0.6')
// loadIluminacao('-200 -50 300\n1\n2 2 2\n1\n1 1 1\n0.5\n0 255 0\n2')
// loadObject('3 1\n50.0000 0.0000 0.000\n0 50 0\n0 0 50\n1 2 3')

// console.log(new Ponto2d(1, 2))
// console.log($('#teste'))



// fake entradas

// $('#camera')[0].value = '50 -50 300\n0 0 -1\n1 -100 10\n10 -2 -3'
// // $('#iluminacao')[0].value = '-200 -50 300\n1\n2 2 2\n1\n1 1 1\n0.5\n0 255 0\n2'
// $('#iluminacao')[0].value = '-220 -150 700\n1\n40 20 20\n1\n0.7 0.7 0.7\n0.5\n220 220 220\n2'
// $('#objeto')[0].value = '4 4\n1 1 1\n1 30 1\n30 30 1\n1 1 30\n1 2 3\n1 2 4\n2 3 4\n1 3 4'
// $('#bezier')[0].value = '200\n50\n4\n30 -100 500\n0 -100 500\n10 -120 500\n10 -80 500'

// leituraEntradas()

// let canvasFunc = camera.takeFrame(size, iluminacao) // pega um frame da câmera e desenha na tela
// let ctx = canvas.getContext('2d')
// ctx.drawImage(canvasFunc, 0, 0)
// iniciaCamera()

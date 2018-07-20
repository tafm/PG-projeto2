import { Ponto2d } from '../classes/ponto2d'

// --- testa subtração de pontos

test('Subtração de ponto (3,2) por (1,1) deve dar o ponto (2,1)', () => {
  let pontoA = new Ponto2d(3, 2)
  let pontoB = new Ponto2d(1, 1)
  expect(Ponto2d.subtracao(pontoA, pontoB)).toEqual(
    {x: 2, y: 1}
  )
})

// --- testa adição de pontos

test('Adição de ponto (3,2) por (1,1) deve dar o ponto (4,3)', () => {
  let pontoA = new Ponto2d(3, 2)
  let pontoB = new Ponto2d(1, 1)
  expect(Ponto2d.soma(pontoA, pontoB)).toEqual(
    {x: 4, y: 3}
  )
})

// --- testa multiplicação por escalar

test('Multiplicação do ponto (3,2) por escalar 3 deve dar o ponto (9, 6)', () => {
  let pontoA = new Ponto2d(3, 2)
  let escalar = 3
  expect(Ponto2d.multE(pontoA, escalar)).toEqual(
    { x: 9, y: 6 }
  )
})

import repositorioTriangulos from '../repositorios/repositorioTriangulos'
import repositorioVertices from '../repositorios/repositorioVertices'
import { Escalona } from './escalona'
import { FuncoesAux } from './funcoesAux'
import { Iluminacao } from './iluminacao'
import { Linha } from './linha'
import { Ponto2d } from './ponto2d'
import { Ponto3d } from './ponto3d'
import { RGB } from './RGB'
import { Triangulo } from './triangulo'
import { Vertice } from './vertice'

export class Camera {
  public p : Ponto3d // posição da câmera
  public N : Ponto3d // vetor N
  public V : Ponto3d // vetor V
  public U : Ponto3d // vetor U
  public d : number // distância
  public hx : number // largura
  public hy : number // altura

  private pontosCamera : Ponto3d[] // pontos nas coordenadas da câmera
  private zbuffer : number[][] // pra não pintar em cima
  private pontosTela : Ponto2d[]
  private luzCamera : Ponto3d

  constructor (p : Ponto3d, N : Ponto3d, V : Ponto3d, U : Ponto3d, d : number, hx : number, hy : number) {
    this.p = p
    this.N = N
    this.V = V
    this.U = U
    this.d = d
    this.hx = hx
    this.hy = hy
  }

  public takeFrame (size : {width : number, height: number}, luz : Iluminacao) : HTMLCanvasElement { // tira uma "foto" do cenário atual baseando-se nas configuraçoes atuais da câmera e retorna um canvas contendo o desenho
    let canvas : HTMLCanvasElement = document.createElement('canvas')
    canvas.width = size.width
    canvas.height = size.height
    // -- lógica
    let ctx = canvas.getContext('2d')
    this.getPontosCamera(luz)
    this.getPontosTela(size)
    this.pintaTela(size, canvas)
    // this.pintaTrianguloFlatBottom(1, 2, 3, ctx)
    // this.pintaTrianguloFlatTop(1, 2, 3, ctx)
    repositorioTriangulos.elementos.forEach((t) => {
      this.pintaTriangulo(t, ctx, luz)
    })
    return canvas
  }

  private getPontosCamera (luz : Iluminacao) : void { // mudança de base mundo pra base câmera
    this.pontosCamera = []
    let Vnorm : Ponto3d = this.V// .normalizado()
    let Unorm : Ponto3d = this.U// .normalizado()
    let Nnorm : Ponto3d = this.N// .normalizado()
    let M : number[][] = [
      [Unorm.x, Unorm.y, Unorm.z],
      [Vnorm.x, Vnorm.y, Vnorm.z],
      [Nnorm.x, Nnorm.y, Nnorm.z]
    ]

    // coordenadas dos pontos

    repositorioVertices.elementos.forEach((e) => {
      let ponto = Ponto3d.subtracao(e.ponto, this.p)
      let result = FuncoesAux.multiplicaMatriz(M, [[ponto.x], [ponto.y], [ponto.z]])
      this.pontosCamera.push(new Ponto3d(result[0][0], result[1][0], result[2][0]))
    })

    // coordenadas da luz

    let resultLuz = FuncoesAux.multiplicaMatriz(M, [[luz.pl.x], [luz.pl.y], [luz.pl.z]])
    this.luzCamera = new Ponto3d(resultLuz[0][0], resultLuz[1][0], resultLuz[2][0])
  }

  private getPontosTela (size : {width : number, height: number}) : void { // mudança de pontos da câmera para tela
    console.log(this.pontosCamera)
    this.pontosTela = []
    this.pontosCamera.forEach((p) => { // semelhança de triângulos
      let x = this.d / (p.z / p.x) / this.hx
      let y = this.d / (p.z / p.y) / this.hy

      x = Math.round((x + 1) * size.width / 2)
      y = Math.round((1 - y) * size.height / 2)
      this.pontosTela.push(new Ponto2d(x, y))
    })
    console.log(this.pontosTela)
  }

  private pintaTela (size : {width : number, height: number}, canvas : HTMLCanvasElement) : void {
    // limpa z-buffer
    this.zbuffer = new Array(size.width)
    for (let i = 0; i < size.width; i++) {
      this.zbuffer[i] = new Array(size.height)
    }
    for (let i = 0; i < size.width; i++) {
      for (let j = 0; j < size.height; j++) {
        this.zbuffer[i][j] = Infinity
      }
    }
  }

  private pintaPonto (ctx : CanvasRenderingContext2D, x : number, y : number, cor : RGB) : void {
    ctx.fillStyle = `rgba(${cor.r}, ${cor.g}, ${cor.b})`
    ctx.fillRect(x, y, 1, 1)
  }

  private pintaTriangulo (triangulo : Triangulo, ctx : CanvasRenderingContext2D, luz : Iluminacao) : void {
    let pontos : Ponto2d[] = [this.pontosTela[triangulo.vA.posicaoRep], this.pontosTela[triangulo.vB.posicaoRep], this.pontosTela[triangulo.vC.posicaoRep]]
    pontos.sort((pa, pb) => pa.x - pb.x) // ordena primeiro pelo X pra pintar da esquerda pra direita, depois pelo Y pra verificar o tipo de triângulo
    pontos.sort((pa, pb) => pa.y - pb.y)
    let [p1, p2, p3] = pontos

    if (p2.y === p3.y) { // flat bottom
      this.pintaTrianguloFlatBottom(p1, p2, p3, ctx, luz, triangulo)
    } else if (p1.y === p2.y) { // flat top
      this.pintaTrianguloFlatTop(p1, p2, p3, ctx, luz, triangulo)
    } else {
      let p4 : Ponto2d = new Ponto2d(Math.round(p1.x + (p2.y - p1.y) / (p3.y - p1.y) * (p3.x - p1.x)), p2.y)
      let [p2Aux, p4Aux] = [p2, p4].sort((a, b) => a.x - b.x)
      this.pintaTrianguloFlatBottom(p1, p2Aux, p4Aux, ctx, luz, triangulo) // necessário pois a divisão de triângulos tem 2 casos do p4
      this.pintaTrianguloFlatTop(p2Aux, p4Aux, p3, ctx, luz, triangulo)
    }
  }

  private pintaTrianguloFlatBottom (v1 : Ponto2d, v2 : Ponto2d, v3 : Ponto2d, ctx : CanvasRenderingContext2D, luz : Iluminacao, triangulo : Triangulo) : void { // triângulo no formato /\ v1 = vértice superior
    let varLeft : number = (v2.x - v1.x) / (v2.y - v1.y) // variação na esquerda
    let varRight : number = (v3.x - v1.x) / (v3.y - v1.y) // variação na direita

    let minX : number = v1.x
    let maxX : number = v1.x

    let cor : RGB

    for (let scanLineY = v1.y; scanLineY <= v2.y; scanLineY++) {
      for (let x = minX; x <= maxX; x++) {
        cor = this.getCorPixel(new Ponto2d(Math.round(x), scanLineY), triangulo, luz)
        if (!cor) { // se não retornar cor o z-buffer já tinha um valor menor armazenado
          continue
        }
        console.log(cor)
        this.pintaPonto(ctx, Math.round(x), scanLineY, cor)
      }
      minX += varLeft
      maxX += varRight
    }
  }

  private pintaTrianguloFlatTop (v1 : Ponto2d, v2 : Ponto2d, v3 : Ponto2d, ctx : CanvasRenderingContext2D, luz : Iluminacao, triangulo : Triangulo) : void { // triângulo no formato \/ v1 = vértice superior esquerdo
    let varLeft : number = (v3.x - v1.x) / (v3.y - v1.y)
    let varRight : number = (v3.x - v2.x) / (v3.y - v2.y)

    let minX : number = v3.x
    let maxX : number = v3.x

    let cor : RGB

    for (let scanLineY = v3.y; scanLineY >= v1.y; scanLineY--) {
      for (let x = minX; x <= maxX; x++) {
        cor = this.getCorPixel(new Ponto2d(Math.round(x), scanLineY), triangulo, luz)
        if (!cor) {
          continue
        }
        this.pintaPonto(ctx, Math.round(x), scanLineY, cor)
      }
      minX -= varLeft
      maxX -= varRight
    }
  }

  private getCorPixel (ponto : Ponto2d, triangulo : Triangulo, luz : Iluminacao) : RGB {
    // escalona pra pegar a coordenada baricêntrica do ponto em relação aos vértices do triângulo que ele faz parte
    let l3 : Linha = new Linha (1, 1, 1, 1)
    let l1 : Linha = new Linha (this.pontosTela[triangulo.vA.posicaoRep].x, this.pontosTela[triangulo.vB.posicaoRep].x, this.pontosTela[triangulo.vC.posicaoRep].x, ponto.x)
    let l2 : Linha = new Linha (this.pontosTela[triangulo.vA.posicaoRep].y, this.pontosTela[triangulo.vB.posicaoRep].y, this.pontosTela[triangulo.vC.posicaoRep].y, ponto.y)
    let esc : number[] = new Escalona(l1, l2, l3).esc()
    let pontoCamera : Ponto3d = Ponto3d.soma(Ponto3d.soma(Ponto3d.multE(this.pontosCamera[triangulo.vA.posicaoRep], esc[0]), Ponto3d.multE(this.pontosCamera[triangulo.vB.posicaoRep], esc[1])), Ponto3d.multE(this.pontosCamera[triangulo.vC.posicaoRep], esc[2]))
    let pontoNormal : Ponto3d = Ponto3d.soma(Ponto3d.soma(Ponto3d.multE(repositorioVertices.elementos[triangulo.vA.posicaoRep].normal, esc[0]), Ponto3d.multE(repositorioVertices.elementos[triangulo.vB.posicaoRep].normal, esc[1])), Ponto3d.multE(repositorioVertices.elementos[triangulo.vC.posicaoRep].normal, esc[2]))
    console.log(pontoNormal)

    if (ponto.x > 0 && ponto.x < this.zbuffer[0].length && pontoCamera.z < this.zbuffer[ponto.x][ponto.y]) { // só calcula a cor do ponto se o Z for menor que o Z do z-buffer
    let ia : RGB = RGB.multiplica(luz.ia, luz.ka)
    let l : Ponto3d = Ponto3d.subtracao(this.luzCamera, pontoCamera).normalizado()
    let normal : Ponto3d = pontoNormal.normalizado()
    let id : RGB = new RGB(0, 0, 0)
    let ie : RGB = new RGB(0, 0, 0)
    let v : Ponto3d = Ponto3d.multE(pontoCamera, -1).normalizado()
    // if (Ponto3d.produtoEscalar(normal, v) < 0) {
    //   normal = Ponto3d.multE(normal, -1)
    // }
    // if (Ponto3d.produtoEscalar(normal, l) >= 0) {
    //   id = RGB.produto(luz.od, luz.il)
    //   let r : Ponto3d = Ponto3d.subtracao(Ponto3d.multE(Ponto3d.multE(normal, 2), Ponto3d.produtoEscalar(normal, l)), l).normalizado()
    //   if (Ponto3d.produtoEscalar(v, r) >= 0) {
    //     ie = RGB.multiplica(RGB.multiplica(luz.il, luz.ks), Math.pow(Ponto3d.produtoEscalar(r, v), luz.n))
    //   }
    // }
    return RGB.soma(RGB.soma(ia, id), ie)
    } else {
      return null
    }
  }
}

import { Ponto3d } from './ponto3d'
import { RGB } from './RGB'

export class Iluminacao {
  public pl : Ponto3d // Coordenadas do ponto de luz
  public ka : number // reflexao ambiental
  public kd : number // constante difusa
  public ks : number // parte especular
  public n : number // constante de rugosidade
  public ia : RGB // vetor cor ambiental
  public od : RGB // vetor difuso
  public il : RGB // cor da fonte de luz

  constructor (pl : Ponto3d, ka : number, kd : number, ks : number, n : number, ia : RGB, od : RGB, il : RGB) {
    this.pl = pl
    this.ka = ka
    this.kd = kd
    this.ks = ks
    this.n = n
    this.ia = ia
    this.od = od
    this.il = il
  }
}

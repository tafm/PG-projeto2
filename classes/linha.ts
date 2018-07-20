export class Linha { // usada na função de escalonamento
  public static divide (linha : Linha, c : number) : Linha {
    return new Linha(linha.colA / c, linha.colB / c, linha.colC / c, linha.colD / c)
  }

  public static zeraColA (linha1 : Linha, linha2 : Linha) : Linha {
    return new Linha(
      linha1.colA - linha2.colA * linha1.colA,
      linha1.colB - linha2.colB * linha1.colA,
      linha1.colC - linha2.colC * linha1.colA,
      linha1.colD - linha2.colD * linha1.colA
    )
  }

  public static zeraColB (linha1 : Linha, linha2 : Linha) : Linha {
    return new Linha(
      linha1.colA,
      linha1.colB - linha2.colB * linha1.colB,
      linha1.colC - linha2.colC * linha1.colB,
      linha1.colD - linha2.colD * linha1.colB
    )
  }

  public static zeraColC (linha1 : Linha, linha2 : Linha) : Linha {
    return new Linha(
      linha1.colA,
      linha1.colB,
      linha1.colC - linha2.colC * linha1.colC,
      linha1.colD - linha2.colD * linha1.colC
    )
  }

  public colA : number
  public colB : number
  public colC : number
  public colD : number

  constructor (colA : number, colB : number, colC : number, colD : number) {
    this.colA = colA
    this.colB = colB
    this.colC = colC
    this.colD = colD
  }
}

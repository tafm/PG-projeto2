export class Repositorio<tipo> { // classe abstrata para armazenar vertices, triângulos, etc da aplicação
  public elementos : tipo[]

  public push (elemento : tipo) : void {
    this.elementos.push(elemento)
  }

  public clear () : void {
    this.elementos = []
  }
}

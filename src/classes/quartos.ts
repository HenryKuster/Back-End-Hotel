export class Quarto {
  id: string;
  numeroQuarto: number;
  categoria: string;
  valorDiaria: number;

  constructor(
    id: string,
    numeroQuarto: number,
    categoria: string,
    valorDiaria: number
  ) {
    this.id = id;
    this.numeroQuarto = numeroQuarto;
    this.categoria = categoria;
    this.valorDiaria = valorDiaria;
  }
}

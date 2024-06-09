export class Servico {
  id: string;
  nome: string;
  detalhes: string;
  valor: number;

  constructor(id: string, nome: string, detalhes: string, valor: number) {
    this.id = id;
    this.nome = nome;
    this.detalhes = detalhes;
    this.valor = valor;
  }
}

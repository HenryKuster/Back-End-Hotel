export class Cliente {
  id: string;
  nomeCompleto: string;
  documento: string;
  contato: string;

  constructor(
    id: string,
    nomeCompleto: string,
    documento: string,
    contato: string
  ) {
    this.id = id;
    this.nomeCompleto = nomeCompleto;
    this.documento = documento;
    this.contato = contato;
  }
}

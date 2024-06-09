export class Reserva {
  id: string;
  clienteId: string;
  quartoId: string;
  dataInicio: string;
  dataFim: string;

  constructor(
    id: string,
    clienteId: string,
    quartoId: string,
    dataInicio: string,
    dataFim: string
  ) {
    this.id = id;
    this.clienteId = clienteId;
    this.quartoId = quartoId;
    this.dataInicio = dataInicio;
    this.dataFim = dataFim;
  }
}

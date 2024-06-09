import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";
import { v4 as uuidv4 } from "uuid";
import { Reserva } from "../classes/reserva";
import { Cliente } from "../classes/clientes";
import { Quarto } from "../classes/quartos";

const localDB = new LocalStorage("./scratch");
const RESERVAS_KEY = "reservasHotel";
const CLIENTES_KEY = "clientes";
const QUARTOS_KEY = "quartos";

const obterReservasSalvas = (): Reserva[] => {
  const data = localDB.getItem(RESERVAS_KEY);
  return data ? JSON.parse(data) : [];
};

const salvarReservas = (reservas: Reserva[]): void => {
  localDB.setItem(RESERVAS_KEY, JSON.stringify(reservas));
};

const obterClientesSalvos = (): Cliente[] => {
  const data = localDB.getItem(CLIENTES_KEY);
  return data ? JSON.parse(data) : [];
};

const obterQuartosSalvos = (): Quarto[] => {
  const data = localDB.getItem(QUARTOS_KEY);
  return data ? JSON.parse(data) : [];
};

export const criarReserva = (req: Request, res: Response) => {
  const { clienteId, quartoId, dataEntrada, dataSaida } = req.body;

  const clientes = obterClientesSalvos();
  const quartos = obterQuartosSalvos();

  const clienteEncontrado = clientes.find((c) => c.id === clienteId);
  const quartoEncontrado = quartos.find((q) => q.id === quartoId);

  if (!clienteEncontrado || !quartoEncontrado) {
    return res
      .status(404)
      .json({ message: "Cliente ou quarto não encontrado" });
  }

  const reservas = obterReservasSalvas();
  const novaReserva = new Reserva(
    uuidv4(),
    clienteId,
    quartoId,
    dataEntrada,
    dataSaida
  );
  reservas.push(novaReserva);
  salvarReservas(reservas);
  res.status(201).json(novaReserva);
};

export const listarReservas = (req: Request, res: Response): void => {
  const reservas = obterReservasSalvas();
  res.json(reservas);
};

export const editarReserva = (req: Request, res: Response) => {
  const { id } = req.params;
  const { clienteId, quartoId, dataEntrada, dataSaida } = req.body;

  const clientes = obterClientesSalvos();
  const quartos = obterQuartosSalvos();

  const clienteEncontrado = clientes.find((c) => c.id === clienteId);
  const quartoEncontrado = quartos.find((q) => q.id === quartoId);

  if (!clienteEncontrado || !quartoEncontrado) {
    return res
      .status(404)
      .json({ message: "Cliente ou quarto não encontrado" });
  }

  const reservas = obterReservasSalvas();
  const index = reservas.findIndex((r) => r.id === id);

  if (index !== -1) {
    const reservaAtualizada = new Reserva(
      id,
      clienteId,
      quartoId,
      dataEntrada,
      dataSaida
    );
    reservas[index] = reservaAtualizada;
    salvarReservas(reservas);
    res.json(reservaAtualizada);
  } else {
    res.status(404).json({ message: "Reserva não encontrada" });
  }
};

export const deletarReserva = (req: Request, res: Response): void => {
  const { id } = req.params;
  const reservas = obterReservasSalvas();
  const reservasFiltradas = reservas.filter((r) => r.id !== id);
  salvarReservas(reservasFiltradas);
  res.status(204).send();
};

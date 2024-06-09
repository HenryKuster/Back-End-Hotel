import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";
import { v4 as uuidv4 } from "uuid";
import { Cliente } from "../classes/clientes";

const localDB = new LocalStorage("./scratch");
const STORAGE_KEY = "clientes";

const obterClientesSalvos = (): Cliente[] => {
  const data = localDB.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const salvarClientes = (clientes: Cliente[]): void => {
  localDB.setItem(STORAGE_KEY, JSON.stringify(clientes));
};

export const adicionarCliente = (req: Request, res: Response): void => {
  const clientes = obterClientesSalvos();
  const novoCliente: Cliente = new Cliente(
    uuidv4(),
    req.body.nome,
    req.body.cpf,
    req.body.telefone
  );
  clientes.push(novoCliente);
  salvarClientes(clientes);
  res.status(201).json(novoCliente);
};

export const listarClientes = (req: Request, res: Response): void => {
  const clientes = obterClientesSalvos();
  res.json(clientes);
};

export const atualizarCliente = (req: Request, res: Response): void => {
  const { id } = req.params;
  const clienteAtualizado: Cliente = new Cliente(
    id,
    req.body.nome,
    req.body.cpf,
    req.body.telefone
  );
  const clientes = obterClientesSalvos();
  const index = clientes.findIndex((c) => c.id === id);
  if (index !== -1) {
    clientes[index] = clienteAtualizado;
    salvarClientes(clientes);
    res.json(clienteAtualizado);
  } else {
    res.status(404).json({ message: "Cliente não encontrado" });
  }
};

export const removerCliente = (req: Request, res: Response): void => {
  const { id } = req.params;
  const clientes = obterClientesSalvos();
  const clientesFiltrados = clientes.filter((c) => c.id !== id);
  salvarClientes(clientesFiltrados);
  res.status(204).send();
};

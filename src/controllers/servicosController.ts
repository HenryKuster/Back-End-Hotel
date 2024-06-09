import { Servico } from "./../classes/servicos";
import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";
import { v4 as uuidv4 } from "uuid";

const localDB = new LocalStorage("./scratch");
const SERVICOS_KEY = "servicos";

const obterServicosSalvos = (): Servico[] => {
  const data = localDB.getItem(SERVICOS_KEY);
  return data ? JSON.parse(data) : [];
};

const salvarServicos = (servicos: Servico[]): void => {
  localDB.setItem(SERVICOS_KEY, JSON.stringify(servicos));
};

export const adicionarServico = (req: Request, res: Response): void => {
  const servicos = obterServicosSalvos();
  const novoServico: Servico = new Servico(
    uuidv4(),
    req.body.nome,
    req.body.descricao,
    req.body.preco
  );
  servicos.push(novoServico);
  salvarServicos(servicos);
  res.status(201).json(novoServico);
};

export const listarServicos = (req: Request, res: Response): void => {
  const servicos = obterServicosSalvos();
  res.json(servicos);
};

export const modificarServico = (req: Request, res: Response): void => {
  const { id } = req.params;
  const servicoAtualizado: Servico = new Servico(
    id,
    req.body.nome,
    req.body.descricao,
    req.body.preco
  );
  const servicos = obterServicosSalvos();
  const index = servicos.findIndex((s) => s.id === id);
  if (index !== -1) {
    servicos[index] = servicoAtualizado;
    salvarServicos(servicos);
    res.json(servicoAtualizado);
  } else {
    res.status(404).json({ message: "Serviço não encontrado" });
  }
};

export const removerServico = (req: Request, res: Response): void => {
  const { id } = req.params;
  const servicos = obterServicosSalvos();
  const servicosFiltrados = servicos.filter((s) => s.id !== id);
  salvarServicos(servicosFiltrados);
  res.status(204).send();
};

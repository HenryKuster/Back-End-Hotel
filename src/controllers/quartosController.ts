import { Request, Response } from "express";
import { LocalStorage } from "node-localstorage";
import { v4 as uuidv4 } from "uuid";
import { Quarto } from "../classes/quartos";

const localDB = new LocalStorage("./scratch");
const STORAGE_KEY = "quartos";

const obterQuartosSalvos = (): Quarto[] => {
  const data = localDB.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const salvarQuartos = (quartos: Quarto[]): void => {
  localDB.setItem(STORAGE_KEY, JSON.stringify(quartos));
};

export const adicionarQuarto = (req: Request, res: Response): void => {
  const quartos = obterQuartosSalvos();
  const novoQuarto: Quarto = new Quarto(
    uuidv4(),
    req.body.numero,
    req.body.categoria,
    req.body.valor
  );
  quartos.push(novoQuarto);
  salvarQuartos(quartos);
  res.status(201).json(novoQuarto);
};

export const listarQuartos = (req: Request, res: Response): void => {
  const quartos = obterQuartosSalvos();
  res.json(quartos);
};

export const modificarQuarto = (req: Request, res: Response): void => {
  const { id } = req.params;
  const quartoAtualizado: Quarto = new Quarto(
    id,
    req.body.numero,
    req.body.categoria,
    req.body.valor
  );
  const quartos = obterQuartosSalvos();
  const index = quartos.findIndex((q) => q.id === id);
  if (index !== -1) {
    quartos[index] = quartoAtualizado;
    salvarQuartos(quartos);
    res.json(quartoAtualizado);
  } else {
    res.status(404).json({ message: "Quarto não encontrado" });
  }
};

export const removerQuarto = (req: Request, res: Response): void => {
  const { id } = req.params;
  const quartos = obterQuartosSalvos();
  const quartosFiltrados = quartos.filter((q) => q.id !== id);
  salvarQuartos(quartosFiltrados);
  res.status(204).send();
};

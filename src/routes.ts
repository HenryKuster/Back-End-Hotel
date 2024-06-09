import { Router } from "express";

import {
  criarReserva,
  listarReservas,
  editarReserva,
  deletarReserva,
} from "./controllers/reservaController";
import {
  adicionarCliente,
  listarClientes,
  atualizarCliente,
  removerCliente,
} from "./controllers/clientesController";
import {
  adicionarQuarto,
  listarQuartos,
  modificarQuarto,
  removerQuarto,
} from "./controllers/quartosController";
import {
  adicionarServico,
  listarServicos,
  modificarServico,
  removerServico,
} from "./controllers/servicosController";

const router = Router();

// Rotas de clientes
router.post("/clientes", adicionarCliente);
router.get("/clientes", listarClientes);
router.put("/clientes/:id", atualizarCliente);
router.delete("/clientes/:id", removerCliente);

// Rotas de quartos
router.post("/quartos", adicionarQuarto);
router.get("/quartos", listarQuartos);
router.put("/quartos/:id", modificarQuarto);
router.delete("/quartos/:id", removerQuarto);

// Rotas de reservas
router.post("/reservas", criarReserva);
router.get("/reservas", listarReservas);
router.put("/reservas/:id", editarReserva);
router.delete("/reservas/:id", deletarReserva);

// Rotas de serviços
router.post("/servicos", adicionarServico);
router.get("/servicos", listarServicos);
router.put("/servicos/:id", modificarServico);
router.delete("/servicos/:id", removerServico);

export default router;

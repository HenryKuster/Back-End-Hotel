import express from "express";
import bodyParser from "body-parser";
import apiRoutes from "./src/routes";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
});

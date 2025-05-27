import express from "express";
import dotenv from "dotenv";
import categoriesRoutes from "./routes/categoria.routes";
import descuentoRoutes from "./routes/descuento.routes";
import tallesRoutes from "./routes/talles.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/categorias", categoriesRoutes);
app.use("/descuentos", descuentoRoutes);
app.use("/talles", tallesRoutes);

export default app;

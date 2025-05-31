import express from "express";
import dotenv from "dotenv";

import categoriesRoutes from "./routes/categoria.routes";
import descuentoRoutes from "./routes/descuento.routes";
import tallesRoutes from "./routes/talles.routes";
import detallesRoutes from "./routes/detalle.routes";
import imagenRoutes from "./routes/imagen.routes";
import ordenCompraRoutes from "./routes/ordenCompra.routes";
import ordenCompraDetalleRoutes from "./routes/ordenCompraDetalle.routes";
import preciosRoutes from "./routes/precio.routes";
import productosRoutes from "./routes/producto.routes";
import usuariosRoutes from "./routes/usuario.routes";
import direccionesRoutes from "./routes/direccion.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/categorias", categoriesRoutes);
app.use("/descuentos", descuentoRoutes);
app.use("/talles", tallesRoutes);
app.use("/detalles", detallesRoutes);
app.use("/imagenes", imagenRoutes);
app.use("/orden-compra", ordenCompraRoutes);
app.use("/orden-compra-detalle", ordenCompraDetalleRoutes);
app.use("/precios", preciosRoutes);
app.use("/productos", productosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/direcciones", direccionesRoutes);

export default app;

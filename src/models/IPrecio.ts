export interface IPrecio {
  id: number;
  disponible?: boolean;
  precioCompra: number;
  precioVenta: number;
  descuentoId?: number;
}

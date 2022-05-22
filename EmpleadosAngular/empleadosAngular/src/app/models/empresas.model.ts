export class Empresas {
  constructor(
    public _id: String,
    public nombre: String,
    public direccion:String,
    public telefono: Number,
    public descripcion: String,
    public tipoEmpresa:String,
    public productos: [{
      nombreProducto: String,
      precioProducto: Number,
      stock: Number
    }],
    public idEmpresa: String,
  ){}


}


// Subclade Dato
class Ingreso extends Dato{
    // 
    static contadorIngresos = 0;


    // El constructor es un método especial que se ejecuta automáticamente cuando se crea un nuevo objeto de la clase Ingreso
    constructor(descripcion, valor){
        // Llama al constructor de la clase padre (Dato) para inicializar
        // las propiedades que esta clase base define. Esto es necesario ya que Ingreso hereda de Dato.
        super(descripcion, valor);
        // Incrementa la propiedad estática contadorIngresos en 1.
        this._id = ++Ingreso.contadorIngresos;
    }

    // Este es un getter para acceder al atributo _id de la instancia.
    get id(){
        return this._id;
    }
}

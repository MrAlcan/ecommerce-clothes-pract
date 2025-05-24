export class NewProductDto{

    private constructor(
        public name: string,
        public price: string,
        public category: string,
        public color: string,
    ){}

    static fromObject(object: {[key: string]: any}){
        const { name, price, category, color } = object;

        if(!name) throw new Error('Se esperaba un Nombre del Producto');
        if(!price) throw new Error('Se esperaba un Precio del Producto');
        if(!category) throw new Error('Se esperaba una Categoria del Producto');

        return new NewProductDto(name, price, category, color);
    }

}
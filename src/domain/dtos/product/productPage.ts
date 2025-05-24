export class ProductPageDto{

    private constructor(
        public page: string,
        public perPage: string,
    ){}

    static fromObject(object: {[key: string]: any}){
        const { page, perPage } = object;
        if(!page) throw new Error('Se esperaba un numero de Pagina')
        if(!perPage) throw new Error('Se esperaba un numero de productos')

        
        return new ProductPageDto( page, perPage );
    }

}
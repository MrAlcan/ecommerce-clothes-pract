export class ReserveProductDto{

    private constructor(
        public productId: number,
        public amount: number,
    ){}

    static fromObject(object: {[key: string]: any}){

        const { productId, amount } = object;

        if(!productId) throw new Error('Se esperaba un ID de producto')
        if(!amount) throw new Error('Se esperaba una cantidad de Producto')
        if(amount <= 0) throw new Error('Se esperaba una cantidad mayor o igual a 0')
        
        return new ReserveProductDto(productId, amount)

    }

}
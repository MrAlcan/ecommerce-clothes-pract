
interface productSelected {
    productId: string,
    amount: number,
    price: number,
}

export class AddProductsToOrderDto {

    constructor(
        public products: productSelected[],
        public userId: string,
        public totalPrice: number,
    ){}

    static fromObject(object: {[key: string]: any}){

        const { products, userId, totalPrice } = object;

        if ( !products ) throw new Error('Se esperaba al menos un producto');
        if ( !userId ) throw new Error('Se esperaba al menos un id de usuario');
        
        return new AddProductsToOrderDto( products, userId, totalPrice );

    }

}
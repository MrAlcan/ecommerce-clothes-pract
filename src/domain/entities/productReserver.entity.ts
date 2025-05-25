import type { ProductEntity } from "./product.entity";

export class ProductReservedEntity{

    constructor(
        public product: ProductEntity,
        public amount: number,
    ){}

}
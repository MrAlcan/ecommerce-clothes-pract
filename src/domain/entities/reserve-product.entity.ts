import type { ProductEntity } from "./product.entity";

export class ReserveProductEntity{

    constructor(
        public product: ProductEntity,
        public amount: number,
    ){}

}
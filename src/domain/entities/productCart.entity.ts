import type { ProductReservedEntity } from "./productReserver.entity";

export class productCartEntity{
 
    constructor(
        public products: ProductReservedEntity[],
    ){}

}
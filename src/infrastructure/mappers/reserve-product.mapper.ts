import { ProductEntity } from "@/domain/entities/product.entity";
import { ReserveProductEntity } from "@/domain/entities/reserve-product.entity";

export class ReserveProductMapper{

    static reserveProductsFromArray(objects: { [key: string]: any }[]): ReserveProductEntity[] {
        return objects.map( (object) =>{
            const { product, amount } = object;
            if (!product) throw new Error('Se esperaba al menos un producto');
            return new ReserveProductEntity( product, amount );
        });
    }

    static reserveProductFromObject(object: { [key: string]: any }): ReserveProductEntity{
        const { product, amount } = object;
        return new ReserveProductEntity( product, amount );
    }

}
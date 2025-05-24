import { ProductEntity } from "@/domain/entities/product.entity";

export class ProductMapper{

    static productEntityFromObject(object: {[key: string]: any}){
        const { id, name, price, category, color } = object;

        if(!id) throw new Error('Se esperaba un id');

        return new ProductEntity(id, name, price, category, color);
    }

    static productEntitiesFromArray(objects: { [key: string]: any }[]): ProductEntity[] {
        return objects.map((object) => {
            const { id, name, price, category, color } = object;
    
            if (!id) throw new Error('Se esperaba un id');
    
            return new ProductEntity(id, name, price, category, color);
        });
    }

}
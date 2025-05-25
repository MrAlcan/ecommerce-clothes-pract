
import type { NewProductDto } from "../dtos/product/newProduct.dto";
import type { ProductDto } from "../dtos/product/product.dto";
import type { ProductPageDto } from "../dtos/product/productPage";
import type { ProductReservedDto } from "../dtos/product/productReserved.dto";
import type { ProductEntity } from "../entities/product.entity";
import type { ProductReservedEntity } from "../entities/productReserver.entity";

export abstract class ProductRepository{

    abstract newProduct(newProductDto: NewProductDto): Promise<ProductEntity>;
    abstract product(productDto: ProductDto): Promise<ProductEntity[]>;
    abstract productPage(productPageDto: ProductPageDto): Promise<ProductEntity[]>;
    abstract productReserved(productReservedDto: ProductReservedDto): Promise<ProductReservedEntity>

}

import type { NewProductDto } from "../dtos/product/newProduct.dto";
import type { ProductDto } from "../dtos/product/product.dto";
import type { ProductPageDto } from "../dtos/product/productPage";
import type { ProductEntity } from "../entities/product.entity";

export abstract class ProductDatasource{

    abstract newProduct(newProductDto: NewProductDto): Promise<ProductEntity>;
    abstract product(productDto: ProductDto): Promise<ProductEntity[]>;
    abstract productPage(prodcutPageDto: ProductPageDto): Promise<ProductEntity[]>;

}
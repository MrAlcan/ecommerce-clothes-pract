import type { ProductDatasource } from "@/domain/datasources/product.datasource";
import type { NewProductDto } from "@/domain/dtos/product/newProduct.dto";
import type { ProductDto } from "@/domain/dtos/product/product.dto";
import type { ProductPageDto } from "@/domain/dtos/product/productPage";
import type { ProductEntity } from "@/domain/entities/product.entity";
import type { ProductRepository } from "@/domain/repositories/product.repository";

export class ProductRepositoryImpl implements ProductRepository{
    
    constructor(
        private readonly productDatasource: ProductDatasource
    ){}

    newProduct(newProductDto: NewProductDto): Promise<ProductEntity> {
        return this.productDatasource.newProduct(newProductDto)
    }

    product(productDto: ProductDto): Promise<ProductEntity[]> {
        return this.productDatasource.product(productDto)
    }

    productPage(productPageDto: ProductPageDto): Promise<ProductEntity[]>{
        return this.productDatasource.productPage(productPageDto)
    }

}
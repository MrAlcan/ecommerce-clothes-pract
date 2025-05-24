import type { ProductPageDto } from "@/domain/dtos/product/productPage";
import type { ProductEntity } from "@/domain/entities/product.entity";
import type { ProductRepository } from "@/domain/repositories/product.repository";

interface ProductPageUseCase{
    execute(productPageDto: ProductPageDto): Promise<ProductEntity[]>;
}

export class ProductPage implements ProductPageUseCase{

    constructor(
        private readonly productRepository: ProductRepository
    ){}

    async execute(productPageDto: ProductPageDto): Promise<ProductEntity[]> {
        const productEntity = await this.productRepository.productPage(productPageDto)
        return productEntity
    }

}
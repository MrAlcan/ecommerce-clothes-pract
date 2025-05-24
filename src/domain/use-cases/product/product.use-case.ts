import type { ProductDto } from "@/domain/dtos/product/product.dto";
import type { ProductEntity } from "@/domain/entities/product.entity";
import type { ProductRepository } from "@/domain/repositories/product.repository";

interface ProductUseCase{
    execute(productDto: ProductDto): Promise<ProductEntity[]>;
}

export class Product implements ProductUseCase{

    constructor(
        private readonly productRepository: ProductRepository
    ){}

    async execute(productDto: ProductDto): Promise<ProductEntity[]> {
        const productEntity = await this.productRepository.product(productDto)
        return productEntity
    }

}
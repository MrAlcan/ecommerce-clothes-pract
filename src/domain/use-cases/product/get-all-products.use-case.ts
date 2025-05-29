import type { ProductEntity } from "@/domain/entities/product.entity";
import type { ProductRepository } from "@/domain/repositories/product.repository";

interface GetAllProductsUseCase{
    execute(): Promise<ProductEntity[]>;
}

export class GetAllProducts implements GetAllProductsUseCase{

    constructor(
        private readonly productRepository: ProductRepository
    ){}

    async execute(): Promise<ProductEntity[]> {
        const productEntity = await this.productRepository.getAllProducts()
        return productEntity
    }

}